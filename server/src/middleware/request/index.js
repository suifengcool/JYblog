module.exports = () => {
    return async (ctx, next) => {
    	ctx.set('Access-Control-Allow-Origin', '*')
	    // if(ctx.request.header.host.split(':')[0] === 'localhost' || ctx.request.header.host.split(':')[0] === '127.0.0.1'){
	    //     ctx.set('Access-Control-Allow-Origin', '*')
	    // }else{
	    //     ctx.set('Access-Control-Allow-Origin', SystemConfig.HTTP_server_host)
	    // }
	    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	    ctx.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
	    ctx.set('Access-Control-Allow-Credentials', true)                    // 允许带上 cookie
	    await next()
    }
}