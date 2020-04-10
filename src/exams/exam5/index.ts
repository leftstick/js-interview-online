import { defineExamRaw } from '@/types'

export default defineExamRaw({
  id: 'exam5',
  title: '05. value(取值)函数',
  getExamInitial: () => import(/* webpackChunkName: "exam5" */ './question.txt'),
  getTestcases: () => import(/* webpackChunkName: "case5" */ './testcase'),
  contentRegexp: /function\s*value\(anything\)\s*{[\s\S]*}/
})
