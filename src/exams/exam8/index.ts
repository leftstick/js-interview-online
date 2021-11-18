import { defineExamRaw } from '@/types'
import question from './question.txt'
import testcases from './testcase'

export default defineExamRaw({
  id: 'exam8',
  title: 'EXAM_08_TITLE',
  examQuestion: question,
  testcases,
  contentRegexp: /function\s*times\(n,\s*func\)\s*{[\s\S]*}/,
})
