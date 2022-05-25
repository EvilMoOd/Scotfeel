//群聊

import { request } from '../http';

export interface CreateInfo {
  memberIds: string;
  memberNicknames: string;
  memberAvatars: string;
}
//创建群聊
export const reqCreateGroupChat = (createInfo: CreateInfo[]) => ({
  url: `/groupChat/create/group`,
  method: 'POST',
  data: createInfo,
});
//申请加入群聊
export const reqApplyJoinInGroupChat = (groupId: string) =>
  request<null>({
    url: `/groupChat/apply`,
    method: 'GET',
    data: { groupId },
  });
//处理加入群聊信息 审核状态 ：0：未审核，1：同意，2：拒绝
export const reqDealJoinMessage = (applyId: string, status: 0 | 1 | 2) =>
  request<null>({
    url: `/groupChat/handle/groupApply`,
    method: 'POST',
    data: { applyId, status },
    type: 'application/x-www-form-urlencoded',
  });
//更新群聊头像
export const reqUpdateGroupChatAvatar = (avatar: string, groupId: string) =>
  request<null>({
    url: `/groupChat/update/avatar`,
    method: 'GET',
    data: { avatar, groupId },
  });
//更新群聊昵称
export const reqChangeGroupChatNickname = (nickname: string, groupId: string) =>
  request<null>({
    url: `/groupChat/update/nickname`,
    method: 'POST',
    data: { nickname, groupId },
    type: 'application/x-www-form-urlencoded',
  });
//更新在群里的备注
export const reqChangeRemark = (remark: string, groupId: string) =>
  request<null>({
    url: `/groupChat/update/remark`,
    method: 'POST',
    data: { remark, groupId },
    type: 'application/x-www-form-urlencoded',
  });
//移除成员
export const reqRemoveGroupMember = () =>
  request<null>({
    url: `/groupChat/delete/member`,
    method: 'POST',
    type: 'application/x-www-form-urlencoded',
  });
//解散群聊
export const reqDismissGroupChat = (groupId: string) =>
  request<null>({
    url: `/groupId/dismiss/group`,
    method: 'GET',
    data: { groupId },
  });
//获取全部成员信息
export interface MemberInfo {
  mainId: string;
  remarkName?: any;
  nickname: string;
  avatar: string;
  role: string;
}
export const reqGetAllMemberInfo = () =>
  request<MemberInfo[]>({
    url: `/groupChat/get/allMembers`,
    method: 'GET',
  });
//设置群聊免打扰
export const reqSetGroupNoNotify = (groupId: string) =>
  request<null>({
    url: `/groupChat/mute/notice`,
    method: 'POST',
    data: { groupId },
    type: 'application/x-www-form-urlencoded',
  });
//更新群聊审核
export const reqUpdateVarify = (groupId: string) =>
  request<null>({
    url: `/groupChat/update/varify`,
    method: 'POST',
    data: { groupId },
    type: 'application/x-www-form-urlencoded',
  });
//获取一个成员信息
export interface GroupMemberInfo {
  mainId: string;
  remarkName?: any;
  nickname: string;
  avatar: string;
  role: string;
}
export const reqGroupMemberInfo = (groupId: string, appliedId: string) =>
  request<GroupMemberInfo>({
    url: `/groupChat/get/oneMember`,
    method: 'GET',
    data: { groupId, appliedId },
  });
