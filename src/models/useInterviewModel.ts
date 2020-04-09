import { useState, useCallback, useMemo } from 'react'
import assert from 'assert'
import { message } from 'antd'

import debounce from 'lodash/debounce'

import { validateCode, delay, reflectFunctionFromText, reflectFunctionName } from '@/helpers'
import { IExam, CASE_STATUS } from '@/types'

import { exams as rawExams } from './exams'

export default function useInterviewModel() {
  const [workingExam, setWorkingExam] = useState<IExam>()
  const [rawTestcases, setTawTestcases] = useState<string[]>()
  const [executorVisible, setExecutorVisible] = useState<boolean>(false)

  const matchExam = useCallback((pathname: string) => rawExams.some(e => `/${e.id}` === pathname), [])

  const setupExam = useCallback(
    (examId: string) => {
      const exam = rawExams.find(e => e.id === examId)
      Promise.all([exam!.getExamInitial(), exam!.getTestcases()]).then(([i, t]) => {
        setWorkingExam({
          id: exam!.id,
          title: exam!.title,
          contentRegexp: exam!.contentRegexp,
          code: sessionStorage.getItem(exam!.id) || i.default,
          testcases: t.default.map(c => ({
            content: c,
            status: CASE_STATUS.NOT_EXECUTED
          }))
        })
        setTawTestcases(t.default)
      })

      return () => {
        setWorkingExam(undefined)
        setExecutorVisible(false)
        setTawTestcases(undefined)
      }
    },
    [setWorkingExam]
  )

  const toggleExecutorVisible = useCallback(() => {
    setExecutorVisible(v => !v)
  }, [setExecutorVisible])

  const checkCode = useCallback(
    debounce((code: string, exam: IExam) => {
      try {
        validateCode(code, exam)
      } catch (error) {
        message.warn(error.message)
      }
    }, 1000),
    []
  )

  const modifyCode = useCallback(
    (code: string) => {
      setWorkingExam(exam => {
        sessionStorage.setItem(exam!.id, code)
        checkCode(code, exam!)
        return {
          ...exam!,
          testcases: exam!.testcases.map(c => ({ content: c.content, status: CASE_STATUS.NOT_EXECUTED })),
          code
        }
      })
    },
    [setWorkingExam, checkCode]
  )

  const changeTestcaseStatus = useCallback(
    (content, status: CASE_STATUS) => {
      setWorkingExam(exam => {
        return {
          ...exam!,
          testcases: exam!.testcases.map(c => {
            if (content === c.content) {
              return {
                content,
                status
              }
            }
            return c
          })
        }
      })
    },
    [setWorkingExam]
  )

  const currentFunc = useMemo(() => workingExam && reflectFunctionFromText(workingExam.code), [workingExam])
  const currentFuncName = useMemo(() => workingExam && reflectFunctionName(workingExam.code), [workingExam])

  const execTestcase = useCallback(
    testcase => {
      changeTestcaseStatus(testcase, CASE_STATUS.EXECUTING)

      return new Promise(resolve => {
        setTimeout(() => {
          const isTestcaseAsync = /done\(/.test(testcase)
          let testcaseExecFunc = null
          if (isTestcaseAsync) {
            // eslint-disable-next-line no-new-func
            testcaseExecFunc = new Function('assert', currentFuncName!, 'done', testcase)
          } else {
            // eslint-disable-next-line no-new-func
            testcaseExecFunc = new Function('assert', currentFuncName!, testcase)
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
      setWorkingExam(exam => {
        return {
          ...exam!,
          testcases: exam!.testcases.map(c => ({ content: c.content, status: CASE_STATUS.NOT_EXECUTED }))
        }
      })
      return Promise.resolve()
    }, 0).then(() => {
      new Array(rawTestcases!.length).fill(null).reduce((prev, cur, i) => {
        const next = () => delay(() => execTestcase(rawTestcases![i]), 100)
        return prev.then(next, next)
      }, Promise.resolve())
    })
  }, [setWorkingExam, rawTestcases, execTestcase])

  return {
    matchExam,
    rawExams,
    setupExam,
    workingExam,
    modifyCode,
    executorVisible,
    toggleExecutorVisible,
    execTestcases
  }
}
