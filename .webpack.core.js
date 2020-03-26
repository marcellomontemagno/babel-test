const path = require('path')
const cwd = process.cwd()
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  entry: ['core-js/stable', 'regenerator-runtime', path.join(cwd, 'src')],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: [path.join(cwd, 'src'), new RegExp('\/biModule\/')],
            use: [
              {
                loader: 'babel-loader'
              },
              {
                loader: 'eslint-loader'
              }
            ]
          },
          {
            test: /\.(png|jpg|jpeg|gif)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  // Inline to base64 URLs for <=8k images
                  limit: 8192,
                },
              }
            ]
          },
          {
            //notice no "test" field, this loader will process any file that is not caught from the previous loaders
            loader: 'file-loader',
            //html, and json files are handled automatically by webpack
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: '[name].[hash:8].[ext]'
            },
          },
          //Adding new loader(s)? Make sure to add the new loader(s) before file-loader
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      memoryLimit: 4096
    })
  ],
  performance: {
    maxEntrypointSize: 400000,
    maxAssetSize: 400000
  }
};