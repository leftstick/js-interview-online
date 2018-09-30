import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Spin } from 'antd'
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
              const self = this
              const { cases } = this.state

              const inputFuncName = code.toString().match(/function\s*([a-zA-Z_][a-zA-Z_0-1]*).*/)[1]

              function execOne(testcase, cb) {
                const needDone = /done\(/.test(testcase)
                let func = null
                if (needDone) {
                  func = new Function('assert', inputFuncName, 'done', testcase)
                } else {
                  func = new Function('assert', inputFuncName, testcase)
                }

                const res = {
                  testcase,
                  status: 'executing'
                }
                self.setState({
                  cases: cases.map(c => {
                    if (testcase === c.testcase) {
                      return {
                        testcase,
                        status: 'executing'
                      }
                    }
                    return c
                  })
                })
                if (!needDone) {
                  try {
                    func(assert, code)
                    res.status = 'execSuccess'
                  } catch (e) {
                    res.status = 'execFailed'
                  }
                  return cb(res)
                }

                const timerId = setTimeout(() => {
                  res.status = 'execFailed'
                  return cb(res)
                }, 10000)

                try {
                  func(assert, code, function(err) {
                    clearTimeout(timerId)
                    if (err) {
                      res.status = 'execFailed'
                      return cb(res)
                    }
                    res.status = 'execSuccess'
                    return cb(res)
                  })
                } catch (e) {
                  clearTimeout(timerId)
                  res.status = 'execFailed'
                  return cb(res)
                }
              }

              let startIndex = 0

              execOne(cases[startIndex].testcase, function toNext(res) {
                self.setState({
                  cases: cases.map(c => {
                    console.log(res.testcase)
                    console.log(c.testcase)
                    console.log(res.testcase === c.testcase)
                    console.log('')
                    if (res.testcase === c.testcase) {
                      return {
                        testcase: res.testcase,
                        status: res.status
                      }
                    }
                    return c
                  })
                })
                startIndex++
                const nextCase = cases[startIndex]
                if (nextCase) {
                  execOne(nextCase.testcase, toNext)
                }
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
                      console.log('status', status)
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
