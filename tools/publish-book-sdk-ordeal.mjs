#!/usr/bin/env node

import { promises as fs } from 'node:fs'
import path from 'node:path'
import {
  chapterOrder,
  numberValue,
  safeRefs,
  safeText,
  sha256,
  stringValue,
} from './book-sdk-ordeal-utils.mjs'
import { ch06CardMeta } from './book-sdk-ordeal-ch06-cards.mjs'
import { ch06bCardMeta } from './book-sdk-ordeal-ch06b-cards.mjs'
import { ch07CardMeta } from './book-sdk-ordeal-ch07-cards.mjs'
import { ch08CardMeta } from './book-sdk-ordeal-ch08-cards.mjs'
import { ch08cCardMeta } from './book-sdk-ordeal-ch08c-cards.mjs'
import { ch08dCardMeta } from './book-sdk-ordeal-ch08d-cards.mjs'
import { ch08eCardMeta } from './book-sdk-ordeal-ch08e-cards.mjs'
import { ch08fCardMeta } from './book-sdk-ordeal-ch08f-cards.mjs'
import { ch09CardMeta } from './book-sdk-ordeal-ch09-cards.mjs'
import { ch10CardMeta } from './book-sdk-ordeal-ch10-cards.mjs'
import { ch11CardMeta } from './book-sdk-ordeal-ch11-cards.mjs'
import { ch12CardMeta } from './book-sdk-ordeal-ch12-cards.mjs'
import { ch13CardMeta } from './book-sdk-ordeal-ch13-cards.mjs'
import { ch14CardMeta } from './book-sdk-ordeal-ch14-cards.mjs'
import { ch15CardMeta } from './book-sdk-ordeal-ch15-cards.mjs'
import { ch16CardMeta } from './book-sdk-ordeal-ch16-cards.mjs'
import { ch17CardMeta } from './book-sdk-ordeal-ch17-cards.mjs'
import { ch17bCardMeta } from './book-sdk-ordeal-ch17b-cards.mjs'
import { ch18CardMeta } from './book-sdk-ordeal-ch18-cards.mjs'
import { ch04bCardMeta } from './book-sdk-ordeal-ch04b-cards.mjs'
import { ch30CardMeta } from './book-sdk-ordeal-ch30-cards.mjs'

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
const citedModels = Array.isArray(summary.actual_models)
  ? [...new Set(summary.actual_models.filter((value) => typeof value === 'string'))]
  : []
