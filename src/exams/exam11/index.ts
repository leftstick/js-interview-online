import { defineExamRaw } from '@/types'

export default defineExamRaw({
  id: 'exam11',
  title: '11. flatten(扁平化)函数',
  getExamInitial: () => import(/* webpackChunkName: "exam11" */ './question.txt'),
  getTestcases: () => import(/* webpackChunkName: "case11" */ './testcase'),
  contentRegexp: /function\s*flatten\(arr\)\s*{[\s\S]*}/
})
