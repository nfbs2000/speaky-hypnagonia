export const ch19CardMeta = {
  'setting-source-surface-configured': {
    title: '세 가지 지침 원천', type: 'SDK contract',
    question: '현재 Python SDK가 user, project, local source와 None, 빈 목록을 실제로 구분하는가?',
    consequence: '0.2.128 타입과 문서는 None, [], 선택 source list를 서로 다른 계약으로 선언한다.', art: 'configuration',
  },
  'controlled-pair-configured': {
    title: '하나만 바꾼 두 실행', type: 'Configuration',
    question: '두 실행에서 project source 외의 파일, 모델, 도구와 prompt 조건이 고정됐는가?',
    consequence: '같은 marker fixture와 Opus 5, 단일 Read surface에서 source list만 갈랐다.', art: 'configuration',
  },
  'safe-readonly-prompt-configured': {
    title: '작은 임시 작업실', type: 'Safety scope',
    question: '실험이 보안 우회가 아니라 임시 workspace의 읽기 전용 marker 과업으로 제한됐는가?',
    consequence: 'network, 권한 상승, 외부 경로와 파일 쓰기를 요청하지 않는 공개 prompt 계약을 고정했다.', art: 'boundary',
  },
  'assistant-messages-used-opus5': {
    title: '세 번의 Opus 영수증', type: 'Model receipt',
    question: '요청 모델이 아니라 실제 AssistantMessage가 모두 Opus 5였는가?',
    consequence: 'empty 1건과 project 2건의 model 필드가 모두 claude-opus-5였다.', art: 'result',
  },
  'instruction-files-identical': {
    title: '같은 두 문서', type: 'Host evidence',
    question: '두 workspace의 CLAUDE.md와 evidence marker가 정말 같은 입력이었는가?',
    consequence: 'host record의 길이와 두 파일 SHA-256이 pair 사이에서 일치했다.', art: 'integrity',
  },
  'empty-memory-files-remained-empty': {
    title: '비어 있는 기억 목록', type: 'Context inventory',
    question: 'setting_sources=[]에서 query 전후 memoryFiles가 계속 비어 있었는가?',
    consequence: 'sequence 2와 15 모두 빈 배열이어서 디스크 파일이 context에 들어오지 않았다.', art: 'separation',
  },
  'project-memory-file-loaded-before-query': {
    title: '질문 전 열린 지침', type: 'Context inventory',
    question: 'project source에서는 모델 질의 전부터 CLAUDE.md가 inventory에 나타났는가?',
    consequence: 'sequence 2부터 Project 유형 149 tokens가 보였고 응답 뒤에도 유지됐다.', art: 'continuity',
  },
  'empty-source-used-no-tool': {
    title: '읽지 않은 대조군', type: 'Execution',
    question: 'source를 끈 실행이 지침 marker 파일을 읽는 도구 행동을 만들었는가?',
    consequence: 'ToolUse와 ToolResult가 0건이고 NO_PROJECT_INSTRUCTION으로 끝났다.', art: 'separation',
  },
  'project-source-read-once': {
    title: '정확히 한 번의 Read', type: 'Tool execution',
    question: 'project 지침이 요구한 경로를 실제 Read가 정확히 한 번 열었는가?',
    consequence: 'sequence 12의 유일한 Read가 docs/evidence.txt를 대상으로 했다.', art: 'tool',
  },
  'project-tool-result-contained-marker': {
    title: '도구가 돌려준 표식', type: 'Tool receipt',
    question: '모델 서술이 아니라 연결된 ToolResult에 marker가 존재하는가?',
    consequence: 'sequence 14 ToolResult가 sequence 12의 ID와 연결되어 정확한 marker를 반환했다.', art: 'result',
  },
  'terminal-results-followed-source-boundary': {
    title: '갈라진 두 종착점', type: 'Terminal result',
    question: '두 terminal Result가 source 경계에 맞는 서로 다른 결과를 남겼는가?',
    consequence: 'empty는 NO_PROJECT_INSTRUCTION, project는 PROJECT_INSTRUCTION_APPLIED로 성공 종료했다.', art: 'result',
  },
  'hook-event-messages-absent': {
    title: '울리지 않은 훅', type: 'Negative observation',
    question: 'include_hook_events를 켰다는 이유로 instruction load 훅을 봤다고 말할 수 있는가?',
    consequence: '두 attempt의 HookEventMessage는 0건이었다.', art: 'unknown',
  },
  'current-cli-221-observed': {
    title: '현재 버전의 날짜표', type: 'Version receipt',
    question: '이번 결과를 어느 CLI와 Python SDK 버전에 귀속할 수 있는가?',
    consequence: 'manifest와 init이 Claude Code 2.1.221, Agent SDK 0.2.128을 기록했다.', art: 'receipt',
  },
  'attempt-integrity-files-match': {
    title: '열네 개의 봉인', type: 'Integrity',
    question: '두 attempt의 raw, process, callback과 OTel 파일 hash가 선언값과 일치하는가?',
    consequence: '각 7개 evidence file의 SHA-256을 다시 계산해 모두 일치시켰다.', art: 'integrity',
  },
  'raw-and-otel-sequences-align': {
    title: '사건과 그림자의 정렬', type: 'Telemetry',
    question: 'OTel projection이 raw recorder의 sequence와 type을 보존했는가?',
    consequence: 'empty 19 spans, project 31 spans가 각각 한 trace에서 source sequence와 정렬됐다.', art: 'telemetry',
  },
  'auxiliary-haiku-usage-recorded': {
    title: 'Opus 뒤의 보조 사용량', type: 'Usage boundary',
    question: '사용자 응답 모델과 provider run 전체 model usage가 같은가?',
    consequence: 'AssistantMessage는 Opus였지만 두 Result usage에는 Haiku key도 있었다.', art: 'result',
  },
  'project-source-caused-pair-difference': {
    title: '통제 pair의 원인 해석', type: 'Inference',
    question: 'inventory와 행동 차이를 이 pair에서 project source 효과로 해석할 수 있는가?',
    consequence: '의도적으로 바꾼 한 변수와 두 증거층이 인과 해석을 지지하지만 전체 source 조합으로 일반화하지 않는다.', art: 'inference',
  },
  'host-file-presence-is-not-load-proof': {
    title: '존재는 로드가 아니다', type: 'Correction',
    question: 'CLAUDE.md가 디스크에 있다는 사실만으로 context load를 확정해도 되는가?',
    consequence: 'empty pair에는 같은 파일이 있었지만 memoryFiles는 비어 있었다.', art: 'correction',
  },
  'model-self-report-is-not-load-proof': {
    title: '자기보고보다 inventory', type: 'Correction',
    question: '모델이 지침을 읽었다고 말하면 load 증명이 끝나는가?',
    consequence: 'memoryFiles와 실제 ToolUse/Result를 우선하도록 판정 기준을 수정했다.', art: 'correction',
  },
  'init-model-is-not-response-model-proof': {
    title: 'init은 응답 영수증이 아니다', type: 'Correction',
    question: 'System init.model만으로 실제 응답 모델을 확정할 수 있는가?',
    consequence: 'fallback을 놓치지 않도록 모든 AssistantMessage.model의 단일성을 사용했다.', art: 'correction',
  },
  'context-usage-model-is-not-response-model-proof': {
    title: 'context 모델의 좁은 뜻', type: 'Correction',
    question: 'get_context_usage().model이 사용자에게 응답한 메시지 모델을 증명하는가?',
    consequence: 'context 계산 대상과 actual response model을 분리했다.', art: 'correction',
  },
  'opus-response-is-not-opus-only-provider-run': {
    title: 'Opus 응답과 전체 run', type: 'Correction',
    question: '모든 AssistantMessage가 Opus면 provider도 Opus만 사용했다고 말할 수 있는가?',
    consequence: 'Result의 Haiku 보조 사용량 때문에 그 확대를 금지했다.', art: 'correction',
  },
  'memory-files-is-not-security-boundary': {
    title: '기억 목록은 성벽이 아니다', type: 'Correction',
    question: 'memoryFiles에 지침이 보이면 도구 실행까지 강제된 것인가?',
    consequence: 'context load와 permission, hook, sandbox 강제를 분리했다.', art: 'correction',
  },
  'instructions-loaded-is-not-current-hook': {
    title: '없는 InstructionsLoaded', type: 'Correction',
    question: 'InstructionsLoaded가 Python SDK 0.2.128 HookEvent인가?',
    consequence: '현재 10종 literal에도 이번 stream에도 없으므로 기존 설명을 제거했다.', art: 'correction',
  },
  'config-change-is-not-current-hook': {
    title: '없는 ConfigChange', type: 'Correction',
    question: 'ConfigChange가 현재 Python SDK의 관찰 가능한 HookEvent인가?',
    consequence: '현재 literal과 live stream 모두 지지하지 않아 hook 표면에서 제외했다.', art: 'correction',
  },
  'file-changed-is-not-current-hook': {
    title: '없는 FileChanged', type: 'Correction',
    question: 'FileChanged가 현재 Python SDK의 instruction 추적 훅인가?',
    consequence: '현재 공개 타입과 두 실행에 없으므로 실제 event처럼 가르치지 않는다.', art: 'correction',
  },
  'none-and-empty-setting-sources-differ': {
    title: 'None과 빈 목록의 갈림길', type: 'Correction',
    question: 'setting_sources=None과 []를 같은 기본값으로 설명해도 되는가?',
    consequence: '문서상 None은 CLI 기본 source, []는 filesystem source 비활성이다.', art: 'correction',
  },
  'otel-is-not-independent-runtime-proof': {
    title: '독립 증거가 아닌 투영', type: 'Correction',
    question: 'raw와 OTel 일치를 독립 provider 두 곳의 교차 검증으로 부를 수 있는가?',
    consequence: '같은 AttemptRecorder의 projection 정합성으로 범위를 좁혔다.', art: 'correction',
  },
  'full-source-precedence-not-observed': {
    title: '열지 않은 전체 우선순위', type: 'Unknown',
    question: 'managed, user, project, local 충돌 순서를 실제로 실행했는가?',
    consequence: '이번 pair는 []와 project만 비교했으므로 전체 계층은 미관찰이다.', art: 'unknown',
  },
  'include-resolution-not-observed': {
    title: '열지 않은 include 문', type: 'Unknown',
    question: '@include의 누락, 재귀와 순환 규칙을 실제로 유도했는가?',
    consequence: '해당 fixture를 만들지 않아 다음 실험으로 남겼다.', art: 'unknown',
  },
  'path-frontmatter-not-observed': {
    title: '시험하지 않은 path 범위', type: 'Unknown',
    question: 'frontmatter paths의 일치와 불일치 행동을 비교했는가?',
    consequence: '이번 marker 파일에는 path-scoped rule이 없었다.', art: 'unknown',
  },
  'html-comment-processing-not-observed': {
    title: '주석 뒤의 미지', type: 'Unknown',
    question: 'HTML comment 안팎의 instruction 처리 차이를 관찰했는가?',
    consequence: '상반 marker fixture를 실행하지 않아 결론을 보류했다.', art: 'unknown',
  },
  'size-budget-not-observed': {
    title: '측정하지 않은 크기 경계', type: 'Unknown',
    question: '40K 또는 다른 instruction size 경계 전후를 실행했는가?',
    consequence: '작은 306자 문서만 사용했으므로 size budget은 미관찰이다.', art: 'unknown',
  },
  'runtime-file-change-not-observed': {
    title: '바꾸지 않은 실행 중 파일', type: 'Unknown',
    question: '같은 client session에서 CLAUDE.md 변경 전후를 비교했는가?',
    consequence: '각 attempt는 고정 파일의 단일 turn이어서 갱신 추적을 말할 수 없다.', art: 'unknown',
  },
  'claude-rules-traversal-not-observed': {
    title: '걷지 않은 rules 나무', type: 'Unknown',
    question: '.claude/rules 하위 순회와 경로별 적용을 실행했는가?',
    consequence: 'CLAUDE.md 한 파일만 사용해 rules traversal은 미관찰이다.', art: 'unknown',
  },
  'default-none-behavior-not-observed': {
    title: '실행하지 않은 None', type: 'Unknown',
    question: '문서가 말하는 setting_sources=None 기본 동작을 live로 확인했는가?',
    consequence: '이번 pair에는 None case가 없으므로 문서상 구성과 live 관찰을 구분했다.', art: 'unknown',
  },
  'skills-source-interaction-not-observed': {
    title: '닫아 둔 skills 경로', type: 'Unknown',
    question: 'skills option이 source와 tool 기본을 어떻게 보강하는지 실험했는가?',
    consequence: 'skills=None으로 고정했으므로 상호작용은 미관찰이다.', art: 'unknown',
  },
  'precedence-matrix-required': {
    title: '다음의 우선순위 대결', type: 'Next experiment',
    question: '전체 source 충돌 우선순위를 어떻게 실제 증거로 만들 것인가?',
    consequence: 'source마다 상반 marker를 격리한 절대 순차 matrix가 필요하다.', art: 'unknown',
  },
  'instruction-feature-matrix-required': {
    title: '지침 기능의 다음 지도', type: 'Next experiment',
    question: 'include, paths, comment, size와 rules를 한 실험에 섞어도 되는가?',
    consequence: '각 기능을 한 변수씩 바꾼 별도 temp fixture가 필요하다.', art: 'unknown',
  },
  'session-change-tracking-required': {
    title: '같은 세션의 전후 사진', type: 'Next experiment',
    question: '실행 중 지침 변경 추적을 무엇으로 증명할 것인가?',
    consequence: '같은 client의 query 사이에 파일을 바꾸고 memoryFiles와 marker를 전후 수집해야 한다.', art: 'unknown',
  },
  'none-and-skills-live-cases-required': {
    title: '기본값과 skills의 다음 pair', type: 'Next experiment',
    question: 'None 기본과 skills 자동 구성을 문서 설명만으로 확정할 수 있는가?',
    consequence: '각 옵션의 memory inventory와 tool listing을 분리한 live case가 필요하다.', art: 'unknown',
  },
  'context-usage-unavailable-path-required': {
    title: 'inventory가 없을 때의 길', type: 'Compatibility TODO',
    question: 'get_context_usage가 없거나 실패하는 CLI에서는 무엇을 load 증거로 쓸 것인가?',
    consequence: '행동 증거 fallback의 한계를 별도 호환성 case에서 검증해야 한다.', art: 'unknown',
  },
}
