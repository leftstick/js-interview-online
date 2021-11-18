import { defineExamRaw } from '@/types'
import question from './question.txt'
import testcases from './testcase'

export default defineExamRaw({
  id: 'exam6',
  title: 'EXAM_06_TITLE',
  examQuestion: question,
  testcases,
  contentRegexp: /function\s*camelcase\(str\)\s*{[\s\S]*}/,
})
