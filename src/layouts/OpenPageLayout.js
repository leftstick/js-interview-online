import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Layout, Menu } from 'antd'
import { Helmet } from 'react-helmet'
import { withRouter } from 'dva/router'
import Link from 'umi/link'
import Redirect from 'umi/redirect'

import { destoryGlobalSpinner } from '../helpers/view'
import { routes } from '../helpers/exam'

import favSrc from '../assets/favicon.png'
import logoSrc from '../assets/logo.png'

import styles from './OpenPageLayout.less'

function OpenPageLayout(props) {
  const { pageTitle, children, locationPathname, screenWidth } = props

  destoryGlobalSpinner()

  if (screenWidth < 1000) {
    return <div className={styles.warning}>本测验不适合在小屏环境下使用，请用大屏幕打开</div>
  }

  if (locationPathname !== '/' && routes.every(r => r.path !== locationPathname)) {
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
      <Helmet>
        <title>{pageTitle}</title>
        <link rel="icon" href={favSrc} type="image/x-icon" />
      </Helmet>
      <Layout className={styles.layout}>
        <Layout.Header className={styles.header}>
          <img src={logoSrc} style={{ width: '70px' }} alt="" />
          <h2>javascript 小测验</h2>
        </Layout.Header>
        <Layout className={styles.main}>
          <Layout.Sider width={300} style={{ background: '#fff' }}>
            <Menu mode="inline" selectedKeys={[locationPathname]} style={{ height: '100%', borderRight: 0 }}>
              {routes.map(r => {
                return (
                  <Menu.Item key={r.path}>
                    <Link to={r.path}>{r.title}</Link>
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

OpenPageLayout.propTypes = {
  pageTitle: PropTypes.string,
  children: PropTypes.any,
  locationPathname: PropTypes.string,
  screenWidth: PropTypes.number
}

export default withRouter(
  connect(({ app }) => {
    return {
      pageTitle: app.pageTitle,
      locationPathname: app.locationPathname,
      screenWidth: app.screenWidth
    }
  })(OpenPageLayout)
)
