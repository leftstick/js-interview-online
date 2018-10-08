import React from 'react'
import PropTypes from 'prop-types'
import Redirect from 'umi/redirect'
import { connect } from 'dva'
import { message, Button, Modal } from 'antd'

import { routes } from '../../helpers/exam'
import { removeComments } from '../../helpers/object'

import styles from './index.less'

import fightSrc from '../../assets/fight.gif'

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

  componentDidMount() {
    this.hello = Modal.info({
      title: '是时候表演真正的技术了',
      content: (
        <React.Fragment>
          <br />
          <br />
          <img src={fightSrc} alt="" style={{ width: '265px' }} />
        </React.Fragment>
      ),
      okText: '好'
    })
  }

  componentWillUnmount() {
    this.hello.destroy()
  }

  _onCodeChange = (code, route) => {
    this.setState({
      code
    })
    const isValid = route.contentValidator(code)
    if (!isValid) {
      return message.warn('不可以篡改题目哦')
    }

    try {
      new Function(`return ${removeComments(code)}`)()

      const isIntegrated = route.contentIntegrityValidator(code)
      if (!isIntegrated) {
        message.warn('不可以创建额外的代码哦')
      }
    } catch (e) {
      if (e && e.name && e.name === 'SyntaxError') {
        message.warn('代码有语法错误哦!')
      } else {
        message.warn('你的代码里有什么错误哦!')
      }
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
        <Content value={this.state.code} onChange={code => this._onCodeChange(code, route)} />
        <CaseRunner
          visible={this.state.visible}
          onClose={() => this.setState({ visible: false })}
          code={this.state.code}
          inputFuncName={route.inputFuncName}
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
