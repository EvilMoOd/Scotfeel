import type { Login } from '../../store/modules/userStore';
import { request } from '../http';

export type AuthCode = number;
//账户
//获取验证码
export const reqAuthCode = (phone: string) =>
  request<AuthCode>({
    url: `/authCode`,
    method: 'POST',
    data: { phone },
    type: 'application/x-www-form-urlencoded',
  });
//登录
export const reqUserLogin = (phone: string, authCode: string) =>
  request<Login>({
    url: `/login`,
    method: 'POST',
    data: { phone, authCode },
    type: 'application/x-www-form-urlencoded',
  });
//退出登录
export const reqUserLogout = () =>
  request<null>({
    url: `/user/logout`,
    method: 'GET',
  });
// 注销账户
export const reqUserDestroy = () =>
  request<null>({
    url: `/cancelAccount`,
    method: 'GET',
  });
//个人资料
//修改头像
export const reqChangeAvatar = (avatar: string) =>
  request<null>({
    url: `/user/update/avatar`,
    method: 'GET',
    data: { avatar },
  });
//修改昵称
export const reqChangeNickname = () =>
  request<null>({
    url: `/user/update/nickname`,
    method: 'GET',
  });
//修改背景
export const reqChangeBackground = () =>
  request<null>({
    url: `/user/update/backgroundImage`,
    method: 'GET',
  });
//修改个性签名
export const reqChangeSignal = () =>
  request<null>({
    url: `/user/update/signature`,
    method: 'GET',
  });
export interface PersonMessage {
  nickname: string;
  account: string;
  avatar: string;
  backgroundImage: string;
  signature: string;
}
//获取个人主页信息
export const reqPersonMessage = () =>
  request<PersonMessage>({
    url: `/user/home`,
    method: 'GET',
  });
//搜索好友
export const reqSearchUser = () =>
  request<string>({
    url: `/user/search`,
    method: 'GET',
  });
