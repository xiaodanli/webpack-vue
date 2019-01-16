var path = require('path');

module.exports = {
    entry:{
        index:'./src/index',
        detail:'./src/detail',
        my:'./src/my'
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
    }
}

//单入口 ---> 单出口

//多入口 ---> 多出口  webpack不推荐多页面开发