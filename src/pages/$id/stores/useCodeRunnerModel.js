import { useState, useMemo, useCallback, useEffect } from 'react'
import { createModel } from 'hox'
import assert from 'assert'

import { removeComments } from '../../../helpers/object'

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
  const [runningIndex, setRunningIndex] = useState()

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

  const initTestcases = useCallback(
    cases => {
      setTestcases(() => {
        return cases.map(c => ({
          testcase: c,
          status: CASE_STATUS.NOT_EXECUTED
        }))
      })
    },
    [setTestcases]
  )

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
    (testcase, cb) => {
      const needDone = /done\(/.test(testcase)
      let func = null
      if (needDone) {
        // eslint-disable-next-line no-new-func
        func = new Function('assert', currentFuncName, 'done', testcase)
      } else {
        // eslint-disable-next-line no-new-func
        func = new Function('assert', currentFuncName, testcase)
      }

      const res = {
        testcase,
        status: CASE_STATUS.EXECUTING
      }
      changeTestcaseStatus(testcase, 'executing')
      if (!needDone) {
        try {
          func(assert, currentFunc)
          res.status = CASE_STATUS.EXEC_SUCCESS
        } catch (e) {
          res.status = CASE_STATUS.EXEC_FAILED
        }
        return cb(res)
      }

      const failureTimer = setTimeout(() => {
        res.status = 'execFailed'
        return cb(res)
      }, 5000)

      try {
        func(assert, currentFunc, function(err) {
          clearTimeout(failureTimer)
          if (err) {
            res.status = 'execFailed'
            return cb(res)
          }
          res.status = 'execSuccess'
          return cb(res)
        })
      } catch (e) {
        clearTimeout(failureTimer)
        res.status = 'execFailed'
        return cb(res)
      }
    },
    [changeTestcaseStatus, currentFunc, currentFuncName]
  )

  const execTestcases = useCallback(() => {
    setRunningIndex(0)
  }, [setRunningIndex])

  // case runner
  useEffect(() => {
    if (runningIndex === undefined || runningIndex === null) {
      return
    }
    if (testcases[runningIndex] && testcases[runningIndex].status !== CASE_STATUS.NOT_EXECUTED) {
      return
    }
    if (!testcases[runningIndex]) {
      setRunningIndex(undefined)
      return
    }
    execTestcase(testcases[runningIndex].testcase, res => {
      changeTestcaseStatus(res.testcase, res.status)
      setTimeout(() => {
        setRunningIndex(i => i + 1)
      }, 100)
    })
  }, [runningIndex, execTestcase, changeTestcaseStatus, testcases])

  return {
    testcases,
    initTestcases,
    setCurrentCode,
    setPredefinedFuncName,
    execTestcases
  }
}

export default createModel(useCodeRunnerModel)
