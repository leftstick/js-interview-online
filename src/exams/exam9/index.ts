import { defineExamRaw } from '@/types'
import question from './question.txt'
import testcases from './testcase'

export default defineExamRaw({
  id: 'exam9',
  title: 'EXAM_09_TITLE',
  examQuestion: question,
  testcases,
  contentRegexp: /function\s*maxDepth\(treeNode\)\s*{[\s\S]*}/,
})
