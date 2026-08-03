export const ch30CardMeta = {
  'local-report-host-allow': {
    title: '허용된 기록',
    type: 'Permission',
    question: '로컬 보고서 handler는 host allow 뒤에만 실행됐는가?',
    consequence: 'permission request와 allow 뒤 handler·ToolResult·파일 hash가 이어졌다.',
    art: 'permission',
  },
  'external-publish-denied-before-handler': {
    title: '닫힌 외부 문',
    type: 'Constraint',
    question: '외부 게시를 거부했을 때 handler 실행도 실제로 막혔는가?',
    consequence: 'deny와 error ToolResult만 남았고 handler 및 publish count는 0이었다.',
    art: 'denial',
  },
  'memory-saved-after-denial': {
    title: '거부 뒤의 메모리',
    type: 'Recovery',
    question: '한 도구 거부 뒤 허용된 메모리 작업은 계속될 수 있는가?',
    consequence: '같은 턴에서 save_memory가 허용돼 외부 memory artifact를 남겼다.',
    art: 'memory',
  },
  'new-client-resumed-and-loaded-memory': {
    title: '되살아난 세션',
    type: 'Continuity',
    question: '새 client가 같은 session을 재개하고 메모리를 실제 도구로 읽었는가?',
    consequence: '두 번째 init의 session이 같았고 load_memory handler와 ToolResult가 실행됐다.',
    art: 'resume',
  },
  'artifact-state-stable': {
    title: '변하지 않은 증거',
    type: 'Integrity',
    question: '재개 턴 뒤 report와 memory artifact 상태가 유지됐는가?',
    consequence: '두 snapshot의 hash가 같고 external publish count는 계속 0이었다.',
    art: 'integrity',
  },
  'hosting-remote-eval-automatic-learning': {
    title: '아직 가지 않은 길',
    type: 'Unknown',
    question: '이 로컬 MVP가 호스팅·원격 평가·자동 장기학습까지 증명했는가?',
    consequence: '실행하지 않았다. 제품 확장 항목은 추가 관측으로 남긴다.',
    art: 'unknown',
  },
}
