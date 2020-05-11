import React, { useEffect, useMemo, useRef } from 'react'
import { Button, Spin } from 'antd'
import { useModel, useParams } from 'umi'
import { EyeOutlined } from '@ant-design/icons'
import { useSize } from '@umijs/hooks'

import { pick, isEmpty } from '@/helpers'

import CodeEditor from './components/CodeEditor'
import TestcaseExecutor from './components/TestcaseExecutor'

import styles from './index.less'

function Exam() {
  const { height, sayHi } = useModel('useAppModel', app => pick(app, 'height', 'sayHi'))
  const contentRef = useRef(null)
  const [{ width }] = useSize(contentRef.current)

  const { setupExam, workingExam, executorVisible, toggleExecutorVisible } = useModel('useInterviewModel', model =>
    pick(model, 'setupExam', 'workingExam', 'executorVisible', 'toggleExecutorVisible')
  )

  const containerHeight = useMemo(() => height! - 64 - 10, [height])

  const params: { examId?: string } = useParams()

  useEffect(() => {
    return setupExam(params.examId!)
  }, [setupExam, params])

  useEffect(() => {
    return sayHi()
  }, [sayHi])

  if (isEmpty(workingExam)) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin spinning size="large" />
      </div>
    )
  }

  return (
    <div ref={contentRef} className={styles.content} style={{ height: containerHeight }}>
      <Button shape="circle" icon={<EyeOutlined />} className={styles.verifyBtn} onClick={toggleExecutorVisible} />
      <CodeEditor />
      {executorVisible && <TestcaseExecutor height={containerHeight} maxWidth={width} />}
    </div>
  )
}

export default Exam
