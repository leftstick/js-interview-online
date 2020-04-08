export function delay(func: Function, timeout: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const res = func()
        if (res && res.then && res.catch) {
          return res.then(resolve, reject)
        }
        resolve(res)
      } catch (error) {
        reject(error)
      }
    }, timeout)
  })
}
