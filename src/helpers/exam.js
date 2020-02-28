import getCodeContent from '../pages/$id/components/CodeContent'
import getTestCaseRunner from '../pages/$id/components/TestCaseRunner'

import { removeComments } from './object'

export const routes = [
  {
    path: '/exam1',
    title: '如何判断一个变量是否字符串',
    content: getCodeContent(() => import(/* webpackChunkName: "exam1" */ '../exams/exam1/question.txt')),
    contentValidator(code) {
      return /function\s*isString\(value\)\s*{[\s\S]*}/.test(code)
    },
    contentIntegrityValidator(code) {
      const realCode = removeComments(code)
      return /^function\s*isString\(value\)\s*{[\s\S]*}$/.test(realCode)
    },
    testCase: getTestCaseRunner(() => import(/* webpackChunkName: "case1" */ '../exams/exam1/testcase'))
  },
  {
    path: '/exam2',
    title: '完成一个简单的使柯里化(currying)函数',
    content: getCodeContent(() => import(/* webpackChunkName: "exam2" */ '../exams/exam2/question.txt')),
    contentValidator(code) {
      return /function\s*currying\(func\)\s*{[\s\S]*}/.test(code)
    },
    contentIntegrityValidator(code) {
      const realCode = removeComments(code)
      return /^function\s*currying\(func\)\s*{[\s\S]*}$/.test(realCode)
    },
    testCase: getTestCaseRunner(() => import(/* webpackChunkName: "case2" */ '../exams/exam2/testcase'))
  },
  {
    path: '/exam3',
    title: '完成一个duplicate(重复)函数',
    content: getCodeContent(() => import(/* webpackChunkName: "exam3" */ '../exams/exam3/question.txt')),
    contentValidator(code) {
      return /function\s*duplicate\(array\)\s*{[\s\S]*}/.test(code)
    },
    contentIntegrityValidator(code) {
      const realCode = removeComments(code)
      return /^function\s*duplicate\(array\)\s*{[\s\S]*}$/.test(realCode)
    },
    testCase: getTestCaseRunner(() => import(/* webpackChunkName: "case3" */ '../exams/exam3/testcase'))
  },
  {
    path: '/exam4',
    title: '完成一个map(变型)函数',
    content: getCodeContent(() => import(/* webpackChunkName: "exam4" */ '../exams/exam4/question.txt')),
    contentValidator(code) {
      return /function\s*map\(arr,\s*func,\s*ctx\)\s*{[\s\S]*}/.test(code)
    },
    contentIntegrityValidator(code) {
      const realCode = removeComments(code)
      return /^function\s*map\(arr,\s*func,\s*ctx\)\s*{[\s\S]*}$/.test(realCode)
    },
    testCase: getTestCaseRunner(() => import(/* webpackChunkName: "case4" */ '../exams/exam4/testcase'))
  },
  {
    path: '/exam5',
    title: '完成一个value(取值)函数',
    content: getCodeContent(() => import(/* webpackChunkName: "exam5" */ '../exams/exam5/question.txt')),
    contentValidator(code) {
      return /function\s*value\(anything\)\s*{[\s\S]*}/.test(code)
    },
    contentIntegrityValidator(code) {
      const realCode = removeComments(code)
      return /^function\s*value\(anything\)\s*{[\s\S]*}$/.test(realCode)
    },
    testCase: getTestCaseRunner(() => import(/* webpackChunkName: "case5" */ '../exams/exam5/testcase'))
  },
  {
    path: '/exam6',
    title: '完成一个camelcase(驼峰化)函数',
    content: getCodeContent(() => import(/* webpackChunkName: "exam6" */ '../exams/exam6/question.txt')),
    contentValidator(code) {
      return /function\s*camelcase\(str\)\s*{[\s\S]*}/.test(code)
    },
    contentIntegrityValidator(code) {
      const realCode = removeComments(code)
      return /^function\s*camelcase\(str\)\s*{[\s\S]*}$/.test(realCode)
    },
    testCase: getTestCaseRunner(() => import(/* webpackChunkName: "case6" */ '../exams/exam6/testcase'))
  },
  {
    path: '/exam7',
    title: '完成一个thunkify(形式转换)函数',
    content: getCodeContent(() => import(/* webpackChunkName: "exam7" */ '../exams/exam7/question.txt')),
    contentValidator(code) {
      return /function\s*thunkify\(func\)\s*{[\s\S]*}/.test(code)
    },
    contentIntegrityValidator(code) {
      const realCode = removeComments(code)
      return /^function\s*thunkify\(func\)\s*{[\s\S]*}$/.test(realCode)
    },
    testCase: getTestCaseRunner(() => import(/* webpackChunkName: "case7" */ '../exams/exam7/testcase'))
  },
  {
    path: '/exam8',
    title: '完成一个times(多次生成)函数',
    content: getCodeContent(() => import(/* webpackChunkName: "exam8" */ '../exams/exam8/question.txt')),
    contentValidator(code) {
      return /function\s*times\(n,\s*func\)\s*{[\s\S]*}/.test(code)
    },
    contentIntegrityValidator(code) {
      const realCode = removeComments(code)
      return /^function\s*times\(n,\s*func\)\s*{[\s\S]*}$/.test(realCode)
    },
    testCase: getTestCaseRunner(() => import(/* webpackChunkName: "case8" */ '../exams/exam8/testcase'))
  },
  {
    path: '/exam9',
    title: '完成一个DI(依赖注入)类',
    content: getCodeContent(() => import(/* webpackChunkName: "exam9" */ '../exams/exam9/question.txt')),
    inputFuncName: 'DI',
    contentValidator(code) {
      return /class\s*DI\s*{[\s\S]*register\(name,\s*instance\)\s*{[\s\S]*}[\s\S]*run\(arr\)\s*{[\s\S]*}[\s\S]*}/.test(
        code
      )
    },
    contentIntegrityValidator(code) {
      const realCode = removeComments(code)
      // eslint-disable-next-line
      return /^class\s*DI\s*{[\s\S]*register\(name,\s*instance\)\s*{[\s\S]*}[\s\S]*run\(arr\)\s*{[\s\S]*}[\s\S]*}$/.test(
        realCode
      )
    },
    testCase: getTestCaseRunner(() => import(/* webpackChunkName: "case9" */ '../exams/exam9/testcase'))
  },
  {
    path: '/exam10',
    title: '完成一个difference(找不同)函数',
    content: getCodeContent(() => import(/* webpackChunkName: "exam10" */ '../exams/exam10/question.txt')),
    contentValidator(code) {
      return /function\s*difference\(src,\s*target\)\s*{[\s\S]*}/.test(code)
    },
    contentIntegrityValidator(code) {
      const realCode = removeComments(code)
      return /^function\s*difference\(src,\s*target\)\s*{[\s\S]*}$/.test(realCode)
    },
    testCase: getTestCaseRunner(() => import(/* webpackChunkName: "case10" */ '../exams/exam10/testcase'))
  },
  {
    path: '/exam11',
    title: '完成一个flatten(扁平化)函数',
    content: getCodeContent(() => import(/* webpackChunkName: "exam11" */ '../exams/exam11/question.txt')),
    contentValidator(code) {
      return /function\s*flatten\(arr\)\s*{[\s\S]*}/.test(code)
    },
    contentIntegrityValidator(code) {
      const realCode = removeComments(code)
      return /^function\s*flatten\(arr\)\s*{[\s\S]*}$/.test(realCode)
    },
    testCase: getTestCaseRunner(() => import(/* webpackChunkName: "case11" */ '../exams/exam11/testcase'))
  }
]
