export const ch18bCardMeta = {
  'sandbox-pair-configured': {
    title: '두 갈래의 경계 스위치', type: 'Configuration',
    question: 'enabled 값만 나눈 두 통제 실행의 모델, 도구와 우회 금지 설정이 고정됐는가?',
    consequence: '두 session은 Opus 5 요청, 단일 Bash, concurrency 1과 같은 제한을 사용했다.', art: 'configuration',
  },
  'python-sandbox-surface-configured': {
    title: '현재 SDK의 일곱 열쇠', type: 'SDK contract',
    question: 'Python SDK 0.2.128이 실제로 선언한 SandboxSettings 필드를 원전에서 읽었는가?',
    consequence: 'enabled부터 nested sandbox까지 현재 공개된 일곱 설정 표면을 확인했다.', art: 'configuration',
  },
  'assistant-messages-used-opus5': {
    title: '응답이 남긴 Opus 영수증', type: 'Model receipt',
    question: '요청값이 아니라 모든 AssistantMessage가 실제 Opus 5였는가?',
    consequence: 'OFF 4건과 ON 3건의 AssistantMessage.model이 모두 claude-opus-5였다.', art: 'result',
  },
  'one-bash-tool-use-per-attempt': {
    title: '한 번만 내려친 명령', type: 'Execution',
    question: '각 경계 실험이 통제된 marker Bash를 정확히 한 번 실행했는가?',
    consequence: '두 attempt 모두 sequence 21에 단일 Bash ToolUse를 남겼다.', art: 'tool',
  },
  'disabled-created-both-markers': {
    title: '열린 경계의 두 흔적', type: 'Host evidence',
    question: 'sandbox OFF에서 workspace 안과 sibling에 파일이 실제로 생겼는가?',
    consequence: 'host readback이 두 marker의 내용과 SHA-256을 모두 확인했다.', art: 'result',
  },
  'enabled-created-inside-marker': {
    title: '성 안에 남은 표식', type: 'Host evidence',
    question: 'sandbox ON에서도 허용된 workspace 내부 쓰기는 완료됐는가?',
    consequence: '내부 marker는 정확한 내용과 SHA-256으로 존재했다.', art: 'result',
  },
  'enabled-blocked-sibling-marker': {
    title: '성벽 밖에서 멈춘 표식', type: 'Boundary',
    question: 'sandbox ON이 sibling redirect를 실제 파일 생성 전에 막았는가?',
    consequence: 'operation not permitted가 나타났고 host readback에서 sibling 파일은 없었다.', art: 'denial',
  },
  'partial-failure-coexisted-with-tool-success': {
    title: '성공 표식에 숨은 균열', type: 'Partial failure',
    question: '중간 명령 실패가 ToolResult is_error=false 안에 함께 들어갈 수 있는가?',
    consequence: '차단 문구와 마지막 완료 marker가 하나의 non-error ToolResult에 공존했다.', art: 'failure',
  },
  'partial-failure-coexisted-with-terminal-success': {
    title: '승리 화면 뒤의 실패', type: 'Terminal boundary',
    question: '실제 sibling 실패 뒤에도 전체 턴이 success로 끝났는가?',
    consequence: 'terminal Result는 success였지만 host에는 sibling 파일이 없었다.', art: 'failure',
  },
  'attempt-integrity-files-match': {
    title: '두 실행의 무결성 봉인', type: 'Integrity',
    question: '판독한 raw, process, callback, OTel 파일이 선언 hash와 일치하는가?',
    consequence: '두 attempt의 7개 evidence file SHA-256을 다시 계산해 모두 일치시켰다.', art: 'integrity',
  },
  'raw-and-otel-sequences-align': {
    title: '맞물린 사건과 그림자', type: 'Telemetry',
    question: 'raw 사건 순서가 OTel projection에서 보존됐는가?',
    consequence: '같은 recorder가 만든 source sequence와 attempt별 단일 trace가 정렬됐다.', art: 'telemetry',
  },
  'auxiliary-haiku-usage-recorded': {
    title: 'Opus 뒤의 보조 흔적', type: 'Usage boundary',
    question: '응답 모델과 provider 전체 model usage를 같은 것으로 오해했는가?',
    consequence: 'AssistantMessage는 Opus였지만 Result usage에는 Haiku 보조 사용량도 있었다.', art: 'result',
  },
  'sandbox-caused-boundary-difference-in-pair': {
    title: '경계 효과라는 제한된 해석', type: 'Inference',
    question: 'OFF와 ON의 host 차이를 이 통제 pair의 sandbox 효과로 해석할 수 있는가?',
    consequence: '의도적 설정 차이와 readback이 해석을 지지하지만 모든 경로로 일반화하지 않는다.', art: 'inference',
  },
  'terminal-success-is-not-subcommand-success': {
    title: '종료 성공의 좁은 뜻', type: 'Correction',
    question: 'terminal success를 모든 하위 명령 성공이라고 가르쳐도 되는가?',
    consequence: '중간 redirect 실패와 마지막 printf 성공이 함께 있어 설명을 교정했다.', art: 'correction',
  },
  'toolresult-nonerror-is-not-side-effect-proof': {
    title: '도구 봉투는 파일 영수증이 아니다', type: 'Correction',
    question: 'ToolResult is_error=false만으로 모든 side effect를 확정할 수 있는가?',
    consequence: 'host readback이 sibling 파일 부재를 보여 non-error 해석을 제한했다.', art: 'correction',
  },
  'model-narrative-is-not-file-proof': {
    title: '설명과 흔적의 분리', type: 'Correction',
    question: '모델 최종문이 실제 파일 상태를 대신할 수 있는가?',
    consequence: '파일 side effect는 모델 서술이 아니라 host readback으로 판정했다.', art: 'correction',
  },
  'init-model-is-not-response-model-proof': {
    title: '요청 모델은 응답 영수증이 아니다', type: 'Correction',
    question: 'init 설정값만으로 보안 fallback 뒤 실제 응답 모델을 증명할 수 있는가?',
    consequence: 'AssistantMessage.model의 단일성을 기준으로 probe를 교정했다.', art: 'correction',
  },
  'opus-response-is-not-opus-only-provider-run': {
    title: '응답 왕과 보조 일꾼', type: 'Correction',
    question: 'Opus 응답을 provider가 Opus만 사용했다는 주장으로 확대할 수 있는가?',
    consequence: 'Result model_usage의 Haiku key 때문에 그 확대를 금지했다.', art: 'correction',
  },
  'unsupported-python-sandbox-fields': {
    title: '현재 타입에 없는 열쇠', type: 'Correction',
    question: 'failIfUnavailable과 managedSettings를 현재 Python sandbox field로 쓸 수 있는가?',
    consequence: 'SDK 0.2.128 타입에 없으므로 책과 Notion의 오래된 목록을 수정했다.', art: 'correction',
  },
  'exact-os-adapter-is-not-proved': {
    title: '보이지 않은 성벽 설계도', type: 'Correction',
    question: '파일 차단만으로 정확한 Seatbelt profile과 내부 adapter를 안다고 할 수 있는가?',
    consequence: '경계 효과만 관찰했고 내부 profile 설명은 증거 범위 밖으로 남겼다.', art: 'correction',
  },
  'otel-is-not-independent-runtime-proof': {
    title: '같은 사건의 두 표현', type: 'Correction',
    question: 'Raw와 OTel 일치가 독립 runtime 두 곳의 교차 검증인가?',
    consequence: '동일 recorder의 projection 정합성이지 독립 provider 증거는 아니다.', art: 'correction',
  },
  'historical-probe-source-not-bound': {
    title: '과거 소스 귀속의 빈틈', type: 'Correction',
    question: '역사적 manifest가 당시 probe 소스 전체를 hash로 묶었는가?',
    consequence: 'chapter bytes만 묶었다. 향후 세 probe source hash를 추가한다.', art: 'correction',
  },
  'network-and-socket-boundaries-not-observed': {
    title: '아직 열지 않은 네트워크 문', type: 'Unknown',
    question: 'domain, Unix socket, local bind와 proxy 경계도 실행했는가?',
    consequence: '이번 workload는 파일 쓰기만 다뤘으므로 네트워크 정책은 관찰되지 않았다.', art: 'unknown',
  },
  'excluded-and-unsandboxed-bypass-not-observed': {
    title: '시험하지 않은 우회 통로', type: 'Unknown',
    question: 'excluded command와 unsandboxed 요청의 실제 동작을 확인했는가?',
    consequence: '우회 경로는 의도적으로 실행하지 않아 별도 안전 실험이 필요하다.', art: 'unknown',
  },
  'blocked-path-callback-not-observed': {
    title: '울리지 않은 차단 종', type: 'Unknown',
    question: '차단 경로가 별도 callback과 사용자-visible receipt를 남겼는가?',
    consequence: '이번 evidence에는 blocked path callback 사건이 없어 입력 shape를 알 수 없다.', art: 'unknown',
  },
  'managed-policy-and-unavailable-fallback-not-observed': {
    title: '기업 성벽과 고장 난 문', type: 'Unknown',
    question: 'managed policy 우선순위와 sandbox unavailable fallback을 실제로 봤는가?',
    consequence: 'raw stream에 해당 사건과 내부 adapter 선택 정보가 없었다.', art: 'unknown',
  },
  'post-cleanup-scan-not-observed': {
    title: '정리 뒤의 빈 땅', type: 'Unknown',
    question: 'temp context 종료 뒤 marker 부재까지 host가 다시 확인했는가?',
    consequence: 'cleanup 이후 scan event가 없어 leftover 부재를 증명하지 않는다.', art: 'unknown',
  },
  'current-cli-replication-required': {
    title: '다음 버전의 재대결', type: 'Next experiment',
    question: '2.1.220의 경계를 현재 2.1.221에도 바로 귀속할 수 있는가?',
    consequence: '동일한 두 case를 새 session에서 순차 재실행해야 한다.', art: 'unknown',
  },
  'network-and-bypass-matrix-required': {
    title: '경계 실험의 다음 지도', type: 'Next experiment',
    question: '네트워크와 우회 경계를 실제 서비스 피해 없이 어떻게 확장할 것인가?',
    consequence: 'local fixture와 temp resource를 사용한 독립 session matrix가 필요하다.', art: 'unknown',
  },
  'refusal-fallback-and-cleanup-evidence-required': {
    title: '거부를 숨기지 않는 기록', type: 'Next experiment',
    question: '보안 거부나 lower-model fallback이 나오면 프롬프트를 우회할 것인가?',
    consequence: '우회하지 않고 model_refusal_fallback과 cleanup host event로 분리 보존한다.', art: 'unknown',
  },
}
