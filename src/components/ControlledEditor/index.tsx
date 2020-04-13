import React from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/snippets/javascript'

export default React.memo(function({ onCodeChange, value }: { onCodeChange: (value: string) => void; value: string }) {
  console.count('ControlledEditor')
  return (
    <AceEditor
      width="100%"
      height="100%"
      mode="javascript"
      theme="tomorrow"
      fontSize={14}
      onChange={onCodeChange}
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
})
