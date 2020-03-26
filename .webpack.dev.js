const htmlWebpackPlugin = require('./htmlPlugin/htmlWebpackPlugin')
const coreConfig = require('./.webpack.core')

module.exports = {
  ...coreConfig,
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true
  },
  plugins: [
    ...coreConfig.plugins,
    htmlWebpackPlugin
  ],
};