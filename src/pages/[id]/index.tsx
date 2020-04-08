import React, { useEffect, useMemo } from 'react'
import { Button } from 'antd'
import { useModel, useParams } from 'umi'
import { EyeOutlined } from '@ant-design/icons'

import { pick, isEmpty } from '@/helpers'

import CodeEditor from './components/CodeEditor'
import TestcaseExecutor from './components/TestcaseExecutor'

import styles from './index.less'

function Exam() {
  const { height, sayHi, setupExam, workingExam } = useModel('useAppModel', app =>
    pick(app, 'height', 'sayHi', 'setupExam', 'workingExam')
  )

  const { toggleExecutorVisible } = useModel('useCodeRunnerModel', model => pick(model, 'toggleExecutorVisible'))

  const containerHeight = useMemo(() => height! - 64 - 10, [height])

  const params: { id?: string } = useParams()

  useEffect(() => {
    setupExam(params.id!)
  }, [setupExam, params])

  useEffect(() => {
    return sayHi()
  }, [sayHi])

  if (isEmpty(workingExam)) {
    return null
  }

  return (
    <div className={styles.content} style={{ height: containerHeight }}>
      <Button shape="circle" icon={<EyeOutlined />} className={styles.verifyBtn} onClick={toggleExecutorVisible} />
      <CodeEditor exam={workingExam} />
      <TestcaseExecutor exam={workingExam} height={containerHeight} />
    </div>
  )
}

export default Exam
