import { defineExamRaw } from '@/types'
import question from './question.txt'
import testcases from './testcase'

export default defineExamRaw({
  id: 'exam4',
  title: 'EXAM_04_TITLE',
  examQuestion: question,
  testcases,
  contentRegexp: /function\s*map\(arr,\s*func,\s*ctx\)\s*{[\s\S]*}/,
})
