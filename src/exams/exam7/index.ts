import { defineExamRaw } from '@/types'

export default defineExamRaw({
  id: 'exam7',
  title: '07. thunkify(形式转换)函数',
  getExamInitial: () => import(/* webpackChunkName: "exam7" */ './question.txt'),
  getTestcases: () => import(/* webpackChunkName: "case7" */ './testcase'),
  contentRegexp: /function\s*thunkify\(func\)\s*{[\s\S]*}/
})
