// 群聊

import { request } from '../http';

export interface CreateInfo {
  memberId: string;
  memberNickname: string;
  memberAvatar: string;
}
// 创建群聊
export const reqCreateGroupChat = async (createInfo: CreateInfo[]): Promise<null> =>
  request<null>({
    url: `/portal/groupChat/create/group`,
    method: 'POST',
    data: createInfo,
  });
// 申请加入群聊
export const reqApplyJoinInGroupChat = async (groupId: string): Promise<null> =>
  request<null>({
    url: `/portal/groupChat/apply`,
    method: 'GET',
    data: { groupId },
  });
// 处理加入群聊信息 审核状态 ：0：未审核，1：同意，2：拒绝
export const reqDealJoinMessage = async (applyId: string, status: 0 | 1 | 2): Promise<null> =>
  request<null>({
    url: `/portal/groupChat/handle/groupApply`,
    method: 'POST',
    data: { applyId, status },
    type: 'application/x-www-form-urlencoded',
  });
// 更新群聊头像
export const reqUpdateGroupChatAvatar = async (avatar: string, groupId: string): Promise<null> =>
  request<null>({
    url: `/portal/groupChat/update/avatar`,
    method: 'GET',
    data: { avatar, groupId },
  });
// 更新群聊昵称
export const reqChangeGroupChatNickname = async (
  nickname: string,
  groupId: string
): Promise<null> =>
  request<null>({
    url: `/portal/groupChat/update/nickname`,
    method: 'POST',
    data: { nickname, groupId },
    type: 'application/x-www-form-urlencoded',
  });
// 更新在群里的备注
export const reqChangeRemark = async (remark: string, groupId: string): Promise<null> =>
  request<null>({
    url: `/portal/groupChat/update/remark`,
    method: 'POST',
    data: { remark, groupId },
    type: 'application/x-www-form-urlencoded',
  });
// 移除成员
export const reqRemoveGroupMember = async (memberId: string, groupId: string): Promise<null> =>
  request<null>({
    url: `/portal/groupChat/delete/member`,
    method: 'POST',
    data: { memberId, groupId },
    type: 'application/x-www-form-urlencoded',
  });
// 解散群聊
export const reqDismissGroupChat = async (groupId: string): Promise<null> =>
  request<null>({
    url: `/portal/groupChat/dismiss/group`,
    method: 'GET',
    data: { groupId },
  });
// 设置群聊免打扰
export const reqSetGroupNoNotify = async (groupId: string, verifyFlag: 0 | 1): Promise<null> =>
  request<null>({
    url: `/portal/groupChat/mute/notice`,
    method: 'POST',
    data: { groupId, verifyFlag },
    type: 'application/x-www-form-urlencoded',
  });
// 更新群聊审核
export const reqUpdateVerify = async (groupId: string, noticeFlag: 0 | 1): Promise<null> =>
  request<null>({
    url: `/portal/groupChat/update/varify`,
    method: 'POST',
    data: { groupId, noticeFlag },
    type: 'application/x-www-form-urlencoded',
  });
// 更改成员角色
export const reqChangeMemberRole = async (
  groupId: string,
  memberId: string,
  role: 1 | 2 | 0
): Promise<null> =>
  request<null>({
    url: `/portal/groupChat/update/memberRole`,
    method: 'POST',
    data: { groupId, memberId, role },
    type: 'application/x-www-form-urlencoded',
  });
