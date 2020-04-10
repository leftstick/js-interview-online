import { defineExamRaw } from '@/types'

export default defineExamRaw({
  id: 'exam4',
  title: '04. map(变型)函数',
  getExamInitial: () => import(/* webpackChunkName: "exam4" */ './question.txt'),
  getTestcases: () => import(/* webpackChunkName: "case4" */ './testcase'),
  contentRegexp: /function\s*map\(arr,\s*func,\s*ctx\)\s*{[\s\S]*}/
})
