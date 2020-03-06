import { defineConfig } from 'umi'

export default defineConfig({
  hash: true,
  history: {
    type: 'hash'
  },
  publicPath: '/js-interview-online/',
  favicon: '/js-interview-online/favicon.png',
  dynamicImport: {},
  chainWebpack(memo) {
    memo.module
      .rule('raw-loader')
      .test(/\.(txt|text)$/)
      .use('raw-loader')
      .loader('raw-loader')
  }
})
