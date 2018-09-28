import PropTypes from 'prop-types'
import dynamic from 'umi/dynamic'
import 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/javascript'
import 'brace/theme/tomorrow'

import { decodeBase64 } from '../helpers/object'

import case1 from '../exams/exam1/testcase'
import case2 from '../exams/exam2/testcase'

export const routes = [
  {
    path: '/exam1',
    title: '如何判断一个变量是否字符串',
    content: getContent(() => import(/* webpackChunkName: "exam1" */ '../exams/exam1/question.txt').then(toContent)),
    contentRegex: /function\s*isString\(value\)\s*{[\s\S]*}/,
    testCase: case1
  },
  {
    path: '/exam2',
    title: '完成一个简单的使柯里化(currying)函数',
    content: getContent(() => import(/* webpackChunkName: "exam2" */ '../exams/exam2/question.txt').then(toContent)),
    contentRegex: /function\s*currying\(func\)\s*{[\s\S]*}/,
    testCase: case2
  }
]

function getContent(examLoader) {
  return dynamic({
    loader() {
      return examLoader().then(content => {
        function Content({ onChange }) {
          return (
            <AceEditor
              width="100%"
              height="100%"
              mode="javascript"
              theme="tomorrow"
              fontSize={14}
              onChange={onChange}
              debounceChangePeriod={800}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              value={content}
              setOptions={{
                showLineNumbers: true,
                tabSize: 2
              }}
              editorProps={{
                $blockScrolling: Infinity
              }}
            />
          )
        }

        Content.propTypes = {
          onChange: PropTypes.func
        }
        return Content
      })
    }
  })
}

function toContent(data) {
  return decodeBase64(data.default.slice(23))
}
