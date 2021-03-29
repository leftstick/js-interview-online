import React from 'react'
import { ReactDoPainting } from 'react-do-painting'
import { useModel } from 'umi'

import { pick } from '@/helpers'

export default function Drawing() {
  const { height } = useModel('useAppModel', (app) => pick(app, 'height'))
  return <ReactDoPainting style={{ width: '100%', height: height! - 64 }} />
}
