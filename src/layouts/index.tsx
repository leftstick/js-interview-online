import React, { useEffect, useMemo } from 'react'
import { Layout, Menu } from 'antd'
import { useModel, IRouteComponentProps, useHistory, useIntl } from 'umi'
import { pick, destoryGlobalSpinner, exportAnswers } from '@/helpers'

import { MenuFoldButton, LangSwitch } from '@/components'

import styles from './index.less'

enum NavKey {
  CODING = '/coding/exam1',
}

export default ({ children }: IRouteComponentProps) => {
  const { width, sidebarCollapsed, toggleSidebar } = useModel('useAppModel', (model) =>
    pick(model, 'width', 'sidebarCollapsed', 'toggleSidebar')
  )
  const { location, push } = useHistory()
  const { formatMessage } = useIntl()
  const { pathname } = location

  const activeKey = useMemo(() => {
    if (pathname.startsWith('/coding')) {
      return NavKey.CODING
    }
    return pathname
  }, [pathname])

  useEffect(() => {
    destoryGlobalSpinner()
  }, [])

  if (width! < 1000) {
    return <div className={styles.warning}>本测验不适合在小屏环境下使用，请用大屏幕打开</div>
  }

  return (
    <React.Fragment>
      <Layout className={styles.layout}>
        <Layout.Header className={styles.header}>
          <img src="/js-interview-online/logo.png" style={{ width: '70px' }} alt="" />
          <h2>{formatMessage({ id: 'APP_TITLE' })}</h2>
          &nbsp; <MenuFoldButton collapsed={sidebarCollapsed!} onToggle={toggleSidebar} />
          &nbsp;
          <Menu
            mode="horizontal"
            selectedKeys={[activeKey]}
            onSelect={({ key }) => {
              return push(key as string)
            }}
          >
            <Menu.Item key={NavKey.CODING}>{formatMessage({ id: 'CODING_MENU_TITLE' })}</Menu.Item>
          </Menu>
          <div className={styles.rightMenu}>
            <LangSwitch />
            <Menu
              mode="horizontal"
              onClick={({ key }) => {
                if (key === 'EXPORT') {
                  exportAnswers()
                }
              }}
            >
              <Menu.Item key="EXPORT">{formatMessage({ id: 'RESULT_EXPORT' })}</Menu.Item>
            </Menu>
          </div>
        </Layout.Header>
        <Layout className={styles.main}>{children}</Layout>
      </Layout>
    </React.Fragment>
  )
}
