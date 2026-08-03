#!/usr/bin/env node

import { createHash } from 'node:crypto'
import { promises as fs } from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
const verifyPath = valueAfter('--verify')

if (verifyPath) {
  await verify(path.resolve(verifyPath))
  process.exit(0)
}

const tracePath = path.resolve(requiredValue('--trace'))
const summaryPath = path.resolve(requiredValue('--summary'))
const outputPath = path.resolve(requiredValue('--out'))
const catalogPath = valueAfter('--catalog') ? path.resolve(valueAfter('--catalog')) : null
const traceText = await fs.readFile(tracePath, 'utf8')
const summaryText = await fs.readFile(summaryPath, 'utf8')
const trace = JSON.parse(traceText)
const summary = JSON.parse(summaryText)

if (trace.chapterSlug !== summary.chapter_id) {
  throw new Error(`observation_ordeal_chapter_mismatch: ${trace.chapterSlug} != ${summary.chapter_id}`)
}

const claimEvents = Array.isArray(trace.events)
  ? trace.events.filter((event) => event.eventType === 'assistant.claim')
  : []
if (claimEvents.length === 0) throw new Error('observation_ordeal_claim_count_invalid')
const traceClaimStatuses = claimEvents.map((event) => stringValue(event?.attributes?.status, 'unknown'))
if (JSON.stringify(traceClaimStatuses) !== JSON.stringify(summary.claim_statuses)) {
  throw new Error('observation_ordeal_claim_status_mismatch')
}

