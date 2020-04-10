import { defineExamRaw } from '@/types'

export default defineExamRaw({
  id: 'exam1',
  title: '01. 判断一个变量是否字符串',
  getExamInitial: () => import(/* webpackChunkName: "exam1" */ './question.txt'),
  getTestcases: () => import(/* webpackChunkName: "case1" */ './testcase'),
  contentRegexp: /function\s*isString\(value\)\s*{[\s\S]*}/
})
