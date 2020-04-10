import { defineExamRaw } from '@/types'

export default defineExamRaw({
  id: 'exam9',
  title: '09. 二叉树深度查询函数',
  getExamInitial: () => import(/* webpackChunkName: "exam9" */ './question.txt'),
  getTestcases: () => import(/* webpackChunkName: "case9" */ './testcase'),
  contentRegexp: /function\s*maxDepth\(treeNode\)\s*{[\s\S]*}/
})
