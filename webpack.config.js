const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin') 
const { VueLoaderPlugin } = require('vue-loader')

const rootDir = path.resolve(__dirname, '..')
module.exports = {
	entry: {
    index: path.join(__dirname, './src/main.js'),
	},
	output: {
    path: path.join(__dirname, './dist'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].[name].js?[hash]'
  },
	resolve: {
    //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    extensions: ['.js', '.vue', '.json'],

    //模块别名定义，方便后续直接引用别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, './src'),
    }
  },
	module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)(\?.*)?$/,
        use: ['file-loader?name=img/[sha512:hash:base64:8]_[name].[ext]']
      },
      {
        test: /\.(eot|ttf|woff|woff2)(\?.*)?$/,
        use: ['file-loader?name=font/[name].[hash:8].[ext]']
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: ['file-loader?name=media/[name].[hash:8].[ext]']
      },
      {
        test: /\.less$/,
        use: ['style-loader','css-loader','less-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.js$/,
        use: ['eslint-loader']
      }
    ]
	},
	plugins: [
    new CleanWebpackPlugin(['*'], {
      root: path.join(rootDir, 'dist')
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, './src/asset'),
        to: path.join(__dirname, './dist/asset')
      },
      {
        from: path.join(__dirname, './src/static'),
        to: path.join(__dirname, './dist/static')
      }
    ]),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: 'body'
    })
  ],

  // 提供模式配置选项告诉webpack相应地使用其内置的优化
	mode: process.env.NODE_ENV,
	performance: {
    hints: false
  },
  
  // 控制source map的生成
	devtool: false,
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = false
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}