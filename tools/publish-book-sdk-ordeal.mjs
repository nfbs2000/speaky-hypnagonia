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
const traceText = await fs.readFile(tracePath, 'utf8')
const summaryText = await fs.readFile(summaryPath, 'utf8')
const trace = JSON.parse(traceText)
const summary = JSON.parse(summaryText)

const claimEvents = Array.isArray(trace.events)
  ? trace.events.filter((event) => event.eventType === 'assistant.claim')
  : []
if (claimEvents.length !== 6) throw new Error('observation_ordeal_claim_count_invalid')

const cardMeta = {
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
}

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
    cost: status === 'observed' ? index + 1 : '?',
  }
})

const projection = {
  schemaVersion: 'hypnagonia-book-ordeal.v1',
  generatedAt: new Date().toISOString(),
  title: 'Book SDK 4장 · Observation Ordeal',
  subtitle: '도구 동시성, 스트리밍, 인터럽트를 실제 Python SDK 증거로 판정한다.',
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
    unresolved: cards.filter((card) => card.status !== 'observed').length,
    invalidAttempts: Array.isArray(summary.invalid_attempts) ? summary.invalid_attempts.length : 0,
  },
  cards,
}

await fs.mkdir(path.dirname(outputPath), { recursive: true })
await fs.writeFile(outputPath, `${JSON.stringify(projection, null, 2)}\n`)
await verify(outputPath)

async function verify(file) {
  const text = await fs.readFile(file, 'utf8')
  const value = JSON.parse(text)
  if (value.schemaVersion !== 'hypnagonia-book-ordeal.v1') throw new Error('observation_ordeal_schema_invalid')
  if (value.source?.sourceEventCount <= value.source?.publicEventCount) {
    throw new Error('observation_ordeal_projection_counts_invalid')
  }
  if (value.ordeal?.interpretation !== 4 || value.ordeal?.unresolved !== 2) {
    throw new Error('observation_ordeal_verdict_counts_invalid')
  }
  if (!value.cards?.some((card) => card.id === 'interrupt-cancels-handler' && card.status === 'observed')) {
    throw new Error('observation_ordeal_interrupt_card_missing')
  }
  if (!value.cards?.some((card) => card.evidenceLevel === 'Missing')) {
    throw new Error('observation_ordeal_missing_boundary_lost')
  }
  if (/\/Users\/|sk-ant-|AKIA|CLAUDE_CODE_OAUTH_TOKEN|hidden reasoning/i.test(text)) {
    throw new Error('observation_ordeal_private_content_detected')
  }
  process.stdout.write(`Verified ${value.cards.length} Observation Ordeal cards in ${file}\n`)
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
