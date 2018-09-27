import dynamic from 'umi/dynamic'
import 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/javascript'
import 'brace/theme/tomorrow'

import { decodeBase64 } from '../helpers/object'

export const routes = [
  {
    path: '/exam1',
    title: '如何判断一个变量是否字符串',
    content: getContent(() => import(/* webpackChunkName: "exam1" */ '../exams/exam1.txt').then(toContent))
  }
]

function toContent(data) {
  return decodeBase64(data.default.slice(23))
}

function getContent(examLoader) {
  return dynamic({
    loader() {
      return examLoader().then(content => {
        return () => {
          return (
            <AceEditor
              width="100%"
              mode="javascript"
              theme="tomorrow"
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              value={content}
              setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2
              }}
            />
          )
        }
      })
    }
  })
}
