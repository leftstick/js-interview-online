import { useState, useMemo, useCallback } from 'react'
import assert from 'assert'
import { message } from 'antd'

import debounce from 'lodash/debounce'

import { removeComments, delay, CASE_STATUS, isNotEmpty } from '@/helpers'
import { IExam } from '@/types'

interface ITestcase {
  name: string
  status: CASE_STATUS
}

export default function useCodeRunnerModel() {
  const [executorVisible, setExecutorVisible] = useState<boolean>(false)
  const [currentCode, setCurrentCode] = useState<string>()
  const [testcases, setTestcases] = useState<ITestcase[]>()
  const [rawTestcases, setRawTestcases] = useState<string[]>()

  const initExecutor = useCallback((cases: string[]) => {
    setTestcases(
      cases.map(c => ({
        name: c,
        status: CASE_STATUS.NOT_EXECUTED
      }))
    )
    setRawTestcases(cases)
  }, [])

  const resetExecutor = useCallback(() => {
    setCurrentCode(undefined)
    setTestcases(undefined)
    setRawTestcases(undefined)
  }, [])

  const toggleExecutorVisible = useCallback(() => {
    setExecutorVisible(v => !v)
  }, [setExecutorVisible])

  const currentFuncName = useMemo(() => {
    if (isNotEmpty<string>(currentCode)) {
      return currentCode.match(/function\s*([a-zA-Z_][a-zA-Z_0-1]*).*/)![1]
    }
    return ''
  }, [currentCode])

  const currentFunc = useMemo(() => {
    try {
      const realCode = removeComments(currentCode!)
      // eslint-disable-next-line no-new-func
      return new Function(`return ${realCode}`)()
    } catch (e) {
      return () => {}
    }
  }, [currentCode])

  const checkCode = useCallback(
    debounce((code: string, workingExam: IExam) => {
      const { contentRegexp } = workingExam
      const integrityRegexp = new RegExp(`^${contentRegexp.source}$`)
      if (!contentRegexp.test(code)) {
        return message.warn('不可以篡改题目哦')
      }

      try {
        const pureCode = removeComments(code)
        // eslint-disable-next-line no-new-func
        new Function(`return ${pureCode}`)()

        if (!integrityRegexp.test(pureCode)) {
          message.warn('不可以创建额外的代码哦')
        }
      } catch (e) {
        if (e && e.name && e.name === 'SyntaxError') {
          // do nothing
        } else {
          message.warn('你的代码里有什么错误哦!')
        }
      }
    }, 1000),
    []
  )

  const changeTestcaseStatus = useCallback(
    (name, status: CASE_STATUS) => {
      setTestcases(cases => {
        return cases!.map(c => {
          if (name === c.name) {
            return {
              name,
              status
            }
          }
          return c
        })
      })
    },
    [setTestcases]
  )

  const execTestcase = useCallback(
    testcase => {
      changeTestcaseStatus(testcase, CASE_STATUS.EXECUTING)

      return new Promise(resolve => {
        setTimeout(() => {
          const isTestcaseAsync = /done\(/.test(testcase)
          let testcaseExecFunc = null
          if (isTestcaseAsync) {
            // eslint-disable-next-line no-new-func
            testcaseExecFunc = new Function('assert', currentFuncName, 'done', testcase)
          } else {
            // eslint-disable-next-line no-new-func
            testcaseExecFunc = new Function('assert', currentFuncName, testcase)
          }

          let status = CASE_STATUS.EXEC_SUCCESS
          if (!isTestcaseAsync) {
            try {
              testcaseExecFunc(assert, currentFunc)
            } catch (e) {
              status = CASE_STATUS.EXEC_FAILED
            }
            changeTestcaseStatus(testcase, status)
            return resolve()
          }

          const failureTimer = setTimeout(() => {
            status = CASE_STATUS.EXEC_FAILED
            changeTestcaseStatus(testcase, status)
            return resolve()
          }, 5000)

          try {
            testcaseExecFunc(assert, currentFunc, (err: Error) => {
              clearTimeout(failureTimer)
              if (err) {
                status = CASE_STATUS.EXEC_FAILED
                changeTestcaseStatus(testcase, status)
                return resolve()
              }
              status = CASE_STATUS.EXEC_SUCCESS
              changeTestcaseStatus(testcase, status)
              return resolve()
            })
          } catch (e) {
            clearTimeout(failureTimer)
            status = CASE_STATUS.EXEC_FAILED
            changeTestcaseStatus(testcase, status)
            return resolve()
          }
        }, 10)
      })
    },
    [changeTestcaseStatus, currentFunc, currentFuncName]
  )

  const execTestcases = useCallback(() => {
    delay(() => {
      setTestcases(cases => cases!.map(c => ({ ...c, status: CASE_STATUS.NOT_EXECUTED })))
      return Promise.resolve()
    }, 0).then(() => {
      new Array(rawTestcases!.length).fill(null).reduce((prev, cur, i) => {
        const next = () => delay(() => execTestcase(rawTestcases![i]), 100)
        return prev.then(next, next)
      }, Promise.resolve())
    })
  }, [rawTestcases, execTestcase])

  return {
    initExecutor,
    resetExecutor,
    checkCode,
    currentCode,
    setCurrentCode,
    testcases,
    execTestcases,
    executorVisible,
    toggleExecutorVisible
  }
}
