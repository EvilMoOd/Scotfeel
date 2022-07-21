// #region 新互动
export interface InteractionNotice {
  /**
   * 被评论者INFO
   */
  commentedUserInfo?: CommentedUserInfo[];
  /**
   * 评论者INFO
   */
  commenterInfo?: CommenterInfo[];
  /**
   * 评论类型，0：对动态直接评论，1：回复评论
   */
  commentType?: number;
  /**
   * 评论内容
   */
  content?: string;
  /**
   * 互动时间
   */
  createTime: number;
  /**
   * 点赞者信息
   */
  likerInfo?: LikerInfo[];
  /**
   * 动态ID
   */
  momentId: number;
  /**
   * 动态发布在哪，0：空间动态区，1：个人动态区
   */
  momentType: 0 | 1;
  /**
   * 转发者INfo
   */
  reposterInfo?: ReposterInfo[];
  /**
   * 二级评论索引
   */
  secondCommentIndex?: string;
  /**
   * 被评论者在该空间的备注
   */
  spaceCommentedUserRemarkName?: SpaceCommentedUserRemarkName[];
  /**
   * 评论者在该空间的备注
   */
  spaceCommenterRemarkName?: SpaceCommenterRemarkName[];
  /**
   * 该动态所在空间id
   */
  spaceId?: string;
  /**
   * 点赞者在该空间的备注
   */
  spaceLikerRemarkName?: SpaceLikerRemarkName[];
  /**
   * 发布在空间动态区的动态信息
   */
  spaceMomentInfo?: SpaceMomentInfo[];
  /**
   * 转发者在该空间的备注
   */
  spaceUserRemarkName?: SpaceUserRemarkName[];
  /**
   * 发布在个人动态区的动态信息
   */
  userMomentInfo?: UserMomentInfo[];
  /**
   * 动态类型
   */
  noticeType: 1 | 2 | 3;
}

export interface CommentedUserInfo {
  _id: string;
  avatar: string;
  nickname: string;
}

export interface CommenterInfo {
  _id: string;
  avatar: string;
  nickname: string;
}

export interface LikerInfo {
  /**
   * 主键
   */
  _id: string;
  /**
   * 头像
   */
  avatar: string;
  /**
   * 昵称
   */
  nickname: string;
}

export interface ReposterInfo {
  _id: string;
  avatar: string;
  nickname: string;
}

export interface SpaceCommentedUserRemarkName {
  /**
   * 空间用户成员备注
   */
  remarkName: string;
}

export interface SpaceCommenterRemarkName {
  remarkName: string;
}

export interface SpaceLikerRemarkName {
  /**
   * 点赞者在该空间的备注
   */
  remarkName: string;
}

export interface SpaceMomentInfo {
  /**
   * 动态内容，在没有照片的情况下使用
   */
  content: string;
  /**
   * 动态的照片数组，只取第一张
   */
  photos: string[];
}

export interface SpaceUserRemarkName {
  remarkName: string;
}

export interface UserMomentInfo {
  /**
   * 动态内容，在没有照片的情况下使用
   */
  content: string;
  /**
   * 动态的照片数组，只取第一张
   */
  photos: string[];
}
// #endregion

// #region 新订阅
export interface NewSubscribe {
  /**
   * 订阅者头像
   */
  avatar: string;
  /**
   * 订阅时间
   */
  createTime: number;
  /**
   * 订阅者昵称
   */
  nickname: string;
  /**
   * 被订阅的空间头像
   */
  spaceAvatar: string;
  /**
   * 被订阅的空间id
   */
  spaceId: string;
  /**
   * 被订阅的空间昵称
   */
  spaceNickname: string;
  /**
   * 订阅者id
   */
  userId: string;
}
// #endregion

// #region 新申请
export interface NoticeApply {
  /**
   * 申请者用户ID
   */
  applicantId?: string;
  /**
   * 申请者为空间的头像
   */
  applicantSpaceAvatar?: string;
  /**
   * 申请加入空间的空间ID
   */
  applicantSpaceId?: string;
  /**
   * 申请者为空间的昵称
   */
  applicantSpaceNickname?: string;
  /**
   * 主键id
   */
  applyId: string;
  /**
   * 申请类型，0：朋友申请，1：群聊申请，2：空间申请
   */
  applyType: 0 | 1 | 2;
  /**
   * 验证信息
   */
  content: string;
  /**
   * 毕业时间
   */
  graduateTime?: number;
  /**
   * 被申请加入的群聊的昵称
   */
  groupChatNickname?: string;
  /**
   * 被申请加入群聊的ID
   */
  groupId?: string;
  /**
   * 照片，只有以学生身份申请加入一个学校空间的时候验证信息才需要携带照片
   */
  photo?: string;
  /**
   * 如果是申请加入空间的申请，则需要说明申请者是什么类型，0：空间，1：用户
   */
  spaceApplicantType?: number;
  /**
   * 被申请者空间ID
   */
  spaceId?: string;
  /**
   * 被申请加入的空间的昵称
   */
  spaceNickname?: string;
  /**
   * 审核状态，0：未审核，1：同意，2：拒绝
   */
  status: number;
  /**
   * 是否为学生，0：否，1：是
   */
  studentFlag?: number;
  /**
   * 学号
   */
  studentNumber: string;
  /**
   * 更新时间
   */
  updateTime: number;
  /**
   * 申请者头像
   */
  userAvatar: string;
  /**
   * 申请者昵称
   */
  userNickname: string;
}
// #endregion

// #region 新动态
export interface MomentList {
  /**
   * 朋友id
   */
   friendId: string;
  /**
   * 多少条消息通知，默认为1，这条动态中每一个有关自己的评论或点赞都会+1，当用户点击这个头像时数字变为0，且头像变环将变暗。
   */
   noticeCount: number;

   /**
    * 动态id
    */
   momentId: number;
  /**
   * 朋友昵称
   */
   nickname: string;
  /**
   * 朋友备注
   */
   remarkName: number;
  /**
   * 朋友头像
   */
   avatar: number;
}
// #endregion