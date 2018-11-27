var path = require('path');
var VueLoaderPlugin=require('vue-loader/lib/plugin.js');
module.exports = {
  mode: "development", //开发模式
  //指定打包的入口
  entry: "./src/main.js",
  //指定打包的出口文件（bundle.js）
  output: {
    path: path.join(__dirname, 'dist'), //指定打包后的文件目录
    filename: 'bundle.js' //指定打包后的文件
  },
  module: {
    //rules是匹配文件的规则，在这里可以指定哪些文件格式，交给哪些loader进行处理
    rules: [
      //通过test正则匹配的css文件，通过use指定对应的loader来处理
      //注意use顺序（从右到左）
      //{test:/\.css$/,use:['style-loader','css-loader']},
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }]
      },
      //匹配图片交给url-loader来处理
      //使用[name]可以获取文件的原名，[ext]可以获取文件的后缀,
      // 使用[hash:8],可以实现对文件名称实现重命名,8代表只8位hash
      // {test:/\.(png|jpg|bmp|jepg|gif)$/,use:['url-loader?limit=500&name=[hash:8]-[name].[ext]']},

      //配置等价于
      // {
      //   test: /\.(png|jpg|bmp|jepg|gif)$/,
      //   use: [{
      //     loader: 'url-loader',
      //     options: {
      //       limit: 500,
      //       name: '[hash:8]-[name].[ext]'
      //     }
      //   }]
      // },
      

      //上面的配置如果只有一个loader,配置可以如下
                     
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        loader: 'url-loader',
        options: {
          limit: 500,
          name: '[hash:8]-[name].[ext]'
         }
      },
      //匹配字体文件,交给url-loader进行处理 
      //如果图片的大小字节数小于limit设定的值，会进行base64进行编码处理,否则会把图片的文件名称 ，使用一串随机的
      //字符串进行重命名
      {
        test: /\.(ttf|svg|woff|woff2|eot)$/,
        use: ['url-loader']
	  },
	  //添加相关loader
      {
        test:/\.js$/,
        use:['babel-loader'],
        exclude:/node_modules/ //排除node_modules文件夹中的所有js文件不进行转化处理,否则打包很慢
      },
      {
        test:/\.vue$/,
        use:[
          'vue-loader'
        ]
      },
      {
        test:/\.scss$/,
        use:['style-loader','css-loader','sass-loader']
      }
    ]
  },
  //解决,修正导入vue路径时候的问题
  resolve:{
    alias:{
      "vue$":"vue/dist/vue.js"
    }
  },
    plugins: [
      new VueLoaderPlugin() //实例化VueLoaderPlugin插件,加载.vue组件
  ]
    
}