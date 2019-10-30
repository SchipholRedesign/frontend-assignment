const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = env => {

  const isProduction = !!env&&env.production
  const mode = isProduction?'production':'development'

  return {
    mode
    ,entry: './src/index.js'
    ,output: {
      filename: 'js/index.js'
      ,path: path.resolve(__dirname,'dist')
    }
    ,devtool: 'source-map'
    ,module: {
      rules: [{
        test: /\.scss$/
        ,use: [
          'style-loader'
          ,'css-loader'
          ,'sass-loader'
        ]
      },{
        test: /\.(eot|woff|woff2|ttf|png|jp(e*)g|svg)$/
        ,use: [{
            loader: 'url-loader'
            ,options: {
                limit: 8000
                ,name: 'img/[name]-[hash].[ext]'
            }
        }]
      },{
        test: /\.js$/
        ,exclude: /node_modules/
        ,use: {
          loader: 'babel-loader'
          ,options: { babelrc: true }
        }
      }]
    }
    ,plugins: [
      new CopyWebpackPlugin([
          { from: 'static/index.html', to: './'}
      ], {})
    ]
  }
}
