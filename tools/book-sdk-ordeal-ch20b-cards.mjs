export const ch20bCardMeta = {
  'two-readonly-workers-configured': {
    title: '두 Read 작업자의 설계도', type: 'Configuration',
    question: '두 worker에게 어떤 모델·도구·turn·권한 경계를 설정했는가?',
    consequence: '둘 다 model inherit, Read, maxTurns 3, foreground, dontAsk로 설정됐고 변경 도구는 금지됐다.', art: 'configuration',
  },
  'sequential-leader-contract-configured': {
    title: '리더 경유 인계 계약', type: 'Configuration',
    question: '첫 결과를 두 번째 worker에 전달하는 의도는 어떻게 고정됐는가?',
    consequence: '리더가 첫 foreground 결과를 기다린 뒤 그 원문을 두 번째 prompt에 넣도록 구성했다.', art: 'configuration',
  },
  'runtime-marker-host-boundary-configured': {
    title: '호스트가 만든 실험 표식', type: 'Host boundary',
    question: 'runtime marker는 누가 만들고 어디에 기록했는가?',
    consequence: '호스트가 새 marker와 hash를 만들어 research.txt와 process event에 남기도록 설계했다.', art: 'boundary',
  },
  'all-assistant-messages-used-opus5': {
    title: '여덟 개의 Opus 영수증', type: 'Model receipt',
    question: '설정값이 아니라 실제 AssistantMessage는 어떤 모델을 기록했는가?',
    consequence: '여덟 AssistantMessage.model을 재판독한 결과 모두 claude-opus-5였다.', art: 'result',
  },
  'init-exposed-two-custom-workers': {
    title: '초기화에 나타난 두 worker', type: 'Initialization',
    question: 'init 이벤트에 worker와 tool 표면이 실제로 나타났는가?',
    consequence: 'research-reader와 handoff-reviewer가 agents에, Task와 Read가 tools에 기록됐다.', art: 'init',
  },
  'first-agent-tool-use-observed': {
    title: '첫 번째 위임문', type: 'Delegation',
    question: '리더가 첫 worker를 실제 Agent ToolUse로 호출했는가?',
    consequence: 'sequence 21에서 research-reader를 향한 foreground Agent ToolUse가 관찰됐다.', art: 'tool',
  },
  'first-task-start-linked': {
    title: '첫 task의 부모 표', type: 'Task lifecycle',
    question: '첫 TaskStarted를 부모 Agent 호출과 연결할 수 있는가?',
    consequence: 'task_id, research-reader, local_agent, parent tool_use_id가 하나의 시작 사건에 함께 남았다.', art: 'continuity',
  },
  'first-worker-prompt-had-no-marker': {
    title: '표식 없이 도착한 첫 prompt', type: 'Prompt boundary',
    question: '첫 worker에 보이는 nested prompt에 runtime marker 값이 있었는가?',
    consequence: 'RESEARCH_RESULT 형식 지시는 있었지만 marker literal은 없었다.', art: 'boundary',
  },
  'first-worker-read-linked': {
    title: '첫 Agent 아래의 Read', type: 'Worker execution',
    question: '첫 worker의 Read가 부모 Agent ID를 보존했는가?',
    consequence: 'research-reader가 첫 Agent ID를 parent_tool_use_id로 가진 Read를 한 번 생성했다.', art: 'tool',
  },
  'first-read-returned-runtime-marker': {
    title: 'Read가 건너준 runtime 표식', type: 'Tool receipt',
    question: '첫 Read 결과에 호스트가 심은 marker가 실제로 들어왔는가?',
    consequence: '연결된 ToolResult가 CH20B_RUNTIME_ 표식을 첫 Agent 아래에 반환했다.', art: 'result',
  },
  'first-task-terminal-surfaces-observed': {
    title: '두 표면으로 닫힌 첫 task', type: 'Task terminal',
    question: '첫 task 완료가 어떤 terminal message로 표시됐는가?',
    consequence: '같은 task의 completed TaskUpdated와 TaskNotification이 연속 관찰됐다.', art: 'result',
  },
  'first-agent-result-returned-marker': {
    title: '리더에게 돌아온 첫 봉투', type: 'Delegation receipt',
    question: '첫 Agent ToolResult가 worker 결과와 실행 신원을 반환했는가?',
    consequence: 'marker, research-reader, completed, Opus 5, readCount 1이 하나의 result에 담겼다.', art: 'result',
  },
  'second-agent-started-after-first-terminal': {
    title: '첫 종료 뒤에 열린 두 번째 문', type: 'Ordering',
    question: '두 Agent 위임이 raw stream에서 겹쳤는가, 순차로 시작했는가?',
    consequence: '첫 terminal·result sequence 30~32 뒤 sequence 58에서 두 번째 Agent가 시작했다.', art: 'separation',
  },
  'second-agent-input-contained-first-result': {
    title: '두 번째 prompt의 첫 결과', type: 'Handoff',
    question: '첫 Agent result 원문이 두 번째 Agent input에 실제로 전달됐는가?',
    consequence: 'sequence 32의 RESEARCH_RESULT가 sequence 58 input과 sequence 61 nested prompt에 그대로 들어갔다.', art: 'continuity',
  },
  'second-task-start-linked': {
    title: '두 번째 task의 독립 신원', type: 'Task lifecycle',
    question: '두 번째 TaskStarted는 첫 task와 구분되는가?',
    consequence: '별도 task_id가 두 번째 Agent ID와 handoff-reviewer에 연결됐다.', art: 'continuity',
  },
  'second-worker-read-linked': {
    title: '두 번째 Agent 아래의 Read', type: 'Worker execution',
    question: 'review.txt Read가 두 번째 Agent 부모를 보존했는가?',
    consequence: 'handoff-reviewer가 두 번째 Agent ID 아래에서 Read를 한 번 실행했다.', art: 'tool',
  },
  'second-read-returned-review-marker': {
    title: '리뷰 파일의 확인 표식', type: 'Tool receipt',
    question: '두 번째 Read가 자신의 별도 marker를 반환했는가?',
    consequence: '연결된 ToolResult가 CH20B_REVIEW_FILE_CONFIRMED를 반환했다.', art: 'result',
  },
  'second-task-terminal-surfaces-observed': {
    title: '두 표면으로 닫힌 두 번째 task', type: 'Task terminal',
    question: '두 번째 task 종료에도 두 terminal message가 나타났는가?',
    consequence: 'completed TaskUpdated와 TaskNotification이 두 marker를 합친 summary와 함께 남았다.', art: 'result',
  },
  'second-agent-result-returned-combined-review': {
    title: '두 marker를 합친 리뷰 봉투', type: 'Delegation receipt',
    question: '두 번째 Agent result가 첫 결과와 리뷰 결과를 함께 보존했는가?',
    consequence: 'REVIEW_RESULT에 두 marker, reviewer 신원, Opus 5, readCount 1이 함께 남았다.', art: 'result',
  },
  'leader-synthesis-and-success-observed': {
    title: '리더가 닫은 인계 사슬', type: 'Synthesis',
    question: '두 worker 결과 뒤 리더 종합과 성공 Result까지 이어졌는가?',
    consequence: 'LEADER_TEAM_SYNTHESIS가 leader AssistantMessage와 success Result에 보존됐다.', art: 'result',
  },
  'two-distinct-agent-and-task-identities': {
    title: '섞이지 않은 두 위임', type: 'Identity',
    question: '두 Agent, task, worker 신원을 서로 구분할 수 있는가?',
    consequence: '두 tool_use_id, task_id, agentId가 모두 다르고 각 Read와 terminal이 자신의 부모에 연결됐다.', art: 'separation',
  },
  'observed-tool-inventory-was-agent-and-read-only': {
    title: '네 번만 열린 도구 인벤토리', type: 'Tool inventory',
    question: '79개 SDK message에서 실제 ToolUse로 나탄 도구는 무엇인가?',
    consequence: 'Agent 2회와 Read 2회뿐이며 SendMessage, TeamCreate, Bash, Edit, Write는 없었다.', art: 'tool',
  },
  'attempt-integrity-files-match': {
    title: '일곱 파일의 SHA 봉인', type: 'Integrity',
    question: '출판에 쓴 raw·process·callback·OTel 파일이 manifest와 일치하는가?',
    consequence: '보존된 일곱 파일의 SHA-256을 재계산해 모두 일치했다.', art: 'integrity',
  },
  'raw-and-otel-sequences-align': {
    title: '82 원본과 84 span의 정렬', type: 'Telemetry',
    question: '79 SDK message와 3 host event가 OTel projection에서 source sequence를 보존했는가?',
    consequence: '같은 AttemptRecorder가 만든 84 span이 단일 trace에서 원본 sequence를 보존했다.', art: 'telemetry',
  },
  'auxiliary-haiku-usage-recorded': {
    title: 'Opus 응답 뒤의 Haiku', type: 'Usage boundary',
    question: '보이는 AssistantMessage 모델과 provider 전체 model usage가 같은가?',
    consequence: '응답은 Opus 5였지만 terminal model_usage에 Haiku 4.5 보조 사용이 함께 남았다.', art: 'separation',
  },
  'initial-leader-prompt-marker-absence-inferred': {
    title: '최초 리더 prompt의 빈칸', type: 'Inference',
    question: '리더가 처음부터 marker를 몰랐다고 raw artifact로 직접 확정할 수 있는가?',
    consequence: '현재 source에 literal은 없지만 역사적 attempt가 initial prompt hash를 묶지 않아 추론으로만 남겼다.', art: 'unknown',
  },
  'runtime-only-causality-not-fully-proven': {
    title: '완전히 묶이지 않은 marker 인과', type: 'Correction',
    question: 'marker가 오직 첫 worker Read 때문에 두 번째 worker로 갔다고 단정할 수 있는가?',
    consequence: '관찰 순서는 맞지만 initial leader/system prompt가 provenance-bound되지 않아 완전한 인과는 미증명이다.', art: 'correction',
  },
  'two-agent-definitions-are-not-native-team-proof': {
    title: '두 Agent를 Team으로 부르지 않기', type: 'Correction',
    question: '두 local_agent task 실행을 native Team 실행으로 바꿔 불러도 되는가?',
    consequence: 'mailbox, shared claim, peer lifecycle 사건이 없으므로 두 표면은 분리해야 한다.', art: 'correction',
  },
  'sendmessage-hint-is-not-tool-execution': {
    title: '안내 문구와 실행의 거리', type: 'Correction',
    question: 'Agent result 안내의 SendMessage 문자열을 ToolUse 실행으로 보아도 되는가?',
    consequence: '문자열 hint는 있었지만 SendMessage ToolUseBlock은 0건이었다.', art: 'correction',
  },
  'leader-mediated-edge-is-not-direct-worker-edge': {
    title: 'worker 사이에 놓여 있는 리더', type: 'Correction',
    question: '첫 worker가 두 번째 worker에게 직접 message를 보냈다고 그려도 되는가?',
    consequence: '첫 result와 두 번째 input은 모두 leader lane이므로 화살표는 worker→leader→worker여야 한다.', art: 'correction',
  },
  'terminal-success-alone-is-not-handoff-proof': {
    title: '성공 한 줄의 부족한 증언', type: 'Correction',
    question: '최종 success와 marker만으로 handoff를 증명할 수 있는가?',
    consequence: '두 Agent input/result, parent ID, terminal 순서를 함께 연결해야 한다.', art: 'correction',
  },
  'init-model-is-not-response-model-proof': {
    title: 'init 모델의 좁은 증언', type: 'Correction',
    question: 'init.model만으로 실제 응답 모델을 판정해도 되는가?',
    consequence: '응답 모델은 여덟 AssistantMessage.model을 직접 읽어 판정했다.', art: 'correction',
  },
  'opus-response-is-not-opus-only-provider-run': {
    title: 'Opus-only로 부풀린 응답', type: 'Correction',
    question: '모든 응답이 Opus였다면 provider run 전체도 Opus-only인가?',
    consequence: 'Result에 Haiku 보조 사용이 있어 visible response와 전체 usage를 분리해야 한다.', art: 'correction',
  },
  'python-task-classes-have-no-sdk-prefix': {
    title: '없는 SDK 접두사', type: 'Correction',
    question: 'Python 0.2.128 task class를 SDKTask*Message로 가르쳐도 되는가?',
    consequence: '실제 이름은 TaskStartedMessage, TaskProgressMessage, TaskUpdatedMessage, TaskNotificationMessage다.', art: 'correction',
  },
  'agent-task-names-must-not-be-collapsed': {
    title: 'Agent와 Task의 다른 표면', type: 'Correction',
    question: 'options, init, actual ToolUse의 이름을 하나로 정규화해도 되는가?',
    consequence: 'options와 ToolUse는 Agent, init tools는 Task였으므로 표면별 원본 이름을 보존해야 한다.', art: 'correction',
  },
  'otel-is-not-independent-provider-proof': {
    title: '독립 관찰자가 아닌 OTel', type: 'Correction',
    question: '84 OTel span을 raw SDK와 독립된 provider 교차 검증으로 불러도 되는가?',
    consequence: '둘은 같은 AttemptRecorder의 원본과 projection이므로 수집 파이프라인 정합성만 증명한다.', art: 'correction',
  },
  'historical-probe-source-was-not-bound': {
    title: '소스를 덜 묶은 역사적 attempt', type: 'Correction',
    question: '2026-08-03 manifest가 probe·case·runtime source와 prompt까지 해시로 묶었는가?',
    consequence: '당시 source_hash는 chapter bytes만 묶었고 향후 probe에 세 source hash를 추가했다.', art: 'correction',
  },
  'configured-concurrency-is-not-sequential-proof': {
    title: '설정값이 아닌 순차 증거', type: 'Correction',
    question: 'concurrency 1과 foreground 설정만으로 순차 실행을 확정해도 되는가?',
    consequence: '순차 판정은 첫 terminal/result가 두 번째 Agent보다 앞선 raw sequence에서 나왔다.', art: 'correction',
  },
  'direct-worker-message-not-observed': {
    title: '없었던 worker 직접 메시지', type: 'Not observed',
    question: 'worker A→worker B direct message event나 parent edge가 있었는가?',
    consequence: '직접 edge는 관찰되지 않았고 인계는 leader를 경유했다.', art: 'unknown',
  },
  'sendmessage-tool-use-not-observed': {
    title: '실행되지 않은 SendMessage', type: 'Not observed',
    question: 'SendMessage ToolUse와 result가 raw stream에 있었는가?',
    consequence: 'continuation 안내 문자열만 있었고 실제 tool 사건은 없었다.', art: 'unknown',
  },
  'native-team-mailbox-not-observed': {
    title: '열리지 않은 Team mailbox', type: 'Not observed',
    question: 'TeamCreate, mailbox, UDS inbox, peer delivery 사건이 있었는가?',
    consequence: 'native Team lifecycle을 나타내는 ToolUse나 event는 관찰되지 않았다.', art: 'unknown',
  },
  'shared-task-claim-loop-not-observed': {
    title: '나타나지 않은 shared claim loop', type: 'Not observed',
    question: 'shared TaskList의 owner claim·release 협업이 실행됐는가?',
    consequence: '공유 task claim 사건은 이 run의 범위 밖이었다.', art: 'unknown',
  },
  'worktree-isolation-not-observed': {
    title: '만들지 않은 worker worktree', type: 'Not observed',
    question: 'worker별 git worktree·checkout·merge 격리를 실행했는가?',
    consequence: '파일 격리와 merge 사건은 관찰되지 않았다.', art: 'unknown',
  },
  'team-memory-not-observed': {
    title: '기록되지 않은 team memory', type: 'Not observed',
    question: '공유 또는 worker별 team memory를 read/write했는가?',
    consequence: 'memory 사건은 이 순차 Agent/Read run에서 관찰되지 않았다.', art: 'unknown',
  },
  'parallel-worker-overlap-not-observed': {
    title: '겹치지 않은 두 worker', type: 'Not observed',
    question: '두 worker event 구간이 실제로 겹쳐 병렬 실행됐는가?',
    consequence: '이 실험은 순차 foreground run이어서 overlap이 관찰되지 않았다.', art: 'unknown',
  },
  'background-worker-lifecycle-not-observed': {
    title: '뒤에서 돌지 않은 worker', type: 'Not observed',
    question: 'background=true, stream close 후 terminal, stop_task 경계를 실행했는가?',
    consequence: '두 worker 모두 foreground였으므로 background 수명은 미관찰이다.', art: 'unknown',
  },
  'failure-cancel-retry-not-observed': {
    title: '오지 않은 실패·취소·재시도', type: 'Not observed',
    question: 'worker 실패, cancellation, maxTurns, retry, leader recovery가 나타났는가?',
    consequence: '성공 case 하나만 실행해 실패 계열 lifecycle은 미관찰이다.', art: 'unknown',
  },
  'source-bound-runtime-marker-rerun-required': {
    title: '다음 시험: prompt까지 묶은 marker', type: 'Next experiment',
    question: 'runtime-only marker 인과를 직접 증명하려면 무엇을 더 보존해야 하는가?',
    consequence: 'initial user/system/worker prompt hash와 probe source hash를 manifest에 묶은 새 순차 run이 필요하다.', art: 'unknown',
  },
  'native-team-mailbox-run-required': {
    title: '다음 시험: native Team', type: 'Next experiment',
    question: 'native Team을 가르치려면 어떤 원시 사건이 필요한가?',
    consequence: 'Team lifecycle, mailbox delivery, peer identity, shared task claim을 보존한 별도 run이 필요하다.', art: 'unknown',
  },
  'sendmessage-continuation-run-required': {
    title: '다음 시험: 실제 SendMessage', type: 'Next experiment',
    question: 'continuation hint의 실제 의미를 어떻게 검증할 것인가?',
    consequence: '기존 agentId에 SendMessage를 호출하고 ToolUse/result와 후속 worker event를 연결해야 한다.', art: 'unknown',
  },
  'parallel-versus-sequential-comparison-required': {
    title: '다음 시험: 병렬과 순차', type: 'Next experiment',
    question: '병렬 worker와 의존 결과 인계를 어떤 지표로 비교할 것인가?',
    consequence: 'event overlap과 token/context 경계를 독립 병렬 case와 순차 case에서 대조해야 한다.', art: 'unknown',
  },
  'handoff-failure-matrix-required': {
    title: '다음 시험: handoff 실패 행렬', type: 'Next experiment',
    question: '어느 단계의 실패가 리더 Result에 어떻게 돌아오는가?',
    consequence: '첫·둘째 worker 실패, cancellation, retry를 부작용 없는 bounded case로 각각 관찰해야 한다.', art: 'unknown',
  },
}
