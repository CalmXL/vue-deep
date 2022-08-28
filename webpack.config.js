const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  resolve: {
    modules:  [resolve(__dirname, ''), resolve(__dirname, 'node_modules')]
  },
  module: {},
  plugins: [
    new HtmlWebpackPlugin({ 
      template: resolve(__dirname, 'public/index.html')
    })
  ]
}
