import axios from 'axios'
import qs from 'qs'

let cancel ,promiseArr = {}
const CancelToken = axios.CancelToken;

//请求拦截器
axios.interceptors.request.use(config => {
	//发起请求时，取消掉当前正在进行的相同请求
	if(promiseArr[config.url]) {
		promiseArr[config.url]('操作取消')
		promiseArr[config.url] = cancel
	}else{
		promiseArr[config.url] = cancel
	}
	return config
}, error => {
	return Promise.reject(error)
})

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
	return response
}, error => {
	if(error && err.response) {
		switch (err.response.status) {
			case 400:
				err.message = '错误请求'
				break;
			default:
				err.message = `连接错误${err.response.status}`
		}
	}else{
	  err.message = "连接到服务器失败"
	}
	message.error(err.message)
	return Promise.resolve(error.response)
})

axios.defaults.baseURL = '/api'
//设置默认请求头
axios.defaults.headers = {
	'X-Requested-With': 'XMLHttpRequest'
}
axios.defaults.timeout = 10000

export default {
	//get请求
	get (url,param) {
		return new Promise((resolve,reject) => {
			axios({
			    method: 'get',
			    url,
			    params: param,
			    cancelToken: new CancelToken(c => {
					cancel = c
			    })
			}).then(res => {
			    resolve(res)
			})
		})
	},

	//post请求
	post (url,param) {
	    return new Promise((resolve,reject) => {
			axios({
			    method: 'post',
			    url,
			    data: qs.stringify(param),
			    cancelToken: new CancelToken(c => {
				    cancel = c
			    })
			}).then(res => {
			    resolve(res)
			})
	    })
	}
}