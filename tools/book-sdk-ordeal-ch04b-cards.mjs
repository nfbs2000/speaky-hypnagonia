export const ch04bCardMeta = {
  'attempt-integrity-and-source-provenance': {
    title: '열한 개의 봉인', type: 'Integrity',
    question: '증거 파일 일곱 개와 실행 source 네 개가 실제 실행 버전에 묶였는가?',
    consequence: 'integrity 7/7과 source provenance 4/4가 일치했다.', art: 'integrity',
  },
  'actual-opus-and-serial-execution': {
    title: '한 줄로 선 실행', type: 'Continuity',
    question: '이 계획 실험은 실제 Opus 5를 동시 호출 없이 실행했는가?',
    consequence: 'actual primary model은 Opus 5였고 provider concurrency는 1이었다.', art: 'continuity',
  },
  'same-session-two-permission-modes': {
    title: '같은 방의 두 열쇠', type: 'Lifecycle',
    question: '계획과 실행은 서로 다른 대화인가, 같은 session의 두 permission mode인가?',
    consequence: '같은 opaque session에서 plan init 뒤 acceptEdits init이 다시 나타났다.', art: 'continuity',
  },
  'read-investigation-in-plan': {
    title: '실행 전의 독해', type: 'Investigation',
    question: 'plan mode에서도 실제 파일 조사와 오류 복구가 일어났는가?',
    consequence: 'Glob와 Read가 실행됐고 잘못된 경로 error 뒤 수정 경로가 성공했다.', art: 'recovery',
  },
  'write-disabled-but-plan-edit-succeeds': {
    title: '닫힌 펜과 열린 교정', type: 'Separation',
    question: 'Write가 꺼졌다면 계획 artifact도 만들 수 없었는가?',
    consequence: 'Write는 거부됐지만 격리된 계획 artifact의 Edit는 성공했다.', art: 'separation',
  },
  'target-workspace-unchanged-before-approval': {
    title: '움직이지 않은 작업장', type: 'Boundary',
    question: '계획 artifact가 바뀌는 동안 애플리케이션 source도 함께 바뀌었는가?',
    consequence: 'baseline과 after-plan의 target app hash는 같았다.', art: 'integrity',
  },
  'exit-plan-permission-gate-retried': {
    title: '두 번 닫힌 출구', type: 'Permission',
    question: 'ExitPlanMode 요청은 외부 승인 없이 자동으로 실행 mode를 열었는가?',
    consequence: '두 요청 모두 callback에서 deny됐고 terminal denial에도 남았다.', art: 'denial',
  },
  'host-program-approval-and-explicit-mode-restore': {
    title: '호스트가 돌린 열쇠', type: 'Control',
    question: '누가 승인 기록을 남기고 acceptEdits mode를 복원했는가?',
    consequence: 'host-program 승인 뒤 host-owned mode transition이 명시적으로 기록됐다.', art: 'permission',
  },
  'application-edit-after-approval': {
    title: '승인 뒤의 한 줄', type: 'Execution',
    question: '애플리케이션 Edit와 hash 변경은 승인 경계 뒤에만 나타났는가?',
    consequence: '승인과 mode 복원 뒤 app Edit가 성공하고 target hash가 바뀌었다.', art: 'result',
  },
  'raw-otel-sequences-and-model-usage': {
    title: '겹쳐진 구백열한 흔적', type: 'Telemetry',
    question: 'raw SDK와 OTel의 실행 sequence가 실제로 대응하는가?',
    consequence: '911개 sequence가 일치했고 terminal usage는 Opus와 Haiku를 분리했다.', art: 'integrity',
  },
  'plan-mode-is-not-no-tools': {
    title: '도구 없는 계획이라는 착각', type: 'Correction',
    question: 'plan mode를 모든 도구가 멈추는 상태로 설명해도 되는가?',
    consequence: '읽기 도구와 plan artifact Edit가 실제로 실행됐으므로 설명을 고쳐야 한다.', art: 'correction',
  },
  'mutation-request-zero-is-false': {
    title: '숫자 영의 함정', type: 'Correction',
    question: '승인 전 mutation tool request가 항상 0이라고 판정해도 되는가?',
    consequence: 'plan artifact Edit가 있었으므로 path class와 target hash로 경계를 판단한다.', art: 'correction',
  },
  'write-absence-is-not-plan-file-absence': {
    title: '없는 Write, 남은 계획', type: 'Correction',
    question: 'Write 오류만으로 계획 파일도 없었다고 결론 내릴 수 있는가?',
    consequence: '이어진 Edit가 계획 artifact를 갱신했으므로 그 결론은 성립하지 않는다.', art: 'correction',
  },
  'host-approval-is-not-human-click': {
    title: '사람이 누르지 않은 승인', type: 'Correction',
    question: 'programmatic host approval을 실제 사용자의 버튼 클릭이라 불러도 되는가?',
    consequence: 'actor는 host-program이었다. HITL UI는 이번 실행에서 검증하지 않았다.', art: 'correction',
  },
  'mode-restore-is-host-owned': {
    title: '저절로 돌아오지 않은 모드', type: 'Correction',
    question: 'acceptEdits 복원을 SDK의 자동 기억 기능으로 설명해도 되는가?',
    consequence: 'host가 이전 mode를 저장하고 set_permission_mode로 명시 복원했다.', art: 'correction',
  },
  'five-stage-workflow-not-guaranteed': {
    title: '보장되지 않은 다섯 문', type: 'Correction',
    question: '구조화된 plan이 나왔으니 SDK가 정확한 다섯 heading을 보장하는가?',
    consequence: '그 heading을 보장하는 Python option이나 event는 관찰되지 않았다.', art: 'correction',
  },
  'full-sparse-not-public-option': {
    title: '노출되지 않은 밀도 조절기', type: 'Correction',
    question: 'full과 sparse 계획 선택을 현재 Python SDK option으로 가르칠 수 있는가?',
    consequence: '교육 개념은 가능하지만 검증된 공개 option은 확인하지 못했다.', art: 'correction',
  },
  'primary-opus-is-not-only-provider-usage': {
    title: '주연 뒤의 하이쿠', type: 'Correction',
    question: 'primary model이 Opus 5면 provider usage도 전부 Opus인가?',
    consequence: 'terminal model_usage에는 Haiku 4.5도 함께 기록됐다.', art: 'correction',
  },
  'permission-callback-alone-is-incomplete': {
    title: '한 창으로 본 불완전한 시간선', type: 'Correction',
    question: 'permission callback만 읽으면 plan turn의 모든 도구를 볼 수 있는가?',
    consequence: 'raw SDK, hook, callback, process snapshot을 결합해야 전체 경계가 보인다.', art: 'correction',
  },
  'captured-and-edit-success-are-not-test-pass': {
    title: '수집과 검증의 거리', type: 'Correction',
    question: 'CAPTURED와 Edit 성공을 테스트 통과로 표시해도 되는가?',
    consequence: 'Bash test는 실행되지 않았으므로 파일 변경과 검증 성공을 분리한다.', art: 'correction',
  },
  'human-permission-ui-not-observed': {
    title: '아직 누르지 않은 버튼', type: 'Unknown',
    question: '실제 사용자의 permission reply와 승인 버튼을 관찰했는가?',
    consequence: '이번 actor는 host-program이다. live UI case가 더 필요하다.', art: 'unknown',
  },
  'auto-plan-restore-not-observed': {
    title: '아직 돌아오지 않은 Auto', type: 'Unknown',
    question: 'auto에서 plan을 거쳐 정책 범위를 보존해 auto로 돌아왔는가?',
    consequence: '이번 이전 mode는 acceptEdits였으므로 auto 조합은 남은 실험이다.', art: 'unknown',
  },
  'teamlead-approval-not-observed': {
    title: '아직 없는 상위 승인자', type: 'Unknown',
    question: '팀리드나 상위 agent가 이 계획을 실제로 승인했는가?',
    consequence: '단일 agent case였으므로 팀 승인 흐름은 관찰하지 않았다.', art: 'unknown',
  },
  'post-approval-test-not-observed': {
    title: '실행되지 않은 검증', type: 'Unknown',
    question: '승인 뒤 계획에 적힌 테스트까지 실제로 실행했는가?',
    consequence: 'execution turn에는 Bash가 없어 별도 test case가 필요하다.', art: 'unknown',
  },
  'plan-file-provisioner-and-lifecycle-not-observed': {
    title: '계획 파일 뒤의 안개', type: 'Unknown',
    question: '빈 계획 파일을 준비한 component와 정리 시점을 확인했는가?',
    consequence: 'Edit 성공은 보였지만 정확한 provisioner와 lifecycle은 보이지 않았다.', art: 'unknown',
  },
  'deny-revise-product-ux-not-observed': {
    title: '아직 고치지 않은 계획', type: 'Unknown',
    question: '사용자가 수정 요청을 보내고 고친 plan을 다시 승인하는 UX를 실행했는가?',
    consequence: '모델의 재요청만 보였고 실제 revise interaction은 남아 있다.', art: 'unknown',
  },
}
