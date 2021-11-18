import { defineConfig } from 'umi'

export default defineConfig({
  hash: true,
  history: {
    type: 'hash',
  },
  publicPath: '/js-interview-online/',
  favicon: '/js-interview-online/favicon.png',
  dynamicImport: {},
  locale: {},
  externals: {
    peerjs: 'window.Peer',
  },
  scripts: ['https://leftstick.gitee.io/js-interview-online/peerjs.min.js'],
})
