export const ch12CardMeta = {
  'attempt-integrity-files-match': {
    title: '열여섯 기록의 봉인', type: 'Integrity',
    question: '두 CH12 attempt의 원본과 artifact hash가 현재 파일에서도 모두 일치하는가?',
    consequence: '각 attempt의 integrity 항목 8개, 총 16개가 현재 bytes와 일치했다.', art: 'integrity',
  },
  'actual-opus-and-serial-execution': {
    title: '차례로 열린 두 실행', type: 'Continuity',
    question: '두 case는 실제 Opus 5로 동시 실행 없이 수행됐는가?',
    consequence: 'actual model은 Opus 5였고 동시성 1로 첫 실행 종료 뒤 두 번째를 시작했다.', art: 'continuity',
  },
  'four-source-hashes-bound-at-execution': {
    title: '네 원전의 실행 봉인', type: 'Provenance',
    question: '실험 당시 장과 실행 코드가 어느 버전이었는지 추적할 수 있는가?',
    consequence: 'chapter, probe, case, runtime source SHA-256 네 개를 두 manifest가 묶었다.', art: 'integrity',
  },
  'same-controlled-full-output': {
    title: '같은 대형 화물', type: 'Control',
    question: 'runtime과 host case가 정말 같은 full payload를 다뤘는가?',
    consequence: '두 artifact는 60,082 bytes/characters와 같은 marker·SHA-256을 가졌다.', art: 'result',
  },
  'runtime-overflow-chain': {
    title: '바뀌어 도착한 화물', type: 'Runtime',
    question: 'handler의 60,082-character result는 모델에게 그대로 전달됐는가?',
    consequence: 'ToolUse와 handler 뒤 모델에는 1,587-character overflow ToolResult가 도착했다.', art: 'result',
  },
  'runtime-spill-read-back': {
    title: '사라지기 전의 회수', type: 'Artifact',
    question: 'overflow notice의 file path는 실제 artifact로 확인됐는가?',
    consequence: 'capture host가 정리 전에 열어 size, marker, hash를 검증하고 복제했다.', art: 'memory',
  },
  'host-persisted-preview-chain': {
    title: '먼저 보관한 호스트', type: 'Host Policy',
    question: 'host persisted-preview는 실제 write와 bounded result를 분리했는가?',
    consequence: 'host persist와 handler 뒤 모델에게 실제 340-character preview만 전달됐다.', art: 'result',
  },
  'error-text-flag-and-terminal-state-differ': {
    title: '세 개의 서로 다른 상태', type: 'Terminal',
    question: 'Error로 시작하는 text가 곧 ToolResult error와 run failure를 뜻하는가?',
    consequence: 'text는 Error지만 block flag는 null이고 terminal Result는 success였다.', art: 'separation',
  },
  'token-surfaces-recorded': {
    title: '세 겹의 토큰 계기', type: 'Usage',
    question: 'stream estimate와 API usage와 model usage를 각각 읽을 수 있는가?',
    consequence: 'thinking estimate, terminal usage, Opus·Haiku model usage가 별도 필드에 남았다.', art: 'result',
  },
  'raw-and-otel-sequences-align': {
    title: '겹쳐진 두 실행의 흔적', type: 'Telemetry',
    question: 'raw SDK 사건과 공개 OTel projection의 sequence가 맞는가?',
    consequence: '64개와 52개 SDK sequence가 각 trace의 sdk.message와 정확히 일치했다.', art: 'integrity',
  },
  'single-point-is-not-exact-50k-boundary': {
    title: '한 점으로 그은 경계', type: 'Correction',
    question: '60,082자에서 외부화됐으니 exact gate가 50,000자라고 확정할 수 있는가?',
    consequence: '한 관찰점은 경계의 정확한 위치와 단위를 결정하지 못한다.', art: 'correction',
  },
  'aggregate-200k-limit-not-observed': {
    title: '실행하지 않은 이백 킬로', type: 'Correction',
    question: '한 turn의 여러 결과가 200K에 도달하는 aggregate case를 실행했는가?',
    consequence: '이번 두 case는 단일 result이므로 200K 설명은 관찰 사실이 아니다.', art: 'correction',
  },
  'characters-bytes-repr-and-tokens-differ': {
    title: '서로 다른 네 단위', type: 'Correction',
    question: 'character, byte, Python representation, API token을 한 숫자로 표시해도 되는가?',
    consequence: 'host preview의 실제 text는 340자, wrapper representation은 376자였다.', art: 'correction',
  },
  'sdk-files-persisted-event-is-not-current-python-type': {
    title: '존재하지 않은 전용 사건', type: 'Correction',
    question: 'Python SDK 0.2.128에서 SDKFilesPersistedEvent를 관찰했다고 말할 수 있는가?',
    consequence: '현재 export type에도 두 run의 SystemMessage에도 그 전용 event는 없었다.', art: 'correction',
  },
  'overflow-text-is-not-run-failure': {
    title: '안내문과 실패의 거리', type: 'Correction',
    question: 'overflow notice의 Error prefix만으로 전체 run을 실패로 분류해야 하는가?',
    consequence: 'ToolResult flag와 terminal status를 함께 읽어야 하며 이번 run은 성공했다.', art: 'correction',
  },
  'model-attribution-is-not-host-ownership-proof': {
    title: '모델이 붙인 잘못된 소유자', type: 'Correction',
    question: '모델이 host tool policy라고 답하면 실제 write 주체도 host tool인가?',
    consequence: 'controlled handler는 write하지 않았고 process evidence가 모델 attribution과 충돌했다.', art: 'correction',
  },
  'exact-internal-writer-is-not-observed': {
    title: '이름 없는 내부 기록자', type: 'Correction',
    question: 'runtime 외부화를 관찰했으니 정확한 내부 writer 함수까지 이름 붙일 수 있는가?',
    consequence: 'handler 뒤 외부화는 보였지만 전용 event가 없어 숨은 component는 특정하지 못했다.', art: 'correction',
  },
  'host-self-report-is-not-disk-proof': {
    title: '경로 문장만으로는 부족하다', type: 'Correction',
    question: 'preview 안의 path와 hash만으로 disk persistence가 증명되는가?',
    consequence: 'host process event와 capture-time read-back이 실제 file을 증명했다.', art: 'correction',
  },
  'thinking-estimate-is-not-terminal-usage': {
    title: '추정치와 영수증', type: 'Correction',
    question: 'thinking_tokens estimate를 billing/API token count로 써도 되는가?',
    consequence: 'stream 추정 신호와 terminal input/output usage는 다른 surface다.', art: 'correction',
  },
  'primary-opus-is-not-only-provider-usage': {
    title: '주연 뒤의 하이쿠', type: 'Correction',
    question: 'primary model이 Opus 5면 provider usage도 전부 Opus인가?',
    consequence: '두 Result의 model_usage에는 Haiku 4.5 사용도 함께 남았다.', art: 'correction',
  },
  'two-run-usage-difference-is-not-general-savings': {
    title: '한 쌍으로 만든 절감률', type: 'Correction',
    question: '두 run의 token 차이를 persisted-preview의 일반 절감률로 발표해도 되는가?',
    consequence: '출력 길이와 cache 상태가 섞인 단일 쌍이라 일반화할 수 없다.', art: 'correction',
  },
  'captured-is-not-claim-pass': {
    title: '수집 완료와 판정 통과', type: 'Correction',
    question: 'CAPTURED와 assertion 0은 threshold 주장의 자동 합격을 뜻하는가?',
    consequence: 'verdict TODO와 passed null인 수동 판독 대기 표식이다.', art: 'correction',
  },
  'otel-is-not-independent-provider-proof': {
    title: '같은 기록의 두 번째 그림', type: 'Correction',
    question: '이 OTel trace를 raw와 독립된 provider 관측이라고 불러도 되는가?',
    consequence: '같은 recorder가 raw SDK와 process event를 OTel로 투영했다.', art: 'correction',
  },
  'public-projection-must-redact-runtime-identifiers': {
    title: '공개할 필요 없는 길', type: 'Correction',
    question: 'runtime spill의 로컬 절대경로와 session ID도 교육 페이지에 공개해야 하는가?',
    consequence: '공개판은 content hash와 redacted label만 보존하고 runtime 식별자는 제거했다.', art: 'correction',
  },
  'exact-boundary-sweep-not-observed': {
    title: '아직 훑지 않은 경계', type: 'Unknown',
    question: '49K, 50K, 51K와 token density가 다른 payload를 비교했는가?',
    consequence: '정확한 threshold와 governing unit를 찾는 순차 boundary sweep이 남았다.', art: 'unknown',
  },
  'aggregate-budget-pressure-not-observed': {
    title: '모이지 않은 여러 결과', type: 'Unknown',
    question: '같은 turn에 여러 tool result를 모아 aggregate pressure를 관찰했는가?',
    consequence: '단일 result만 실행했으므로 multi-result workload가 더 필요하다.', art: 'unknown',
  },
  'runtime-spill-lifecycle-not-observed': {
    title: '정리 뒤의 파일 수명', type: 'Unknown',
    question: 'runtime 원본 spill file이 session/process cleanup 뒤에도 남는가?',
    consequence: 'capture 중 read-back만 확인했고 cleanup 이후 수명은 관찰하지 않았다.', art: 'unknown',
  },
  'messages-api-count-token-comparison-not-observed': {
    title: '다른 API의 토큰 저울', type: 'Unknown',
    question: 'Messages API count_tokens와 Agent SDK runtime usage를 실제로 비교했는가?',
    consequence: 'cookbook 코드는 읽었지만 API-family 비교 실행은 아직 없다.', art: 'unknown',
  },
  'repeated-cost-latency-distribution-not-observed': {
    title: '아직 없는 반복 표본', type: 'Unknown',
    question: 'preview 정책의 cost와 latency 분포를 반복 실행으로 측정했는가?',
    consequence: '현재 한 쌍은 benchmark가 아니며 반복 표본이 필요하다.', art: 'unknown',
  },
  'unicode-unit-separation-not-observed': {
    title: '아직 오지 않은 유니코드 화물', type: 'Unknown',
    question: 'Unicode payload에서 byte, character, representation, token 차이를 측정했는가?',
    consequence: '이번 ASCII payload에서는 byte와 character가 같아 별도 실행이 필요하다.', art: 'unknown',
  },
}
