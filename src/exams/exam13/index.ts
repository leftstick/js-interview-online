import { defineExamRaw } from '@/types'
import question from './question.txt'
import testcases from './testcase'

export default defineExamRaw({
  id: 'exam13',
  title: 'EXAM_13_TITLE',
  examQuestion: question,
  testcases,
  contentRegexp: /function\s*getAverageScore\(arr\)\s*{[\s\S]*}/,
})
