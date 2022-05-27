import { request } from '../http';

// 空间私密设置
export const reqSetPrivate = async (
  spaceId: string,
  isPrivate: 1 | 0,
  isVerify: 1 | 0,
  isInvite: 1 | 0,
  isRecommend: 1 | 0
): Promise<null> =>
  await request<null>({
    url: `/space/editPermissions`,
    method: 'POST',
    data: { spaceId, isPrivate, isVerify, isInvite, isRecommend },
    type: 'application/x-www-form-urlencoded',
  });
// 新建空间
export interface SetSpace {
  spaceName: string;
  userId: string[];
  spaceAvatar: string;
  longitude: number;
  latitude: number;
  groupId?: any;
  adminId: string;
  friendId: string;
}
export const reqSetSpace = async (spaceMessage: SetSpace): Promise<null> =>
  await request<null>({
    url: `/user/update/nickname`,
    method: 'POST',
    data: { ...spaceMessage },
  });
// 空间是否展示在个人主页
export const reqShowInPersonPage = async (showFlag: 1 | 0, spaceId: string): Promise<null> =>
  await request<null>({
    url: `/space/isShow`,
    method: 'POST',
    data: { showFlag, spaceId },
    type: 'application/x-www-form-urlencoded',
  });
// 设置为默认空间
export const reqSetDefaultSpace = async (spaceId: string): Promise<null> =>
  await request<null>({
    url: `/space/setDefaultSpace`,
    method: 'POST',
    data: { spaceId },
    type: 'application/x-www-form-urlencoded',
  });
// 更新昵称
export const reqUpdateNickname = async (nickName: string, spaceId: string): Promise<null> =>
  await request<null>({
    url: `/user/update/nickname`,
    method: 'POST',
    data: { nickName, spaceId },
    type: 'application/x-www-form-urlencoded',
  });
// 更改介绍
export const reqUpdateIntroduction = async (introduction: string, spaceId: string): Promise<null> =>
  await request<null>({
    url: `/space/updateIntroduction`,
    method: 'POST',
    data: { introduction, spaceId },
    type: 'application/x-www-form-urlencoded',
  });
// 更改空间头像
export const reqChangeAvatar = async (avatar: string, spaceId: string): Promise<null> =>
  await request<null>({
    url: `/space/updateAvatar`,
    method: 'POST',
    data: { avatar, spaceId },
    type: 'application/x-www-form-urlencoded',
  });
// 设置空间背景
export const reqSetBackGroundImg = async (backGroundImg: string, account: string): Promise<null> =>
  await request<null>({
    url: `/space/setBackGround`,
    method: 'POST',
    data: { backGroundImg, account },
    type: 'application/x-www-form-urlencoded',
  });
// 空间认证
export const reqIdentify = async (
  spaceId: string,
  newAccount: string,
  content: string
): Promise<null> =>
  await request<null>({
    url: `/space/identify`,
    method: 'POST',
    data: { spaceId, newAccount, content },
    type: 'application/x-www-form-urlencoded',
  });
// 获取空间私密设置
export interface SpacePrivateSetting {
  privateFlag: number;
  verifyFlag: number;
  inviteFlag: number;
  recommendFlag: number;
}
export const reqPrivateSetting = async (): Promise<SpacePrivateSetting> =>
  await request<SpacePrivateSetting>({
    url: `/space/getPrivateSetting`,
    method: 'GET',
  });
// 获取空间用户成员
export interface UserMember {
  userId: string;
  avatar?: any;
  nickName?: any;
  role: number;
}
export const reqUserMember = async (): Promise<UserMember[]> =>
  await request<UserMember[]>({
    url: `/space/getUserMember`,
    method: 'GET',
  });
// 获取空间的空间成员
export interface SpaceMember {
  spaceAccount: string;
  nickName: string;
  avatar: string;
}
export const reqSpaceMember = async (): Promise<SpaceMember[]> =>
  await request<SpaceMember[]>({
    url: `/space/getSpaceMember`,
    method: 'GET',
  });
// 获取空间的完整信息
export interface SpaceInfo {
  mainId: string;
  nickname: string;
  account: string;
  introduction?: any;
  identify: number;
  avatar: string;
  countSubscriber: number;
  countMember: number;
  backgroundImage?: any;
}
export const reqSpaceInfo = async (): Promise<SpaceInfo> =>
  await request<SpaceInfo>({
    url: `/space/getInfo`,
    method: 'GET',
  });
// TODO获取空间的角色信息
export const reqUpdateMemberRole = async (): Promise<null> =>
  await request<null>({
    url: `/space/updateMemberRole`,
    method: 'POST',
    type: 'application/x-www-form-urlencoded',
  });

// 空间动态
// 获取一个空间的动态
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

export interface RepostedMomentPosterUserInfo {
  _id: string;
  nickname: string;
  avatar: string;
}

export interface RepostedMomentPosterSpaceInfo {
  _id: string;
  nickname: string;
  avatar: string;
  private_flag: number;
}

export interface SRepostedMomentInfo {
  content: string;
  photos: string[];
}

export interface SpaceMoment {
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
  repostedMomentPosterUserInfo: RepostedMomentPosterUserInfo[];
  repostedMomentPosterSpaceInfo: RepostedMomentPosterSpaceInfo[];
  repostedMomentPosterType: number;
  isReposted: number;
  sRepostedMomentInfo: SRepostedMomentInfo[];
}
export const reqASpaceMoment = async (): Promise<SpaceMoment> =>
  await request<SpaceMoment>({
    url: `/spaceMoment/get/oneSpaceMoments`,
    method: 'GET',
  });
// 获取所有订阅空间的动态
export const reqAllSubscribeMoment = async (): Promise<SpaceMoment> =>
  await request<SpaceMoment>({
    url: `/spaceMoment/get/allMoments`,
    method: 'GET',
  });
// 创建动态
export const reqCreateMoment = async (): Promise<null> =>
  await request<null>({
    url: `/spaceMoment/create/moment`,
    method: 'POST',
  });
// 添加评论
export const reqAddComment = async (): Promise<null> =>
  await request<null>({
    url: `/spaceMoment/add/comment`,
    method: 'POST',
  });
// 点赞
export const reqAddLike = async (): Promise<null> =>
  await request<null>({
    url: `/spaceMoment/add/like`,
    method: 'POST',
  });
// 删除评论
export const reqDeleteMoment = async (): Promise<null> =>
  await request<null>({
    url: `/spaceMoment/delete/moment`,
    method: 'GET',
  });
// 取消点赞
export const reqCancelLike = async (): Promise<null> =>
  await request<null>({
    url: `/spaceMoment/cancel/like`,
    method: 'GET',
  });
// 获取一个动态的点赞信息
export const reqLike = async (): Promise<null> =>
  await request<null>({
    url: `/spaceMoment/get/likes`,
    method: 'GET',
  });
// 获取一条动态的评论信息
export const reqComments = async (): Promise<null> =>
  await request<null>({
    url: `/spaceMoment/get/comments`,
    method: 'GET',
  });
