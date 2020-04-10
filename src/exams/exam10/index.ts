import { defineExamRaw } from '@/types'

export default defineExamRaw({
  id: 'exam10',
  title: '10. difference(找不同)函数',
  getExamInitial: () => import(/* webpackChunkName: "exam10" */ './question.txt'),
  getTestcases: () => import(/* webpackChunkName: "case10" */ './testcase'),
  contentRegexp: /function\s*difference\(src,\s*target\)\s*{[\s\S]*}/
})
