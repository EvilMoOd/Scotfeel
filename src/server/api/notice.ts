import { request } from '../http';

// 获取申请通知信息
export interface ApplyNotice {
  applyId: string;
  applicantId: string;
  content?: any;
  applyType: number;
  spaceApplicantType?: any;
  spaceId?: any;
  applicantSpaceId?: any;
  groupId: string;
  photo?: any;
  studentFlag?: any;
  studentNumber?: any;
  graduateTime?: any;
  updateTime: string;
  userAvatar: string;
  userNickname: string;
  groupChatNickname?: any;
  spaceNickname?: any;
  applicantSpaceAvatar?: any;
  applicantSpaceNickname?: any;
}
export const reqApplyNotice = async (offset: number): Promise<ApplyNotice[]> =>
  await request<ApplyNotice[]>({
    url: `/notice/get/applications`,
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
  commenterInfo: CommenterInfo;
  userMomentInfo: UserMomentInfo[];
  spaceMomentInfo: any[];
  commentType: number;
  createTime: string;
}
export const reqCommentsNotice = async (lastCommentTime: string): Promise<CommentNotice[]> =>
  await request<CommentNotice[]>({
    url: `/notice/get/comments`,
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
  createTime: string;
}
export const reqLikeNotice = async (lastLikeTimestring: string): Promise<LikeNotice[]> =>
  await request<LikeNotice[]>({
    url: `/notice/get/likes`,
    method: 'GET',
    data: { lastLikeTimestring },
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
export const reqSubscribeNotice = async (offset: string): Promise<SubscribeNotice[]> =>
  await request<SubscribeNotice[]>({
    url: `/notice/get/subscriptions`,
    method: 'GET',
    data: { offset },
  });
