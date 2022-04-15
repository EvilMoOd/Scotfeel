import requests from "../util/http";

//获取验证码
export const reqPhoneCode = ({phone}) => requests({ url: '/authCode', method: 'post', data:{phone} })
//登录
export const reqUserLogin = ({phone,authCode}) => requests({ url: '/login', method: 'post', data:{phone,authCode} })