const replayModels = Array.isArray(summary.source_attempts)
  ? [...new Set(summary.source_attempts
    .filter((attempt) => attempt?.projection_role === 'replayed')
    .map((attempt) => attempt?.actual_model)
    .filter((value) => typeof value === 'string'))]
  : []

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
  ch03: {
    'persistent-client-preserves-session-context': {
      title: '이어진 선로',
      type: 'Continuity',
      question: '같은 ClaudeSDKClient의 두 turn은 같은 session context를 실제로 이어 가는가?',
      consequence: '같은 session ID가 유지됐고 두 번째 결과가 첫 turn의 controlled nonce를 복원했다.',
      art: 'continuity',
    },
    'init-reemits-per-client-turn': {
      title: '두 번째 출발 신호',
      type: 'Lifecycle',
      question: '같은 client에서는 init이 session 전체에 한 번만 방출되는가?',
      consequence: '두 번째 질의에도 init이 다시 나왔지만 session ID는 같았다.',
      art: 'init',
    },
    'stateless-query-opens-independent-sessions': {
      title: '갈라진 선로',
      type: 'Isolation',
      question: '독립 query 두 번은 이전 context를 자동으로 공유하는가?',
      consequence: '서로 다른 session이 열렸고 두 번째 결과에는 첫 nonce가 없었다.',
      art: 'separation',
    },
    'tool-result-precedes-max-turn-terminal': {
      title: '도구 뒤의 종착점',
      type: 'Terminal',
      question: 'max_turns=1이면 실제 tool result 전에 run이 즉시 끝나는가?',
      consequence: 'handler와 UserMessage tool_result 뒤 error_max_turns, num_turns=2 Result가 닫혔다.',
      art: 'result',
    },
    'five-core-loop-roles-appear-in-tape': {
      title: '다섯 개의 톱니',
      type: 'Lifecycle',
      question: '기본 agent loop의 다섯 역할이 한 evidence tape에 순서대로 나타나는가?',
      consequence: 'System, Stream, Assistant, User, Result 역할이 같은 run에 연결됐다.',
      art: 'lifecycle',
    },
    'five-core-roles-are-not-complete-message-union': {
      title: '여섯 번째 신호',
      type: 'Correction',
      question: '다섯 핵심 역할을 SDK 전체 Message union이라고 불러도 되는가?',
      consequence: '실제 run에 RateLimitEvent도 있었다. 다섯 역할은 전체 목록이 아니므로 책을 수정했다.',
      art: 'correction',
    },
    'hook-surface-is-language-and-version-specific': {
      title: '서로 다른 지도',
      type: 'Correction',
      question: 'Python과 TypeScript의 hook 이름을 하나의 공통 지원 목록으로 써도 되는가?',
      consequence: 'Python 0.2.128은 10종이고 TypeScript 0.3.177은 더 넓어 버전별로 분리했다.',
      art: 'correction',
    },
    'compact-resume-recovery-and-hook-runtime': {
      title: '아직 열지 않은 문',
      type: 'Unknown',
      question: '이번 세 run이 resume, compact, 복구 subtype과 hook runtime까지 증명했는가?',
      consequence: '유도하지 않았다. 별도 순차 live run이 필요하다.',
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
  ch05: {
    'custom-prompt-read-and-recovery-executed': {
      title: '오류를 딛고 읽은 표식',
      type: 'Recovery',
      question: 'custom prompt 실행에서 첫 Read 오류 뒤 실제 cwd를 찾아 같은 run으로 복구했는가?',
      consequence: '오류가 준 cwd로 다시 읽어 marker를 얻었고 ToolResult와 최종 설명까지 이어졌다.',
      art: 'recovery',
    },
    'preset-append-read-executed': {
      title: '기본 지도 위의 덧붙임',
      type: 'Configuration',
      question: 'Claude Code preset과 append policy가 설정에만 머물지 않고 실제 Read 실행으로 이어졌는가?',
      consequence: 'configured 입력, Opus 5 init, Read, ToolResult, 최종 답변과 성공 Result가 순서대로 남았다.',
      art: 'init',
    },
    'exclude-dynamic-option-executed-not-inspected': {
      title: '설정 뒤의 안개',
      type: 'Boundary',
      question: 'exclude_dynamic_sections 실행 성공이 내부 prompt 재배치까지 보았다는 뜻인가?',
      consequence: '옵션과 성공 run만 관찰했다. 내부 prompt 이동은 이번 증거에서 보이지 않는다.',
      art: 'unknown',
    },
    'init-exposes-runtime-surface-not-prompt-body': {
      title: '창문에 비친 제어면',
      type: 'Boundary',
      question: 'SDK init은 조립된 system prompt 전문을 공개하는가, 실행 표면만 공개하는가?',
      consequence: 'cwd, model, permission, tools, skills, plugins, MCP, agents는 보였지만 prompt 전문은 없었다.',
      art: 'init',
    },
    'read-result-precedes-final-claim': {
      title: '근거가 먼저인 답변',
      type: 'Ordering',
      question: 'marker를 말한 최종 답변보다 실제 Read와 matching ToolResult가 먼저였는가?',
      consequence: '세 case 모두 성공한 Read와 ToolResult 뒤에 marker를 인용한 최종 답변이 나타났다.',
      art: 'result',
    },
    'setting-sources-is-not-skills-off': {
      title: '남아 있던 열여섯 기술',
      type: 'Separation',
      question: 'setting_sources=[]이면 skill도 함께 꺼진다고 볼 수 있는가?',
      consequence: '세 init에 16개 skill이 남았다. filesystem settings 격리와 skills=[]는 별도 제어다.',
      art: 'separation',
    },
    'prompt-contracts-are-language-version-specific': {
      title: '서로 다른 두 계약',
      type: 'Version',
      question: 'Python과 TypeScript SDK의 system prompt 입력 계약을 같은 목록으로 설명해도 되는가?',
      consequence: 'TypeScript 0.3.177과 Python 0.2.128의 공개 타입과 옵션 이름이 서로 달랐다.',
      art: 'separation',
    },
    'primary-model-is-not-only-provider-usage': {
      title: '하나의 주연, 두 모델',
      type: 'Correction',
      question: 'primary assistant가 Opus 5였으니 provider 사용도 전부 Opus뿐이었다고 써도 되는가?',
      consequence: '두 preset Result에 Haiku 4.5 보조 사용이 남아 있어 책의 표현을 교정했다.',
      art: 'correction',
    },
    'dynamic-section-relocation-and-cache-effect': {
      title: '보이지 않은 재배치',
      type: 'Unknown',
      question: 'exclude option이 dynamic section을 옮기고 cache를 개선한 과정까지 직접 관찰했는가?',
      consequence: '조립 전후 prompt와 반복 cache 비교가 없어 아직 관찰되지 않았다.',
      art: 'unknown',
    },
    'typescript-array-boundary-live-run': {
      title: '타입에만 그어진 경계',
      type: 'Unknown',
      question: 'TypeScript의 string array와 dynamic boundary가 실제 live run에서도 확인됐는가?',
      consequence: '정적 타입 계약만 확인했다. TypeScript SDK의 실제 evidence tape가 더 필요하다.',
      art: 'unknown',
    },
    'prompt-causes-read-and-preset-improves-cwd': {
      title: '인과를 묻는 대조군',
      type: 'Unknown',
      question: 'prompt가 Read의 유일 원인이고 preset이 항상 cwd를 개선한다고 단정할 수 있는가?',
      consequence: '정책 제거 대조군과 반복 표본이 없어 일반적 인과는 아직 주장하지 않는다.',
      art: 'unknown',
    },
  },
  ch06: ch06CardMeta,
  ch06b: ch06bCardMeta,
  ch07: ch07CardMeta,
  ch08: ch08CardMeta,
  ch08c: ch08cCardMeta,
  ch08d: ch08dCardMeta,
  ch08e: ch08eCardMeta,
  ch08f: ch08fCardMeta,
  ch09: ch09CardMeta,
  ch10: ch10CardMeta,
  ch11: ch11CardMeta,
  ch12: ch12CardMeta,
  ch13: ch13CardMeta,
  ch14: ch14CardMeta,
  ch15: ch15CardMeta,
  ch16: ch16CardMeta,
  ch17: ch17CardMeta,
  ch17b: ch17bCardMeta,
  ch18: ch18CardMeta,
  ch04b: ch04bCardMeta,
  ch30: ch30CardMeta,
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
    cost: status === 'observed'
      ? index + 1
      : status === 'configured'
        ? 'C'
        : status === 'inferred'
          ? 'I'
          : status === 'correction_required'
            ? '!'
            : '?',
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
    model: replayModels[0] || citedModels[0],
    replayModels,
    citedModels,
    proofGate: summary.proof_gate,
    attemptIds: Array.isArray(summary.source_attempts)
      ? summary.source_attempts.map((attempt) => attempt.attempt_id).filter(Boolean)
      : [],
  },
  ordeal: {
    configured: cards.filter((card) => card.status === 'configured').length,
    interpretation: cards.filter((card) => card.status === 'observed').length,
    inferred: cards.filter((card) => card.status === 'inferred').length,
    notObserved: cards.filter((card) => card.status === 'not_observed').length,
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
  if (value.source?.sourceEventCount <= 0 || value.source?.publicEventCount <= 0) {
    throw new Error('observation_ordeal_projection_counts_invalid')
  }
  const expectedConfigured = value.cards.filter((card) => card.status === 'configured').length
  const expectedObserved = value.cards.filter((card) => card.status === 'observed').length
  const expectedInferred = value.cards.filter((card) => card.status === 'inferred').length
  const expectedNotObserved = value.cards.filter((card) => card.status === 'not_observed').length
  const expectedCorrection = value.cards.filter(
    (card) => card.status === 'correction_required',
  ).length
  const expectedPending = value.cards.filter(
    (card) => card.status === 'additional_observation_required',
  ).length
  if (value.ordeal?.configured !== expectedConfigured
    || value.ordeal?.interpretation !== expectedObserved
    || value.ordeal?.inferred !== expectedInferred
    || value.ordeal?.notObserved !== expectedNotObserved
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
    configuredClaims: value.ordeal.configured,
    observedClaims: value.ordeal.interpretation,
    inferredClaims: value.ordeal.inferred,
    notObservedClaims: value.ordeal.notObserved,
    correctionRequired: value.ordeal.correction,
    additionalObservationRequired: value.ordeal.unresolved,
    artifactSha256: sha256(await fs.readFile(evidencePath, 'utf8')),
  }
  catalog.entries = catalog.entries
    .filter((candidate) => candidate.chapterSlug !== entry.chapterSlug)
    .concat(entry)
    .sort((left, right) => chapterOrder(left.chapterSlug).localeCompare(chapterOrder(right.chapterSlug)))
  catalog.generatedAt = new Date().toISOString()
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, `${JSON.stringify(catalog, null, 2)}\n`)
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
