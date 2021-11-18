import { defineExamRaw } from '@/types'
import question from './question.txt'
import testcases from './testcase'

export default defineExamRaw({
  id: 'exam3',
  title: 'EXAM_03_TITLE',
  examQuestion: question,
  testcases,
  contentRegexp: /function\s*duplicate\(array\)\s*{[\s\S]*}/,
})
