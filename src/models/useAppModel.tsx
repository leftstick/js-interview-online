import React, { useCallback } from 'react'
import { useSize } from '@umijs/hooks'
import { Modal } from 'antd'

export default function() {
  const [{ width, height }] = useSize(document.body)

  const sayHi = useCallback(() => {
    const hi = Modal.info({
      title: '是时候表演真正的技术了',
      content: (
        <React.Fragment>
          <br />
          <br />
          <img src="/js-interview-online/fight.gif" alt="" style={{ width: '265px' }} />
        </React.Fragment>
      ),
      okText: '好'
    })

    return () => {
      hi.destroy()
    }
  }, [])

  return {
    width,
    height,
    sayHi
  }
}
