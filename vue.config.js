module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      userCustom: 'userCustom',
    },
  },
  publicPath: './'
}