import { defineExamRaw } from '@/types'

export default defineExamRaw({
  id: 'exam2',
  title: '02. 使柯里化(currying)函数',
  getExamInitial: () => import(/* webpackChunkName: "exam2" */ './question.txt'),
  getTestcases: () => import(/* webpackChunkName: "case2" */ './testcase'),
  contentRegexp: /function\s*currying\(func\)\s*{[\s\S]*}/
})
