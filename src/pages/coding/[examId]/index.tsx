import React, { useEffect, useMemo, useRef } from 'react'
import { Button, Spin, Layout, Menu } from 'antd'
import { useModel, useParams, history, useHistory, useIntl } from 'umi'
import { EyeOutlined } from '@ant-design/icons'
import { useSize } from 'ahooks'

import { pick, isEmpty } from '@/helpers'

import CodeEditor from './components/CodeEditor'
import TestcaseExecutor from './components/TestcaseExecutor'
import CodeShareSelector from './components/CodeShareSelector'
import { IExam } from '@/types'

import styles from './index.less'

function Exam() {
  const { height, sidebarCollapsed } = useModel('useAppModel', (app) => pick(app, 'height', 'sidebarCollapsed'))
  const contentRef = useRef(null)
  const workingExamRef = useRef<IExam>()
  const { width } = useSize(contentRef.current)
  const { formatMessage } = useIntl()

  const { setupExam, workingExam, executorVisible, toggleExecutorVisible, matchExam, rawExams, modifyCode, resetExam } =
    useModel('useInterviewModel', (model) =>
      pick(
        model,
        'setupExam',
        'workingExam',
        'executorVisible',
        'toggleExecutorVisible',
        'matchExam',
        'rawExams',
        'modifyCode',
        'resetExam'
      )
    )
  const { subscribeCodeChangeFromCandidate, codeShareType } = useModel('useCodeShareModel', (model) =>
    pick(model, 'subscribeCodeChangeFromCandidate', 'codeShareType')
  )

  workingExamRef.current = workingExam
  const { location, push } = useHistory()
  const { pathname } = location

  const containerHeight = useMemo(() => height! - 64 - 10, [height])

  const params: { examId?: string } = useParams()

  useEffect(() => {
    if (!matchExam(pathname)) {
      setupExam('exam1')
    } else {
      setupExam(params.examId!)
    }
    return resetExam
  }, [resetExam, setupExam, params, matchExam, pathname])

  useEffect(() => {
    if (codeShareType === 'INTERVIEWER') {
      subscribeCodeChangeFromCandidate((id, code) => {
        if (workingExamRef.current && workingExamRef.current.id === id) {
          modifyCode(code)
          return
        }
        if (workingExamRef.current && workingExamRef.current.id !== id) {
          push(`/coding/${id}`)
          setupExam(id).then(() => modifyCode(code))
          return
        }
      })
    }
  }, [subscribeCodeChangeFromCandidate, workingExamRef, modifyCode, setupExam, codeShareType, push])

  if (isEmpty(workingExam)) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin spinning size="large" />
      </div>
    )
  }

  return (
    <>
      <CodeShareSelector />
      <Layout.Sider width={280} style={{ background: '#fff' }} trigger={null} collapsible collapsed={sidebarCollapsed}>
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          style={{ height: '100%', borderRight: 0 }}
          onSelect={(e) => {
            history.push(e.key as string)
          }}
        >
          {rawExams.map((r) => {
            const [, no] = r.title.match(/.+_([0-9]+)_(.+)/)!
            return (
              <Menu.Item key={`/coding/${r.id}`}>
                <span className="anticon" style={{ verticalAlign: 'baseline' }}>
                  {no}
                </span>
                <span>{formatMessage({ id: r.title })}</span>
              </Menu.Item>
            )
          })}
        </Menu>
      </Layout.Sider>
      <Layout style={{ padding: '4px 5px 0px 5px', backgroundColor: '#fff' }}>
        <Layout.Content className={styles.content}>
          <div ref={contentRef} className={styles.content} style={{ height: containerHeight }}>
            <Button
              shape="circle"
              icon={<EyeOutlined />}
              className={styles.verifyBtn}
              onClick={toggleExecutorVisible}
            />
            <CodeEditor />
            {executorVisible && <TestcaseExecutor height={containerHeight} maxWidth={width!} />}
          </div>
        </Layout.Content>
      </Layout>
    </>
  )
}

export default Exam
