'use strict';
const path = require('path');

const fs = require('fs');
const version =JSON.parse(fs.readFileSync('./package.json','utf8')).version;
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
console.log(version);
//html插件
const htmlWebpackPlugin = require('html-webpack-plugin');
//压缩js插件
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = {

    //入口(也可以是多入口)
    entry:{
        main:'./src/main.js',
        vendors:['vue','axios','vue-router','vue-preview','moment']
    },
    output:{
        //资源产出路径
        path:path.join(__dirname,'dist_production'),
        publicPath:'/',//对应请求的资源不走相对路径，
        //再公司中，最终就是加上http://www.xxx.com/
        // filename:'build.js?v='+version
        // filename:'js/[name].[chunkhash].js',  // main.312321.js
        //根据文件的不同，该标识会不一样，文件发生修改，该值也会不一样,
        //文件的指纹（数字签名）
    },
    module:{
        loaders:[
            { //处理css
                test:/\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader?minimize=true!autoprefixer-loader"
                })
            },
            {
                test:/\.less$/,
                loader:'style-loader!css-loader!autoprefixer-loader!less-loader'
            },
            {
                //处理文件
                test:/\.(jpg|png|svg|ttf|gif)$/,
                loader:'url-loader',
                options:{
                    limit:4096,
                    name:'assets/[name].[hash].[ext]'
                }
            },
            //处理js
            {
                test:/\.js$/,
                loader:'babel-loader',
                //排除node_modules目录
                exclude:/node_modules/,
                //options就交给.babelrc文件来说明
            },
            //vue
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            //处理vue-preview中的ES6
            {
                test: /vue-preview.src.*?js$/,
                loader: 'babel-loader'
            }

        ]
    },
    plugins:[
        new UglifyJSPlugin(),//压缩js
        new ExtractTextPlugin("css/[name].[contenthash:6].css"),
            //manifest会单独产出一个文件，关联着和main之间的关系
        new webpack.optimize.CommonsChunkPlugin({
            names:['vendors','manifest']
        }),
        new htmlWebpackPlugin({
            template:'./src/index.html'
        })
    ]


}

console.log(process.argv);
//做判断，究竟当前运行的是npm run build 还是run dev
if(process.argv.length === 2){ 
    //生产环境
    module.exports.output.filename = 'js/[name].[chunkhash].js';  // main.312321.js
    //让vue知道是生产环境不输出日志
    module.exports.plugins.push(new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }));
}else{  //参数个数为7
    //开发环境
    //webpack-dev-server启动的时候，没有真实的生成文件，chunkhash就用不了
    module.exports.output.filename = 'js/[name].js';
}


