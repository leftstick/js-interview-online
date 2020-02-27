import React, { useEffect } from 'react'
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
          function Content(props) {
            const { value, onChange } = props

            useFirstRunHook(onChange)

            return (
              <AceEditor
                width="100%"
                height="100%"
                mode="javascript"
                theme="tomorrow"
                fontSize={14}
                onChange={c => hanleCodeChange(c, onChange)}
                debounceChangePeriod={800}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={value}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showLineNumbers: true,
                  tabSize: 2
                }}
                editorProps={{
                  $blockScrolling: Infinity
                }}
              />
            )
          }

          Content.propTypes = {
            value: PropTypes.string,
            onChange: PropTypes.func
          }

          function useFirstRunHook(onChange) {
            useEffect(() => {
              onChange(sessionStorage.getItem(content) || content)
            }, [onChange])
          }

          function hanleCodeChange(code, onChange) {
            onChange(code)
            sessionStorage.setItem(content, code)
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
