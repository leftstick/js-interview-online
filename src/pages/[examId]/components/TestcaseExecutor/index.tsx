import React from 'react'
import { Spin } from 'antd'
import { Resizable } from 're-resizable'
import { useModel } from 'umi'
import { CloseOutlined, RightOutlined } from '@ant-design/icons'
import classnames from 'classnames'

import { ReadOnlyEditor } from '@/components'
import { pick } from '@/helpers'
import { CASE_STATUS } from '@/types'

import styles from './index.less'

export default ({ maxWidth, height }: { maxWidth: number; height: number }) => {
  const { workingExam, toggleExecutorVisible, execTestcases } = useModel('useInterviewModel', model =>
    pick(model, 'workingExam', 'toggleExecutorVisible', 'execTestcases')
  )

  const { testcases } = workingExam!

  console.log('maxWidth', maxWidth)

  return (
    <Resizable
      className={styles.container}
      defaultSize={{ height, width: 600 }}
      style={{ position: 'absolute' }}
      maxWidth={maxWidth}
      minWidth={400}
      enable={{
        bottom: false,
        bottomLeft: false,
        bottomRight: false,
        left: true,
        right: false,
        top: false,
        topLeft: false,
        topRight: false
      }}
    >
      <CloseOutlined className={styles.closeBtn} onClick={toggleExecutorVisible} />
      <RightOutlined className={styles.runBtn} onClick={execTestcases} />
      <div className={styles.innerContainer} style={{ height: `${height - 40}px` }}>
        {testcases.map(({ content, status }) => {
          const lenHeight = content.split('\n').length * 22 + 20
          return (
            <div
              className={classnames(styles.caseContainer, {
                [styles.execFailed]: status === CASE_STATUS.EXEC_FAILED,
                [styles.execSuccess]: status === CASE_STATUS.EXEC_SUCCESS
              })}
              key={content}
              style={{ height: `${lenHeight + 10}px` }}
            >
              <Spin spinning={status === CASE_STATUS.EXECUTING} className={styles.spinning} />
              <ReadOnlyEditor height={lenHeight} value={content} />
            </div>
          )
        })}
      </div>
    </Resizable>
  )
}
