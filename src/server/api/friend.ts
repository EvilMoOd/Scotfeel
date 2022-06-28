import { request } from '../http';

// 添加好友
export const reqAddFriend = async (content: string, appliedUserId: string): Promise<null> =>
  await request<null>({
    url: `/portal/friend/apply/addFriend`,
    method: 'POST',
    type: 'application/x-www-form-urlencoded',
    data: { content, appliedUserId },
  });
// 删除朋友
export const reqDeleteFriend = async (deletedUserId: string): Promise<null> =>
  await request<null>({
    url: `/portal/friend/delete/friend`,
    method: 'POST',
    type: 'application/x-www-form-urlencoded',
    data: { deletedUserId },
  });
// 修改朋友备注
export const reqChangeFriendRemark = async (remark: string, friendId: string): Promise<null> =>
  await request<null>({
    url: `/portal/friend/update/remark`,
    method: 'POST',
    type: 'application/x-www-form-urlencoded',
    data: { remark, friendId },
  });
// 设置免打扰
export const reqSetNoNotify = async (friendId: string, noticeFlag: 0 | 1): Promise<null> =>
  await request<null>({
    url: `/portal/friend/mute/notice`,
    method: 'POST',
    type: 'application/x-www-form-urlencoded',
    data: { friendId, noticeFlag },
  });
// 处理好友请求 审核状态 ：0：未审核，1：同意，2：拒绝
export const reqDealFriendApply = async (applyId: string, status: 0 | 1 | 2): Promise<null> =>
  await request<null>({
    url: `/portal/friend/handle/friendApply`,
    method: 'POST',
    type: 'application/x-www-form-urlencoded',
    data: { applyId, status },
  });
