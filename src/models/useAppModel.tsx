import React, { useCallback, useState } from 'react'
import { useSize } from '@umijs/hooks'
import { Modal, message } from 'antd'
import debounce from 'lodash/debounce'

import { removeComments } from '@/helpers'

import { exams } from './exams'
import { IExam } from '@/types'

export default function() {
  const [{ width, height }] = useSize(document.body)
  const [workingExam, setWorkingExam] = useState<IExam>()

  const sayHi = useCallback(() => {
    const hi = Modal.info({
      title: '是时候表演真正的技术了',
      content: (
        <React.Fragment>
          <br />
          <br />
          <img src="/js-interview-online/fight.gif" alt="" style={{ width: '265px' }} />
        </React.Fragment>
      ),
      okText: '好'
    })

    return () => {
      hi.destroy()
    }
  }, [])

  const matchExam = useCallback((pathname: string) => exams.some(e => `/${e.id}` === pathname), [])

  const setupExam = useCallback(
    (examId: string) => {
      const exam = exams.find(e => e.id === examId)
      setWorkingExam(exam!)
    },
    [setWorkingExam]
  )

  const checkCode = useCallback(
    debounce((code: string) => {
      const { contentRegexp } = workingExam!
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
    [workingExam]
  )

  return {
    width,
    height,
    sayHi,
    workingExam,
    setupExam,
    checkCode,
    matchExam,
    exams
  }
}
