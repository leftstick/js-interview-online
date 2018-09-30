import getCodeContent from '../components/CodeContent'
import getTestCaseRunner from '../components/TestCaseRunner'

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
  }
]
