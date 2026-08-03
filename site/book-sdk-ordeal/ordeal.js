const shell = document.querySelector('.ordeal-shell')
const cardList = document.getElementById('card-list')
const inspection = document.querySelector('.inspection')
const chapterSelect = document.getElementById('chapter')

let selectedEntry = null

try {
  const catalogResponse = await fetch('./catalog.json', { cache: 'no-store' })
  if (!catalogResponse.ok) throw new Error(`ordeal_catalog_http_${catalogResponse.status}`)
  const catalog = await catalogResponse.json()
  if (catalog.schemaVersion !== 'hypnagonia-book-ordeal-catalog.v1' || !catalog.entries?.length) {
    throw new Error('ordeal_catalog_contract_invalid')
  }
  const requested = new URLSearchParams(window.location.search).get('chapter')
  selectedEntry = catalog.entries.find((entry) => entry.chapterSlug === requested) || catalog.entries[0]
  chapterSelect.replaceChildren(...catalog.entries.map((entry) => {
    const option = document.createElement('option')
    option.value = entry.chapterSlug
    option.textContent = `${entry.chapterSlug.toUpperCase()} · ${entry.title}`
    return option
  }))
  chapterSelect.value = selectedEntry.chapterSlug
  chapterSelect.addEventListener('change', () => {
    const params = new URLSearchParams(window.location.search)
    params.set('chapter', chapterSelect.value)
    window.location.assign(`${window.location.pathname}?${params}`)
  })

  const response = await fetch(selectedEntry.path, { cache: 'no-store' })
  if (!response.ok) throw new Error(`ordeal_evidence_http_${response.status}`)
  const evidence = await response.json()
  if (evidence.schemaVersion !== 'hypnagonia-book-ordeal.v1' || !evidence.cards?.length) {
    throw new Error('ordeal_evidence_contract_invalid')
  }
  initialize(evidence)
} catch (error) {
  console.error(error)
  shell.dataset.state = 'error'
  document.getElementById('load-error').hidden = false
}

function initialize(evidence) {
  shell.dataset.state = 'ready'
  document.title = `${evidence.title} · Hypnagonia`
  document.getElementById('chapter-eyebrow').textContent = `RECORDED EVIDENCE · ${evidence.source.chapterSlug.toUpperCase()}`
  document.getElementById('source-json').href = selectedEntry.path
  document.getElementById('book-link').href = bookUrl(evidence.source.chapterSlug)
  document.getElementById('book-link').textContent = `공개 책 ${evidence.source.chapterSlug.toUpperCase()} 읽기`
  document.getElementById('title').textContent = evidence.title
  document.getElementById('subtitle').textContent = evidence.subtitle
  document.getElementById('boundary').textContent = evidence.boundary
  document.getElementById('model').textContent = evidence.source.model || 'not recorded'
  document.getElementById('raw-count').textContent = evidence.source.sourceEventCount
  document.getElementById('public-count').textContent = evidence.source.publicEventCount
  document.getElementById('proof-gate').textContent = evidence.source.proofGate
  document.getElementById('resolved').textContent = evidence.ordeal.interpretation
  document.getElementById('unresolved').textContent = evidence.ordeal.unresolved
  document.getElementById('resolve-fill').style.width = `${(evidence.ordeal.interpretation / evidence.cards.length) * 100}%`

  const cards = evidence.cards.map((card) => cardElement(card, evidence))
  cardList.replaceChildren(...cards)
  selectCard(evidence.cards[0], cards[0])

  window.__bookSdkObservationOrdeal = {
    getState: () => ({
      schemaVersion: evidence.schemaVersion,
      chapterSlug: evidence.source.chapterSlug,
      campaignId: evidence.source.campaignId,
      sourceEventCount: evidence.source.sourceEventCount,
      publicEventCount: evidence.source.publicEventCount,
      observed: evidence.ordeal.interpretation,
      additionalObservationRequired: evidence.ordeal.unresolved,
      selectedCardId: cardList.querySelector('[data-active="true"]')?.dataset.cardId,
    }),
    select: (id) => {
      const index = evidence.cards.findIndex((card) => card.id === id)
      if (index >= 0) selectCard(evidence.cards[index], cards[index])
    },
  }
}

function bookUrl(chapterSlug) {
  const part = chapterSlug === 'ch30' ? 'part7' : 'part1'
  return `https://nfbs2000.github.io/speaky-claude-cookbooks/book/${part}/${chapterSlug}/`
}

function cardElement(card, evidence) {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'proof-card'
  button.dataset.cardId = card.id
  button.dataset.status = card.status
  button.dataset.active = 'false'
  button.innerHTML = `
    <div class="proof-card__head">
      <span>${escapeHtml(card.type)}</span>
      <em>${card.status === 'observed' ? 'OBSERVED' : 'MORE EVIDENCE'}</em>
    </div>
    <div>
      <h3>${escapeHtml(card.title)}</h3>
      <p>${escapeHtml(card.question)}</p>
    </div>
    <div class="proof-card__foot">
      <span>COST ${escapeHtml(card.cost)}</span>
      <span>${String(card.sequence + 1).padStart(2, '0')} / ${String(evidence.cards.length).padStart(2, '0')}</span>
    </div>
  `
  button.addEventListener('click', () => selectCard(card, button))
  return button
}

function selectCard(card, element) {
  for (const candidate of cardList.querySelectorAll('.proof-card')) {
    candidate.dataset.active = String(candidate === element)
  }
  inspection.dataset.status = card.status
  document.getElementById('card-type').textContent = card.type.toUpperCase()
  document.getElementById('card-status').textContent = card.status === 'observed'
    ? 'OBSERVED'
    : 'ADDITIONAL OBSERVATION REQUIRED'
  document.getElementById('card-title').textContent = card.title
  document.getElementById('card-question').textContent = card.question
  document.getElementById('card-consequence').textContent = card.consequence
  document.getElementById('card-source-summary').textContent = card.sourceSummary
  document.getElementById('card-source-ref').textContent = card.sourceRefs[0] || '-'
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}
