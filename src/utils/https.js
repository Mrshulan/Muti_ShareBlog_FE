import axios from 'axios';

// 创建axios实例
let service = null;

// process.env.BASE_URL',process.env.BASE_URL
service = axios.create({
  baseURL: 'http://47.106.136.114/api', // api的base_url
  timeout: 50000, // 请求超时时间
})


// request拦截器 axios的一些配置
service.interceptors.request.use(
	config => {
		return config;
	},
	error => {
		// Do something with request error
		console.error('error:', error); // for debug
		Promise.reject(error);
	},
);

// respone拦截器 axios的一些配置
service.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		console.error('error:' + error); // for debug
		return Promise.reject(error);
	},
);

export default service;
