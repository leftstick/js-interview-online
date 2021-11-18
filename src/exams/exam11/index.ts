import { defineExamRaw } from '@/types'
import question from './question.txt'
import testcases from './testcase'

export default defineExamRaw({
  id: 'exam11',
  title: 'EXAM_11_TITLE',
  examQuestion: question,
  testcases,
  contentRegexp: /function\s*flatten\(arr\)\s*{[\s\S]*}/,
})
