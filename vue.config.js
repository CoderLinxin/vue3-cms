const path = require('path')

const TARGET_URL = 'http://152.136.185.210:5000'

module.exports = {
  outputDir: './build',
  devServer: {
    proxy: {
      "/api": {
        target: TARGET_URL,
        pathRewrite: {
          "^/api": ""
        },
        changeOrigin: true
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'assets': '@/assets',
        'common': '@/common',
        'global': '@/global',
        'components': '@/components',
        'service': '@/service',
        'views': '@/views',
      },
      extensions: ['.js', '.json', '.vue', '.ts', 'jsx', 'tsx', '.wasm'],
    },
  },
}