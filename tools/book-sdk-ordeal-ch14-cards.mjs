export const ch14CardMeta = {
  'v2-three-surface-control-configured': {
    title: '세 갈래 통제 선로', type: 'Configuration',
    question: 'A, 같은-surface control, 변경 B를 한 변수 비교로 설정했는가?',
    consequence: 'Fresh nonce와 같은 model, workspace, tool, server, permission을 고정하고 세 client를 순차 실행했다.', art: 'configuration',
  },
  'attempt-integrity-files-match': {
    title: '일곱 개의 봉인', type: 'Integrity',
    question: '실행 뒤 증거 파일이 바뀌지 않았는가?',
    consequence: 'Integrity manifest가 열거한 일곱 SHA-256을 다시 계산해 모두 일치했다.', art: 'integrity',
  },
  'four-execution-source-hashes-match': {
    title: '네 장의 설계도', type: 'Provenance',
    question: '어느 장과 probe 코드로 실행했는지 재현할 수 있는가?',
    consequence: 'Chapter, probe, case, runtime source hash가 manifest와 4/4 일치했다.', art: 'integrity',
  },
  'actual-opus-and-serial-surface-boundaries': {
    title: '겹치지 않은 세 열차', type: 'Ordering',
    question: '세 Opus 5 호출이 병렬로 겹쳤는가?',
    consequence: 'A finish 14 뒤 control start 15, control finish 28 뒤 B start 29가 이어졌다.', art: 'sequence',
  },
  'three-independent-sdk-sessions': {
    title: '서로 다른 세 객차', type: 'Isolation',
    question: '세 surface가 같은 conversation을 재사용했는가?',
    consequence: '세 init이 서로 다른 runtime session을 보고했다. 공개판에는 identifier를 노출하지 않는다.', art: 'separation',
  },
  'same-init-tool-and-connected-mcp': {
    title: '같은 도구 간판', type: 'Surface',
    question: '비교 중 tool 이름이나 MCP server 자체가 바뀌었는가?',
    consequence: '세 init 모두 같은 tool 이름과 connected cache_surface server를 보고했다.', art: 'tool',
  },
  'host-schema-and-system-hash-relations': {
    title: '같은 바닥, 다른 문', type: 'Configuration',
    question: 'System은 같고 B의 tool surface만 달랐는가?',
    consequence: '세 system hash는 같고 schema hash는 A와 control이 같으며 B만 달랐다.', art: 'configuration',
  },
  'surface-a-created-cache': {
    title: '처음 만든 캐시', type: 'Creation',
    question: 'A의 terminal usage가 새 cache creation을 기록했는가?',
    consequence: 'A Result는 creation 2,864, read 0과 정확한 A marker를 기록했다.', art: 'creation',
  },
  'same-surface-control-read-cache': {
    title: '같은 문으로 재입장', type: 'Reuse',
    question: '같은 tool surface control이 cache read를 직접 기록했는가?',
    consequence: 'Control Result는 creation 210, read 2,660과 정확한 marker를 기록했다.', art: 'reuse',
  },
  'changed-surface-b-created-cache': {
    title: '바뀐 문에서 새 생성', type: 'Creation',
    question: 'Description과 input schema가 바뀐 B는 어떤 usage를 남겼는가?',
    consequence: 'B Result는 creation 2,887, read 0과 정확한 B marker를 기록했다.', art: 'creation',
  },
  'no-model-tool-call-and-all-boundaries-complete': {
    title: '호출하지 않은 도구', type: 'Lifecycle',
    question: 'Tool execution이 usage 비교를 섞었거나 surface가 미완료로 끝났는가?',
    consequence: 'ToolUseBlock은 0개이고 세 finish 모두 completed와 SDK message 12개를 기록했다.', art: 'result',
  },
  'raw-and-otel-sequences-align': {
    title: '겹쳐진 두 기록지', type: 'Telemetry',
    question: 'Raw와 OTel 투영에서 사건이 빠졌는가?',
    consequence: 'SDK 36/36과 process 8/8 sequence가 순서까지 일치했다.', art: 'telemetry',
  },
  'v1-supporting-attempt-repeats-control-pattern': {
    title: '되풀이된 모양', type: 'Replication',
    question: '최신 triple에서만 우연히 control-read와 B-create가 나타났는가?',
    consequence: '이전 V1도 A create, control read, B create를 보였지만 source 결속 부족으로 보조 증거다.', art: 'continuity',
  },
  'overload-retry-and-error-terminal-preserved': {
    title: '성공이라 적힌 실패', type: 'Recovery',
    question: 'Result subtype이 success면 529 실행도 성공인가?',
    consequence: 'Retry 10회 뒤 subtype success와 is_error true가 함께 남아 두 field를 모두 검사하게 했다.', art: 'recovery',
  },
  'older-b-cache-contamination-preserved': {
    title: '과거 캐시의 흔적', type: 'Isolation',
    question: '이전 B cache를 읽은 pair를 깨끗한 비교로 사용할 수 있는가?',
    consequence: 'B read 2,860은 과거 동일 surface cache일 수 있어 기각하고 fresh nonce를 추가했다.', art: 'separation',
  },
  'changed-tool-surface-is-strong-break-candidate': {
    title: '가장 강한 후보', type: 'Inference',
    question: '변경 tool surface를 server cache-break 원인으로 확정할 수 있는가?',
    consequence: '통제 상관은 강하지만 server cause event가 없어 후보 추론으로만 남겼다.', art: 'inference',
  },
  'control-read-mostly-maps-to-stable-prefix': {
    title: '보이지 않는 구간 지도', type: 'Inference',
    question: 'Control read 2,660이 어느 system byte와 대응하는지 직접 보았는가?',
    consequence: 'Stable prefix reuse를 지지하지만 provider segment-to-byte map은 노출되지 않았다.', art: 'inference',
  },
  'messages-cache-control-and-ttft-are-not-agent-options': {
    title: '서로 다른 API의 손잡이', type: 'Correction',
    question: 'Messages API cache_control과 TTFT를 Agent SDK option이라 불러도 되는가?',
    consequence: '설치된 ClaudeAgentOptions에는 cache_control이 없고 이 probe는 provider TTFT를 재지 않았다.', art: 'correction',
  },
  'two-stage-detector-is-host-pattern-not-sdk-event': {
    title: '직접 만든 감지기', type: 'Correction',
    question: 'Snapshot과 usage 비교를 Agent SDK 내장 break event라 불러도 되는가?',
    consequence: '두 단계 감지는 host 분석 패턴이며 SDK가 pending changes를 자동 제공하지 않는다.', art: 'correction',
  },
  'host-schema-hash-is-not-server-cache-key': {
    title: '해시는 열쇠 전체가 아니다', type: 'Correction',
    question: 'Host schema hash가 provider cache key인가?',
    consequence: '직렬화 입력을 통제하는 hash일 뿐 server key와 cause는 관찰되지 않았다.', art: 'correction',
  },
  'terminal-subtype-success-is-insufficient': {
    title: '두 표식을 함께 읽기', type: 'Correction',
    question: 'Terminal subtype success 하나만으로 성공을 판정해도 되는가?',
    consequence: '529 Result 반례 때문에 is_error false까지 함께 확인해야 한다.', art: 'correction',
  },
  'primary-opus-is-not-only-provider-usage': {
    title: '주연만 있는 장부가 아니다', type: 'Correction',
    question: 'Init이 Opus 5면 전체 provider usage도 Opus뿐인가?',
    consequence: 'Terminal model_usage에 Haiku 4.5도 있어 전체 사용량을 한 모델로 줄이지 않았다.', art: 'correction',
  },
  'captured-is-not-cache-break-pass': {
    title: '수집과 합격의 경계', type: 'Correction',
    question: 'CAPTURED와 TODO verdict가 cache-break 주장 통과를 뜻하는가?',
    consequence: 'Raw 수집 완료일 뿐 사람이 evidence를 읽기 전에는 진실 판정이 아니다.', art: 'correction',
  },
  'otel-is-not-independent-provider-proof': {
    title: '같은 원전의 두 그림', type: 'Correction',
    question: '같은 recorder의 OTel을 독립 provider 증거라 부를 수 있는가?',
    consequence: 'Sequence 일치는 투영 무손실을 확인하지만 독립 관측을 만들지는 않는다.', art: 'correction',
  },
  'one-controlled-triple-is-not-cost-speed-quality-proof': {
    title: '두 표본의 한계', type: 'Correction',
    question: '두 matching triple로 일반 비용·속도·품질 개선을 증명했는가?',
    consequence: '반복 분포와 품질 과제가 없어 그 일반화는 제거했다.', art: 'correction',
  },
  'pending-changes-and-server-cause-not-observed': {
    title: '서버가 말하지 않은 원인', type: 'Unknown',
    question: 'SDK event에 pendingChanges나 per-tool break cause가 있었는가?',
    consequence: '현재 raw message와 terminal usage에서는 관찰되지 않았다.', art: 'unknown',
  },
  'provider-cache-key-and-segment-map-not-observed': {
    title: '공개되지 않은 열쇠 지도', type: 'Unknown',
    question: 'Provider cache key와 schema byte/token segment 대응을 보았는가?',
    consequence: '공개 event surface에 key 구성과 segment map이 없었다.', art: 'unknown',
  },
  'provider-ttft-not-observed': {
    title: '분리되지 않은 첫 토큰 시간', type: 'Unknown',
    question: 'Host duration에서 provider TTFT를 직접 분리했는가?',
    consequence: '이 Agent SDK probe는 provider TTFT를 수집하지 않았다.', art: 'unknown',
  },
  'ttl-expiry-not-observed': {
    title: '아직 넘지 않은 시간 경계', type: 'Unknown',
    question: '실제 cache TTL 만료 전후를 실행했는가?',
    consequence: '세 surface를 짧은 시간 안에 실행해 expiry는 관찰되지 않았다.', art: 'unknown',
  },
  'other-break-candidate-classes-not-observed': {
    title: '열지 않은 후보 문들', type: 'Unknown',
    question: '날짜, cwd, MCP 수, skill, model, 긴 tool result도 이번 case에서 바꿨는가?',
    consequence: 'Tool surface 한 종류만 통제했으며 다른 후보는 별도 case가 필요하다.', art: 'unknown',
  },
  'quality-and-repeat-distribution-not-observed': {
    title: '아직 없는 분포', type: 'Unknown',
    question: 'Marker 반환으로 품질과 반복 latency/cost 분포를 측정했는가?',
    consequence: 'Marker는 품질 과제가 아니고 두 triple은 일반 분포를 만들기에 부족하다.', art: 'unknown',
  },
  'description-versus-input-schema-isolation-required': {
    title: '두 변수를 가르는 다음 문', type: 'Next experiment',
    question: 'Description과 input schema 중 어느 변화가 후보인지 분리했는가?',
    consequence: 'Description-only와 schema-only surface를 따로 순차 실행해야 한다.', art: 'unknown',
  },
  'repeated-sequential-samples-required': {
    title: '더 긴 반복 선로', type: 'Next experiment',
    question: '후보 패턴의 안정성을 말할 만큼 반복했는가?',
    consequence: 'Fresh nonce triple을 더 반복하되 provider concurrency 1을 유지해야 한다.', art: 'unknown',
  },
  'candidate-matrix-cases-required': {
    title: '한 번에 하나의 변수', type: 'Next experiment',
    question: '나머지 cache-break 후보를 어떻게 비교할 것인가?',
    consequence: '날짜, cwd, MCP, skill, model, long result를 각각 독립 case로 만든다.', art: 'unknown',
  },
  'messages-api-ttft-and-ttl-case-required': {
    title: '다른 API로 떠나는 원정', type: 'Next experiment',
    question: 'Explicit cache control, TTFT, TTL을 현재 Agent SDK case로 증명할 수 있는가?',
    consequence: 'Messages API cookbook 계열의 별도 실제 실행이 필요하다.', art: 'unknown',
  },
}
