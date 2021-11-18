import React, { useCallback } from 'react'
import { useModel } from 'umi'

import { ControlledEditor } from '@/components'
import { pick } from '@/helpers'

function CodeEditor() {
  const { workingExam, modifyCode } = useModel('useInterviewModel', (model) => pick(model, 'workingExam', 'modifyCode'))
  const { codeShareType, sendCodeToInterviewer } = useModel('useCodeShareModel', (model) =>
    pick(model, 'codeShareType', 'sendCodeToInterviewer')
  )

  const { code, id } = workingExam!

  const onCodeChange = useCallback(
    (code: string) => {
      modifyCode(code)

      if (codeShareType === 'CANDIDATE') {
        sendCodeToInterviewer(id, code)
      }
    },
    [codeShareType, sendCodeToInterviewer, modifyCode, id]
  )

  return <ControlledEditor value={code} onCodeChange={onCodeChange} />
}

export default CodeEditor
