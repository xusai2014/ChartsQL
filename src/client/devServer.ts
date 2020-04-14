import webpack from 'webpack';
import middleware from 'webpack-dev-middleware';
import path from 'path';
import  express from 'express';
import apollo from '../server/apollo';
import HtmlWebpackPlugin from 'html-webpack-plugin';


const webpackConfig = {
  entry:path.join(__dirname,'./index.tsx'),
  output:{
    path: path.resolve(__dirname, "dist"), // string
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
webpackConfig['mode'] = "development";
const compiler = webpack(webpackConfig);
const app = express();
app.get('/front', (req, res) => {
  const filename = path.join(compiler.outputPath, './index.html');
  compiler.outputFileSystem['readFile'](filename, (err, result) => {
    if (err) {
    
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
    return null;
  });
});
 
app.use(
  middleware(compiler, {
    headers: {"X-Custom-Header": "yes"},//This property allows a user to pass custom HTTP headers on each request. eg. { "X-Custom-Header": "yes" }
    noInfo: false,
    index: '/index.html',//The index path for web server, defaults to "index.html". // If falsy (but not undefined), the server will not respond to requests to the root URL.
    lazy: false,//This option instructs the module to operate in 'lazy' mode, meaning that it won't recompile when files change, but rather on each request.
    mimeTypes: null,//This property allows a user to register custom mime types or extension mappings. eg. { 'text/html': [ 'phtml' ] }. Please see the documentation for node-mime for more information.
    publicPath: webpackConfig.output.publicPath,
    watchOptions: {aggregateTimeout: 200},
    serverSideRender: false,
  })
);
apollo.applyMiddleware({ app,});

// The `listen` method launches a web server.
app.listen({ port: 3001 },()=>{
    console.log(`🚀  Server ready at http://localhost:4000${apollo.graphqlPath}`,);
})