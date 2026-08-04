import { createHash } from 'node:crypto'

export function chapterOrder(value) {
  const match = /^ch(\d+)([a-z]*)$/i.exec(String(value))
  if (!match) return `${String(Number.MAX_SAFE_INTEGER).padStart(12, '0')}:${String(value)}`
  return `${match[1].padStart(12, '0')}:${match[2].toLowerCase()}`
}

export function safeText(value) {
  return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, 700) : ''
}

export function safeRefs(value) {
  return Array.isArray(value)
    ? value.filter((item) => typeof item === 'string').slice(0, 12)
    : []
}

export function numberValue(value, fallback) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

export function stringValue(...values) {
  return values.find((value) => typeof value === 'string' && value.trim()) || ''
}

export function sha256(value) {
  return createHash('sha256').update(value).digest('hex')
}
