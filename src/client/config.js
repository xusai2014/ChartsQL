
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:path.join(__dirname,'./index.tsx'),
    mode:'production',
    output:{
      path: path.resolve(__dirname, "../../dist"), // string
      // 所有输出文件的目标路径
      filename: "bundle.js", // string    // 「入口分块(entry chunk)」的文件名模板（出口分块？）
      publicPath: "/assets/", // string    // 输出解析文件的目录，url 相对于 HTML 页面
    },
    module: {
      rules: [
        // 模块规则（配置 loader、解析器等选项）
        {
          test: /\.tsx?$/,
          loader: 'ts-loader'
        },
      ]
    },
    resolve: {
      extensions: [".ts", ".json", ".tsx",".js",".jsx", ".css"],
    },
    plugins:[
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname,'./index.html'),
        title: '',
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
      }),
    ]
  };