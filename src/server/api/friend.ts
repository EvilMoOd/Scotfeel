import { request } from '../http';

//添加好友
export const reqAddFriend = (content: string, appliedUserId: string) =>
  request<null>({
    url: `/friend/apply/addFriend`,
    method: 'POST',
    data: { content, appliedUserId },
  });
//删除朋友
export const reqDeleteFriend = (deletedUserId: string) =>
  request<null>({
    url: `/friend/delete/friend`,
    method: 'POST',
    data: { deletedUserId },
  });
//修改朋友备注
export const reqChangeFriendRemark = (remark: string, friendId: string) =>
  request<null>({
    url: `/friend/update/remark`,
    method: 'POST',
    data: { remark, friendId },
  });
//获取所有朋友
export interface AllFriends {
  friend_id: string;
  avatar: string;
  nickname: string;
  remarkName: string;
}
export const reqGetAllFriends = () =>
  request<AllFriends>({
    url: `/friend/get/allFriends`,
    method: 'GET',
  });
//设置免打扰
export const reqSetNoNotify = () =>
  request<null>({
    url: `/friend/mute/notice`,
    method: 'GET',
  });
//处理好友请求 审核状态 ：0：未审核，1：同意，2：拒绝
export const reqDealFriendApply = (applyId: string, status: 0 | 1 | 2) =>
  request<null>({
    url: `/friend/handle/friendApply`,
    method: 'POST',
    data: { applyId, status },
  });
