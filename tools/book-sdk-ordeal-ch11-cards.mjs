export const ch11CardMeta = {
  'attempt-integrity-files-match': {
    title: '일곱 기록의 봉인', type: 'Integrity',
    question: 'CH11 원본 증거 파일의 hash가 수집 당시 값과 일치하는가?',
    consequence: 'manifest, verdict, raw 4종, OTel의 SHA-256 7개가 모두 일치했다.', art: 'integrity',
  },
  'one-session-three-sequential-phases': {
    title: '세 번 열린 같은 문', type: 'Continuity',
    question: 'ALPHA, BETA, final phase가 같은 session에서 순차 실행됐는가?',
    consequence: '세 init은 같은 session ID였고 manual compact 없이 동시성 1로 실행됐다.', art: 'continuity',
  },
  'large-payload-tool-chains-and-text-lengths': {
    title: '두 대형 화물', type: 'Evidence',
    question: '두 MCP payload는 실제 ToolUse/ToolResult로 전달됐는가?',
    consequence: '15/18과 45/50이 연결됐고 실제 text는 24,088/24,085자였다.', art: 'result',
  },
  'recorder-archive-retains-both-payloads': {
    title: '보관 창고의 원문', type: 'Archive',
    question: 'recorder raw archive는 두 payload를 온전히 남겼는가?',
    consequence: '152,378-byte SDK tape에 두 payload와 marker가 보존됐다.', art: 'memory',
  },
  'no-direct-compact-or-micro-pruning-event': {
    title: '울리지 않은 경계 신호', type: 'Boundary',
    question: '이번 stream에 compact 또는 micro-pruning 직접 사건이 있었는가?',
    consequence: 'system event는 init/status뿐이며 direct pruning event는 0건이다.', art: 'unknown',
  },
  'final-tool-lane-empty-and-four-markers-output': {
    title: '도구 없는 마지막 회상', type: 'Recall',
    question: 'final turn은 재호출 없이 네 marker를 출력했는가?',
    consequence: 'final tool lane은 비어 있었고 seq 75/79가 네 marker를 출력했다.', art: 'memory',
  },
  'final-answer-omits-large-filler': {
    title: '말하지 않은 사십팔 킬로바이트', type: 'Output',
    question: 'final answer는 large filler를 그대로 다시 출력했는가?',
    consequence: 'marker와 판정만 답하고 약 48KB filler는 출력에서 생략했다.', art: 'result',
  },
  'three-success-results-and-usage-recorded': {
    title: '세 장의 성공 영수증', type: 'Receipt',
    question: '세 query의 terminal Result와 usage가 모두 남았는가?',
    consequence: '30/60/79는 success이며 query usage와 누적 model usage를 기록했다.', art: 'result',
  },
  'raw-and-otel-sequences-align': {
    title: '겹쳐진 일흔두 사건', type: 'Telemetry',
    question: 'raw SDK와 OTel projection의 sequence가 일치하는가?',
    consequence: '72개 sequence가 일치하고 86개 span은 한 trace에 속한다.', art: 'integrity',
  },
  'python-repr-length-is-not-payload-length': {
    title: '서른네 글자의 착시', type: 'Correction',
    question: '24,122/24,119를 실제 tool text 길이로 써도 되는가?',
    consequence: 'Python wrapper repr 길이였고 실제 text는 각각 34자 더 짧았다.', art: 'correction',
  },
  'raw-archive-retention-is-not-active-context-retention': {
    title: '창고와 적재함의 차이', type: 'Correction',
    question: 'raw archive의 보존이 final provider context 보존을 증명하는가?',
    consequence: 'recorder 보관과 모델 활성 context는 다른 층이므로 소급할 수 없다.', art: 'correction',
  },
  'marker-recall-is-confounded-by-assistant-summaries': {
    title: '두 번 적힌 표식', type: 'Correction',
    question: 'final marker 회상이 large payload 전체의 보존을 증명하는가?',
    consequence: 'marker가 seq 26/56에도 있어 final provenance가 혼재한다.', art: 'correction',
  },
  'answer-omission-is-not-pruning': {
    title: '침묵은 삭제가 아니다', type: 'Correction',
    question: '답변에서 filler를 생략하면 runtime pruning이 일어난 것인가?',
    consequence: 'output selection만 관찰됐고 pruning 직접 사건은 없었다.', art: 'correction',
  },
  'usage-numbers-do-not-name-an-algorithm': {
    title: '숫자에 붙일 수 없는 이름', type: 'Correction',
    question: 'cache/token 변화만으로 cache_edits 실행을 확정할 수 있는가?',
    consequence: '수치는 관찰됐지만 원인 알고리즘은 식별되지 않았다.', art: 'correction',
  },
  'event-absence-is-not-mechanism-impossibility': {
    title: '보이지 않음과 없음', type: 'Correction',
    question: 'direct event가 없으면 내부 mechanism도 절대 없는가?',
    consequence: '현재 workload와 event surface에서 비관찰됐다는 뜻만 허용된다.', art: 'correction',
  },
  'messages-api-context-editing-is-not-agent-sdk-proof': {
    title: '서로 다른 API의 문', type: 'Correction',
    question: 'Messages API context editing을 Agent SDK 실행 증거로 써도 되는가?',
    consequence: 'API family가 다르므로 각각 별도 runtime evidence가 필요하다.', art: 'correction',
  },
  'dedicated-boundary-class-is-not-current-python-type': {
    title: '없는 전용 클래스', type: 'Correction',
    question: 'SDKCompactBoundaryMessage가 Python 0.2.128의 현재 타입인가?',
    consequence: 'export되지 않으므로 generic SystemMessage payload를 읽어야 한다.', art: 'correction',
  },
  'primary-opus-is-not-only-provider-usage': {
    title: '주연 뒤의 보조 모델', type: 'Correction',
    question: 'primary Opus를 전체 provider 사용 모델 하나로 표시해도 되는가?',
    consequence: 'terminal model_usage에는 Haiku 4.5 항목도 있었다.', art: 'correction',
  },
  'captured-is-not-claim-pass': {
    title: '수집과 합격의 간격', type: 'Correction',
    question: 'CAPTURED와 assertion 0이 micro-compaction 판정 통과를 뜻하는가?',
    consequence: 'verdict TODO와 passed null인 수집 완료 표식일 뿐이다.', art: 'correction',
  },
  'otel-is-not-independent-provider-proof': {
    title: '같은 기록의 두 번째 그림자', type: 'Correction',
    question: 'recorder OTel을 독립 provider 관측기로 취급할 수 있는가?',
    consequence: '같은 recorder가 raw와 host 사건을 투영한 trace다.', art: 'correction',
  },
  'probe-runtime-source-is-not-provenance-bound': {
    title: '봉인되지 않은 실행 코드', type: 'Correction',
    question: 'attempt가 exact probe/case/runtime code hash를 모두 묶었는가?',
    consequence: '장과 prompt hash만 있어 실행 코드 동일성은 증명되지 않았다.', art: 'correction',
  },
  'unrepeated-nonce-retention-not-observed': {
    title: '아직 숨기지 않은 nonce', type: 'Unknown',
    question: '중간 답변에 반복되지 않은 표식을 final이 찾는 실험을 했는가?',
    consequence: '현재 marker는 중간 답변에도 있어 새 controlled attempt가 필요하다.', art: 'unknown',
  },
  'direct-agent-sdk-micro-pruning-surface-not-observed': {
    title: '열리지 않은 micro 사건', type: 'Unknown',
    question: 'Agent SDK가 direct micro-pruning event를 실제 방출했는가?',
    consequence: '현재 option과 event surface에서는 관찰되지 않았다.', art: 'unknown',
  },
  'post-clearing-reacquisition-not-observed': {
    title: '아직 없는 재획득', type: 'Unknown',
    question: '알려진 clearing 뒤 tool을 다시 호출해 근거를 회수했는가?',
    consequence: 'clearing 자체가 직접 관찰되지 않아 재획득 chain도 남지 않았다.', art: 'unknown',
  },
  'time-based-idle-pruning-not-observed': {
    title: '기다리지 않은 긴 밤', type: 'Unknown',
    question: '긴 idle 뒤 time-based pruning을 관찰했는가?',
    consequence: '이번 짧은 run은 idle threshold를 시험하지 않았다.', art: 'unknown',
  },
  'messages-api-context-editing-live-run-not-observed': {
    title: '다른 API의 미실행 실험', type: 'Unknown',
    question: 'Messages API applied_edits를 실제 controlled run으로 수집했는가?',
    consequence: '공식 문서는 확인했지만 별도 live evidence는 아직 없다.', art: 'unknown',
  },
  'full-source-provenance-not-observed': {
    title: '완성되지 않은 출처 봉인', type: 'Unknown',
    question: '장과 모든 실행 코드 hash를 하나의 manifest로 봉인했는가?',
    consequence: '다음 capture는 chapter/probe/case/runtime hash를 모두 저장해야 한다.', art: 'unknown',
  },
}
