import { request } from '../http';

// 账户
// 获取验证码
export type AuthCode = number;
export const reqAuthCode = async (phone: string): Promise<AuthCode> =>
  request<AuthCode>({
    url: `/portal/authCode`,
    method: 'POST',
    data: { phone },
    type: 'application/x-www-form-urlencoded',
  });
// 登录
export interface UserInfo {
  mainId: string; // 用户mainId
  nickname: string; // 用户昵称
  account: string; // 用户@id
  phone: string; // 用户手机号
  avatar: string; // 用户头像
  backgroundImage: string; // 用户背景照片
  qrcode: string; // 用户二维码
  signature: string; // 用户个性签名
  spaceId: string; // 首页左滑默认进入空间ID
}
export interface SubscribedSpace {
  spaceId: string;
  belongToId: string;
  nickname: string;
  avatar: string;
  role: number;
}
export interface GroupMember {
  memberId: string; // 联系人id
  remarkName: string; // 成员在这个群里的备注,群聊成员显示名字优先级——群聊成员备注>我对这个用户的备注该成员的网名
  role: 0 | 1 | 2; // 群聊角色，0：群主，1：管理员：2：普通成员
  isExited: 0 | 1; // 是否已退出，0：是，1：否
  belongToId: string; // 用户id，标记这条记录是属于哪个用户的，因为可能会有多个账户在这台设备中登录
  nickname: string; // 昵称
  avatar: string; // 头像
  groupId: string; // 群聊id
}
export interface GroupChat {
  groupId: string; // 群聊id
  nickname: string; // 群聊昵称
  avatar: string; // 群聊头像
  memberCount: number; // 群聊成员数
  belongToId: string; // 属于哪个用户
  noticeFlag: 0 | 1; // 是否设为免打扰，0：否，1：是
  spaceId: string; // 群聊绑定的空间id
  spaceNickname: string; // 群聊绑定的空间昵称
  spaceAvatar: string; // 群聊绑定的空间头像
  isDismissed: 0 | 1; // 是否已解散，0：否，1：是；当群聊已解散时，则客户端直接在会话列表标识，并且将不能够再进入到群聊的聊天框中
}
export interface FriendInfo {
  friendId: string; // 用户id或群聊id
  nickname: string; // 昵称
  remarkName: string; // 备注
  avatar: string; // 头像
  spaceId: string; // 所绑定的空间ID
  isDeletedByFriend: 0 | 1; // 是否已被朋友删除，0：否，1：是
  belongToId: string; // 用户id，标记这条记录是属于哪个用户的，因为可能会有多个账户在这台设备中登录
  account: string; // @id(用户）
  backgroundImage: string; // 背景照片(用户）
  noticeFlag: 0 | 1; // 是否设为免打扰，0：否，1：是G
  signature: string;
}
export interface User {
  userInfo?: UserInfo;
  token?: string; // 令牌
  subscribedSpace: SubscribedSpace[];
  groupChatMember: GroupMember[];
  groupChat: GroupChat[];
  friend: FriendInfo[];
}
export const reqUserLogin = async (phone: string, authCode: string): Promise<User> =>
  request<User>({
    url: `/portal/login`,
    method: 'POST',
    data: { phone, authCode },
    type: 'application/x-www-form-urlencoded',
  });
// 退出登录
export const reqUserLogout = async (): Promise<null> =>
  request<null>({
    url: `/portal/user/logout`,
    method: 'GET',
  });
// 注销账户
export const reqUserDestroy = async (): Promise<null> =>
  request<null>({
    url: `/portal/cancelAccount`,
    method: 'GET',
  });
// 校验token
export const reqValidateToken = async (): Promise<{ token: string }> =>
  request<{ token: string }>({
    url: `/portal/validateToken`,
    method: 'GET',
  });
// 个人资料
// 修改头像
export const reqChangeAvatar = async (avatar: string): Promise<null> =>
  request<null>({
    url: `/portal/user/update/avatar`,
    method: 'POST',
    data: { avator: avatar },
    type: 'application/x-www-form-urlencoded',
  });
// 修改昵称
export const reqChangeNickname = async (nickname: string): Promise<null> =>
  request<null>({
    url: `/portal/user/update/nickname`,
    method: 'POST',
    data: { nickname },
    type: 'application/x-www-form-urlencoded',
  });
// 修改背景
export const reqChangeBackground = async (backgroundImage: string): Promise<null> =>
  request<null>({
    url: `/portal/user/update/backgroundImage`,
    method: 'POST',
    data: { backgroundImage },
    type: 'application/x-www-form-urlencoded',
  });
// 修改个性签名
export const reqChangeSignal = async (signature: string): Promise<null> =>
  request<null>({
    url: `/portal/user/update/signature`,
    method: 'POST',
    data: { signature },
    type: 'application/x-www-form-urlencoded',
  });
// 修改@id
export const reqChangeId = async (id: string): Promise<null> =>
  request<null>({
    url: `/portal/user/update/account`,
    method: 'POST',
    data: { id },
    type: 'application/x-www-form-urlencoded',
  });
// 获取个人主页信息
export interface PersonMessage {
  userId: string;
  nickname: string;
  remarkName?: string;
  account: string;
  avatar: string;
  backgroundImage?: string;
  signature?: string;
}
export const reqPersonMessage = async (mainId: string): Promise<PersonMessage> =>
  request<PersonMessage>({
    url: `/portal/user/home`,
    method: 'GET',
    data: { mainId },
  });
// 搜索好友
export interface PersonInfo {
  userId: string;
  nickname: string;
  remarkName?: any;
  account: string;
  avatar: string;
  backgroundImage?: any;
  signature?: any;
  relationship: number;
}
export const reqSearchUser = async (searchContent: string): Promise<PersonInfo> =>
  request<PersonInfo>({
    url: `/portal/user/search`,
    method: 'GET',
    data: { searchContent },
  });
// 获取图片表单数据
export interface ImgData {
  accessKeyId: string;
  securitytoken: string;
  signature: string;
  policy: string;
  imageId: string;
}
export const reqImgData = async (): Promise<ImgData> =>
  request<ImgData>({
    url: `/portal/OBS/get/formData`,
    method: 'GET',
  });
