export const ch16CardMeta = {
  'five-current-permission-cases-configured': {
    title: '다섯 갈래의 검문소', type: 'Configuration',
    question: 'Mode, rule, callback을 섞지 않고 다섯 독립 조건으로 고정했는가?',
    consequence: '새 workspace와 session, Opus 5, concurrency 1에서 acceptEdits와 bypass 조합을 따로 실행했다.', art: 'configuration',
  },
  'actual-opus-independent-session-boundaries': {
    title: '겹치지 않은 다섯 입장', type: 'Isolation',
    question: '하나의 대화나 병렬 호출이 결과를 섞었는가?',
    consequence: '다섯 init은 Opus 5와 서로 다른 session boundary를 기록했다.', art: 'separation',
  },
  'execution-source-hashes-bound': {
    title: '실행 코드의 봉인', type: 'Provenance',
    question: '판독한 실행이 어느 chapter와 probe 코드에서 나왔는가?',
    consequence: '각 manifest가 실행 당시 chapter, probe, case, runtime hash를 보존했다.', art: 'integrity',
  },
  'accept-edits-read-edit-mutated-without-callback': {
    title: '묻지 않고 바뀐 파일', type: 'Permission',
    question: 'acceptEdits의 Edit는 callback이 없었어도 실제 상태를 바꿨는가?',
    consequence: 'Read와 Edit 왕복 뒤 marker와 hash가 BEFORE에서 AFTER로 바뀌었고 callback은 0이었다.', art: 'permission',
  },
  'whole-tool-read-rule-shadow-warning': {
    title: '먼저 열린 Read 문', type: 'Ordering',
    question: 'Read whole-tool allow와 can_use_tool 중 무엇이 먼저 끝냈는가?',
    consequence: 'Callback record 없이 Read가 실행됐고 SDK warning이 shadow를 기록했다.', art: 'permission',
  },
  'current-absolute-no-read-edit-succeeded': {
    title: '읽지 않은 절대 경로', type: 'Counter-evidence',
    question: '현재 CLI에서 절대 경로 Edit는 선행 Read 없이 반드시 실패했는가?',
    consequence: 'Edit ToolResult가 성공했고 host marker와 hash가 실제로 변경됐다.', art: 'correction',
  },
  'current-relative-no-read-edit-succeeded': {
    title: '읽지 않은 상대 경로', type: 'Counter-evidence',
    question: '경로를 상대값으로 바꾸면 Read-before-Edit 실패가 재현됐는가?',
    consequence: '정확한 relative path에서도 Edit가 성공하고 파일 상태가 바뀌었다.', art: 'correction',
  },
  'historical-relative-no-read-edit-failed': {
    title: '과거 검문 기록', type: 'Versioned evidence',
    question: '2.1.220의 같은 상대 경로 관찰은 어떤 결과였는가?',
    consequence: 'File has not been read yet 오류가 났고 before/after hash는 같았다.', art: 'history',
  },
  'bypass-executed-controlled-handler-without-callback': {
    title: '우회로를 지난 실행', type: 'Permission',
    question: 'bypassPermissions에서 deny callback이 controlled tool을 막았는가?',
    consequence: 'Callback 0인 채 host handler와 marker ToolResult가 실제로 이어졌다.', art: 'permission',
  },
  'bypass-shadow-warning-observed': {
    title: '우회로의 경고문', type: 'Ordering',
    question: 'bypass가 callback을 건너뛴 사실을 runtime도 기록했는가?',
    consequence: 'Explicit deny 이외 호출을 auto-approve한다는 shadow warning이 남았다.', art: 'permission',
  },
  'explicit-deny-blocked-bypass-and-handler': {
    title: '우회로보다 강한 거부', type: 'Denial',
    question: 'Explicit deny가 bypass와 allow callback보다 먼저 도구를 닫았는가?',
    consequence: 'Permission denied와 error ToolResult가 남고 callback과 handler는 실행되지 않았다.', art: 'denial',
  },
  'terminal-success-coexisted-with-tool-denial': {
    title: '승리 표식 속의 거절', type: 'Terminal boundary',
    question: 'Run success가 모든 도구의 승인과 같은 뜻인가?',
    consequence: 'Terminal은 success였지만 같은 Result에 permission denial 1과 error ToolResult가 공존했다.', art: 'result',
  },
  'raw-and-otel-sequences-align': {
    title: '맞물린 원본과 투영', type: 'Telemetry',
    question: 'Raw SDK와 OTel 사이에서 권한 사건이 유실됐는가?',
    consequence: '다섯 최신 실행의 SDK와 process sequence가 각각 순서까지 일치했다.', art: 'telemetry',
  },
  'attempt-integrity-files-match': {
    title: '여섯 실행의 봉인', type: 'Integrity',
    question: '최신 다섯 실행과 역사적 보조 실행의 증거 파일이 바뀌었는가?',
    consequence: 'Manifest, verdict, raw 네 종류와 OTel hash를 재계산해 모두 일치했다.', art: 'integrity',
  },
  'observable-surface-matches-precedence-model': {
    title: '보이는 순서의 지도', type: 'Inference',
    question: '관찰값이 explicit deny, auto-approval, ask callback 순서를 지지하는가?',
    consequence: '결과는 그 모델과 일치하지만 내부 matcher 호출 순서를 직접 본 것은 아니다.', art: 'inference',
  },
  'cli-version-is-strong-change-candidate': {
    title: '버전이라는 강한 후보', type: 'Inference',
    question: '2.1.220 실패와 2.1.221 성공을 버전 하나로 확정할 수 있는가?',
    consequence: '버전은 강한 후보지만 prompt와 probe도 달라 단독 원인으로 확정하지 않았다.', art: 'inference',
  },
  'can-use-tool-is-not-universal-pre-tool-callback': {
    title: '항상 울리지 않는 종', type: 'Correction',
    question: 'can_use_tool을 모든 tool 전에 반드시 호출되는 관문이라 써도 되는가?',
    consequence: '실제 실행과 거부가 있었지만 현재 다섯 case의 callback record는 모두 0이었다.', art: 'correction',
  },
  'read-before-edit-is-not-current-universal-law': {
    title: '무너진 보편 규칙', type: 'Correction',
    question: 'Edit는 현재도 선행 Read 없이는 항상 실패한다고 가르칠 수 있는가?',
    consequence: '2.1.221의 절대·상대 Edit가 모두 성공해 과거 실패는 versioned evidence로 낮췄다.', art: 'correction',
  },
  'terminal-run-success-is-not-all-tools-success': {
    title: 'Run과 tool의 다른 결말', type: 'Correction',
    question: 'Terminal success 하나로 모든 tool handler 성공을 판정해도 되는가?',
    consequence: 'Explicit deny case가 terminal success와 tool error를 동시에 보여 그 설명을 교정했다.', art: 'correction',
  },
  'configured-permission-mode-is-not-full-semantic-proof': {
    title: '설정과 검증의 거리', type: 'Correction',
    question: 'Mode literal을 설정한 사실이 여섯 mode의 의미를 모두 증명하는가?',
    consequence: '이번 최신 실행은 acceptEdits와 bypassPermissions 두 mode만 직접 다뤘다.', art: 'correction',
  },
  'otel-is-not-independent-provider-proof': {
    title: '같은 기록의 두 그림', type: 'Correction',
    question: 'Raw와 OTel 일치가 독립 provider 관측 두 개를 뜻하는가?',
    consequence: '같은 recorder의 무손실 투영은 확인하지만 독립 출처를 새로 만들지는 않는다.', art: 'correction',
  },
  'exact-internal-permission-order-not-observed': {
    title: '보이지 않는 내부 문지기', type: 'Unknown',
    question: 'Matcher와 classifier 함수의 정확한 호출 순서를 보았는가?',
    consequence: 'SDK event에는 내부 short-circuit 위치가 노출되지 않았다.', art: 'unknown',
  },
  'full-rule-source-hierarchy-and-wildcards-not-observed': {
    title: '열지 않은 규칙 계층', type: 'Unknown',
    question: 'Managed, user, project와 wildcard 우선순위를 모두 시험했는가?',
    consequence: 'Whole-tool allow와 exact deny만 실행해 전체 계층은 관찰되지 않았다.', art: 'unknown',
  },
  'auto-classifier-rationale-not-observed': {
    title: '말하지 않은 자동 판정', type: 'Unknown',
    question: 'Auto classifier가 왜 허용하거나 거부했는지 event가 설명했는가?',
    consequence: '내부 prompt와 rationale는 이번 stream에서 보이지 않았다.', art: 'unknown',
  },
  'exact-read-validation-change-cause-not-observed': {
    title: '아직 모르는 변화 원인', type: 'Unknown',
    question: '두 CLI 결과 차이의 내부 원인을 직접 관찰했는가?',
    consequence: '버전 외 입력도 달라 validator 변화 원인은 확정되지 않았다.', art: 'unknown',
  },
  'chapter16-pretooluse-universal-path-not-observed': {
    title: '걸지 않은 PreToolUse', type: 'Unknown',
    question: 'PreToolUse가 모든 tool을 관찰하는 장 전용 경로를 실행했는가?',
    consequence: '다섯 attempt의 hook raw는 비어 있어 별도 live case가 필요하다.', art: 'unknown',
  },
  'real-user-ui-and-os-enforcement-not-observed': {
    title: '실제 승인창 밖의 실험', type: 'Unknown',
    question: '사용자 승인 UI와 OS sandbox까지 이번 결과로 증명했는가?',
    consequence: 'Temp file과 side-effect-free MCP 범위라 실제 UI와 OS enforcement는 보지 않았다.', art: 'unknown',
  },
  'same-probe-cross-cli-regression-required': {
    title: '같은 검으로 다시 겨룰 일', type: 'Next experiment',
    question: '버전 원인을 좁히려면 무엇을 고정해야 하는가?',
    consequence: '같은 commit, prompt, path, SDK를 유지하고 CLI만 바꾸는 순차 회귀가 필요하다.', art: 'unknown',
  },
  'pretooluse-and-rule-hierarchy-cases-required': {
    title: '다음 세 검문소', type: 'Next experiment',
    question: 'PreToolUse, ask callback, wildcard hierarchy를 어떻게 검증할 것인가?',
    consequence: '각각 한 변수만 바꾸는 독립 chapter case로 실행해야 한다.', art: 'unknown',
  },
  'other-permission-modes-remain-separate-evidence': {
    title: '합치지 않을 다른 길', type: 'Next experiment',
    question: 'Default, dontAsk, auto, plan의 과거 증거를 이번 run처럼 섞어도 되는가?',
    consequence: '기존 ch08f와 ch04b 실행을 출처와 session을 분리한 채 연결해야 한다.', art: 'unknown',
  },
}
