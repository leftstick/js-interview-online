import { defineExamRaw } from '@/types'

export default defineExamRaw({
  id: 'exam6',
  title: '06. camelcase(驼峰化)函数',
  getExamInitial: () => import(/* webpackChunkName: "exam6" */ './question.txt'),
  getTestcases: () => import(/* webpackChunkName: "case6" */ './testcase'),
  contentRegexp: /function\s*camelcase\(str\)\s*{[\s\S]*}/
})
