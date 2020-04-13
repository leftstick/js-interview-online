import React from 'react'
import { useModel } from 'umi'

import { ControlledEditor } from '@/components'
import { pick } from '@/helpers'

function CodeEditor() {
  const { workingExam, modifyCode } = useModel('useInterviewModel', model => pick(model, 'workingExam', 'modifyCode'))

  const { code } = workingExam!

  return <ControlledEditor value={code} onCodeChange={modifyCode} />
}

export default CodeEditor
