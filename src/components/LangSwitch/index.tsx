import React, { useMemo } from 'react'
import classnames from 'classnames'

import { getLocale, setLocale } from 'umi'
import { Dropdown, Menu } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'

import styles from './index.less'

interface ILangSwitchProps {
  className?: string
}

export default function LangSwitch({ className }: ILangSwitchProps) {
  const locale = getLocale()
  const menu = useMemo(
    () => (
      <Menu
        style={{ width: 150 }}
        selectedKeys={[locale]}
        onClick={(e) => {
          setLocale(e.key as string)
        }}
      >
        <Menu.Item key="ko">
          <div>
            <span role="img" aria-label="中文">
              🇨🇳
            </span>
            &nbsp;中文
          </div>
        </Menu.Item>
        <Menu.Item key="en-US">
          <div>
            <span role="img" aria-label="English">
              🇺🇸
            </span>
            &nbsp;English
          </div>
        </Menu.Item>
      </Menu>
    ),
    [locale]
  )

  return (
    <Dropdown overlay={menu} className={classnames(styles.size, className)}>
      <div>
        <GlobalOutlined style={{ cursor: 'pointer' }} />
      </div>
    </Dropdown>
  )
}
