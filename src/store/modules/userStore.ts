import { defineStore } from 'pinia';
import { reqAuthCode, reqUserLogin, reqUserLogout } from '../../server/api/user';

export interface UserInfo {
  mainId: string; //用户mainId
  nickname: string; //用户昵称
  account: string; //用户@id
  phone: number; //用户手机号
  avatar: string; //用户头像
  backgroundImage: string; //用户背景照片
  qrcode: string; //用户二维码
  signature: string; //用户个性签名
  spaceId: string; //首页左滑默认进入空间ID
}
export interface Login {
  userInfo: UserInfo;
  token: string; //令牌
}
//从本地仓库捞数据
const user: Login = uni.getStorageSync('user');

export const useUserStore = defineStore('user', {
  state: (): Login => ({
    userInfo: user.userInfo,
    token: user.token,
  }),
  actions: {
    //登录
    async userLogin(phone: number, authCode: number) {
      let { data } = await reqUserLogin(phone, authCode);
      uni.setStorageSync('user', data);
      console.log(data);
      this.$state = data;
    },
    //获取验证码
    async userGetAuthCode(phone: number) {
      let result = await reqAuthCode(phone);
      console.log(result);
    },
    //退出登录
    async userLogout() {
      await reqUserLogout();
      uni.removeStorageSync('user');
    },
  },
});
