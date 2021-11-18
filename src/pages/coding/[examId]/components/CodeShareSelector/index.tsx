import React, { useState } from 'react'
import { Modal, Radio, Input } from 'antd'
import { CodepenOutlined } from '@ant-design/icons'
import { useModel, useIntl } from 'umi'

import styles from './index.less'

export default function CodeShareSelector() {
  const [interviewerToken, setInterviewerToken] = useState<string>()
  const {
    codeShareType,
    setCodeShareType,
    codeShareSelectorVisible,
    changeCodeShareSelectoVisible,
    startInterviewing,
    startCoding,
  } = useModel('useCodeShareModel')
  const { formatMessage } = useIntl()

  return (
    <Modal
      closable={false}
      maskClosable={false}
      visible={codeShareSelectorVisible}
      cancelText={formatMessage({ id: 'JUST_PRACTICE' })}
      okText={
        codeShareType === 'INTERVIEWER'
          ? formatMessage({ id: 'START_INTERVIEWING' })
          : formatMessage({ id: 'START_CODING' })
      }
      onCancel={() => changeCodeShareSelectoVisible(false)}
      okButtonProps={{ disabled: !interviewerToken }}
      onOk={() => {
        if (codeShareType === 'INTERVIEWER') {
          startInterviewing(interviewerToken!)
        } else {
          startCoding(interviewerToken!)
        }
        changeCodeShareSelectoVisible(false)
      }}
    >
      <div className={styles.select}>
        <Radio.Group onChange={(e) => setCodeShareType(e.target.value)} value={codeShareType}>
          <Radio value="INTERVIEWER">{formatMessage({ id: 'ARE_YOU_INTERVIEWER' })}</Radio>
          <Radio value="CANDIDATE">{formatMessage({ id: 'ARE_YOU_CANDIDATE' })}</Radio>
        </Radio.Group>
      </div>
      <div>
        <Input
          value={interviewerToken}
          onChange={(e) => setInterviewerToken(e.target.value)}
          placeholder={formatMessage({ id: 'ENTER_TOKEN' })}
          prefix={<CodepenOutlined />}
        />
      </div>
    </Modal>
  )
}
