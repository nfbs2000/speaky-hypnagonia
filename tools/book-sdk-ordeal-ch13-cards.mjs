export const ch13CardMeta = {
  'v2-prefix-and-isolation-configured': {
    title: '동일한 V2 선로', type: 'Configuration',
    question: '두 독립 session에 같은 긴 prefix와 다른 suffix만 설정했는가?',
    consequence: '7,806-character prefix, A/B suffix, 빈 도구 표면과 순차 실행을 host가 고정했다.', art: 'configuration',
  },
  'attempt-integrity-files-match': {
    title: '일곱 개의 봉인', type: 'Integrity',
    question: '실행 뒤 raw와 OTel 파일이 바뀌지 않았는가?',
    consequence: 'integrity manifest의 SHA-256을 다시 계산해 7/7 일치했다.', art: 'integrity',
  },
  'four-execution-source-hashes-match': {
    title: '네 장의 설계도', type: 'Provenance',
    question: '실행에 사용한 장과 Python source를 정확히 가리킬 수 있는가?',
    consequence: 'chapter, probe, case, runtime hash 네 개가 실행 manifest와 일치했다.', art: 'integrity',
  },
  'actual-opus-and-serial-boundary': {
    title: '한 번에 한 열차', type: 'Ordering',
    question: 'Opus 5 A와 B가 겹치지 않고 순서대로 실행됐는가?',
    consequence: 'A finish 20 뒤 B start 21이며 두 init model은 Opus 5다.', art: 'sequence',
  },
  'two-independent-sdk-sessions': {
    title: '서로 다른 두 객차', type: 'Isolation',
    question: 'A와 B가 같은 conversation을 이어 쓴 것인가?',
    consequence: 'init 2와 22가 서로 다른 SDK session identifier를 보고했다.', art: 'separation',
  },
  'run-a-created-fresh-v2-cache': {
    title: '처음 놓은 선로', type: 'Creation',
    question: '새 V2 prefix의 첫 Result가 cache creation을 직접 기록했는가?',
    consequence: 'A는 creation 2,570, read 0과 정확한 marker를 기록했다.', art: 'creation',
  },
  'run-b-reported-cache-read': {
    title: '다시 쓴 선로', type: 'Reuse',
    question: '독립 B session이 cache read를 직접 보고했는가?',
    consequence: 'B는 read 2,427, creation 143과 정확한 marker를 기록했다.', art: 'reuse',
  },
  'dynamic-marker-task-completion-preserved': {
    title: '갈라진 두 종착점', type: 'Result',
    question: 'suffix가 바뀐 뒤에도 각각의 과제를 정확히 끝냈는가?',
    consequence: 'A와 B가 서로 다른 marker를 정확히 반환하고 둘 다 success로 닫혔다.', art: 'result',
  },
  'empty-observed-tool-surface': {
    title: '비워 둔 도구 칸', type: 'Surface',
    question: '도구 schema가 cache 결과를 섞었을 가능성을 줄였는가?',
    consequence: '두 init의 model-visible tools 목록은 모두 비어 있었다.', art: 'tool',
  },
  'raw-and-otel-sdk-sequences-align': {
    title: '겹쳐진 두 기록지', type: 'Telemetry',
    question: 'raw SDK와 OTel 투영의 사건 번호가 일치하는가?',
    consequence: 'raw와 OTel sdk.message sequence 30/30이 순서까지 같았다.', art: 'telemetry',
  },
  'terminal-model-usage-has-opus-and-haiku': {
    title: '주연과 보조 사용량', type: 'Usage',
    question: 'primary Opus만 provider 사용량에 나타났는가?',
    consequence: '두 Result model_usage에 Opus 5와 Haiku 4.5가 함께 있었다.', art: 'usage',
  },
  'read-tokens-map-to-stable-prefix-mostly': {
    title: '보이지 않는 구간 지도', type: 'Inference',
    question: 'B의 2,427 read가 정확히 어느 byte 구간인지 직접 보았는가?',
    consequence: '수치와 통제 입력은 long prefix reuse를 지지하지만 segment map은 없어 추론으로 남겼다.', art: 'inference',
  },
  'messages-cache-control-is-not-agent-option': {
    title: '다른 API의 손잡이', type: 'Correction',
    question: 'Messages API cache_control을 Agent SDK option으로 써도 되는가?',
    consequence: '설치된 ClaudeAgentOptions에는 그 field가 없어 책의 API 경계를 교정했다.', art: 'correction',
  },
  'host-prefix-hash-is-not-full-server-key': {
    title: '해시는 열쇠 전체가 아니다', type: 'Correction',
    question: 'host system hash만으로 server cache key를 확정할 수 있는가?',
    consequence: 'hash는 통제 입력 증거일 뿐 server key 구성은 노출되지 않았다.', art: 'correction',
  },
  'cache-scope-attribution-not-observed': {
    title: '이름 없는 범위', type: 'Unknown',
    question: 'cache read가 global인지 org인지 event에서 식별됐는가?',
    consequence: 'scope attribution field가 없어 관찰되지 않은 것으로 남겼다.', art: 'unknown',
  },
  'ttl-expiry-boundary-not-observed': {
    title: '아직 울리지 않은 시계', type: 'Unknown',
    question: 'ephemeral_1h 이름이 실제 한 시간 만료를 증명하는가?',
    consequence: '시간 경계를 넘겨 호출하지 않아 expiry는 관찰되지 않았다.', art: 'unknown',
  },
  'latency-causality-not-observed': {
    title: '한 번의 속도계', type: 'Unknown',
    question: '한 A/B pair로 일반 latency 개선 인과를 말할 수 있는가?',
    consequence: '반복 분포가 없어 latency causality는 관찰되지 않았다.', art: 'unknown',
  },
  'mcp-tool-schema-cache-break-not-observed': {
    title: '건드리지 않은 도구 지도', type: 'Unknown',
    question: 'MCP나 tool schema 변경이 cache를 깨는 범위를 실행했는가?',
    consequence: '도구 표면을 비워 두었으므로 schema-break 효과는 미관찰이다.', art: 'unknown',
  },
  'primary-opus-is-not-only-provider-usage': {
    title: '한 모델로 줄일 수 없는 장부', type: 'Correction',
    question: 'assistant가 Opus면 전체 provider usage도 Opus뿐인가?',
    consequence: 'Haiku 4.5 사용량이 별도로 남아 표현을 교정했다.', art: 'correction',
  },
  'captured-is-not-cache-claim-pass': {
    title: '수집 완료와 판정 통과', type: 'Correction',
    question: 'CAPTURED와 TODO verdict가 cache 주장의 자동 합격인가?',
    consequence: '수집 완료일 뿐 claim 판정은 raw를 사람이 읽어 별도로 내렸다.', art: 'correction',
  },
  'otel-is-not-independent-provider-proof': {
    title: '같은 원전의 두 그림', type: 'Correction',
    question: 'recorder OTel을 raw와 독립된 두 번째 관측기로 부를 수 있는가?',
    consequence: '같은 recorder의 투영이므로 독립 증거라는 표현을 제거했다.', art: 'correction',
  },
  'ttl-boundary-sweep-required': {
    title: '시간 경계 원정', type: 'Next experiment',
    question: '실제 5분과 1시간 만료 경계를 어떻게 확인할 것인가?',
    consequence: '경계 전후 동일 prefix를 순차 실행하는 장시간 case가 남았다.', art: 'unknown',
  },
  'repeated-latency-cost-sample-required': {
    title: '반복되는 속도 시험', type: 'Next experiment',
    question: 'usage와 latency/cost 분포를 어떻게 분리할 것인가?',
    consequence: '같은 조건의 반복 sequential sample이 필요하다.', art: 'unknown',
  },
  'tool-mcp-schema-ab-required': {
    title: '도구 모양 하나 바꾸기', type: 'Next experiment',
    question: 'schema 변경의 cache break를 어떻게 좁혀 볼 것인가?',
    consequence: 'tool 또는 MCP schema 하나만 바꾸는 A/B가 필요하다.', art: 'unknown',
  },
  'preset-variants-required': {
    title: '프리셋의 숨은 경계', type: 'Next experiment',
    question: 'string prompt와 preset option의 cache 차이를 보았는가?',
    consequence: 'append와 exclude_dynamic_sections를 나눈 controlled case가 필요하다.', art: 'unknown',
  },
}
