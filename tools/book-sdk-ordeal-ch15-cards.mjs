export const ch15CardMeta = {
  'v2-prefix-triple-configured': {
    title: '한 글자를 가르는 세 갈래', type: 'Configuration',
    question: '동일 control과 timestamp 한 글자 변경군을 같은 조건에서 비교했는가?',
    consequence: 'Fresh nonce, 8,190자 prompt, 새 client 세 개를 고정하고 Opus 5를 순차 실행했다.', art: 'configuration',
  },
  'four-execution-source-hashes-match': {
    title: '실행 코드의 네 봉인', type: 'Provenance',
    question: '실행한 장과 probe 코드가 사후에 바뀌지 않았는가?',
    consequence: 'Chapter, probe, case, runtime SHA-256 네 개가 manifest와 4/4 일치했다.', art: 'integrity',
  },
  'actual-opus-and-serial-boundaries': {
    title: '겹치지 않은 세 호출', type: 'Ordering',
    question: '세 모델 호출이 병렬로 캐시 결과를 섞었는가?',
    consequence: '20번 finish 뒤 21번 start, 40번 finish 뒤 41번 start가 이어져 concurrency 1을 확인했다.', art: 'sequence',
  },
  'three-independent-sdk-sessions': {
    title: '세 개의 독립 세션', type: 'Isolation',
    question: '한 대화를 재사용한 결과인가?',
    consequence: '세 init이 서로 다른 runtime session을 보고해 독립 실행임을 보였다.', art: 'separation',
  },
  'host-system-hash-relations': {
    title: '같은 문장, 한 글자의 균열', type: 'Configuration',
    question: 'Control은 정말 같고 변경군만 다른가?',
    consequence: 'Stable과 control의 system hash는 같고 timestamp 한 글자를 바꾼 volatile만 달랐다.', art: 'configuration',
  },
  'stable-baseline-created-cache': {
    title: '기준선이 만든 캐시', type: 'Creation',
    question: '첫 stable 실행은 어떤 cache usage를 남겼는가?',
    consequence: 'Creation 2,755, read 0과 정확한 marker, 성공 terminal이 기록됐다.', art: 'creation',
  },
  'byte-identical-control-read-cache': {
    title: '같은 prefix의 재사용', type: 'Reuse',
    question: 'Byte-identical control이 실제 cache read를 남겼는가?',
    consequence: 'Creation 130, read 2,629와 정확한 marker, 성공 terminal이 기록됐다.', art: 'reuse',
  },
  'volatile-prefix-created-cache': {
    title: '앞쪽 한 글자의 새 생성', type: 'Creation',
    question: 'Timestamp 한 글자 변경군은 cache read를 유지했는가?',
    consequence: 'Creation 2,757, read 0과 정확한 marker, 성공 terminal이 기록됐다.', art: 'creation',
  },
  'all-markers-and-boundaries-complete': {
    title: '세 번 모두 닫힌 실행', type: 'Lifecycle',
    question: '일부 run이 실패하거나 중간에 끊겼는가?',
    consequence: '세 Result 모두 success와 is_error false였고 finish가 18, 18, 16개 SDK message를 보존했다.', art: 'result',
  },
  'init-runtime-surfaces-preserved': {
    title: '비워도 남은 내장 표면', type: 'Surface',
    question: 'Tools와 settings를 비우면 모든 skill과 command도 사라지는가?',
    consequence: 'Tools, MCP, plugin은 0이지만 세 init 모두 agent 5, skill 16, slash command 43을 보고했다.', art: 'tool',
  },
  'primary-opus-with-secondary-model-usage': {
    title: '주연 뒤의 보조 모델', type: 'Usage',
    question: 'Primary Opus 5가 provider 사용 모델의 전부인가?',
    consequence: '세 terminal model_usage에 Haiku 4.5 사용량도 함께 남았다.', art: 'separation',
  },
  'raw-and-otel-sequences-align': {
    title: '맞물린 원본과 투영', type: 'Telemetry',
    question: 'Raw SDK와 OTel 사이에서 사건이 유실됐는가?',
    consequence: 'SDK 52/52, process 8/8의 sequence가 순서까지 맞고 62 span이 한 trace에 속했다.', art: 'telemetry',
  },
  'attempt-integrity-files-match': {
    title: '일곱 증거 파일의 봉인', type: 'Integrity',
    question: '수집 뒤 raw와 OTel 파일이 변조되지 않았는가?',
    consequence: 'Integrity manifest의 일곱 SHA-256을 다시 계산해 7/7 일치했다.', art: 'integrity',
  },
  'timestamp-change-is-strong-miss-candidate': {
    title: '강하지만 확정 아닌 후보', type: 'Inference',
    question: '앞쪽 timestamp 변경이 cache miss의 확정 원인인가?',
    consequence: '동일 control read 2,629와 변경군 read 0이 강하게 지지하지만 server cause event가 없어 추론으로 남겼다.', art: 'inference',
  },
  'control-read-mostly-maps-to-stable-prefix': {
    title: '보이지 않는 token 지도', type: 'Inference',
    question: 'Read 2,629가 stable prefix의 정확히 어느 byte와 대응하는가?',
    consequence: '총량은 prefix 재사용을 지지하지만 provider token-to-byte map이 없어 attribution은 추론이다.', art: 'inference',
  },
  'messages-cache-control-and-ttft-are-not-agent-options': {
    title: '서로 다른 API의 경계', type: 'Correction',
    question: 'Messages API의 cache_control과 TTFT를 Agent SDK option이라 불러도 되는가?',
    consequence: '이 probe는 Agent SDK Result usage만 수집했다. Explicit cache control과 stream TTFT는 별도 API 실험이다.', art: 'correction',
  },
  'empty-settings-do-not-remove-builtins': {
    title: '빈 설정의 과장', type: 'Correction',
    question: 'setting_sources와 tools가 비면 내장 표면도 없다고 써도 되는가?',
    consequence: '실제 init에 agents, skills, slash commands가 남아 있어 그 설명을 교정했다.', art: 'correction',
  },
  'captured-is-not-cache-pass': {
    title: '수집은 합격이 아니다', type: 'Correction',
    question: 'CAPTURED와 TODO가 cache 주장의 자동 통과를 뜻하는가?',
    consequence: 'Raw 수집 완료와 사람의 판독 대기를 뜻할 뿐 truth assertion이 아니다.', art: 'correction',
  },
  'primary-model-is-not-only-provider-usage': {
    title: '하나로 줄일 수 없는 사용량', type: 'Correction',
    question: 'Init model만 보고 전체 provider usage를 Opus로 적어도 되는가?',
    consequence: 'Terminal에 Haiku 4.5 사용이 있어 primary와 전체 사용 모델을 분리했다.', art: 'correction',
  },
  'otel-is-not-independent-provider-proof': {
    title: '같은 기록의 두 그림', type: 'Correction',
    question: 'Raw와 OTel 일치가 독립 provider 관측 두 개를 뜻하는가?',
    consequence: '같은 recorder의 투영 무손실은 확인하지만 독립 관측을 새로 만들지는 않는다.', art: 'correction',
  },
  'one-triple-is-not-general-cost-speed-quality-proof': {
    title: '한 표본의 한계', type: 'Correction',
    question: '한 triple로 일반 비용, 속도, 품질 개선을 증명했는가?',
    consequence: '실제 usage 차이는 관찰했지만 반복 분포와 품질 과제가 없어 일반화하지 않았다.', art: 'correction',
  },
  'provider-cache-key-and-breakpoint-not-observed': {
    title: '공개되지 않은 캐시 열쇠', type: 'Unknown',
    question: 'Provider cache key와 breakpoint 원인이 event에 나타났는가?',
    consequence: 'Key, eviction reason, byte-to-token segment map은 이번 SDK surface에서 보이지 않았다.', art: 'unknown',
  },
  'provider-ttft-and-ttl-not-observed': {
    title: '측정하지 않은 시간 경계', type: 'Unknown',
    question: 'Cache-attributed TTFT와 실제 TTL 만료를 관찰했는가?',
    consequence: '이 Agent SDK run은 두 값을 측정하지 않았다.', art: 'unknown',
  },
  'dynamic-list-cache-effect-not-observed': {
    title: '그대로 둔 동적 목록', type: 'Unknown',
    question: 'Agent, skill, slash command 목록 변화가 cache에 미치는 효과를 보았는가?',
    consequence: '목록은 init에서 보였지만 세 run 사이에서 바꾸지 않았다.', art: 'unknown',
  },
  'path-skill-budget-conditional-relocation-not-observed': {
    title: '열지 않은 세 후보', type: 'Unknown',
    question: 'Path placeholder, skill budget, conditional 위치를 각각 시험했는가?',
    consequence: '이번 장의 실제 case는 timestamp 한 글자 변화만 다뤘다.', art: 'unknown',
  },
  'quality-and-repeat-distribution-not-observed': {
    title: '아직 없는 품질 분포', type: 'Unknown',
    question: 'Exact marker 성공을 일반 품질과 반복 분포로 볼 수 있는가?',
    consequence: 'Marker 과제는 품질 비교가 아니며 한 triple은 분포가 아니다.', art: 'unknown',
  },
  'candidate-pattern-pairs-required': {
    title: '다음 세 쌍의 실험', type: 'Next experiment',
    question: 'Path, skill budget, conditional 위치 후보를 어떻게 검증할 것인가?',
    consequence: '각각 한 변수만 바꾸는 별도 sequential pair가 필요하다.', art: 'unknown',
  },
  'repeated-sequential-samples-required': {
    title: '반복해야 얻는 안정성', type: 'Next experiment',
    question: '현재 패턴의 안정성을 말할 표본이 충분한가?',
    consequence: 'Fresh nonce triple을 더 반복하되 provider concurrency 1을 유지해야 한다.', art: 'unknown',
  },
  'messages-api-ttft-and-ttl-case-required': {
    title: 'Messages API로 분리할 실험', type: 'Next experiment',
    question: 'Explicit cache control, TTFT, TTL을 같은 Agent SDK case에 섞어도 되는가?',
    consequence: 'Cookbook 계열 Messages API 실제 실행을 별도로 설계해야 한다.', art: 'unknown',
  },
}
