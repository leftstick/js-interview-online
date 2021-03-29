import React, { useEffect } from 'react'
import { Layout, Menu } from 'antd'
import { Redirect, useModel, IRouteComponentProps, history } from 'umi'
import { pick, destoryGlobalSpinner } from '@/helpers'

import { MenuFoldButton } from '@/components'

import styles from './index.less'

export default ({ location, children }: IRouteComponentProps) => {
  const { width, sidebarCollapsed, toggleSidebar } = useModel('useAppModel', (model) =>
    pick(model, 'width', 'sidebarCollapsed', 'toggleSidebar')
  )
  const { matchExam } = useModel('useInterviewModel', (model) => pick(model, 'matchExam'))
  const { pathname } = location

  useEffect(() => {
    destoryGlobalSpinner()
  }, [])

  if (width! < 1000) {
    return <div className={styles.warning}>本测验不适合在小屏环境下使用，请用大屏幕打开</div>
  }

  console.log('pathname', pathname)

  if (!matchExam(pathname) && pathname !== '/drawing') {
    return (
      <Redirect
        to={{
          pathname: '/coding/exam1',
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
          &nbsp; <MenuFoldButton collapsed={sidebarCollapsed!} onToggle={toggleSidebar} />
          &nbsp; &nbsp;
          <Menu
            mode="horizontal"
            defaultSelectedKeys={[pathname === '/drawing' ? '/drawing' : '/coding/exam1']}
            onSelect={(e) => {
              history.push(e.key as string)
            }}
          >
            <Menu.Item key="/coding/exam1">代码力</Menu.Item>
            <Menu.Item key="/drawing">抽象表达力</Menu.Item>
          </Menu>
        </Layout.Header>
        <Layout className={styles.main}>{children}</Layout>
      </Layout>
    </React.Fragment>
  )
}
