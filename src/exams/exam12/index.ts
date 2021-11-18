import { defineExamRaw } from '@/types'
import question from './question.txt'
import testcases from './testcase'

export default defineExamRaw({
  id: 'exam12',
  title: 'EXAM_12_TITLE',
  examQuestion: question,
  testcases,
  contentRegexp: /function\s*getLatestVersion\(arr\)\s*{[\s\S]*}/,
})
