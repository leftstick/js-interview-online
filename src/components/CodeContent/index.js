import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { dynamic } from 'umi'

import AceEditor from 'react-ace'
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/snippets/javascript'

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
  return data.default
}