const cardMetaByChapter = {
  ch01: {
    'configured-init-surface': {
      title: '처음 열린 문',
      type: 'Configuration',
      question: 'host가 요청한 model과 Read 도구가 실제 init에도 나타났는가?',
      consequence: 'Opus 5, Read, default permission이 init 사건에서 다시 확인됐다.',
      art: 'init',
    },
    'read-error-retry-success': {
      title: '세 번째 독해',
      type: 'Recovery',
      question: '도구 오류 뒤 runtime은 전체 run을 끝냈는가, 수정해 다시 시도했는가?',
      consequence: '두 Read 오류 뒤 세 번째 Read가 marker를 반환했고 같은 run이 계속됐다.',
      art: 'recovery',
    },
    'terminal-result-after-tool-result': {
      title: '닫힌 실행',
      type: 'Receipt',
      question: '성공한 ToolResult 뒤 terminal Result가 실행을 닫았는가?',
      consequence: 'linked ToolResult 뒤 success/completed Result와 비용·duration이 남았다.',
      art: 'result',
    },
    'ui-and-permission-projection': {
      title: '보이지 않은 화면',
      type: 'Unknown',
      question: '이번 Read run이 권한 UI와 Book Canvas까지 검증했는가?',
      consequence: '실행하지 않았다. SDK 사건과 UI projection을 같은 증거로 취급하지 않는다.',
      art: 'unknown',
    },
  },
  ch02: {
    'unapproved-tool-callback-allow': {
      title: '승인을 기다리는 손',
      type: 'Permission',
      question: '사전 승인되지 않은 custom MCP 요청이 host callback의 allow 뒤에만 실행되는가?',
      consequence: 'permission request와 allow decision 뒤 handler와 tool result가 이어졌다.',
      art: 'permission',
    },
    'allowed-tools-auto-approval': {
      title: '먼저 열린 문',
      type: 'Ordering',
      question: 'allowed_tools whole-tool 규칙과 can_use_tool callback 중 어느 쪽이 먼저 작동하는가?',
      consequence: 'callback 없이 handler가 실행되어 allow rule의 자동 승인이 관찰됐다.',
      art: 'permission',
    },
    'deny-blocks-without-removing-init-name': {
      title: '이름은 남은 닫힌 문',
      type: 'Correction',
      question: 'disallowed_tools가 custom MCP 이름을 init 표면에서 제거해야만 실행을 막는가?',
      consequence: '이름은 init.tools에 남았지만 explicit deny가 실행을 차단했다. 책의 범위를 수정해야 한다.',
      art: 'denial',
    },
    'pretool-deny-precedes-auto-approval': {
      title: '가장 앞의 갈고리',
      type: 'Hook',
      question: 'allowed_tools에 든 도구도 PreToolUse deny가 먼저 차단할 수 있는가?',
      consequence: 'hook deny 뒤 error tool result가 남았고 handler는 실행되지 않았다.',
      art: 'denial',
    },
    'dontask-denies-without-app-callback': {
      title: '묻지 않는 거절',
      type: 'Constraint',
      question: 'dontAsk는 미승인 도구를 앱 승인창 없이 닫는가?',
      consequence: 'callback을 구성하지 않은 실행이 error tool result와 permission denial로 종료됐다.',
      art: 'denial',
    },
    'built-in-deny-init-surface': {
      title: '다른 도구의 안개',
      type: 'Unknown',
      question: 'custom MCP에서 본 init 표면을 built-in deny에도 그대로 적용할 수 있는가?',
      consequence: '이번 실행 범위 밖이다. built-in 도구로 별도 관측해야 한다.',
      art: 'unknown',
    },
    'large-result-progress-tool-search': {
      title: '아직 열리지 않은 기록',
      type: 'Unknown',
      question: 'large result, progress event, ToolSearch와 cache는 어떤 실제 사건을 남기는가?',
      consequence: '이번 다섯 실행은 이 경로를 유도하지 않았다.',
      art: 'unknown',
    },
  },
  ch04: {
  'read-only-overlap': {
    title: '동시에 읽는 두 손',
    type: 'Interpretation',
    question: 'readOnlyHint=true인 두 custom MCP handler가 같은 assistant message에서 겹치는가?',
    consequence: '858.949ms overlap이 실제 host timing에 기록됐다.',
    art: 'concurrency',
  },
  'mutating-serialization': {
    title: '변경의 좁은 문',
    type: 'Constraint',
    question: 'mutating custom MCP handler 두 개가 동시에 상태를 바꾸는가?',
    consequence: 'overlap 0ms. 첫 handler가 끝난 뒤 두 번째가 시작됐다.',
    art: 'serialization',
  },
  'stream-before-message-stop': {
    title: '끝나기 전의 실행',
    type: 'Foresight',
    question: '도구 실행은 assistant message_stop 이후에만 시작되는가?',
    consequence: '완성된 ToolUseBlock 뒤, 전체 message_stop보다 먼저 handler가 시작됐다.',
    art: 'stream',
  },
  'interrupt-cancels-handler': {
    title: '꿈을 깨우는 중단',
    type: 'Interrupt',
    question: 'ClaudeSDKClient.interrupt()가 실행 중인 long handler에 어떤 결과를 남기는가?',
    consequence: 'handler cancelled, terminal_reason=aborted_streaming이 관찰됐다.',
    art: 'interrupt',
  },
  'built-in-and-unannotated-tools': {
    title: '이름 없는 도구의 안개',
    type: 'Unknown',
    question: 'built-in Read/Edit/Bash와 annotation 없는 custom MCP도 같은 scheduling 규칙을 따르는가?',
    consequence: '이번 세 custom MCP 실행만으로 일반화하지 않는다.',
    art: 'unknown',
  },
  'progress-persistence-large-result': {
    title: '아직 열리지 않은 기록',
    type: 'Unknown',
    question: 'progress, file persistence, large-result 경계는 실제로 어떤 event를 남기는가?',
    consequence: '별도 live run이 필요하다.',
    art: 'unknown',
  },
  },
  ch30: {
    'local-report-host-allow': {
      title: '허용된 기록',
      type: 'Permission',
      question: '로컬 보고서 handler는 host allow 뒤에만 실행됐는가?',
      consequence: 'permission request와 allow 뒤 handler·ToolResult·파일 hash가 이어졌다.',
      art: 'permission',
    },
    'external-publish-denied-before-handler': {
      title: '닫힌 외부 문',
      type: 'Constraint',
      question: '외부 게시를 거부했을 때 handler 실행도 실제로 막혔는가?',
      consequence: 'deny와 error ToolResult만 남았고 handler 및 publish count는 0이었다.',
      art: 'denial',
    },
    'memory-saved-after-denial': {
      title: '거부 뒤의 메모리',
      type: 'Recovery',
      question: '한 도구 거부 뒤 허용된 메모리 작업은 계속될 수 있는가?',
      consequence: '같은 턴에서 save_memory가 허용돼 외부 memory artifact를 남겼다.',
      art: 'memory',
    },
    'new-client-resumed-and-loaded-memory': {
      title: '되살아난 세션',
      type: 'Continuity',
      question: '새 client가 같은 session을 재개하고 메모리를 실제 도구로 읽었는가?',
      consequence: '두 번째 init의 session이 같았고 load_memory handler와 ToolResult가 실행됐다.',
      art: 'resume',
    },
    'artifact-state-stable': {
      title: '변하지 않은 증거',
      type: 'Integrity',
      question: '재개 턴 뒤 report와 memory artifact 상태가 유지됐는가?',
      consequence: '두 snapshot의 hash가 같고 external publish count는 계속 0이었다.',
      art: 'integrity',
    },
    'hosting-remote-eval-automatic-learning': {
      title: '아직 가지 않은 길',
      type: 'Unknown',
      question: '이 로컬 MVP가 호스팅·원격 평가·자동 장기학습까지 증명했는가?',
      consequence: '실행하지 않았다. 제품 확장 항목은 추가 관측으로 남긴다.',
      art: 'unknown',
    },
  },
}

