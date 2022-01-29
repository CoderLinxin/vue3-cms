const path = require('path')

module.exports = {
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