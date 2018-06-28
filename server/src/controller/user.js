const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')

// 生成token密钥
const secret = require('../config').secret

class UserController {
    static constructor() {

    }

    /*
    * 用户注册
    */
    static async register(ctx) {
		let { account, passwd ,email} = ctx.request.body
		
		try{
			await UserModel.REGISTER(account, passwd ,email).then(status=>{
				if(!status){
					ctx.send({ 
						code: 500, 
						message: '注册失败', 
						data: null
					})
				}else{
					ctx.send({ 
						code: 200, 
						message: '注册成功', 
						data: {account} 
					})
				}
			})
		}catch(err){
			ctx.throw(err)  // 只有加上这个，才能在中间件捕捉到错误，并处理
		}
    }

    /*
    * 用户注册--check邮箱
    */
    static async registerCheckEmail(ctx) {
		let { account, passwd ,email} = ctx.request.body
		
		try{
			await UserModel.CHECKEMAIL(email).then(status=>{
				if(!status){
					ctx.send({ 
						code: 500, 
						message: '该邮箱已被注册', 
						data: null
					})
				}else{
					ctx.send({ 
						code: 200, 
						message: '该邮箱未被注册', 
						data: {email} 
					})
				}
			})
		}catch(err){
			ctx.throw(err)
		}
    }

    /*
    * 用户注册--check用户名
    */
    static async registerCheckAccount(ctx) {
		let { account, passwd ,email} = ctx.request.body
		
		try{
			await UserModel.CHECKACCOUNT(account).then(status=>{
				if(!status){
					ctx.send({ 
						code: 500, 
						message: '该用户名已被注册', 
						data: null
					})
				}else{
					ctx.send({ 
						code: 200, 
						message: '该用户名未被注册', 
						data: {account} 
					})
				}
			})
		}catch(err){
			ctx.throw(err)
		}
    }

    /*
    * 登录
    */
    static async login(ctx) {

    	console.log('ctx:',ctx.request.body)
		let { account, passwd } = ctx.request.body
		
		try{
			await UserModel.LOGIN(account, passwd).then(status=>{
				if(!status){
					ctx.send({ 
						code: 500, 
						message: '登录失败', 
						data: null
					})
				}else{
					const token = jwt.sign({ account }, secret, { expiresIn: '1h' })
					ctx.send({ 
						code: 200, 
						message: '登陆成功', 
						data: token 
					})
				}
			})
		}catch(err){
			ctx.throw(err)   
		}
    }

    /*
    * test
    */
    static async test(ctx) {
		let { account, passwd } = ctx.query

		try{
			ctx.send({ 
				code: 200, 
				account: account
			})
		}catch(err){
			ctx.throw(err)  
		}
		
    }
}

module.exports = UserController