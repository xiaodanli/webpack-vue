const path = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');

const extractTextPlugin = require('extract-text-webpack-plugin');

const webpack = require('webpack');

module.exports = {
    entry:{
        index:'./src/index'
    },
    mode:'development',
    output:{
        path:path.join(__dirname,'dist'),
        filename:'[name].js'
    },
    module:{  //加载器
        rules:[  //规则
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            },
            {
                test:/\.scss$/,
                use:extractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','sass-loader']
                })
            },
            {
                test:/\.(png|jpe?g|svg|gif|ttf)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        limit:8000
                    }
                }
            },
            {
                test:/\.html$/,
                use:{
                    loader:'html-loader',
                    options:{
                        attrs:['img:src']
                    }
                }
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template:'./src/index.html',
            inject:'head',
            filename:'index.html'
        }),
        new extractTextPlugin({
            filename:"[name].css"
        }),
        // new webpack.HotModuleReplacementPlugin()  //模块热更新
    ],
    devServer:{
        contentBase:path.join(__dirname,'dist'),
        port:9090,
        before(app){
            app.get('/api/list',(req,res,next) => {
                res.json({code:1,data:'data'})
            })
        },
        proxy:{  //设置代理
            '/api':'http://loadlhost:3000'
        },
        hot:false
    }
}

//单入口 ---> 单出口

//多入口 ---> 多出口  webpack不推荐多页面开发
