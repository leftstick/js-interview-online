import { defineExamRaw } from '@/types'
import question from './question.txt'
import testcases from './testcase'

export default defineExamRaw({
  id: 'exam10',
  title: 'EXAM_10_TITLE',
  examQuestion: question,
  testcases,
  contentRegexp: /function\s*difference\(src,\s*target\)\s*{[\s\S]*}/,
})
