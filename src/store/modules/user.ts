import { reqPhoneCode, reqUserLogin } from "../../api";
import { login } from "../types";

export default {
	state: ():login => ({
		userInfo: uni.getStorageSync("user"),
		phoneCode: "",
	}),

	mutations: {
		GETPHONECODE(state, data) {
			state.phoneCode = data;
		},
	},
	actions: {
		//登录
		async userLogin({ commit }, { phone, authCode }) {
			let result = await reqUserLogin({ phone, authCode });
			if (result.code == 200) {
				uni.setStorageSync("user", result.data);
			} else {
				return Promise.reject(new Error("登录失败"));
			}
		},
		//获取验证码
		async userGetPhoneCode({ commit }, phone) {
			let result = await reqPhoneCode({ phone });
			if (result.code == 200) {
				commit("GETPHONECODE", result.data);
			} else {
				return Promise.reject(new Error("获取验证码失败"));
			}
		},
		//退出登录
		loginOut() {
			uni.removeStorageSync("user");
		},
	},
	getters: {},
};
