const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
  const production = process.env.NODE_ENV === 'production';
  return ({
    devtool: production ? 'source-maps' : 'eval',
    entry: './js/app.js',
    output: production
    ? {
      path: path.resolve(__dirname, '../priv/static/js'),
      filename: 'app.js',
      publicPath: '/',
    }
    : {
      path: path.resolve(__dirname, 'public'),
      filename: 'app.js',
      publicPath: 'http://localhost:8080/',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: '../css/app.css' }),
      new CopyWebpackPlugin([{ from: 'static/', to: '../' }])
    ],
    devServer: {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  });
};