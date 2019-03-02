import axios from 'axios'
import { message } from 'antd'

// process.env.BASE_URL',process.env.BASE_URL
let service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:6060' : '', // api的base_url
  timeout: 50000, // 请求超时时间
})


// request拦截器 axios的一些配置
service.interceptors.request.use(
	config => {
		const token = localStorage.getItem('token')
		if(token) {
			config.headers.common['Authorization'] = 'mrshulan' + token
		}
		return config
	},
	error => {
		// Do something with request error
		message.error('bed request:', error)
		Promise.reject(error);
	},
);

// respone拦截器 axios的一些配置
service.interceptors.response.use(
	response => {
		if (response.data.code === 401 && response.data.message) message.warning(response.data.message)
    return response.data
	},
	error => {
		message.error('error:' + error); // for debug
		return Promise.reject(error);
	},
);

export default service;
