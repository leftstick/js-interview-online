import React from 'react'
import PropTypes from 'prop-types'
import dynamic from 'umi/dynamic'

import 'brace'
import AceEditor from 'react-ace'

import { decodeBase64 } from '../../helpers/object'

import 'brace/mode/javascript'
import 'brace/theme/tomorrow'

function getCodeContent(loader) {
  return dynamic({
    loader() {
      return loader()
        .then(toContent)
        .then(content => {
          class Content extends React.Component {
            static propTypes = {
              value: PropTypes.string,
              onChange: PropTypes.func
            }

            constructor(props) {
              super(props)
              this.state = {
                code: content
              }

              const { onChange } = props
              onChange(content)
            }

            static getDerivedStateFromProps(props, state) {
              if (props.value === state.code) {
                return null
              }
              return {
                code: props.value
              }
            }

            render() {
              const { onChange } = this.props
              const { code } = this.state
              return (
                <AceEditor
                  width="100%"
                  height="100%"
                  mode="javascript"
                  theme="tomorrow"
                  fontSize={14}
                  onChange={onChange}
                  debounceChangePeriod={800}
                  showPrintMargin={true}
                  showGutter={true}
                  highlightActiveLine={true}
                  value={code}
                  setOptions={{
                    showLineNumbers: true,
                    tabSize: 2
                  }}
                  editorProps={{
                    $blockScrolling: Infinity
                  }}
                />
              )
            }
          }

          return Content
        })
    }
  })
}

export default getCodeContent

function toContent(data) {
  return decodeBase64(data.default.slice(23))
}