const cardMeta = cardMetaByChapter[trace.chapterSlug]
if (!cardMeta) throw new Error(`observation_ordeal_chapter_not_supported: ${trace.chapterSlug}`)

const cards = claimEvents.map((event, index) => {
  const id = stringValue(event?.attributes?.claimId, event.id)
  const meta = cardMeta[id]
  if (!meta) throw new Error(`observation_ordeal_unknown_claim: ${id}`)
  const status = stringValue(event?.attributes?.status, 'additional_observation_required')
  return {
    id,
    sequence: index,
    ...meta,
    status,
    evidenceLevel: stringValue(event.evidenceLevel, 'Missing'),
    sourceSummary: safeText(event.summary),
    sourceRefs: safeRefs(event.sourceRefs),
    cost: status === 'observed' ? index + 1 : status === 'correction_required' ? '!' : '?',
  }
})

const projection = {
  schemaVersion: 'hypnagonia-book-ordeal.v1',
  generatedAt: new Date().toISOString(),
  title: `${trace.title} · Observation Ordeal`,
  subtitle: '실제 Python SDK 사건으로 관찰된 주장과 아직 남은 경계를 구분한다.',
  boundary: 'Hypnagonia의 카드·선택·결과 문법을 빌린 강의용 projection이며 실제 게임 run이나 참가자 데이터가 아니다.',
  source: {
    courseId: trace.courseId,
    chapterSlug: trace.chapterSlug,
    campaignId: stringValue(summary.campaign_id, trace?.recordedRun?.sourceRunId),
    traceId: trace.traceId,
    traceSha256: sha256(traceText),
    summarySha256: sha256(summaryText),
    sourceEventCount: numberValue(summary.source_event_count, trace.events.length),
    publicEventCount: trace.events.length,
    model: Array.isArray(summary.actual_models) ? summary.actual_models[0] : undefined,
    proofGate: summary.proof_gate,
    attemptIds: Array.isArray(summary.source_attempts)
      ? summary.source_attempts.map((attempt) => attempt.attempt_id).filter(Boolean)
      : [],
  },
  ordeal: {
    interpretation: cards.filter((card) => card.status === 'observed').length,
    correction: cards.filter((card) => card.status === 'correction_required').length,
    unresolved: cards.filter((card) => card.status === 'additional_observation_required').length,
    invalidAttempts: Array.isArray(summary.invalid_attempts) ? summary.invalid_attempts.length : 0,
  },
  cards,
}

