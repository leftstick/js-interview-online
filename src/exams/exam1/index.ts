import { defineExamRaw } from '@/types'
import question from './question.txt'
import testcases from './testcase'

export default defineExamRaw({
  id: 'exam1',
  title: 'EXAM_01_TITLE',
  examQuestion: question,
  testcases,
  contentRegexp: /function\s*isString\(value\)\s*{[\s\S]*}/,
})
