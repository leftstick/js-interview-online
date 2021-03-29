import React, { useEffect, useMemo, useRef } from 'react'
import { Button, Spin, Layout, Menu } from 'antd'
import { useModel, useParams, useLocation, history } from 'umi'
import { EyeOutlined } from '@ant-design/icons'
import { useSize } from 'ahooks'

import { pick, isEmpty } from '@/helpers'

import CodeEditor from './components/CodeEditor'
import TestcaseExecutor from './components/TestcaseExecutor'

import styles from './index.less'

function Exam() {
  const { height, sayHi, sidebarCollapsed } = useModel('useAppModel', (app) =>
    pick(app, 'height', 'sayHi', 'sidebarCollapsed')
  )
  const contentRef = useRef(null)
  const { width } = useSize(contentRef.current)
  const { pathname } = useLocation()

  const { setupExam, rawExams, workingExam, executorVisible, toggleExecutorVisible } = useModel(
    'useInterviewModel',
    (model) => pick(model, 'setupExam', 'rawExams', 'workingExam', 'executorVisible', 'toggleExecutorVisible')
  )

  const containerHeight = useMemo(() => height! - 64 - 10, [height])

  const params: { examId?: string } = useParams()

  useEffect(() => {
    return setupExam(params.examId!)
  }, [setupExam, params])

  useEffect(() => {
    return sayHi()
  }, [sayHi])

  if (isEmpty(workingExam)) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin spinning size="large" />
      </div>
    )
  }

  return (
    <>
      <Layout.Sider width={280} style={{ background: '#fff' }} trigger={null} collapsible collapsed={sidebarCollapsed}>
        <Menu
          mode="inline"
          selectedKeys={[pathname.replace(/^\/coding\//, '')]}
          style={{ height: '100%', borderRight: 0 }}
          onSelect={(e) => {
            history.push(`/coding/${e.key}`)
          }}
        >
          {rawExams.map((r) => {
            const [, no, title] = r.title.match(/^([0-9]+\.)\s(.+)/)!
            return (
              <Menu.Item key={`${r.id}`}>
                <span className="anticon" style={{ verticalAlign: 'baseline' }}>
                  {no}
                </span>
                <span>{title}</span>
              </Menu.Item>
            )
          })}
        </Menu>
      </Layout.Sider>
      <Layout style={{ padding: '4px 5px 0px 5px', backgroundColor: '#fff' }}>
        <Layout.Content className={styles.layoutContent}>
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
