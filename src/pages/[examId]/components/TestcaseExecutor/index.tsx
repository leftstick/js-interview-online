import React from 'react'
import { Spin } from 'antd'
import { useModel } from 'umi'
import { CloseOutlined, RightOutlined } from '@ant-design/icons'
import classnames from 'classnames'

import { ReadOnlyEditor } from '@/components'
import { pick } from '@/helpers'
import { CASE_STATUS } from '@/types'

import styles from './index.less'

export default ({ height }: { height: number }) => {
  const { workingExam, toggleExecutorVisible, execTestcases } = useModel('useInterviewModel', model =>
    pick(model, 'workingExam', 'toggleExecutorVisible', 'execTestcases')
  )

  const { testcases } = workingExam!

  return (
    <div className={styles.container} style={{ height }}>
      <CloseOutlined className={styles.closeBtn} onClick={toggleExecutorVisible} />
      <RightOutlined className={styles.runBtn} onClick={execTestcases} />
      <div className={styles.innerContainer} style={{ height: `${height - 40}px` }}>
        {testcases.map(({ content, status }) => {
          const lenHeight = content.split('\n').length * 21
          return (
            <div
              className={classnames(styles.caseContainer, {
                [styles.execFailed]: status === CASE_STATUS.EXEC_FAILED,
                [styles.execSuccess]: status === CASE_STATUS.EXEC_SUCCESS
              })}
              key={content}
              style={{ height: `${lenHeight + 20}px` }}
            >
              <Spin spinning={status === CASE_STATUS.EXECUTING} className={styles.spinning} />
              <ReadOnlyEditor height={lenHeight} value={content} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
