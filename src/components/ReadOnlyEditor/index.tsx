import React from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/snippets/javascript'

export default React.memo(function({ height, value }: { height: number; value: string }) {
  console.count('ReadOnlyEditor')
  return (
    <AceEditor
      style={{ backgroundColor: '#edeced' }}
      width="100%"
      height={`${height}px`}
      mode="javascript"
      theme="tomorrow"
      showGutter={false}
      fontSize={14}
      readOnly={true}
      value={value}
      editorProps={{
        $blockScrolling: Infinity
      }}
    />
  )
})
