import { defineStore } from "pinia";
import { reqAuthCode, reqUserLogin } from "../../server/api/user";

interface Login {
	userInfo: string
	authCode: number
};

export const useUserStore = defineStore('user', {
	state: (): Login => ({
		userInfo: uni.getStorageSync("user") || null,
		authCode: -1
	}),
	actions: {
		//登录
		async userLogin(phone: number, authCode: number) {
			let { code, data } = await reqUserLogin(phone, authCode);
			if (code == 200) {
				uni.setStorageSync("user", data);
			} else {
				return Promise.reject(new Error("登录失败"));
			}
		},
		//获取验证码
		async userGetAuthCode(phone: number) {
			let result = await reqAuthCode(phone);
			if (result.code == 200) {
				this.$state.authCode = result.data.authCode;
			} else {
				return Promise.reject(new Error("获取验证码失败"));
			}
		},
		//退出登录
		loginOut() {
			uni.removeStorageSync("user");
		},
	},
})
