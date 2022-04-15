import axios from "axios";
// import { useStore } from 'vuex'

// const store = useStore();
// const token = store.state.user.token;
//二次封装
const requests = axios.create({
	//基础路径自带/api
	baseURL: "http://127.0.0.1:4523/mock/613601",
	//请求超过20s则超时
	timeout: 20000,
});
//请求和响应拦截器
requests.interceptors.request.use((config) => {
	// token带给服务器
	// if (token) {
		// config.headers.token = token;
	// }
	return config;
});

requests.interceptors.response.use(
	(res) => {
		return res.data;
	},
	(error) => {
		return Promise.reject(new Error("网络请求失败"));
	}
);

export default requests;
