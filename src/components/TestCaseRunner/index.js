import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import dynamic from 'umi/dynamic'
import classnames from 'classnames'
import assert from 'assert'

import 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/javascript'
import 'brace/theme/tomorrow'

import { removeComments } from '../../helpers/object'

import styles from './index.less'

function getTestCaseRunner(loader) {
  return dynamic({
    loader() {
      return loader()
        .then(toCases)
        .then(cases => {
          class CaseRunner extends React.Component {
            static propTypes = {
              visible: PropTypes.bool,
              onClose: PropTypes.func,
              code: PropTypes.string,
              height: PropTypes.number
            }

            constructor(props) {
              super(props)

              this.state = {
                cases: cases.map(c => ({
                  testcase: c,
                  status: 'notExecuted'
                }))
              }
            }

            exec = code => {
              const { cases } = this.state

              const inputFuncName = code.toString().match(/function\s*([a-zA-Z_][a-zA-Z_0-1]*).*/)[1]

              const results = cases.map(({ testcase, status }) => {
                const func = new Function('assert', inputFuncName, testcase)
                const res = {
                  testcase
                }
                try {
                  func(assert, code)
                  res.status = 'execSuccess'
                } catch (e) {
                  res.status = 'execFailed'
                }
                return res
              })

              this.setState({
                cases: results
              })
            }

            render() {
              const { visible, onClose, code, height } = this.props
              if (!visible) {
                return null
              }

              const realCode = removeComments(code)

              let executable = () => {}

              try {
                executable = new Function(`return ${realCode}`)()
              } catch (e) {
                // information reported before
              }

              return (
                <div className={styles.container} style={{ height: `${height}px` }}>
                  <Icon type="close" theme="outlined" className={styles.closeBtn} onClick={onClose} />
                  <Icon type="right" theme="outlined" className={styles.runBtn} onClick={() => this.exec(executable)} />
                  <div className={styles.innerContainer} style={{ height: `${height - 40}px` }}>
                    {this.state.cases.map(({ testcase, status }) => {
                      const lenHeight = testcase.split('\n').length * 19
                      return (
                        <div
                          className={classnames(styles.caseContainer, styles[status])}
                          key={testcase}
                          style={{ height: `${lenHeight + 20}px` }}
                        >
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
          }

          return CaseRunner
        })
    }
  })
}

export default getTestCaseRunner

function toCases(data) {
  return data.default
}
