import React, { useCallback, useState } from 'react'
import { useSize } from '@umijs/hooks'
import { Modal } from 'antd'

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

  return {
    width,
    height,
    sayHi,
    workingExam,
    setupExam,
    matchExam,
    exams
  }
}
