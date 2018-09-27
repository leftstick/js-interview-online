import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Layout, Menu } from 'antd'
import { Helmet } from 'react-helmet'
import { withRouter } from 'dva/router'

import { destoryGlobalSpinner } from '../helpers/view'
import { routes } from '../helpers/exam'

import favSrc from '../assets/favicon.png'
import logoSrc from '../assets/logo.png'

import styles from './OpenPageLayout.less'

function OpenPageLayout(props) {
  const { pageTitle, children } = props

  destoryGlobalSpinner()

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
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              {routes.map(r => {
                return (
                  <Menu.Item key={r.path}>
                    <span>{r.title}</span>
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
  children: PropTypes.any
}

export default withRouter(
  connect(({ app }) => {
    return {
      pageTitle: app.pageTitle
    }
  })(OpenPageLayout)
)
