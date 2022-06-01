// 群聊

import { request } from '../http';

export interface CreateInfo {
  memberIds: string;
  memberNicknames: string;
  memberAvatars: string;
}
// 创建群聊
export const reqCreateGroupChat = async (createInfo: CreateInfo[]): Promise<null> =>
  await request<null>({
    url: `/groupChat/create/group`,
    method: 'POST',
    data: { createInfo },
  });
// 申请加入群聊
export const reqApplyJoinInGroupChat = async (groupId: string): Promise<null> =>
  await request<null>({
    url: `/groupChat/apply`,
    method: 'GET',
    data: { groupId },
  });
// 处理加入群聊信息 审核状态 ：0：未审核，1：同意，2：拒绝
export const reqDealJoinMessage = async (applyId: string, status: 0 | 1 | 2): Promise<null> =>
  await request<null>({
    url: `/groupChat/handle/groupApply`,
    method: 'POST',
    data: { applyId, status },
    type: 'application/x-www-form-urlencoded',
  });
// 更新群聊头像
export const reqUpdateGroupChatAvatar = async (avatar: string, groupId: string): Promise<null> =>
  await request<null>({
    url: `/groupChat/update/avatar`,
    method: 'GET',
    data: { avatar, groupId },
  });
// 更新群聊昵称
export const reqChangeGroupChatNickname = async (
  nickname: string,
  groupId: string
): Promise<null> =>
  await request<null>({
    url: `/groupChat/update/nickname`,
    method: 'POST',
    data: { nickname, groupId },
    type: 'application/x-www-form-urlencoded',
  });
// 更新在群里的备注
export const reqChangeRemark = async (remark: string, groupId: string): Promise<null> =>
  await request<null>({
    url: `/groupChat/update/remark`,
    method: 'POST',
    data: { remark, groupId },
    type: 'application/x-www-form-urlencoded',
  });
// 移除成员
export const reqRemoveGroupMember = async (memberId: string, groupId: string): Promise<null> =>
  await request<null>({
    url: `/groupChat/delete/member`,
    method: 'POST',
    data: { memberId, groupId },
    type: 'application/x-www-form-urlencoded',
  });
// 解散群聊
export const reqDismissGroupChat = async (groupId: string): Promise<null> =>
  await request<null>({
    url: `/groupId/dismiss/group`,
    method: 'GET',
    data: { groupId },
  });
// 获取全部成员信息
export interface MemberInfo {
  mainId: string;
  remarkName?: any;
  nickname: string;
  avatar: string;
  role: string;
}
export const reqGetAllMemberInfo = async (): Promise<MemberInfo[]> =>
  await request<MemberInfo[]>({
    url: `/groupChat/get/allMembers`,
    method: 'GET',
  });
// 设置群聊免打扰
export const reqSetGroupNoNotify = async (groupId: string, noticeFlag: 0 | 1): Promise<null> =>
  await request<null>({
    url: `/groupChat/mute/notice`,
    method: 'POST',
    data: { groupId, noticeFlag },
    type: 'application/x-www-form-urlencoded',
  });
// 更新群聊审核
export const reqUpdateVerify = async (groupId: string, noticeFlag: 0 | 1): Promise<null> =>
  await request<null>({
    url: `/groupChat/update/varify`,
    method: 'POST',
    data: { groupId, noticeFlag },
    type: 'application/x-www-form-urlencoded',
  });
// 更改成员角色
export const reqChangeMemberRole = async (
  groupId: string,
  memberId: string,
  role: 1 | 2 | 3
): Promise<null> =>
  await request<null>({
    url: `/groupChat/update/memberRole`,
    method: 'POST',
    data: { groupId, memberId, role },
    type: 'application/x-www-form-urlencoded',
  });
