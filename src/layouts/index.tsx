import React, { useEffect } from 'react'
import { Layout, Menu } from 'antd'
import { Link, Redirect, useModel, IRouteComponentProps } from 'umi'

import { pick, destoryGlobalSpinner } from '@/helpers'

import styles from './index.less'

export default ({ location, children }: IRouteComponentProps) => {
  const { width, matchExam, exams } = useModel('useAppModel', model => pick(model, 'width', 'matchExam', 'exams'))
  const { pathname } = location

  useEffect(() => {
    destoryGlobalSpinner()
  }, [])

  if (width! < 1000) {
    return <div className={styles.warning}>本测验不适合在小屏环境下使用，请用大屏幕打开</div>
  }

  if (!matchExam(pathname)) {
    return (
      <Redirect
        to={{
          pathname: '/exam1'
        }}
      />
    )
  }

  return (
    <React.Fragment>
      <Layout className={styles.layout}>
        <Layout.Header className={styles.header}>
          <img src="/js-interview-online/logo.png" style={{ width: '70px' }} alt="" />
          <h2>javascript 小测验</h2>
        </Layout.Header>
        <Layout className={styles.main}>
          <Layout.Sider width={300} style={{ background: '#fff' }}>
            <Menu mode="inline" selectedKeys={[pathname]} style={{ height: '100%', borderRight: 0 }}>
              {exams.map(r => {
                return (
                  <Menu.Item key={`/${r.id}`}>
                    <Link to={`/${r.id}`}>{r.title}</Link>
                  </Menu.Item>
                )
              })}
            </Menu>
          </Layout.Sider>
          <Layout style={{ padding: '4px 5px 0px 5px', backgroundColor: '#fff' }}>
            <Layout.Content className={styles.content}>{children}</Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    </React.Fragment>
  )
}
