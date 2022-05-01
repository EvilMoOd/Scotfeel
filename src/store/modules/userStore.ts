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
  token: string; //令牌
}

export const useUserStore = defineStore('user', {
  state: (): UserInfo => ({
    mainId: 'd57591fC-CC6e-Dc4b-f3FD-96CA8bCB9DAa',
    nickname: '郑敏',
    account: ']S!ODPGA',
    phone: 13011112222,
    avatar: 'http://dummyimage.com/120x240',
    backgroundImage: 'http://dummyimage.com/720x300',
    qrcode: 'http://dummyimage.com/120x90',
    signature:
      '准素时平山连称才全参精月且利京造个心。分身马确明放都专须科要感术白生方大。边能收比支平写支无角太总和基了。',
    spaceId: 'WUN1]',
    token:
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpblVzZXIiOnsibWFpbklkIjoiNjVkODBhMjFhOWYyNGU0NWE1Y2M0OWY1NTQ4ODEwMzQiLCJyb2xlcyI6WyJjb21tb25fdXNlciJdLCJlbmFibGVkIjpmYWxzZSwicGFzc3dvcmQiOm51bGwsImFjY291bnROb25FeHBpcmVkIjpmYWxzZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjpmYWxzZSwiYWNjb3VudE5vbkxvY2tlZCI6ZmFsc2UsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJjb21tb25fdXNlciJ9XSwidXNlcm5hbWUiOm51bGx9LCJleHAiOjE2NDgzMzk3MTN9.M48Pnb9KGdvClrrZx9nQcwJsQFPFnLfsO8brKE5Fy4LZ5mB2p2sOzmz4GbVUweHBbS9OFA2_zFYEBB05ocUQoA',
  }),
  actions: {
    //登录
    async userLogin(phone: number, authCode: number) {
      let { data } = await reqUserLogin(phone, authCode);
      uni.setStorageSync('user', data);
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
