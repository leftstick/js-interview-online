export default {
  hash: true,
  theme: './src/themes/index.js',
  history: 'hash',
  targes: {
    ie: 10
  },
  plugins: [
    [
      'umi-plugin-react',
      {
        dva: {
          immer: false
        },
        antd: true,
        routes: {
          exclude: [/model\.(j|t)sx?$/, /service\.(j|t)sx?$/, /models\//, /components\//, /services\//, /helpers\//]
        },
        library: 'react',
        dynamicImport: {
          webpackChunkName: true,
          level: 2
        },
        hardSource: false,
        pwa: false,
        hd: false,
        fastClick: false
      }
    ]
  ]
}
