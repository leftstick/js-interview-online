import { defineExamRaw } from '@/types'

export default defineExamRaw({
  id: 'exam3',
  title: '03. duplicate(重复)函数',
  getExamInitial: () => import(/* webpackChunkName: "exam3" */ './question.txt'),
  getTestcases: () => import(/* webpackChunkName: "case3" */ './testcase'),
  contentRegexp: /function\s*duplicate\(array\)\s*{[\s\S]*}/
})
