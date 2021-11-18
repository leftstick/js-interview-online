import { defineExamRaw } from '@/types'
import question from './question.txt'
import testcases from './testcase'

export default defineExamRaw({
  id: 'exam14',
  title: 'EXAM_14_TITLE',
  examQuestion: question,
  testcases,
  contentRegexp: /function\s*getByPath\(obj\s*,\s*path\)\s*{[\s\S]*}/,
})
