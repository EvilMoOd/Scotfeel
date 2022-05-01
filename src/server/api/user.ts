import type { UserInfo } from '../../store/modules/userStore';
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
  request<BasicResponse<UserInfo>>({
    url: `/login`,
    method: 'POST',
    data: { phone, authCode },
  });
//退出登录
export const reqUserLogout = () =>
  request<BasicResponse<null>>({
    url: `/user/logout`,
    method: 'GET',
  });
// 注销账户
export const reqUserDestroy = () =>
  request<BasicResponse<null>>({
    url: `/cancelAccount`,
    method: 'GET',
  });
