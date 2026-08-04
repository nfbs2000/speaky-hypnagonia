export const ch18CardMeta = {
  'hook-cases-configured': {
    title: '세 개의 통제된 갈고리', type: 'Configuration',
    question: 'rewrite와 deny 실험의 모델, 동시성, 도구와 hook 구성이 실행 전에 고정됐는가?',
    consequence: '세 replay attempt는 Opus 5, provider concurrency 1과 부작용 없는 MCP 도구를 사용했다.', art: 'configuration',
  },
  'python-hook-surface-configured': {
    title: '열 개의 훅 표면', type: 'SDK contract',
    question: 'Python SDK 0.2.128이 선언한 HookEvent 범위를 현재 타입 원전에서 확인했는가?',
    consequence: 'PreToolUse부터 PermissionRequest까지 10개 literal을 타입 소스에서 확인했다.', art: 'configuration',
  },
  'assistant-messages-used-opus5': {
    title: '응답이 증명한 Opus 5', type: 'Model receipt',
    question: '요청 설정이 아니라 실제 모델 응답이 Opus 5였는가?',
    consequence: '세 유효 attempt의 모든 AssistantMessage.model이 claude-opus-5였다.', art: 'result',
  },
  'same-event-pre-hooks-entered-before-return': {
    title: '함께 열린 두 갈고리', type: 'Concurrency',
    question: '같은 PreToolUse event의 두 callback이 한쪽 반환 전에 모두 진입했는가?',
    consequence: 'pre-a와 pre-b 모두 barrier에 진입한 뒤에만 반환했다.', art: 'concurrency',
  },
  'pre-hook-return-order-differed': {
    title: '뒤집힌 반환 순서', type: 'Ordering',
    question: 'hook 등록 순서와 callback 반환 순서가 항상 같은가?',
    consequence: 'pre-a를 먼저 등록했지만 pre-b가 sequence 21에서 먼저 반환했다.', art: 'concurrency',
  },
  'handler-ran-with-original-output': {
    title: '원본을 만든 도구', type: 'Execution',
    question: 'PostToolUse 변환 전에 controlled MCP handler가 실제 원본 출력을 만들었는가?',
    consequence: 'handler 실행과 원본 tool_response가 host process 및 callback input에 남았다.', art: 'tool',
  },
  'post-hook-rewrote-mcp-output': {
    title: '모델 앞에서 바뀐 결과', type: 'Rewrite',
    question: 'PostToolUse의 유효한 MCP rewrite가 다음 모델-visible ToolResult를 바꿨는가?',
    consequence: 'content block 배열 rewrite가 CH18_POST_HOOK_REWRITTEN_OUTPUT으로 전달됐다.', art: 'rewrite',
  },
  'malformed-rewrite-failed-after-handler': {
    title: '실행 뒤에 깨진 포장', type: 'Failure',
    question: '잘못된 rewrite wrapper는 handler 실행 전과 후 중 어디에서 실패했는가?',
    consequence: 'handler는 이미 실행됐고 그 뒤 CLI가 e.reduce 오류 ToolResult를 만들었다.', art: 'failure',
  },
  'callback-hook-lifecycle-messages-zero': {
    title: '보이지 않은 lifecycle tape', type: 'Observation',
    question: 'include_hook_events=true가 Python callback lifecycle message를 실제 stream에 보장했는가?',
    consequence: 'host callback 기록은 있었지만 두 rewrite run의 HookEventMessage는 0개였다.', art: 'unknown',
  },
  'pretool-deny-blocked-handler': {
    title: '실행 전에 닫힌 문', type: 'Denial',
    question: 'PreToolUse deny가 ToolUse 요청 뒤 실제 handler 실행을 막았는가?',
    consequence: 'error ToolResult와 permission denial은 남았고 handler 실행 목록은 비어 있었다.', art: 'denial',
  },
  'deny-coexisted-with-terminal-success': {
    title: '성공 안에 남은 거절', type: 'Terminal boundary',
    question: 'terminal success가 모든 tool 요청의 성공을 뜻하는가?',
    consequence: 'permission denial 1건과 error ToolResult가 success Result와 함께 존재했다.', art: 'result',
  },
  'attempt-integrity-files-match': {
    title: '세 실행의 무결성 봉인', type: 'Integrity',
    question: '판독한 raw, callback, process와 OTel 파일이 manifest hash와 일치하는가?',
    consequence: '세 유효 attempt의 선언 hash를 다시 계산해 모두 일치시켰다.', art: 'integrity',
  },
  'raw-and-otel-sequences-align': {
    title: '맞물린 Raw와 OTel', type: 'Telemetry',
    question: 'projection 과정에서 사건 순서가 바뀌거나 사라졌는가?',
    consequence: '세 attempt의 raw sequence와 같은 recorder가 만든 OTel sequence가 전건 정렬됐다.', art: 'telemetry',
  },
  'same-event-hooks-dispatched-concurrently': {
    title: '동시 실행이라는 제한된 해석', type: 'Inference',
    question: 'barrier 통과가 이 구성의 concurrent dispatch를 지지하는가?',
    consequence: '이 버전과 PreToolUse 구성에서는 지지하지만 모든 hook과 버전으로 일반화하지 않는다.', art: 'inference',
  },
  'hook-order-is-not-a-pipeline': {
    title: '순차 파이프라인이 아니었다', type: 'Correction',
    question: '여러 HookMatcher를 등록 순서대로 상태를 넘기는 pipeline으로 가르쳐도 되는가?',
    consequence: '두 callback이 함께 진입하고 역순 반환했으므로 그 설명을 교정했다.', art: 'correction',
  },
  'mcp-rewrite-wrapper-is-invalid-here': {
    title: '잘못된 MCP 포장', type: 'Correction',
    question: 'updatedMCPToolOutput에 content 객체 wrapper를 넣는 예제가 현재 CLI에서 유효한가?',
    consequence: '객체 wrapper는 실패했고 content block 배열은 성공했다. 타입 설명도 함께 제한했다.', art: 'correction',
  },
  'include-hook-events-is-not-guaranteed-callback-tape': {
    title: '옵션과 관찰의 거리', type: 'Correction',
    question: 'include_hook_events=true만으로 callback lifecycle tape를 약속할 수 있는가?',
    consequence: 'callback은 실행됐지만 SDK output의 lifecycle message는 0개였다.', art: 'correction',
  },
  'hook-progress-is-not-current-python-phase': {
    title: '현재 타입에 없는 phase', type: 'Correction',
    question: 'Python SDK 0.2.128에 hook_progress phase가 있다고 설명할 수 있는가?',
    consequence: '현재 타입은 hook_started와 hook_response를 선언하며 hook_progress는 찾지 못했다.', art: 'correction',
  },
  'model-narrative-is-not-handler-proof': {
    title: '모델 설명과 실행 증거의 분리', type: 'Correction',
    question: '모델의 최종 문장만으로 host handler 실행 여부를 판정할 수 있는가?',
    consequence: 'handler 실행 판정에는 host process record가 필요하다.', art: 'correction',
  },
  'terminal-success-does-not-mean-every-tool-succeeded': {
    title: '종료 성공의 좁은 뜻', type: 'Correction',
    question: 'Result success를 모든 tool call의 성공으로 해석해도 되는가?',
    consequence: 'malformed rewrite와 deny 모두 error ToolResult 뒤 success로 종료됐다.', art: 'correction',
  },
  'init-model-is-not-response-model-proof': {
    title: '요청 모델은 영수증이 아니다', type: 'Correction',
    question: 'System init.model 하나로 실제 응답 모델을 증명할 수 있는가?',
    consequence: 'fallback과 synthetic message를 구분하려면 AssistantMessage.model을 판독해야 한다.', art: 'correction',
  },
  'otel-is-not-independent-runtime-proof': {
    title: '같은 사건의 두 표현', type: 'Correction',
    question: 'Raw와 OTel 일치가 독립 runtime 두 곳의 교차 검증인가?',
    consequence: '동일 recorder의 projection 정합성이지 독립 provider 증거는 아니다.', art: 'correction',
  },
  'historical-probe-source-not-bound': {
    title: '과거 소스 귀속의 빈틈', type: 'Correction',
    question: '2026-08-03 manifest가 당시 probe와 case 소스 전체를 hash로 묶었는가?',
    consequence: 'chapter bytes만 묶었다. 향후 캡처에는 세 probe source hash를 추가한다.', art: 'correction',
  },
  'missing-hook-lifecycle-reason-not-observed': {
    title: '사라진 lifecycle의 원인', type: 'Unknown',
    question: 'callback lifecycle message가 0개였던 내부 이유까지 관찰했는가?',
    consequence: 'stream에는 원인 event가 없어 이번 증거로 설명할 수 없다.', art: 'unknown',
  },
  'command-hook-lifecycle-not-observed': {
    title: 'command hook과의 미완 대조', type: 'Unknown',
    question: 'settings command hook과 Python callback hook의 stream 노출 차이를 비교했는가?',
    consequence: '같은 조건의 대조 실행을 하지 않아 아직 관찰되지 않았다.', art: 'unknown',
  },
  'remaining-hook-events-not-observed': {
    title: '아직 열지 않은 여덟 갈고리', type: 'Unknown',
    question: '나머지 HookEvent의 실제 입력과 차단 또는 변경 결과도 실행했는가?',
    consequence: '이번 workload는 PreToolUse와 PostToolUse만 직접 실행했다.', art: 'unknown',
  },
  'built-in-output-rewrite-not-observed': {
    title: '내장 도구 rewrite의 빈칸', type: 'Unknown',
    question: 'Bash, Read, Edit의 updatedToolOutput schema도 같은 방식으로 검증했는가?',
    consequence: 'MCP 전용 표본이라 built-in tool rewrite는 별도 실행이 필요하다.', art: 'unknown',
  },
  'general-hook-scheduling-not-observed': {
    title: '일반 스케줄링 규칙의 경계', type: 'Unknown',
    question: '한 PreToolUse 구성으로 모든 hook의 scheduling을 일반화할 수 있는가?',
    consequence: 'event 종류, matcher 수와 CLI 버전을 넓힌 반복 증거가 없다.', art: 'unknown',
  },
  'current-cli-replication-required': {
    title: '다음 버전의 재현', type: 'Next experiment',
    question: '2.1.220에서 본 동작을 현재 2.1.221에도 바로 귀속할 수 있는가?',
    consequence: '동일 probe를 새 session에서 순차 재실행해야 현재 버전을 주장할 수 있다.', art: 'unknown',
  },
  'command-callback-lifecycle-comparison-required': {
    title: '두 hook 경로의 대조', type: 'Next experiment',
    question: 'callback과 command hook의 lifecycle 차이를 어떻게 확인할 것인가?',
    consequence: '같은 event, tool과 include_hook_events 조건의 대조 run을 수집해야 한다.', art: 'unknown',
  },
  'hook-event-matrix-required': {
    title: '열 개의 훅 실험표', type: 'Next experiment',
    question: '남은 hook과 built-in rewrite 경계를 무엇으로 확장할 것인가?',
    consequence: '각 event를 독립 session과 부작용 없는 fixture로 순차 관찰해야 한다.', art: 'unknown',
  },
}
