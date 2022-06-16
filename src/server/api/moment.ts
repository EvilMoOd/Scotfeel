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

export interface RepostedMomentPosterSpaceInfo {
  _id: string;
  nickname: string;
  avatar: string;
  private_flag: 0 | 1;
}

export interface MomentInfo {
  _id: number;
  posterInfo: PosterInfo[];
  friendRemark: FriendRemark[];
  content: string;
  interactFlag: 0 | 1;
  likedCount: number;
  likeStatus: 0 | 1;
  commentedCount: number;
  photos: string[];
  comments: Comment[];
  createTime: number;
  repostedMomentId?: any;
  repostedMomentSpaceId?: any;
  repostedMomentPosterUserInfo: CommenterInfo[];
  repostedMomentPosterSpaceInfo: RepostedMomentPosterSpaceInfo[];
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
export const reqAllFriendsMoment = async (lastMomentId: number): Promise<MomentInfo[]> =>
  await request<MomentInfo[]>({
    url: `/moment/get/allMoments`,
    method: 'GET',
    data: { lastMomentId },
  });
// 创建动态
export interface CreateMoment {
  content: string;
  interactFlag: 0 | 1; // 是否可被评论点赞，0：否，1：是
  photos: string[];
  repostedMomentId?: string; // 被转发的空间的动态的ID,默认为null
  repostedMomentSpaceId?: string; // 被转发动态的所属空间的ID
  repostedMomentPosterId?: string; // 被转发的空间动态的发送者ID，默认为null
  repostedMomentPosterType?: number; // 被转发的动态的发送者类型，0：用户，1：空间
  isReposted: number; // 是否为转发的动态,0:否，1：是
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
export const reqDeleteMoment = async (momentId: number): Promise<null> =>
  await request<null>({
    url: `/moment/delete/moment`,
    method: 'GET',
    data: { momentId },
  });
// 点赞
export const reqAddLike = async (Like: { momentId: number; posterId: string }): Promise<null> =>
  await request<null>({
    url: `/moment/add/like`,
    method: 'POST',
    data: { ...Like },
  });
// 取消点赞
export const reqCancelLike = async (momentId: number): Promise<null> =>
  await request<null>({
    url: `/moment/cancel/like`,
    method: 'GET',
    data: { momentId },
  });
// 获取一个动态的点赞信息
export const reqLike = async (momentId: number): Promise<null> =>
  await request<null>({
    url: `/moment/get/likes`,
    method: 'GET',
    data: { momentId },
  });
