import { defineConfig } from 'umi'

export default defineConfig({
  hash: true,
  history: {
    type: 'hash'
  },
  publicPath: '/js-interview-online/',
  favicon: '/js-interview-online/favicon.png',
  dynamicImport: {}
})
