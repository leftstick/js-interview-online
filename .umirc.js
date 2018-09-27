export default {
  hash: true,
  theme: './src/themes/index.js',
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
        polyfills: ['ie10'],
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
