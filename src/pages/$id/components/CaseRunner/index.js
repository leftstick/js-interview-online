import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'

import 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/javascript'
import 'brace/theme/tomorrow'

import styles from './index.less'

class CaseRunner extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    testcases: PropTypes.array
  }

  render() {
    const { visible, onClose, testcases } = this.props
    if (!visible) {
      return null
    }
    return (
      <div className={styles.container}>
        <Icon type="close-circle" theme="outlined" className={styles.closeBtn} onClick={onClose} />
        {testcases.map(testcase => {
          return (
            <div className={styles.caseContainer}>
              <AceEditor
                key={testcase}
                style={{ backgroundColor: '#edeced' }}
                width="100%"
                height="100%"
                mode="javascript"
                theme="tomorrow"
                showGutter={false}
                fontSize={14}
                readOnly={true}
                value={testcase}
              />
            </div>
          )
        })}
      </div>
    )
  }
}

export default CaseRunner
