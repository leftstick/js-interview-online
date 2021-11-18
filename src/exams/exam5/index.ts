import { defineExamRaw } from '@/types'
import question from './question.txt'
import testcases from './testcase'

export default defineExamRaw({
  id: 'exam5',
  title: 'EXAM_05_TITLE',
  examQuestion: question,
  testcases,
  contentRegexp: /function\s*value\(anything\)\s*{[\s\S]*}/,
})
