import { defineStore } from 'pinia';

export interface GroupChat {
  groupInfo: GroupInfo[];
  groupMember: GroupMember[];
}
export interface GroupInfo {
  groupId: string; //群聊id
  nickname?: string; //群聊昵称
  avatar: string; //群聊头像
  memberCount?: string; //群聊成员数
  spaceId?: string; //群聊绑定的空间id
  belongToId?: string; //属于哪个用户
  isDismissed?: 0 | 1; //是否已解散，0：否，1：是；当群聊已解散时，则客户端直接在会话列表标识，并且将不能够再进入到群聊的聊天框中
  spaceNickname?: string; //群聊绑定的空间昵称
  spaceAvatar?: string; //群聊绑定的空间头像
  noticeFlag?: 0 | 1; //是否设为免打扰，0：否，1：是
}
export interface GroupMember {
  memberId: string; //联系人id
  remarkName: string; //成员在这个群里的备注,群聊成员显示名字优先级——群聊成员备注>我对这个用户的备注该成员的网名
  role: 0 | 1 | 2; //群聊角色，0：群主，1：管理员：2：普通成员
  isExited: 0 | 1; //是否已退出，0：是，1：否
  belongToId: string; //用户id，标记这条记录是属于哪个用户的，因为可能会有多个账户在这台设备中登录
  nickname: string; //昵称
  avatar: string; //头像
  groupId: string; //群聊id
}
export const useGroupChatStore = defineStore('groupChatStore', {
  state: (): GroupChat => ({
    groupInfo: [
      {
        groupId: '35',
        nickname: '考研摆烂',
        avatar: 'http://dummyimage.com/100x100',
        memberCount: 'in reprehenderit',
        spaceId: '29',
        belongToId: '41',
        isDismissed: 0,
        spaceNickname: '金娟',
        spaceAvatar: 'http://dummyimage.com/100x100',
        noticeFlag: 1,
      },
      {
        groupId: '45',
        nickname: 'nighttoken',
        avatar: 'http://dummyimage.com/100x100',
        memberCount: 'in reprehenderit',
        spaceId: '29',
        belongToId: '41',
        isDismissed: 0,
        spaceNickname: '金娟',
        spaceAvatar: 'http://dummyimage.com/100x100',
        noticeFlag: 1,
      },
    ],
    groupMember: [
      {
        memberId: '65',
        remarkName: '所何的实因关',
        role: 0,
        isExited: 0,
        belongToId: '79',
        nickname: '刘芳',
        avatar: 'http://dummyimage.com/100x100',
        groupId: '90',
      },
    ],
  }),

  actions: {
    newMessage() {},
  },
  getters: {},
});
