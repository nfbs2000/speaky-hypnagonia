export const ch29CardMeta = {
  'controlled-tool-contract-configured': {
    title: '한 번만 여는 관측 도구', type: 'Configuration',
    question: '실험은 어떤 도구 호출과 종료 표식을 미리 고정했는가?',
    consequence: 'read-only lookup 한 번과 연결된 ToolResult, 최종 marker를 요구하고 실제 credential 대신 합성 canary를 사용했다.', art: 'configuration',
  },
  'durable-redaction-recorder-configured': {
    title: '쓰기 전에 닫는 금고', type: 'Storage policy',
    question: '민감값은 raw 파일에 쓴 뒤 지우는가, 쓰기 전에 제거하는가?',
    consequence: '하나의 sequence recorder가 SDK와 host 사건을 묶고 저장 전에 민감 pattern과 key를 redaction하도록 구성됐다.', art: 'boundary',
  },
  'bounded-local-otel-projection-configured': {
    title: '본문 없는 운송장', type: 'Telemetry policy',
    question: '로컬 OTel span에는 어떤 정보만 보내도록 설계했는가?',
    consequence: 'sequence, message type, session/tool link와 terminal 수치만 허용하고 prompt·content·payload 본문은 제외했다.', art: 'telemetry',
  },
  'single-run-permission-boundary-configured': {
    title: '하나의 좁은 실행로', type: 'Execution boundary',
    question: 'provider 호출과 권한·도구 표면은 얼마나 좁혔는가?',
    consequence: 'concurrency 1, dontAsk, fallback 없음, lookup 외 변경·탐색 도구 금지로 구성했다.', art: 'permission',
  },
  'all-assistant-messages-used-opus5': {
    title: '세 개의 Opus 영수증', type: 'Model receipt',
    question: '요청 설정이 아니라 실제 응답 message는 어떤 모델을 기록했는가?',
    consequence: 'sequence 9, 18, 29의 AssistantMessage.model을 직접 읽어 모두 claude-opus-5임을 확인했다.', art: 'result',
  },
  'init-exposed-connected-mcp-tool': {
    title: '초기화에 열린 관측실', type: 'Initialization',
    question: 'init은 모델·권한·MCP 연결을 실제로 노출했는가?',
    consequence: 'Opus 5, dontAsk, connected telemetry_lab과 lookup tool이 sequence 2에 함께 기록됐다.', art: 'init',
  },
  'actual-mcp-tool-use-observed': {
    title: '실제로 발행된 lookup', type: 'Tool use',
    question: '도구 설명만 있었는가, 완성 ToolUseBlock이 실제로 나왔는가?',
    consequence: 'sequence 18에서 lookup ToolUseBlock 한 건과 redacted input, 연결 ID가 관찰됐다.', art: 'tool',
  },
  'host-handler-execution-observed': {
    title: '호스트가 받은 호출', type: 'Host execution',
    question: '모델의 ToolUse 뒤 host handler도 실제로 실행됐는가?',
    consequence: 'sequence 19 process event가 입력 검사와 marker-returned 결과를 기록했다.', art: 'tool',
  },
  'tool-result-id-linked': {
    title: '같은 번호로 돌아온 결과', type: 'Tool receipt',
    question: 'ToolResult가 원래 ToolUse와 같은 ID로 연결됐는가?',
    consequence: 'sequence 23 ToolResultBlock이 sequence 18과 같은 tool_use_id와 결과 marker를 보존했다.', art: 'continuity',
  },
  'terminal-result-succeeded': {
    title: '두 turn 뒤 닫힌 실행', type: 'Terminal receipt',
    question: '실제 ToolResult 뒤 성공 Result까지 실행이 닫혔는가?',
    consequence: 'sequence 33은 success, is_error false, two turns와 최종 marker를 기록했다.', art: 'result',
  },
  'host-prompt-redacted-on-storage': {
    title: '첫 저장 경계', type: 'Redaction',
    question: 'host prompt의 합성 canary가 저장 전에 제거됐는가?',
    consequence: 'sequence 1에는 본문 대신 REDACTED와 정확한 redacted path가 남았다.', art: 'boundary',
  },
  'streaming-partial-json-redacted': {
    title: '흐르는 JSON의 가림막', type: 'Streaming redaction',
    question: '완성 input뿐 아니라 streaming partial JSON도 가려졌는가?',
    consequence: 'sequence 15 partial_json의 민감값이 REDACTED로 저장되고 delta 경로가 기록됐다.', art: 'boundary',
  },
  'completed-tool-input-redacted': {
    title: '완성 ToolUse의 가림막', type: 'Tool redaction',
    question: '확정 ToolUse input의 민감 key도 제거됐는가?',
    consequence: 'sequence 18 payload와 event alias 양쪽에 REDACTED와 redacted path가 남았다.', art: 'boundary',
  },
  'handler-input-redacted-on-storage': {
    title: 'handler 기록의 가림막', type: 'Host redaction',
    question: '실제 handler가 받은 input을 저장할 때도 민감값이 빠졌는가?',
    consequence: 'sequence 19의 저장본은 REDACTED였지만 handler outcome은 marker-returned로 보존됐다.', art: 'boundary',
  },
  'synthetic-secret-absent-from-attempt-files': {
    title: '남지 않은 합성 비밀', type: 'Archive scan',
    question: '네 지점에서 가린 canary가 attempt 파일 다른 곳에 남았는가?',
    consequence: '전체 재검색 결과 원문은 0건이었고 REDACTED와 위치 영수증만 남았다.', art: 'integrity',
  },
  'frozen-raw-sequences-unique-and-ordered': {
    title: '0에서 34까지의 봉인', type: 'Sequence audit',
    question: 'frozen raw sequence에는 중복이나 순서 역전이 있었는가?',
    consequence: 'actor scope는 중복 없이 0부터 34까지 정렬된 35개 사건으로 고정됐다.', art: 'integrity',
  },
  'every-frozen-raw-event-had-carrier': {
    title: '모든 사건의 운송장', type: 'Coverage audit',
    question: '각 frozen raw 사건을 찾아갈 OTel carrier가 있었는가?',
    consequence: 'raw sequence 0..34 모두 하나 이상의 sdk 또는 process carrier span을 가졌다.', art: 'telemetry',
  },
  'scoped-spans-shared-one-trace-id': {
    title: '하나로 묶인 36 span', type: 'Trace identity',
    question: 'scoped span이 여러 trace로 흩어졌는가?',
    consequence: 'frozen scope의 36 span이 하나의 trace ID를 공유했다.', art: 'continuity',
  },
  'one-process-event-created-two-span-views': {
    title: '한 사건의 두 관점', type: 'Projection cardinality',
    question: 'raw 35와 span 36의 차이는 곧 누락이나 중복 오류인가?',
    consequence: 'process sequence 19 하나가 carrier와 tool execution 두 span 관점을 의도적으로 만들었다.', art: 'telemetry',
  },
  'final-files-include-post-freeze-bookkeeping': {
    title: '봉인 뒤의 세 장부', type: 'Scope boundary',
    question: 'frozen audit 분모와 최종 파일 분모가 왜 다른가?',
    consequence: 'capture finished, verdict, root span이 뒤에 추가돼 최종 raw 36과 OTel 39가 됐다.', art: 'boundary',
  },
  'terminal-metrics-match-raw-and-otel': {
    title: '같은 비용과 캐시 장부', type: 'Metric reconciliation',
    question: 'Result의 비용·turn·token·cache 수치가 projection에서 바뀌었는가?',
    consequence: 'cost 0.016301, 7443ms, two turns와 모든 token·cache 합계가 정확히 일치했다.', art: 'telemetry',
  },
  'tool-id-survived-raw-and-otel': {
    title: '세 표면을 통과한 도구 ID', type: 'Lineage',
    question: 'ToolUse와 ToolResult의 연결 ID가 OTel에서도 유지됐는가?',
    consequence: '동일 ID가 raw sequence 18·23과 OTel sequence 11·18·23에 남았다.', art: 'continuity',
  },
  'otel-attributes-were-bounded': {
    title: '비워 둔 OTel 본문', type: 'Privacy audit',
    question: 'OTel attribute에 prompt·payload·content나 합성 secret이 들어갔는가?',
    consequence: '본문 key는 없었고 sequence, type, link, terminal 수치만 남았다.', art: 'boundary',
  },
  'auxiliary-haiku-usage-recorded': {
    title: 'Opus 응답 뒤의 Haiku', type: 'Usage boundary',
    question: '보이는 응답 모델과 provider billing label은 완전히 같은가?',
    consequence: '세 AssistantMessage는 Opus였지만 terminal usage에는 보조 Haiku도 기록됐다.', art: 'separation',
  },
  'attempt-integrity-files-match': {
    title: '여덟 파일의 SHA 봉인', type: 'Integrity',
    question: '판독에 쓴 파일이 integrity manifest와 일치하는가?',
    consequence: 'manifest, verdict, raw, callbacks, OTel, audit 여덟 hash를 재계산해 모두 일치했다.', art: 'integrity',
  },
  'empty-hook-and-permission-files-observed': {
    title: '비어 있던 두 callback 장부', type: 'Empty evidence',
    question: '이번 lookup에서 hook·permission callback 사건이 있었는가?',
    consequence: '두 callback 파일은 빈 파일 hash였으며 이번 case의 사건 부재만 증명한다.', art: 'unknown',
  },
  'sequence-index-supports-gated-raw-lookup': {
    title: '권한 있는 원본 조회의 열쇠', type: 'Inference',
    question: 'bounded span의 sequence와 tool ID를 무엇에 쓸 수 있는가?',
    consequence: '권한이 통제된 raw envelope를 찾는 index로 쓸 수 있지만 실제 authorization은 실행하지 않았다.', art: 'unknown',
  },
  'dashboard-is-a-consumer-not-source': {
    title: '증거를 만들지 않는 대시보드', type: 'Interpretation',
    question: '화면이 열렸다는 사실이 실행 증거를 대신할 수 있는가?',
    consequence: '판정은 화면 없이 raw와 projection을 대조해 나왔으므로 대시보드는 source chain의 소비자다.', art: 'telemetry',
  },
  'redacted-raw-is-not-byte-identical-provider-payload': {
    title: 'wire bytes가 아닌 raw', type: 'Correction',
    question: '이 raw archive를 provider bytes의 무가공 복사본이라 불러도 되는가?',
    consequence: 'SDK shape와 순서는 남겼지만 credential을 저장 전에 제거한 durable envelope라고 불러야 한다.', art: 'correction',
  },
  'local-jsonl-otel-is-not-native-sdk-otel-export': {
    title: 'native로 부르면 안 되는 OTel', type: 'Correction',
    question: '로컬 JsonlSpanExporter 결과가 Claude runtime native OTLP export인가?',
    consequence: '같은 recorder를 투영한 application instrumentation이며 native exporter는 실행하지 않았다.', art: 'correction',
  },
  'init-model-is-not-response-model-proof': {
    title: 'init 모델의 좁은 증언', type: 'Correction',
    question: 'init.model 하나로 실제 응답 모델을 판정해도 되는가?',
    consequence: '응답 모델은 세 AssistantMessage.model로 판정하도록 Python 분석 코드와 테스트를 고쳤다.', art: 'correction',
  },
  'opus-response-is-not-opus-only-provider-run': {
    title: 'Opus-only로 부풀린 응답', type: 'Correction',
    question: '보이는 세 응답이 Opus면 provider run 전체도 Opus-only인가?',
    consequence: 'Result model_usage에 보조 Haiku가 있어 visible response와 전체 usage를 분리해야 한다.', art: 'correction',
  },
  'raw-count-need-not-equal-span-count': {
    title: '같은 수가 완전성은 아니다', type: 'Correction',
    question: 'raw count와 span count가 같아야만 완전한가?',
    consequence: '한 사건의 합법적 다중 span 때문에 carrier coverage와 cardinality 규칙을 함께 검사해야 한다.', art: 'correction',
  },
  'carrier-coverage-is-not-semantic-completeness': {
    title: '운송장이 의미 전부는 아니다', type: 'Correction',
    question: '모든 raw에 carrier가 있으면 provider 동작 전체를 이해한 것인가?',
    consequence: '누락 방지 조건일 뿐 span 의미의 충분성이나 provider 전체 관측을 증명하지 않는다.', art: 'correction',
  },
  'otel-is-not-independent-provider-proof': {
    title: '두 번째 독립 관찰자가 아닌 OTel', type: 'Correction',
    question: 'raw와 OTel 일치를 독립 provider 관측의 교차 검증이라 불러도 되는가?',
    consequence: '둘은 같은 recorder의 source와 projection이므로 수집 파이프라인 정합성만 증명한다.', art: 'correction',
  },
  'fsync-code-path-is-not-syscall-trace': {
    title: '코드의 fsync와 syscall 영수증', type: 'Correction',
    question: '소스에 os.fsync가 있으면 runtime에서 syscall을 직접 관찰한 것인가?',
    consequence: '구현 경로와 완성 artifact는 확인했지만 이번 trace에는 syscall receipt가 없다.', art: 'correction',
  },
  'normal-flush-does-not-prove-failure-recovery': {
    title: '정상 종료가 말하지 못한 장애', type: 'Correction',
    question: 'force_flush와 shutdown 성공이 disk failure 복구까지 증명하는가?',
    consequence: '정상 파일 완성만 관찰했으며 failure, kill, retry, recovery는 별도 실험이 필요하다.', art: 'correction',
  },
  'historical-source-hash-did-not-bind-probe-code': {
    title: '덜 묶인 역사적 source hash', type: 'Correction',
    question: '당시 manifest가 chapter와 probe·runtime·audit 코드를 모두 묶었는가?',
    consequence: 'chapter bytes만 묶었으므로 현재 코드를 과거 실행 원인으로 소급 확정하면 안 된다.', art: 'correction',
  },
  'canary-redaction-is-not-general-pii-proof': {
    title: '한 canary가 모든 PII는 아니다', type: 'Correction',
    question: '네 redaction 지점 성공으로 모든 비밀·PII 탐지를 보장할 수 있는가?',
    consequence: '한 합성 형식과 민감 key만 관찰했으므로 자유문·중첩·binary까지 일반화하면 안 된다.', art: 'correction',
  },
  'billing-labels-do-not-reveal-auxiliary-role': {
    title: '비용 label이 숨긴 역할', type: 'Correction',
    question: 'Haiku 사용량만으로 내부에서 맡은 작업을 설명할 수 있는가?',
    consequence: 'token과 cost는 있지만 역할 event는 없어 내부 작업을 추정하지 않는다.', art: 'correction',
  },
  'empty-callback-file-is-not-global-policy-absence': {
    title: '빈 파일을 정책 부재로 읽지 않기', type: 'Correction',
    question: 'callback row가 없으면 runtime 전체에 permission policy가 없는가?',
    consequence: '이번 case에서 등록·발생한 callback이 없었다는 범위만 말할 수 있다.', art: 'correction',
  },
  'eight-pass-audit-is-not-complete-observability-proof': {
    title: '여덟 PASS의 좁은 인증', type: 'Correction',
    question: '8개 check PASS가 프로덕션 옵저버빌리티 전체 완성을 인증하는가?',
    consequence: '선언된 frozen scope와 schema만 통과했으며 외부 exporter·접근 제어·장애 복구는 남았다.', art: 'correction',
  },
  'native-claude-otel-export-not-observed': {
    title: '실행하지 않은 native OTel', type: 'Not observed',
    question: 'Claude runtime의 native OTLP exporter와 collector를 실제로 붙였는가?',
    consequence: '이번 case는 local application OTel만 실행했으며 native export는 관찰하지 않았다.', art: 'unknown',
  },
  'exporter-failure-disk-retry-not-observed': {
    title: '오지 않은 disk retry', type: 'Not observed',
    question: 'write·fsync 실패나 disk full 뒤 retry queue가 작동했는가?',
    consequence: '정상 성공 case라 실패와 재전송 경로는 관찰되지 않았다.', art: 'unknown',
  },
  'remote-datadog-allowlist-not-observed': {
    title: '연결하지 않은 원격 collector', type: 'Not observed',
    question: 'Datadog이나 production attribute allowlist를 실제로 검증했는가?',
    consequence: '원격 exporter와 allowlist는 이번 실행에 없었다.', art: 'unknown',
  },
  'perfetto-projection-not-observed': {
    title: '열지 않은 Perfetto 시간축', type: 'Not observed',
    question: 'Perfetto trace를 만들고 다시 읽었는가?',
    consequence: '생성·로드·타임라인 readback을 실행하지 않았다.', art: 'unknown',
  },
  'genkit-projection-not-observed': {
    title: '만들지 않은 Genkit graph', type: 'Not observed',
    question: 'raw sequence를 Genkit node lineage로 실제 변환했는가?',
    consequence: 'graph projection과 node readback은 실행하지 않았다.', art: 'unknown',
  },
  'opik-remote-evaluation-not-observed': {
    title: '올리지 않은 Opik 평가', type: 'Not observed',
    question: 'claim evaluation을 Opik에 저장하고 다시 조회했는가?',
    consequence: 'remote upload와 readback은 이번 attempt에 없었다.', art: 'unknown',
  },
  'abnormal-shutdown-not-observed': {
    title: '끊어 보지 않은 프로세스', type: 'Not observed',
    question: 'kill·crash·abort에서 raw와 OTel이 무엇을 보존하는지 시험했는가?',
    consequence: '정상 종료만 실행해 비정상 종료의 보존과 복구는 미관찰이다.', art: 'unknown',
  },
  'access-control-readback-not-observed': {
    title: '열지 않은 권한 조회문', type: 'Not observed',
    question: 'OTel sequence로 보호된 raw를 실제 사용자 권한 아래 조회했는가?',
    consequence: 'sequence index 가능성만 추론했으며 authorization flow는 실행하지 않았다.', art: 'unknown',
  },
  'native-otel-comparison-required': {
    title: '다음 시험: 두 OTel 나란히', type: 'Next experiment',
    question: 'native Claude OTel과 application projection을 어떻게 구분할 것인가?',
    consequence: '로컬 OTLP collector를 붙인 순차 run으로 두 schema와 event source를 직접 대조해야 한다.', art: 'unknown',
  },
  'source-bound-probe-rerun-required': {
    title: '다음 시험: 코드까지 묶은 manifest', type: 'Next experiment',
    question: '실행 provenance를 chapter bytes보다 강하게 만들려면 무엇을 묶어야 하는가?',
    consequence: 'probe, runtime, audit, redaction, telemetry와 public prompt hash를 넣어 재실행해야 한다.', art: 'unknown',
  },
  'crash-and-disk-failure-matrix-required': {
    title: '다음 시험: 내구성 파괴 행렬', type: 'Next experiment',
    question: '프로덕션 durability를 말하려면 어떤 실패를 직접 만들어야 하는가?',
    consequence: 'write·fsync failure, disk full, process kill, recovery scan을 각각 통제된 child process로 관찰해야 한다.', art: 'unknown',
  },
  'redaction-matrix-required': {
    title: '다음 시험: redaction 행렬', type: 'Next experiment',
    question: '일반적인 비밀·PII 보호 범위를 어떻게 검증할 것인가?',
    consequence: '여러 credential 형식, 민감 key, nested·free text·unicode·binary metadata를 저장 경로별로 시험해야 한다.', art: 'unknown',
  },
  'external-lineage-readback-required': {
    title: '다음 시험: 외부 lineage 왕복', type: 'Next experiment',
    question: '대시보드를 실제 evidence consumer로 증명하려면 무엇이 필요한가?',
    consequence: 'raw sequence에서 external node, claim, evaluation ID까지 업로드하고 다시 조회해야 한다.', art: 'unknown',
  },
}
