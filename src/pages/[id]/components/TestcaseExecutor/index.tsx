import React, { useEffect } from 'react'
import { useModel } from 'umi'
import { Spin } from 'antd'
import { CloseOutlined, RightOutlined } from '@ant-design/icons'
import classnames from 'classnames'

import AceEditor from 'react-ace'
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/snippets/javascript'

import { isEmptyArray, pick, CASE_STATUS } from '@/helpers'
import { IExam } from '@/types'

import styles from './index.less'

interface ICodeExecutorProps {
  exam: IExam
  height: number
}

export default ({ exam, height }: ICodeExecutorProps) => {
  const {
    initExecutor,
    resetExecutor,
    testcases,
    execTestcases,
    executorVisible,
    toggleExecutorVisible
  } = useModel('useCodeRunnerModel', model =>
    pick(
      model,
      'execTestcases',
      'initExecutor',
      'resetExecutor',
      'testcases',
      'executorVisible',
      'toggleExecutorVisible'
    )
  )

  useEffect(() => {
    exam.getTestcases().then(mod => {
      initExecutor(mod.default)
    })

    return resetExecutor
  }, [exam, initExecutor, resetExecutor])

  if (!executorVisible) {
    return null
  }

  if (isEmptyArray(testcases)) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin spinning size="large" />
      </div>
    )
  }

  return (
    <div className={styles.container} style={{ height }}>
      <CloseOutlined className={styles.closeBtn} onClick={toggleExecutorVisible} />
      <RightOutlined className={styles.runBtn} onClick={execTestcases} />
      <div className={styles.innerContainer} style={{ height: `${height - 40}px` }}>
        {testcases!.map(({ name, status }) => {
          const lenHeight = name.split('\n').length * 21
          return (
            <div
              className={classnames(styles.caseContainer, {
                [styles.execFailed]: status === CASE_STATUS.EXEC_FAILED,
                [styles.execSuccess]: status === CASE_STATUS.EXEC_SUCCESS
              })}
              key={name}
              style={{ height: `${lenHeight + 20}px` }}
            >
              <Spin spinning={status === CASE_STATUS.EXECUTING} className={styles.spinning} />
              <AceEditor
                style={{ backgroundColor: '#edeced' }}
                width="100%"
                height={`${lenHeight}px`}
                mode="javascript"
                theme="tomorrow"
                showGutter={false}
                fontSize={14}
                readOnly={true}
                value={name}
                editorProps={{
                  $blockScrolling: Infinity
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
