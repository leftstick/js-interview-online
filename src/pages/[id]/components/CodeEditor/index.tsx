import React, { useState, useEffect } from 'react'
import { Spin } from 'antd'
import { useModel } from 'umi'

import AceEditor from 'react-ace'
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/snippets/javascript'

import { IExam } from '@/types'
import { pick } from '@/helpers'

interface ICodeEditorProps {
  exam: IExam
}

export default ({ exam }: ICodeEditorProps) => {
  const [examInitial, setExamInitial] = useState('')
  const { checkCode } = useModel('useAppModel', app => pick(app, 'checkCode'))
  const { setCurrentCode, currentCode } = useModel('useCodeRunnerModel', model =>
    pick(model, 'setCurrentCode', 'currentCode')
  )

  useEffect(() => {
    exam.getExamInitial().then(txt => {
      setExamInitial(txt.default)
    })
  }, [setExamInitial, exam])

  useEffect(() => {
    if (examInitial) {
      setCurrentCode(sessionStorage.getItem(exam.id) || examInitial)
    }
  }, [exam, examInitial, setCurrentCode])

  if (!currentCode) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin spinning size="large" />
      </div>
    )
  }

  return (
    <AceEditor
      width="100%"
      height="100%"
      mode="javascript"
      theme="tomorrow"
      fontSize={14}
      onChange={c => {
        setCurrentCode(c)
        checkCode(c)
        sessionStorage.setItem(exam.id, c)
      }}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={currentCode}
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
