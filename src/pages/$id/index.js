import React from 'react'
import PropTypes from 'prop-types'
import Redirect from 'umi/redirect'
import { connect } from 'dva'
import { message, Button } from 'antd'

import { routes } from '../../helpers/exam'

import styles from './index.less'

class Exam extends React.Component {
  static propTypes = {
    locationPathname: PropTypes.string,
    locationQuery: PropTypes.object,
    screenHeight: PropTypes.number
  }

  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      code: ''
    }
  }

  _onCodeChange = (code, regex) => {
    this.setState({
      code
    })
    const isValid = regex.test(code)
    if (!isValid) {
      message.warn('不可以篡改题目哦')
    }
  }

  render() {
    const { locationPathname, screenHeight } = this.props
    const route = routes.find(r => r.path === locationPathname)
    if (!route) {
      return (
        <Redirect
          to={{
            pathname: '/exam1'
          }}
        />
      )
    }

    const Content = route.content
    const CaseRunner = route.testCase

    const containerHeight = screenHeight - 64 - 10

    return (
      <div className={styles.content} style={{ height: `${containerHeight}px` }} ref={this.container}>
        <Button
          shape="circle"
          icon="eye"
          className={styles.verifyBtn}
          onClick={() => this.setState({ visible: true })}
        />
        <Content value={this.state.code} onChange={code => this._onCodeChange(code, route.contentRegex)} />
        <CaseRunner
          visible={this.state.visible}
          onClose={() => this.setState({ visible: false })}
          code={this.state.code}
          height={containerHeight}
        />
      </div>
    )
  }
}

export default connect(({ app }) => {
  return {
    locationPathname: app.locationPathname,
    locationQuery: app.locationQuery,
    screenHeight: app.screenHeight
  }
})(Exam)
