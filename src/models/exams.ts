import { IExamRaw } from '@/types'

export const exams: IExamRaw[] = [
  {
    id: 'exam1',
    title: '01. 判断一个变量是否字符串',
    getExamInitial: () => import(/* webpackChunkName: "exam1" */ '../exams/exam1/question.txt'),
    getTestcases: () => import(/* webpackChunkName: "case1" */ '../exams/exam1/testcase'),
    contentRegexp: /function\s*isString\(value\)\s*{[\s\S]*}/
  },
  {
    id: 'exam2',
    title: '02. 使柯里化(currying)函数',
    getExamInitial: () => import(/* webpackChunkName: "exam2" */ '../exams/exam2/question.txt'),
    getTestcases: () => import(/* webpackChunkName: "case2" */ '../exams/exam2/testcase'),
    contentRegexp: /function\s*currying\(func\)\s*{[\s\S]*}/
  },
  {
    id: 'exam3',
    title: '03. duplicate(重复)函数',
    getExamInitial: () => import(/* webpackChunkName: "exam3" */ '../exams/exam3/question.txt'),
    getTestcases: () => import(/* webpackChunkName: "case3" */ '../exams/exam3/testcase'),
    contentRegexp: /function\s*duplicate\(array\)\s*{[\s\S]*}/
  },
  {
    id: 'exam4',
    title: '04. map(变型)函数',
    getExamInitial: () => import(/* webpackChunkName: "exam4" */ '../exams/exam4/question.txt'),
    getTestcases: () => import(/* webpackChunkName: "case4" */ '../exams/exam4/testcase'),
    contentRegexp: /function\s*map\(arr,\s*func,\s*ctx\)\s*{[\s\S]*}/
  },
  {
    id: 'exam5',
    title: '05. value(取值)函数',
    getExamInitial: () => import(/* webpackChunkName: "exam5" */ '../exams/exam5/question.txt'),
    getTestcases: () => import(/* webpackChunkName: "case5" */ '../exams/exam5/testcase'),
    contentRegexp: /function\s*value\(anything\)\s*{[\s\S]*}/
  },
  {
    id: 'exam6',
    title: '06. camelcase(驼峰化)函数',
    getExamInitial: () => import(/* webpackChunkName: "exam6" */ '../exams/exam6/question.txt'),
    getTestcases: () => import(/* webpackChunkName: "case6" */ '../exams/exam6/testcase'),
    contentRegexp: /function\s*camelcase\(str\)\s*{[\s\S]*}/
  },
  {
    id: 'exam7',
    title: '07. thunkify(形式转换)函数',
    getExamInitial: () => import(/* webpackChunkName: "exam7" */ '../exams/exam7/question.txt'),
    getTestcases: () => import(/* webpackChunkName: "case7" */ '../exams/exam7/testcase'),
    contentRegexp: /function\s*thunkify\(func\)\s*{[\s\S]*}/
  },
  {
    id: 'exam8',
    title: '08. times(多次生成)函数',
    getExamInitial: () => import(/* webpackChunkName: "exam8" */ '../exams/exam8/question.txt'),
    getTestcases: () => import(/* webpackChunkName: "case8" */ '../exams/exam8/testcase'),
    contentRegexp: /function\s*times\(n,\s*func\)\s*{[\s\S]*}/
  },
  {
    id: 'exam9',
    title: '09. 二叉树深度查询函数',
    getExamInitial: () => import(/* webpackChunkName: "exam9" */ '../exams/exam9/question.txt'),
    getTestcases: () => import(/* webpackChunkName: "case9" */ '../exams/exam9/testcase'),
    contentRegexp: /function\s*maxDepth\(treeNode\)\s*{[\s\S]*}/
  },
  {
    id: 'exam10',
    title: '10. difference(找不同)函数',
    getExamInitial: () => import(/* webpackChunkName: "exam10" */ '../exams/exam10/question.txt'),
    getTestcases: () => import(/* webpackChunkName: "case10" */ '../exams/exam10/testcase'),
    contentRegexp: /function\s*difference\(src,\s*target\)\s*{[\s\S]*}/
  },
  {
    id: 'exam11',
    title: '11. flatten(扁平化)函数',
    getExamInitial: () => import(/* webpackChunkName: "exam11" */ '../exams/exam11/question.txt'),
    getTestcases: () => import(/* webpackChunkName: "case11" */ '../exams/exam11/testcase'),
    contentRegexp: /function\s*flatten\(arr\)\s*{[\s\S]*}/
  }
]
