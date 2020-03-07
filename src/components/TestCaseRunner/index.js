import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'
import { CloseOutlined, RightOutlined } from '@ant-design/icons'
import { dynamic, useModel } from 'umi'
import classnames from 'classnames'

import AceEditor from 'react-ace'
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/snippets/javascript'

import styles from './index.less'

function CaseRunner({ visible, onClose, code, inputFuncName, height, cases }) {
  const { initModel, resetModel, testcases, execTestcases } = useModel('useCodeRunnerModel', model => ({
    initModel: model.initModel,
    resetModel: model.resetModel,
    testcases: model.testcases,
    execTestcases: model.execTestcases
  }))

  useEffect(() => {
    initModel(code, inputFuncName, cases)
    return () => {
      resetModel()
    }
  }, [code, inputFuncName, cases, initModel, resetModel])

  if (!testcases || !visible) {
    return null
  }

  return (
    <div className={styles.container} style={{ height }}>
      <CloseOutlined className={styles.closeBtn} onClick={onClose} />
      <RightOutlined className={styles.runBtn} onClick={execTestcases} />
      <div className={styles.innerContainer} style={{ height: `${height - 40}px` }}>
        {testcases.map(({ testcase, status }) => {
          const lenHeight = testcase.split('\n').length * 21
          return (
            <div
              className={classnames(styles.caseContainer, styles[status])}
              key={testcase}
              style={{ height: `${lenHeight + 20}px` }}
            >
              <Spin spinning={status === 'executing'} className={styles.spinning} />
              <AceEditor
                style={{ backgroundColor: '#edeced' }}
                width="100%"
                height={`${lenHeight}px`}
                mode="javascript"
                theme="tomorrow"
                showGutter={false}
                fontSize={14}
                readOnly={true}
                value={testcase}
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

CaseRunner.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  code: PropTypes.string,
  inputFuncName: PropTypes.string,
  height: PropTypes.number,
  cases: PropTypes.arrayOf(PropTypes.string)
}

function getTestCaseRunner(dynamicComponentLoadFunc) {
  return dynamic({
    loader() {
      return dynamicComponentLoadFunc()
        .then(toCases)
        .then(cases => {
          return function(props) {
            return <CaseRunner {...props} cases={cases} />
          }
        })
    }
  })
}

export default getTestCaseRunner

function toCases(data) {
  return data.default
}
