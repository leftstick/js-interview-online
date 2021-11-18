import { defineExamRaw } from '@/types'
import question from './question.txt'
import testcases from './testcase'

export default defineExamRaw({
  id: 'exam2',
  title: 'EXAM_02_TITLE',
  examQuestion: question,
  testcases,
  contentRegexp: /function\s*currying\(func\)\s*{[\s\S]*}/,
})
