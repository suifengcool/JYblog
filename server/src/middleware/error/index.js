// const ErrorController = require('../../controller/error').api
const logError = require('../log/error')
const sendAlarmEmail = require('../mailer')

/**
 * 错误处理中间件
 * @returns function
 */
module.exports = () => {
    return async (ctx, next) => {
        try{
            await next()
            if (ctx.response.status === 404 && !ctx.response.body) ctx.throw(404);
        }catch(err) {
            const statusCode = err.statusCode || err.status || 500
            const errMsg = err.message || '服务器错误'
            ctx.response.status = statusCode

            if(statusCode === 401) {
                ctx.status = 401
                ctx.response.body = { code: '401', message: `token不存在或已过期` }
            }else if(statusCode === 500) {
                const info = await sendAlarmEmail(ctx.request.method, ctx.request.url, err)

                console.log('info:',info)
            }else{
                ctx.response.body = { errMsg }
            }

            logError(ctx, statusCode, err)
        }
    }
}
