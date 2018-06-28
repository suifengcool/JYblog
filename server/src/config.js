const config = {
    // 开发环境
    dev: {
        port: 3000,
        db:{
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '123456',
            database: 'blog'
        },
        secret: 'suifeng',                   // jwt生成token私钥
        salt: 'suifengcool123',              // md5加密盐值
        mail: {
            user: '371801080@qq.com',        // 邮箱账号
            pass: 'elotuvicharkbhie',        // 邮箱授权码
        }
    },

    // 线上生产环境
    prod: {
        port: 3000,
        db:{
            host: 'sql.m77.vhostgo.com',
            port: 3306,
            user: 'suifengcool',
            password: 'xu19880816',
            database: 'suifengcool'
        },
        secret: 'suifeng',                  // jwt生成token私钥
        salt: 'suifengcool123',             // md5加密盐值
        mail: {
            user: '371801080@qq.com',       // 邮箱账号
            pass: 'elotuvicharkbhie',       // 邮箱授权码
        }
    }
}

module.exports = config[process.env.NODE_ENV]