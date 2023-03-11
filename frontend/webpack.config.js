const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const buildPath = path.resolve(__dirname, 'public', 'build');
const mainPath = path.resolve(__dirname, 'src', 'index.js');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    bundle: [
        mainPath,
    ]
 },
  output: {
    path: buildPath,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [nodeModulesPath],
        use: {
          loader: ['babel-loader', 'eslint-loader'],
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          },  
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['file-loader?name=[name].[ext]'],
      }, 
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)$/i,
        use: [{
          loader: 'url-loader',
          options: {
          limit: 10000,
          },
        }],
      }
    ],
  },
  devServer: {
    historyApiFallback: true,
    host: 'localhost',
    port: 3000,
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
    })
  ]
};
