var path = require('path');

var htmlWebpackPlugin = require('html-webpack-plugin');

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
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template:'./src/index.html',
            inject:true,
            filename:'test.html'
        })
    ]
}

//单入口 ---> 单出口

//多入口 ---> 多出口  webpack不推荐多页面开发