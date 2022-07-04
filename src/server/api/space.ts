import { request } from '../http';

// 空间私密设置
export const reqSetPrivate = async (
  spaceId: string,
  isPrivate: 1 | 0,
  isVerify: 1 | 0,
  isInvite: 1 | 0,
  isRecommend: 1 | 0
): Promise<null> =>
  request<null>({
    url: `/space/space/editPermissions`,
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
  groupId?: string;
  friendId?: string;
}
export const reqSetSpace = async (spaceMessage: SetSpace): Promise<null> =>
  request<null>({
    url: `/space/space/createNewSpace`,
    method: 'POST',
    data: { ...spaceMessage },
  });
// 空间是否展示在个人主页
export const reqShowInPersonPage = async (showFlag: 1 | 0, spaceId: string): Promise<null> =>
  request<null>({
    url: `/space/space/isShow`,
    method: 'POST',
    data: { showFlag, spaceId },
    type: 'application/x-www-form-urlencoded',
  });
// 设置为默认空间
export const reqSetDefaultSpace = async (spaceId: string): Promise<null> =>
  request<null>({
    url: `/space/space/setDefaultSpace`,
    method: 'POST',
    data: { spaceId },
    type: 'application/x-www-form-urlencoded',
  });
// 更新昵称
export const reqUpdateNickname = async (nickName: string, spaceId: string): Promise<null> =>
  request<null>({
    url: `/space/space/updateNickName`,
    method: 'POST',
    data: { nickName, spaceId },
    type: 'application/x-www-form-urlencoded',
  });
// 更改介绍
export const reqUpdateIntroduction = async (introduction: string, spaceId: string): Promise<null> =>
  request<null>({
    url: `/space/space/updateIntroduction`,
    method: 'POST',
    data: { introduction, spaceId },
    type: 'application/x-www-form-urlencoded',
  });
// 更改空间头像
export const reqChangeAvatar = async (avatar: string, spaceId: string): Promise<null> =>
  request<null>({
    url: `/space/space/updateAvatar`,
    method: 'POST',
    data: { avatar, spaceId },
    type: 'application/x-www-form-urlencoded',
  });
// 设置空间背景
export const reqSetBackGroundImg = async (backGroundImg: string, spaceId: string): Promise<null> =>
  request<null>({
    url: `/space/space/setBackGround`,
    method: 'POST',
    data: { backGroundImg, spaceId },
    type: 'application/x-www-form-urlencoded',
  });
// 空间认证
export const reqIdentify = async (
  spaceId: string,
  newAccount: string,
  content: string
): Promise<null> =>
  request<null>({
    url: `/space/space/identify`,
    method: 'POST',
    data: { spaceId, newAccount, content },
    type: 'application/x-www-form-urlencoded',
  });
// 获取空间用户成员
export interface UserMember {
  userId: string;
  avatar: string;
  nickName: string;
  role: number;
  remarkName: string;
}
export const reqUserMember = async (spaceId: string): Promise<UserMember[]> =>
  request<UserMember[]>({
    url: `/space/space/getUserMember`,
    method: 'GET',
    data: { spaceId },
  });
// 获取空间的空间成员
export interface SpaceMember {
  spaceId: string;
  nickName: string;
  avatar: string;
}
export const reqSpaceMember = async (spaceId: string): Promise<SpaceMember[]> =>
  request<SpaceMember[]>({
    url: `/space/space/getSpaceMember`,
    method: 'GET',
    data: { spaceId },
  });
// 获取空间的完整信息
export interface SpaceInfo {
  mainId: string;
  nickname: string;
  account: string;
  introduction: string;
  identify: number;
  avatar: string;
  countSubscriber: number;
  countMember: number;
  backgroundImage: string;
  privateFlag: 0 | 1; // 是否为私密空间，0：否，1:是
  verifyFlag: 0 | 1; // 是否需要审核，0:否，1：是
  inviteFlag: 0 | 1; // 是否只能通过邀请进入，0：否，1：是
  recommendFlag: 0 | 1; // 是否允许系统推荐给其它用户，0：否，1：是
}
export const reqSpaceInfo = async (spaceId: string): Promise<SpaceInfo> =>
  request<SpaceInfo>({
    url: `/space/space/getInfo`,
    method: 'GET',
    data: { spaceId },
  });
// 更新成员角色
export const reqUpdateRole = async (
  userId: string,
  role: 1 | 2 | 3,
  spaceId: string
): Promise<null> =>
  request<null>({
    url: `/space/space/updateMemberRole`,
    method: 'POST',
    data: { userId, role, spaceId },
    type: 'application/x-www-form-urlencoded',
  });
// 移除成员
export const reqDeleteMember = async (
  memberId: string,
  memberType: 1 | 2,
  spaceId: string
): Promise<null> =>
  request<null>({
    url: `/space/space/deleteMember`,
    method: 'POST',
    data: { memberId, memberType, spaceId },
    type: 'application/x-www-form-urlencoded',
  });
// 更新成员备注
export const reqUpdateRemark = async (remarkName: string, spaceId: string): Promise<null> =>
  request<null>({
    url: `/space/space/updateUserMemberRemarkName`,
    method: 'POST',
    data: { remarkName, spaceId },
    type: 'application/x-www-form-urlencoded',
  });
export interface SubscribedSpaceInfo {
  spaceId: string; // 空间id
  nickName: string; // 空间昵称
  avatar: string; // 空间头像
  role: 0 | 1 | 2 | 3 | 4; // 角色：1：空间主，2：管理员，3：普通成员，4：订阅者
}
// 获取订阅空间信息
export const reqSubscribedSpace = async (userId: string): Promise<SubscribedSpaceInfo[]> =>
  request<SubscribedSpaceInfo[]>({
    url: `/space/space/get/subscribedSpaces`,
    method: 'GET',
    data: { userId },
  });
// 空间动态
// 获取一个空间的动态
export interface PosterUserInfo {
  _id: string;
  nickname: string;
  avatar: string;
}

export interface PosterUserRemarkName {
  remarkName: string;
}

export interface SpaceMoment {
  _id: number;
  spaceInfo?: any;
  posterUserInfo: PosterUserInfo[];
  posterUserRemarkName: PosterUserRemarkName[];
  posterSpaceInfo: any[];
  posterType: number;
  content: string;
  photos: string[];
  repostedCount: number;
  likedCount: number;
  commentedCount: number;
  likeStatus: number;
  repostedMomentId: number;
  repostedMomentSpaceId: string;
  repostedMomentPosterUserInfo: any[];
  repostedMomentPosterSpaceInfo: any[];
  repostedMomentPosterType: number;
  repostedMomentInfo: any[];
  isReposted: number;
  createTime: number;
}
export const reqASpaceMoment = async (
  spaceId: string,
  lastMomentId: number
): Promise<SpaceMoment[]> =>
  request<SpaceMoment[]>({
    url: `/space/spaceMoment/get/oneSpaceMoments`,
    method: 'GET',
    data: { spaceId, lastMomentId },
  });
// 获取所有订阅空间的动态
export const reqAllSubscribeMoment = async (lastMomentId: number): Promise<SpaceMoment[]> =>
  request<SpaceMoment[]>({
    url: `/space/spaceMoment/get/allSubscribedSpaceMoments`,
    method: 'GET',
    data: { lastMomentId },
  });
// 创建动态
export interface Moment {
  content: string;
  posterType: number;
  photos: string[];
  repostedMomentId?: string;
  repostedMomentSpaceId?: string;
  repostedMomentPosterId?: string;
  repostedMomentPosterType?: number;
  isReposted: number;
  spaceId: string;
}
export const reqCreateMoment = async (moment: Moment): Promise<null> =>
  request<null>({
    url: `/space/spaceMoment/create/moment`,
    method: 'POST',
    data: { ...moment },
  });
// 删除动态
export const reqDeleteMoment = async (momentId: string, spaceId: string): Promise<null> =>
  request<null>({
    url: `/spaceMoment/delete/moment`,
    method: 'GET',
    data: { momentId, spaceId },
  });
// 点赞
export const reqAddLike = async (
  momentId: number,
  posterId: string,
  spaceMemberFlag: 0 | 1
): Promise<null> =>
  request<null>({
    url: `/space/spaceMoment/add/like`,
    method: 'POST',
    data: { momentId, posterId, spaceMemberFlag },
  });
// 取消点赞
export const reqCancelLike = async (momentId: number): Promise<null> =>
  request<null>({
    url: `/space/spaceMoment/cancel/like`,
    method: 'GET',
    data: { momentId },
  });
export interface AddComment {
  commentedUserId: string; // 被评论者ID
  commentType: number; // 评论类型，0：对动态直接评论，1：回复评论
  content: string; // 评论内容
  momentId: number; // 评论所在的动态ID
  secondCommentIndex: string; // 如果是对评论进行评论，则需要传入这条评论所在一级评论的哪个索引
  spaceMemberFlag: number; // 是否为该动态所发布在空间的成员，0：否，1：是
}
// 添加评论
export const reqAddComment = async (comment: AddComment): Promise<null> =>
  request<null>({
    url: `/space/spaceMoment/add/comment`,
    method: 'POST',
    data: { ...comment },
  });
export interface CommentedUserInfo {
  _id: string;
  nickname: string;
  avatar: string;
}

export interface CommenterInfo {
  _id: string;
  nickname: string;
  avatar: string;
}

export interface CommenterRemarkName {
  remarkName?: string;
}

export interface Comments {
  spaceMemberFlag: number;
  content: string;
  commentedUserInfo: CommentedUserInfo[];
  commentedUserRemarkName: string[];
  commenterInfo: CommenterInfo[];
  commenterRemarkName: CommenterRemarkName[];
  secondCommentIndex: string;
  createTime: number;
}
// 获取一级评论
export const reqGetOneLevelComment = async (
  momentId: number,
  spaceId: string,
  offset: number
): Promise<Comments> =>
  request<Comments>({
    url: `/spaceMoment/get/comments`,
    method: 'GET',
    data: { momentId, spaceId, offset },
  });
// 获取二级评论
export const reqGetSecondLevelComment = async (
  momentId: number,
  spaceId: string,
  offset: number,
  secondCommentIndex: string
): Promise<Comments> =>
  request<Comments>({
    url: `/spaceMoment/get/comments`,
    method: 'GET',
    data: { momentId, spaceId, offset, secondCommentIndex },
  });

// 空间订阅加入
// 申请加入空间
export const reqApplyJoinSpace = async (
  spaceId: string,
  applicantId: string,
  content: string,
  spaceApplicantType: 0 | 1,
  studentFlag: 0 | 1,
  photo?: string,
  studentNumber?: string,
  graduateTime?: number
): Promise<null> =>
  request<null>({
    url: `/space/spaceApply/memberApplyToSpace`,
    method: 'POST',
    data: {
      spaceId,
      applicantId,
      content,
      spaceApplicantType,
      photo,
      studentNumber,
      graduateTime,
      studentFlag,
    },
  });
// 处理加入空间申请
export const reqDealApply = async (messageId: string, status: 0 | 1 | 2): Promise<null> =>
  request<null>({
    url: `/space/spaceApply/verify`,
    method: 'POST',
    data: { messageId, status },
    type: 'application/x-www-form-urlencoded',
  });
// 用户订阅空间
export const reqSubscribeSpace = async (spaceId: string): Promise<null> =>
  request<null>({
    url: `/space/spaceApply/subscribe`,
    method: 'POST',
    data: { spaceId },
    type: 'application/x-www-form-urlencoded',
  });
// 取消订阅空间
export const reqCancelSubscribeSpace = async (spaceId: string): Promise<null> =>
  request<null>({
    url: `/space/spaceApply/unsubscribe`,
    method: 'POST',
    data: { spaceId },
    type: 'application/x-www-form-urlencoded',
  });
