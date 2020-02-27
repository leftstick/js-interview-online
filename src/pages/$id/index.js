import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { message, Button, Modal } from 'antd'
import debounce from 'lodash/debounce'

import { routes } from '../../helpers/exam'
import { removeComments } from '../../helpers/object'

import styles from './index.less'

import fightSrc from '../../assets/fight.gif'

function Exam(props) {
  const { locationPathname, screenHeight } = props
  const [visible, setVisible] = useState(false)
  const [code, setCode] = useState('')

  const route = routes.find(r => r.path === locationPathname)

  useSayHelloHook()

  const { content: Content, testCase: CaseRunner } = route

  const containerHeight = screenHeight - 64 - 10

  return (
    <div className={styles.content} style={{ height: `${containerHeight}px` }}>
      <Button shape="circle" icon="eye" className={styles.verifyBtn} onClick={() => setVisible(true)} />
      <Content
        value={code}
        onChange={code => {
          setCode(code)
          onCodeChange(code, route)
        }}
      />
      <CaseRunner
        visible={visible}
        onClose={() => setVisible(false)}
        code={code}
        inputFuncName={route.inputFuncName}
        height={containerHeight}
      />
    </div>
  )
}

Exam.propTypes = {
  locationPathname: PropTypes.string,
  screenHeight: PropTypes.number
}

const onCodeChange = debounce(_onCodeChange, 1000)

function _onCodeChange(code, route) {
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

function useSayHelloHook() {
  useEffect(() => {
    const hello = Modal.info({
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

    return () => {
      hello.destroy()
    }
  }, [])
}

export default connect(({ app }) => {
  return {
    locationPathname: app.locationPathname,
    screenHeight: app.screenHeight
  }
})(Exam)
