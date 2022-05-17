const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.config.js');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'js/[name].[hash:8].bundle.js',
  },
  devServer: {
    // contentBase: path.resolve(__dirname, '../dist'),
    static: path.resolve(__dirname, '../dist'),
    open: true,
    port: 10081,
    compress: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      hash: false
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      // {
      //   test: /\.(jsx|tsx)$/,
      //   use: [ path.resolve(__dirname, './MyLoader.js'),],
      //   exclude: /node_modules/,
      // },
    ]
  },

});
