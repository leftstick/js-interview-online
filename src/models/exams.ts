import { IExam } from '@/types'

export const exams: IExam[] = [
  {
    id: 'exam1',
    title: '01. 如何判断一个变量是否字符串',
    getExamInitial: () => import(/* webpackChunkName: "exam1" */ '../exams/exam1/question.txt'),
    contentRegexp: /function\s*isString\(value\)\s*{[\s\S]*}/,
    getTestcases: () => import(/* webpackChunkName: "case1" */ '../exams/exam1/testcase')
  },
  {
    id: 'exam2',
    title: '02. 完成一个简单的使柯里化(currying)函数',
    getExamInitial: () => import(/* webpackChunkName: "exam2" */ '../exams/exam2/question.txt'),
    contentRegexp: /function\s*currying\(func\)\s*{[\s\S]*}/,
    getTestcases: () => import(/* webpackChunkName: "case2" */ '../exams/exam2/testcase')
  },
  {
    id: 'exam3',
    title: '03. 完成一个duplicate(重复)函数',
    getExamInitial: () => import(/* webpackChunkName: "exam3" */ '../exams/exam3/question.txt'),
    contentRegexp: /function\s*duplicate\(array\)\s*{[\s\S]*}/,
    getTestcases: () => import(/* webpackChunkName: "case3" */ '../exams/exam3/testcase')
  },
  {
    id: 'exam4',
    title: '04. 完成一个map(变型)函数',
    getExamInitial: () => import(/* webpackChunkName: "exam4" */ '../exams/exam4/question.txt'),
    contentRegexp: /function\s*map\(arr,\s*func,\s*ctx\)\s*{[\s\S]*}/,
    getTestcases: () => import(/* webpackChunkName: "case4" */ '../exams/exam4/testcase')
  },
  {
    id: 'exam5',
    title: '05. 完成一个value(取值)函数',
    getExamInitial: () => import(/* webpackChunkName: "exam5" */ '../exams/exam5/question.txt'),
    contentRegexp: /function\s*value\(anything\)\s*{[\s\S]*}/,
    getTestcases: () => import(/* webpackChunkName: "case5" */ '../exams/exam5/testcase')
  },
  {
    id: 'exam6',
    title: '06. 完成一个camelcase(驼峰化)函数',
    getExamInitial: () => import(/* webpackChunkName: "exam6" */ '../exams/exam6/question.txt'),
    contentRegexp: /function\s*camelcase\(str\)\s*{[\s\S]*}/,
    getTestcases: () => import(/* webpackChunkName: "case6" */ '../exams/exam6/testcase')
  },
  {
    id: 'exam7',
    title: '07. 完成一个thunkify(形式转换)函数',
    getExamInitial: () => import(/* webpackChunkName: "exam7" */ '../exams/exam7/question.txt'),
    contentRegexp: /function\s*thunkify\(func\)\s*{[\s\S]*}/,
    getTestcases: () => import(/* webpackChunkName: "case7" */ '../exams/exam7/testcase')
  },
  {
    id: 'exam8',
    title: '08. 完成一个times(多次生成)函数',
    getExamInitial: () => import(/* webpackChunkName: "exam8" */ '../exams/exam8/question.txt'),
    contentRegexp: /function\s*times\(n,\s*func\)\s*{[\s\S]*}/,
    getTestcases: () => import(/* webpackChunkName: "case8" */ '../exams/exam8/testcase')
  },
  {
    id: 'exam9',
    title: '09. 完成一个二叉树深度查询函数',
    getExamInitial: () => import(/* webpackChunkName: "exam9" */ '../exams/exam9/question.txt'),
    contentRegexp: /function\s*maxDepth\(treeNode\)\s*{[\s\S]*}/,
    getTestcases: () => import(/* webpackChunkName: "case9" */ '../exams/exam9/testcase')
  },
  {
    id: 'exam10',
    title: '10. 完成一个difference(找不同)函数',
    getExamInitial: () => import(/* webpackChunkName: "exam10" */ '../exams/exam10/question.txt'),
    contentRegexp: /function\s*difference\(src,\s*target\)\s*{[\s\S]*}/,
    getTestcases: () => import(/* webpackChunkName: "case10" */ '../exams/exam10/testcase')
  },
  {
    id: 'exam11',
    title: '11. 完成一个flatten(扁平化)函数',
    getExamInitial: () => import(/* webpackChunkName: "exam11" */ '../exams/exam11/question.txt'),
    contentRegexp: /function\s*flatten\(arr\)\s*{[\s\S]*}/,
    getTestcases: () => import(/* webpackChunkName: "case11" */ '../exams/exam11/testcase')
  }
]
