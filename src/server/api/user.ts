import { request } from '../http';

export type AuthCode = number;

//获取验证码
export const reqAuthCode = (phone: number) =>
  request<BasicResponse<AuthCode>>({
    url: `/authCode`,
    method: 'POST',
    data: { phone },
  });
//登录
export const reqUserLogin = (phone: number, authCode: number) =>
  request<BasicResponse<AuthCode>>({
    url: `/login`,
    method: 'POST',
    data: { phone, authCode },
  });
