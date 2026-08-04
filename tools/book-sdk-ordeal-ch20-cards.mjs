export const ch20CardMeta = {
  'agent-definition-surface-configured': {
    title: '열세 칸의 작업자 설계도', type: 'SDK contract',
    question: 'AgentDefinition이 현재 Python SDK에서 실제로 노출하는 필드는 무엇인가?',
    consequence: '0.2.128 소스에서 description부터 permissionMode까지 열세 필드를 확인했다.', art: 'configuration',
  },
  'agents-initialize-serialization-configured': {
    title: '초기화로 건너간 선언', type: 'Serialization',
    question: 'agents map은 host 메모리에만 남는가, initialize request로 직렬화되는가?',
    consequence: 'None 필드를 뺀 AgentDefinition dict가 streaming initialize에 전달된다.', art: 'init',
  },
  'controlled-delegation-configured': {
    title: 'Read만 든 증거 작업자', type: 'Configuration',
    question: 'leader와 worker의 도구·모델·turn·permission 경계를 어떻게 고정했는가?',
    consequence: 'worker는 Read만 허용하고 위험 도구를 금지한 foreground 단일 위임으로 구성됐다.', art: 'boundary',
  },
  'assistant-messages-used-opus5': {
    title: '네 장의 Opus 영수증', type: 'Model receipt',
    question: '요청값이 아니라 실제 응답 메시지 네 건이 모두 Opus 5였는가?',
    consequence: 'sequence 9, 19, 26, 36의 AssistantMessage.model이 모두 claude-opus-5였다.', art: 'result',
  },
  'parent-agent-tool-use-observed': {
    title: '리더가 연 위임문', type: 'Delegation',
    question: 'worker 선언 뒤 리더가 실제 Agent tool을 호출했는가?',
    consequence: 'sequence 19에 evidence-reader를 지정한 foreground Agent ToolUse가 남았다.', art: 'tool',
  },
  'init-task-actual-agent-name-boundary': {
    title: 'Task와 Agent의 다른 이름', type: 'Surface boundary',
    question: 'options, init tool 목록, 실제 호출의 이름이 모두 같은가?',
    consequence: 'options는 Agent, init은 Task, 실제 ToolUse는 Agent여서 세 표면을 분리해야 한다.', art: 'separation',
  },
  'task-start-linked-to-agent': {
    title: '부모 ID를 단 출발표', type: 'Task lifecycle',
    question: 'TaskStarted가 어느 Agent 호출에서 태어났는지 연결할 수 있는가?',
    consequence: 'task_id와 local_agent 유형, parent tool_use_id가 sequence 19 호출을 가리켰다.', art: 'continuity',
  },
  'nested-worker-prompt-linked': {
    title: '작업자에게 내려간 질문', type: 'Context link',
    question: 'nested worker prompt가 부모 위임 ID를 보존했는가?',
    consequence: 'sequence 22 UserMessage의 parent_tool_use_id가 부모 Agent 호출과 일치했다.', art: 'continuity',
  },
  'task-progress-reported-read': {
    title: 'Read를 보고한 진행 신호', type: 'Progress',
    question: 'task 진행 사건이 worker의 실제 마지막 도구를 보고했는가?',
    consequence: 'TaskProgress는 같은 task에서 last_tool_name Read와 tool_uses 1을 기록했다.', art: 'stream',
  },
  'worker-read-linked-to-parent': {
    title: '부모 아래의 단 한 번 Read', type: 'Worker execution',
    question: 'worker AssistantMessage가 부모 Agent 아래에서 실제 Read를 만들었는가?',
    consequence: 'sequence 26의 Read ToolUse가 parent Agent ID와 Opus 모델을 함께 보존했다.', art: 'tool',
  },
  'worker-tool-result-contained-marker': {
    title: '작업자가 가져온 증거 표식', type: 'Tool receipt',
    question: 'worker의 Read 결과가 연결 ID와 통제 marker를 실제로 돌려줬는가?',
    consequence: 'sequence 27 ToolResult가 Read와 Agent ID 및 CH20 marker를 함께 보존했다.', art: 'result',
  },
  'two-terminal-task-surfaces-observed': {
    title: '두 번 울린 완료 신호', type: 'Task terminal',
    question: 'foreground task 종료가 한 종류의 메시지로만 나타났는가?',
    consequence: 'completed TaskUpdated와 completed TaskNotification이 연속으로 모두 관찰됐다.', art: 'result',
  },
  'agent-tool-result-returned-worker-evidence': {
    title: '부모에게 돌아온 작업자 봉투', type: 'Delegation receipt',
    question: 'Agent ToolResult가 worker의 증거와 실행 신원을 부모에게 반환했는가?',
    consequence: 'marker, agentId, evidence-reader, completed, Opus, readCount 1이 함께 돌아왔다.', art: 'result',
  },
  'leader-synthesis-and-terminal-success': {
    title: '리더가 닫은 증거 사슬', type: 'Synthesis',
    question: 'worker 결과 뒤 리더 종합과 terminal Result까지 이어졌는가?',
    consequence: 'leader marker가 AssistantMessage와 success Result에 남아 전체 사슬을 닫았다.', art: 'result',
  },
  'attempt-integrity-files-match': {
    title: '일곱 파일의 봉인', type: 'Integrity',
    question: '보존된 raw·process·callback·OTel 파일이 manifest의 해시와 일치하는가?',
    consequence: '출판 전 일곱 SHA-256을 다시 계산해 모두 일치시켰다.', art: 'integrity',
  },
  'raw-and-otel-sequences-align': {
    title: '마흔두 사건과 마흔네 그림자', type: 'Telemetry',
    question: 'raw SDK·host 사건과 OTel projection의 sequence가 정렬됐는가?',
    consequence: '39 SDK와 3 host 사건이 단일 trace의 44 span에 source sequence로 보존됐다.', art: 'telemetry',
  },
  'auxiliary-haiku-usage-recorded': {
    title: 'Opus 무대 뒤의 Haiku', type: 'Usage boundary',
    question: '보이는 응답 모델과 provider run 전체 model usage가 같은가?',
    consequence: 'AssistantMessage는 Opus였지만 terminal Result에는 Haiku 보조 사용량도 있었다.', art: 'separation',
  },
  'configured-agent-is-not-executed-agent': {
    title: '설계도는 실행 영수증이 아니다', type: 'Correction',
    question: 'agents map과 init agents만으로 worker 실행을 확정해도 되는가?',
    consequence: 'Agent 호출, nested 사건, task 종료, 반환, leader 종합까지 연결해야 한다.', art: 'correction',
  },
  'init-model-is-not-response-model-proof': {
    title: 'init 모델의 좁은 증언', type: 'Correction',
    question: 'init.model만으로 실제 사용자 응답 모델을 판정할 수 있는가?',
    consequence: '역사적 probe 판정을 버리고 네 AssistantMessage.model을 원시 기록에서 다시 읽었다.', art: 'correction',
  },
  'opus-response-is-not-opus-only-provider-run': {
    title: 'Opus 응답을 확대하지 않는 법', type: 'Correction',
    question: '응답 네 건이 Opus면 provider 전체도 Opus만 썼다고 말해도 되는가?',
    consequence: 'Result의 Haiku 보조 사용량 때문에 응답 모델과 전체 사용량을 분리했다.', art: 'correction',
  },
  'python-task-names-have-no-sdk-prefix': {
    title: '사라진 SDK 접두사', type: 'Correction',
    question: '현재 Python task message class를 SDKTask*로 가르쳐도 되는가?',
    consequence: '0.2.128의 실제 이름은 TaskStarted, TaskProgress, TaskUpdated, TaskNotification이다.', art: 'correction',
  },
  'unsupported-python-forwarding-options': {
    title: 'Python에 없는 두 옵션', type: 'Correction',
    question: 'forwardSubagentText와 agentProgressSummaries가 Python ClaudeAgentOptions에 있는가?',
    consequence: '현재 Python 0.2.128 표면에는 없으므로 다른 binding의 옵션과 섞지 않는다.', art: 'correction',
  },
  'agent-and-task-names-must-not-be-collapsed': {
    title: '이름 하나로 접지 않는 위임', type: 'Correction',
    question: 'configured Agent, init Task, actual Agent를 한 이름으로 정규화해도 되는가?',
    consequence: '표면별 이름을 보존해야 실제 호출과 task 생명주기를 함께 재생할 수 있다.', art: 'correction',
  },
  'task-notification-is-not-only-terminal': {
    title: 'Notification만 기다리면 놓치는 끝', type: 'Correction',
    question: 'TaskNotification만 terminal로 처리하면 모든 task를 닫을 수 있는가?',
    consequence: 'background 경계에서는 terminal TaskUpdated만 올 수 있어 두 종류를 모두 추적해야 한다.', art: 'correction',
  },
  'terminal-success-alone-is-not-delegation-proof': {
    title: '성공 한 줄로는 부족한 위임', type: 'Correction',
    question: '최종 success와 leader marker만으로 worker 실행을 증명할 수 있는가?',
    consequence: 'nested Read와 연결 ID가 없으면 모델 서술이나 leader 직접 작업과 구분되지 않는다.', art: 'correction',
  },
  'declared-permission-is-not-enforcement-proof': {
    title: '권한 선언과 실제 차단 사이', type: 'Correction',
    question: 'worker permissionMode와 금지 도구 목록만으로 enforcement를 증명했는가?',
    consequence: '이번에는 허용된 Read만 성공했으므로 금지 요청의 실제 차단은 별도 증거가 필요하다.', art: 'correction',
  },
  'otel-is-not-independent-runtime-proof': {
    title: '독립 관찰자가 아닌 OTel', type: 'Correction',
    question: 'raw와 OTel 정렬을 독립 provider 교차 검증으로 부를 수 있는가?',
    consequence: '둘은 같은 AttemptRecorder의 원본과 projection이므로 수집 파이프라인 정합성만 증명한다.', art: 'correction',
  },
  'historical-probe-source-not-bound': {
    title: '덜 묶인 과거 source hash', type: 'Correction',
    question: '역사적 attempt가 chapter와 probe·case·runtime 소스를 모두 해시로 묶었는가?',
    consequence: '당시에는 chapter bytes만 묶였고 향후 probe가 세 source hash를 추가하도록 수정됐다.', art: 'correction',
  },
  'fork-context-inheritance-not-observed': {
    title: '열지 않은 fork 문', type: 'Unknown',
    question: 'fork worker와 비-fork worker의 parent context 상속 차이를 실행했는가?',
    consequence: '단일 foreground worker만 실행해 context 복제 경계는 미관찰이다.', art: 'unknown',
  },
  'parallel-workers-and-validator-not-observed': {
    title: '소집하지 않은 병렬 작업자들', type: 'Unknown',
    question: '여러 worker의 겹침과 독립 validator 검증을 관찰했는가?',
    consequence: 'worker 한 명만 실행했으므로 병렬성과 검증자 구조를 일반화하지 않는다.', art: 'unknown',
  },
  'native-team-mailbox-not-observed': {
    title: '열리지 않은 팀 우편함', type: 'Unknown',
    question: 'Agent delegation이 native team mailbox와 peer message까지 증명하는가?',
    consequence: '두 표면은 다르며 이번 run에는 team 협업 사건이 없었다.', art: 'unknown',
  },
  'remote-planner-not-observed': {
    title: '부르지 않은 원격 설계자', type: 'Unknown',
    question: '원격 bridge나 별도 planner process를 이번 위임에서 실행했는가?',
    consequence: 'local_agent foreground 위임만 관찰했으므로 외부 실행 주체는 범위 밖이다.', art: 'unknown',
  },
  'background-delegation-not-observed': {
    title: '뒤에서 돌지 않은 작업자', type: 'Unknown',
    question: 'background worker의 수명과 stream close 경계를 관찰했는가?',
    consequence: 'run_in_background=false였으므로 background terminal 차이는 미관찰이다.', art: 'unknown',
  },
  'failure-cancel-retry-not-observed': {
    title: '오지 않은 실패와 재시도', type: 'Unknown',
    question: 'worker 실패·취소·maxTurns·retry와 leader recovery를 실행했는가?',
    consequence: '성공 foreground case 하나라 실패 계열 생명주기는 아직 증거가 없다.', art: 'unknown',
  },
  'extended-worker-fields-not-observed': {
    title: '쓰지 않은 확장 필드들', type: 'Unknown',
    question: 'skills, memory, MCP, initialPrompt, effort, model override의 실제 효과를 보았는가?',
    consequence: '타입 존재만 확인했고 worker 행동으로는 실행하지 않았다.', art: 'unknown',
  },
  'background-terminal-matrix-required': {
    title: '다음 시험: background 종착표', type: 'Next experiment',
    question: 'TaskUpdated 단독 terminal과 stream close를 어떻게 증명할 것인가?',
    consequence: '시간 제한을 둔 background worker를 별도 순차 case로 실행해야 한다.', art: 'unknown',
  },
  'worker-denial-case-required': {
    title: '다음 시험: 작업자 거절', type: 'Next experiment',
    question: 'worker의 tools·deny·permissionMode 합성을 무엇으로 검증할 것인가?',
    consequence: '금지 tool 요청을 유도하고 permission·hook 원시 사건과 handler 미실행을 수집해야 한다.', art: 'unknown',
  },
  'worker-model-boundary-case-required': {
    title: '다음 시험: 작업자 모델 경계', type: 'Next experiment',
    question: 'inherit, override, 보안 거부와 fallback을 worker별로 어떻게 분리할 것인가?',
    consequence: '각 case의 AssistantMessage.model과 Result.model_usage를 함께 보존해야 한다.', art: 'unknown',
  },
  'multiworker-handoff-evidence-required': {
    title: '다음 시험: 두 작업자의 인계', type: 'Next experiment',
    question: 'worker 간 handoff나 순차 협업을 무엇으로 연결할 것인가?',
    consequence: '20b장에서 두 parent Agent ID와 terminal 순서를 보존해 별도 검증한다.', art: 'unknown',
  },
}
