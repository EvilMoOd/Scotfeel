import { request } from '../http';
export interface PosterInfo {
  _id: string;
  nickname: string;
  avatar: string;
}

export interface FriendRemark {
  remarkName: string;
}

export interface CommentedUserInfo {
  _id: string;
  nickname: string;
  avatar: string;
}

export interface CommentedUserRemark {
  remarkName: string;
}

export interface CommenterInfo {
  _id: string;
  nickname: string;
  avatar: string;
}

export interface Comment {
  momentId: string;
  content: string;
  commentedUserInfo: CommentedUserInfo[];
  commentedUserRemark: CommentedUserRemark[];
  commenterInfo: CommenterInfo[];
  commenterRemark: any[];
  commentType: number;
  createTime: number;
}

export interface MomentInfo {
  _id: string;
  posterInfo: PosterInfo[];
  friendRemark: FriendRemark[];
  content: string;
  interactFlag: number;
  likedCount: number;
  likeStatus: number;
  commentedCount: number;
  photos: string[];
  comments: Comment[];
  createTime: number;
  repostedMomentId?: any;
  repostedMomentSpaceId?: any;
  repostedMomentPosterUserInfo: any[];
  repostedMomentPosterSpaceInfo: any[];
  repostedMomentPosterType: number;
  isReposted: number;
  repostedMomentInfo: any[];
}
// 获取动态
export const reqMoment = async (
  momentOwnerId: string,
  lastMomentTime: number
): Promise<MomentInfo[]> =>
  await request<MomentInfo[]>({
    url: `/moment/get/moments`,
    method: 'GET',
    data: { momentOwnerId, lastMomentTime },
  });
// 获取所有朋友的动态
export const reqAllFriendsMoment = async (lastMomentTime: number): Promise<MomentInfo[]> =>
  await request<MomentInfo[]>({
    url: `/moment/get/allMoments`,
    method: 'GET',
    data: { lastMomentTime },
  });
// 创建动态
export interface CreateMoment {
  content: string;
  interactFlag: number;
  photos: string[];
  repostedMomentId: string;
  repostedMomentSpaceId: string;
  repostedMomentPosterId: string;
  repostedMomentPosterType: number;
  isReposted: number;
}
export const reqCreateMoment = async (moment: CreateMoment): Promise<null> =>
  await request<null>({
    url: `/moment/create/moment`,
    method: 'POST',
    data: { ...moment },
  });
// 评论
export interface PublishComment {
  momentId: string;
  spaceMemberFlag: number;
  content: string;
  commentedUserId: string;
  commentedUserNickname: string;
  commenterNickname: string;
  commentType: number;
}
export const reqAddComment = async (comment: PublishComment): Promise<null> =>
  await request<null>({
    url: `/moment/add/comment`,
    method: 'POST',
    data: { ...comment },
  });
// 删除动态
export const reqDeleteMoment = async (momentId: string): Promise<null> =>
  await request<null>({
    url: `/moment/delete/moment`,
    method: 'GET',
    data: { momentId },
  });
// 点赞
export const reqAddLike = async (Like: { momentId: string; posterId: string }): Promise<null> =>
  await request<null>({
    url: `/moment/add/like`,
    method: 'POST',
    data: { ...Like },
  });
// 取消点赞
export const reqCancelLike = async (momentId: string): Promise<null> =>
  await request<null>({
    url: `/moment/cancel/like`,
    method: 'GET',
    data: { momentId },
  });
// 获取一个动态的点赞信息
export const reqLike = async (momentId: string): Promise<null> =>
  await request<null>({
    url: `/moment/get/likes`,
    method: 'GET',
    data: { momentId },
  });
