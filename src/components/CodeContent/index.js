import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import dynamic from 'umi/dynamic'

import 'brace'
import AceEditor from 'react-ace'
// import 'brace/worker/javascript'
import 'brace/snippets/javascript'
import 'brace/ext/language_tools'

import { decodeBase64 } from '../../helpers/object'

import 'brace/mode/javascript'
import 'brace/theme/tomorrow'

function CodeEditor(props) {
  const { value, onChange, defaultValue } = props

  useEffect(() => {
    onChange(sessionStorage.getItem(defaultValue) || defaultValue)
  }, [onChange, defaultValue])

  return (
    <AceEditor
      width="100%"
      height="100%"
      mode="javascript"
      theme="tomorrow"
      fontSize={14}
      onChange={c => {
        onChange(c)
        sessionStorage.setItem(defaultValue, c)
      }}
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

CodeEditor.propTypes = {
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default function(dynamicComponentLoadFunc) {
  return dynamic({
    loader() {
      return dynamicComponentLoadFunc()
        .then(toContent)
        .then(content => {
          return function(props) {
            return <CodeEditor {...props} defaultValue={content} />
          }
        })
    }
  })
}

function toContent(data) {
  return decodeBase64(data.default.slice(23))
}