await fs.mkdir(path.dirname(outputPath), { recursive: true })
await fs.writeFile(outputPath, `${JSON.stringify(projection, null, 2)}\n`)
await verify(outputPath)
if (catalogPath) await updateCatalog(catalogPath, outputPath, projection)

async function verify(file) {
  const text = await fs.readFile(file, 'utf8')
  const value = JSON.parse(text)
  if (value.schemaVersion !== 'hypnagonia-book-ordeal.v1') throw new Error('observation_ordeal_schema_invalid')
  if (value.source?.sourceEventCount <= value.source?.publicEventCount) {
    throw new Error('observation_ordeal_projection_counts_invalid')
  }
  const expectedObserved = value.cards.filter((card) => card.status === 'observed').length
  const expectedCorrection = value.cards.filter(
    (card) => card.status === 'correction_required',
  ).length
  const expectedPending = value.cards.filter(
    (card) => card.status === 'additional_observation_required',
  ).length
  if (value.ordeal?.interpretation !== expectedObserved
    || (value.ordeal?.correction ?? 0) !== expectedCorrection
    || value.ordeal?.unresolved !== expectedPending) {
    throw new Error('observation_ordeal_verdict_counts_invalid')
  }
  if (expectedPending > 0 && !value.cards?.some((card) => card.evidenceLevel === 'Missing')) {
    throw new Error('observation_ordeal_missing_boundary_lost')
  }
  if (/\/Users\/|sk-ant-|AKIA|CLAUDE_CODE_OAUTH_TOKEN|hidden reasoning/i.test(text)) {
    throw new Error('observation_ordeal_private_content_detected')
  }
  process.stdout.write(`Verified ${value.cards.length} Observation Ordeal cards in ${file}\n`)
}

async function updateCatalog(file, evidencePath, value) {
  const catalog = await fs.readFile(file, 'utf8')
    .then((text) => JSON.parse(text))
    .catch(() => ({
      schemaVersion: 'hypnagonia-book-ordeal-catalog.v1',
      title: 'Book SDK Observation Ordeal',
      entries: [],
    }))
  if (catalog.schemaVersion !== 'hypnagonia-book-ordeal-catalog.v1' || !Array.isArray(catalog.entries)) {
    throw new Error('observation_ordeal_catalog_invalid')
  }
  const relativePath = path.relative(path.dirname(file), evidencePath).split(path.sep).join('/')
  const entry = {
    chapterSlug: value.source.chapterSlug,
    title: value.title,
    path: relativePath.startsWith('.') ? relativePath : `./${relativePath}`,
    campaignId: value.source.campaignId,
    model: value.source.model,
    sourceEventCount: value.source.sourceEventCount,
    publicEventCount: value.source.publicEventCount,
    observedClaims: value.ordeal.interpretation,
    correctionRequired: value.ordeal.correction,
    additionalObservationRequired: value.ordeal.unresolved,
    artifactSha256: sha256(await fs.readFile(evidencePath, 'utf8')),
  }
  catalog.entries = catalog.entries
    .filter((candidate) => candidate.chapterSlug !== entry.chapterSlug)
    .concat(entry)
    .sort((left, right) => chapterNumber(left.chapterSlug) - chapterNumber(right.chapterSlug))
  catalog.generatedAt = new Date().toISOString()
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, `${JSON.stringify(catalog, null, 2)}\n`)
}

function chapterNumber(value) {
  return Number(String(value).replace(/^ch/, '')) || Number.MAX_SAFE_INTEGER
}

function safeText(value) {
  return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, 700) : ''
}

function safeRefs(value) {
  return Array.isArray(value)
    ? value.filter((item) => typeof item === 'string').slice(0, 12)
    : []
}

function numberValue(value, fallback) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

function stringValue(...values) {
  return values.find((value) => typeof value === 'string' && value.trim()) || ''
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex')
}

function requiredValue(flag) {
  const value = valueAfter(flag)
  if (!value) throw new Error(`missing_argument: ${flag}`)
  return value
}

function valueAfter(flag) {
  const index = args.indexOf(flag)
  return index >= 0 ? args[index + 1] : undefined
}
