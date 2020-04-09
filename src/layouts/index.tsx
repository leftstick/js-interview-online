import React, { useEffect } from 'react'
import { Layout, Menu } from 'antd'
import { Redirect, useModel, IRouteComponentProps, history } from 'umi'
import { pick, destoryGlobalSpinner } from '@/helpers'

import { MenuFoldButton } from '@/components'

import styles from './index.less'

export default ({ location, children }: IRouteComponentProps) => {
  const { width, sidebarCollapsed, toggleSidebar } = useModel('useAppModel', model =>
    pick(model, 'width', 'sidebarCollapsed', 'toggleSidebar')
  )
  const { matchExam, rawExams } = useModel('useInterviewModel', model => pick(model, 'matchExam', 'rawExams'))
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
          &nbsp; <MenuFoldButton collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        </Layout.Header>
        <Layout className={styles.main}>
          <Layout.Sider
            width={280}
            style={{ background: '#fff' }}
            trigger={null}
            collapsible
            collapsed={sidebarCollapsed}
          >
            <Menu
              mode="inline"
              selectedKeys={[pathname]}
              style={{ height: '100%', borderRight: 0 }}
              onSelect={e => {
                history.push(e.key)
              }}
            >
              {rawExams.map(r => {
                const [, no, title] = r.title.match(/^([0-9]+\.)\s(.+)/)!
                return (
                  <Menu.Item key={`/${r.id}`}>
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
            <Layout.Content className={styles.content}>{children}</Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    </React.Fragment>
  )
}
