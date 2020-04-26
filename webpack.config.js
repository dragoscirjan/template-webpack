const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = ({ mode }) => {
  return {
    devServer: {
      compress: true,
      contentBase: path.join(__dirname, 'dist'),
      filename: 'index.html',
      port: 9000
    },
    devtool: mode === 'development' ? 'source-map' : 'none',
    mode,
    module: {
      rules: [
        // load babel (js) files
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader'
          }
        },
        // load simple css files
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
          ]
        },
        // load SCSS or SASS files
        {
          test: /\.s(c|a)ss$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ]
        },
        // load static files
        {
          test: /\.(if|jp(e*)g|png)$/,
          use: [{
            loader: 'file-loader',
            options: {
              limit: 20000, // Convert images < 8kb to base64 strings
              name: 'img/[hash]-[name].[ext]',
            }
          }]
        },
        // load fonts
        {
          test: /\.(eot|ttf|woff)$/,
          loader: "file-loader",
          options: {
            name: "fonts/[name].[contenthash].[ext]"
          }
        },
      ]
    },
    plugins: [].concat(
      mode === 'development' ? [ new uglifyJsPlugin() ] : [ ],
      [
        new HTMLWebpackPlugin({
          template: path.resolve(__dirname, 'index.html'),
        }),
        new webpack.HotModuleReplacementPlugin(),
      ]
    )
  };
};
