import { IExam } from '@/types'

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm

export function removeComments(code: string) {
  return code.replace(STRIP_COMMENTS, '').replace(/^\s+|\s+$/g, '')
}

export function reflectFunctionName(code: string) {
  const matched = code.match(/function\s*([a-zA-Z_][a-zA-Z_0-1]*).*/)
  return matched ? matched[1] : ''
}

export function reflectFunctionFromText(code: string) {
  try {
    const realCode = removeComments(code)
    // eslint-disable-next-line no-new-func
    return new Function(`return ${realCode}`)()
  } catch (e) {
    return () => {}
  }
}

export function isEmpty(obj: any): obj is null | undefined {
  return obj === null || obj === undefined
}

export function isEmptyArray(obj: any) {
  return obj === null || obj === undefined || obj.length === 0
}

export function isNotEmpty<T>(obj: any): obj is T {
  return !isEmpty(obj)
}

export function validateCode(code: string, exam: IExam) {
  const { contentRegexp } = exam
  const integrityRegexp = new RegExp(`^${contentRegexp.source}$`)
  if (!contentRegexp.test(code)) {
    throw new Error('不可以篡改题目哦')
  }

  try {
    const pureCode = removeComments(code)
    // eslint-disable-next-line no-new-func
    new Function(`return ${pureCode}`)()

    if (!integrityRegexp.test(pureCode)) {
      throw new Error('不可以创建额外的代码哦')
    }
  } catch (e) {
    if (e && e.name && e.name === 'SyntaxError') {
      // do nothing
    } else {
      throw new Error('你的代码里有什么错误哦!')
    }
  }
}

export function pick<T extends Object, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  return keys.reduce((prev, cur) => {
    prev[cur] = obj[cur]
    return prev
  }, {} as Pick<T, K>)
}
