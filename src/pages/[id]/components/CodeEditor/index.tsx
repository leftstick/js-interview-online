import React from 'react'

import AceEditor from 'react-ace'
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/snippets/javascript'

interface IEditorProps {
  onCodeChange: (value: string) => void
  code: string
}

function CodeEditor({ onCodeChange, code }: IEditorProps) {
  console.log('code editor')
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
      value={code}
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

export default React.memo(CodeEditor)
