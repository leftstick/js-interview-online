const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm

export function removeComments(code: string) {
  return code.replace(STRIP_COMMENTS, '').replace(/^\s+|\s+$/g, '')
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

export function pick<T extends Object, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  return keys.reduce((prev, cur) => {
    prev[cur] = obj[cur]
    return prev
  }, {} as Pick<T, K>)
}
