import { defineExamRaw } from '@/types'

export default defineExamRaw({
  id: 'exam8',
  title: '08. times(多次生成)函数',
  getExamInitial: () => import(/* webpackChunkName: "exam8" */ './question.txt'),
  getTestcases: () => import(/* webpackChunkName: "case8" */ './testcase'),
  contentRegexp: /function\s*times\(n,\s*func\)\s*{[\s\S]*}/
})
