import { request } from '../http';

// 获取申请通知信息
export interface ApplyNotice {
  applyId: string;
  applicantId: string;
  content: string;
  applyType: 0 | 1 | 2;
  spaceApplicantType?: 0 | 1;
  spaceId?: string;
  applicantSpaceId?: string;
  groupId: string;
  photo?: any;
  studentFlag?: 0 | 1;
  studentNumber?: string;
  graduateTime?: number;
  updateTime: number;
  userAvatar: string;
  userNickname: string;
  groupChatNickname: string;
  spaceNickname?: string;
  applicantSpaceAvatar?: string;
  applicantSpaceNickname?: string;
}
export const reqApplyNotice = async (offset: number): Promise<ApplyNotice[]> =>
  request<ApplyNotice[]>({
    url: `/portal/notice/get/applications`,
    method: 'GET',
    data: { offset },
  });
// 获取评论的通知信息
export interface CommenterInfo {
  _id: string;
  nickname: string;
  avatar: string;
}
export interface UserMomentInfo {
  content: string;
  photos: string[];
}
export interface CommentNotice {
  momentId: string;
  momentType: number;
  content: string;
  commenterInfo: CommenterInfo[];
  userMomentInfo: UserMomentInfo[];
  spaceMomentInfo: any[];
  commentType: 0 | 1;
  createTime: number;
}
export const reqCommentsNotice = async (lastCommentTime: number): Promise<CommentNotice[]> =>
  request<CommentNotice[]>({
    url: `/portal/notice/get/comments`,
    method: 'GET',
    data: { lastCommentTime },
  });
// 获取点赞通知信息
export interface LikerInfo {
  _id: string;
  nickname: string;
  avatar: string;
}
export interface LikeNotice {
  momentId: string;
  momentType: number;
  likerInfo: LikerInfo;
  userMomentInfo: UserMomentInfo[];
  spaceMomentInfo: any[];
  createTime: number;
}
export const reqLikeNotice = async (lastLikeTime: number): Promise<LikeNotice[]> =>
  request<LikeNotice[]>({
    url: `/portal/notice/get/likes`,
    method: 'GET',
    data: { lastLikeTime },
  });
// 获取转发的通知信息
export interface SpaceMomentInfo {
  content: string;
  photos: string[];
}
export interface LikerFriendRemark {
  remarkName: string;
}
export interface ForwardNotice {
  spaceMomentInfo: SpaceMomentInfo[];
  likerInfo: LikerInfo[];
  createTime: number;
  userMomentInfo: UserMomentInfo[];
  momentType: number;
  momentId: number;
  likerFriendRemark: LikerFriendRemark[];
}
export const reqForwardNotice = async (lastRepostTime: number): Promise<ForwardNotice[]> =>
  request<ForwardNotice[]>({
    url: `/portal/notice/get/reposts`,
    method: 'GET',
    data: { lastRepostTime },
  });
// 获取订阅的通知信息
export interface SubscribeNotice {
  userId: string;
  nickname: string;
  avatar: string;
  spaceId: string;
  spaceNickname: string;
  createTime: string;
}
export const reqSubscribeNotice = async (offset: number): Promise<SubscribeNotice[]> =>
  request<SubscribeNotice[]>({
    url: `/portal/notice/get/subscriptions`,
    method: 'GET',
    data: { offset },
  });
