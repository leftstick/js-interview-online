import { defineExamRaw } from '@/types'
import question from './question.txt'
import testcases from './testcase'

export default defineExamRaw({
  id: 'exam7',
  title: 'EXAM_07_TITLE',
  examQuestion: question,
  testcases,
  contentRegexp: /function\s*thunkify\(func\)\s*{[\s\S]*}/,
})
