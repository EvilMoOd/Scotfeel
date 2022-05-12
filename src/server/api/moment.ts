import { request } from '../http';

//获取动态
export interface PosterInfo {
  _id: string;
  nickname: string;
  avatar: string;
}
export interface Comment {
  momentId: string;
  content: string;
  commentedUserId: string;
  commentedUserNickname: string;
  commenterId: string;
  commenterNickname: string;
  commentType: number;
  createTime: string;
}
export interface Moment {
  _id: string;
  posterInfo: PosterInfo[];
  content: string;
  interactFlag: number;
  likedCount: number;
  likeStatus: number;
  commentedCount: number;
  photos: string[];
  comments: Comment[];
  createTime: string;
  repostedMomentId?: any;
  repostedMomentSpaceId?: any;
  repostedMomentPosterUserInfo: any[];
  repostedMomentPosterSpaceInfo: any[];
  repostedMomentPosterType?: any;
  isReposted: number;
  srepostedMomentInfo: any[];
}
export const reqMoment = (momentOwnerId: string, lastMomentTime: string) =>
  request<Moment[]>({
    url: `/moment/get/moments`,
    method: 'GET',
    data: { momentOwnerId, lastMomentTime },
  });
//获取所有朋友的动态
export const reqAllFriendsMoment = (lastMomentTime: string) =>
  request<Moment[]>({
    url: `/moment/get/allMoments`,
    method: 'GET',
    data: { lastMomentTime },
  });
//创建动态
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
export const reqCreateMoment = (moment: CreateMoment) =>
  request<null>({
    url: `/moment/create/moment`,
    method: 'POST',
    data: { ...moment },
  });
//评论
export interface Comment {
  momentId: string;
  spaceMemberFlag: number;
  content: string;
  commentedUserId: string;
  commentedUserNickname: string;
  commenterNickname: string;
  commentType: number;
}
export const reqAddComment = (comment: Comment) =>
  request<null>({
    url: `/moment/add/comment`,
    method: 'POST',
    data: { ...comment },
  });
//删除动态
export const reqDeleteMoment = (momentId: string) =>
  request<null>({
    url: `/moment/delete/moment`,
    method: 'GET',
    data: { momentId },
  });
//点赞
export const reqAddLike = (Like: { momentId: string; posterId: string }) =>
  request<null>({
    url: `/moment/add/like`,
    method: 'POST',
    data: { ...Like },
  });
//取消点赞
export const reqCancelLike = (momentId: string) =>
  request<null>({
    url: `/moment/cancel/like`,
    method: 'GET',
    data: { momentId },
  });
//获取一个动态的点赞信息
export const reqLike = (momentId: string) =>
  request<null>({
    url: `/moment/get/likes`,
    method: 'GET',
    data: { momentId },
  });
