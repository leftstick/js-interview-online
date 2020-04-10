import React from 'react'
import { Spin } from 'antd'
import { CloseOutlined, RightOutlined } from '@ant-design/icons'
import classnames from 'classnames'

import AceEditor from 'react-ace'
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/snippets/javascript'

import { CASE_STATUS, ITestcase } from '@/types'

import styles from './index.less'

interface ICodeExecutorProps {
  height: number
  testcases: ITestcase[]
  onCloseExecutor: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  execTestcases: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export default ({ height, testcases, onCloseExecutor, execTestcases }: ICodeExecutorProps) => {
  return (
    <div className={styles.container} style={{ height }}>
      <CloseOutlined className={styles.closeBtn} onClick={onCloseExecutor} />
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
              <AceEditor
                style={{ backgroundColor: '#edeced' }}
                width="100%"
                height={`${lenHeight}px`}
                mode="javascript"
                theme="tomorrow"
                showGutter={false}
                fontSize={14}
                readOnly={true}
                value={content}
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
