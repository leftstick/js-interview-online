import { useState, useMemo, useCallback } from 'react'
import { createModel } from 'hox'
import assert from 'assert'

import { removeComments } from '../../../helpers/object'
import { delay } from '../../../helpers/timer'

const CASE_STATUS = {
  NOT_EXECUTED: 'notExecuted',
  EXECUTING: 'executing',
  EXEC_SUCCESS: 'execSuccess',
  EXEC_FAILED: 'execFailed'
}

function useCodeRunnerModel() {
  const [currentCode, setCurrentCode] = useState()
  const [predefinedFuncName, setPredefinedFuncName] = useState()
  const [testcases, setTestcases] = useState()
  const [rawTestcases, setRawTestcases] = useState()

  const currentFuncName = useMemo(() => {
    if (predefinedFuncName) {
      return predefinedFuncName
    }
    if (currentCode) {
      return currentCode.match(/function\s*([a-zA-Z_][a-zA-Z_0-1]*).*/)[1]
    }
    return ''
  }, [predefinedFuncName, currentCode])

  const currentFunc = useMemo(() => {
    try {
      const realCode = removeComments(currentCode)
      // eslint-disable-next-line no-new-func
      return new Function(`return ${realCode}`)()
    } catch (e) {
      return () => {}
    }
  }, [currentCode])

  const initModel = useCallback((code, inputFuncName, cases) => {
    setCurrentCode(code)
    setPredefinedFuncName(inputFuncName)
    setTestcases(
      cases.map(c => ({
        testcase: c,
        status: CASE_STATUS.NOT_EXECUTED
      }))
    )
    setRawTestcases(cases)
  }, [])

  const resetModel = useCallback((code, inputFuncName, cases) => {
    setCurrentCode(undefined)
    setPredefinedFuncName(undefined)
    setTestcases(undefined)
    setRawTestcases(undefined)
  }, [])

  const changeTestcaseStatus = useCallback(
    (testcase, status) => {
      setTestcases(cases => {
        return cases.map(c => {
          if (testcase === c.testcase) {
            return {
              testcase,
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
      changeTestcaseStatus(testcase, 'executing')

      return new Promise((resolve, reject) => {
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
            testcaseExecFunc(assert, currentFunc, err => {
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
    new Array(rawTestcases.length).fill(null).reduce((prev, cur, i) => {
      const next = () => delay(() => execTestcase(rawTestcases[i]), 100)
      return prev.then(next, next)
    }, Promise.resolve())
  }, [rawTestcases, execTestcase])

  return {
    initModel,
    resetModel,
    testcases,
    execTestcases
  }
}

export default createModel(useCodeRunnerModel)
