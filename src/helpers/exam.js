import { decodeBase64 } from '../helpers/object'

export const routes = [
  {
    path: '/exam1',
    title: '如何判断一个变量是否字符串',
    content: import(/* webpackChunkName: "exam1" */ '../exams/exam1.txt').then(toContent)
  }
]

function toContent(data) {
  return decodeBase64(data.default.slice(23))
}
