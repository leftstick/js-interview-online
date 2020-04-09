import React, { useMemo } from 'react'
import { useModel } from 'umi'

import AceEditor from 'react-ace'
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/snippets/javascript'

import { pick } from '@/helpers'

export default () => {
  const { modifyCode, workingExam } = useModel('useInterviewModel', model => pick(model, 'modifyCode', 'workingExam'))
  const { code } = workingExam!

  const editor = useMemo(() => {
    return (
      <AceEditor
        width="100%"
        height="100%"
        mode="javascript"
        theme="tomorrow"
        fontSize={14}
        onChange={c => {
          modifyCode(c)
        }}
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
  }, [code, modifyCode])

  return editor
}
