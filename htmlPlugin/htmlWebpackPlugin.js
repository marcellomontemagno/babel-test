const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const fs = require('fs')

const defaultIndexHtml = path.join(__dirname, 'index.html')
const customIndexHtml = path.join(process.cwd(), 'src', 'index.html')

module.exports = new HtmlWebpackPlugin({
  template: fs.existsSync(customIndexHtml) ? customIndexHtml : defaultIndexHtml,
  hash: true,
})