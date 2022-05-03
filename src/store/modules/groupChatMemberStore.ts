import { defineStore } from 'pinia';
export interface GroupChatMember {
  memberId: string; //联系人id
  remarkName: string; //成员在这个群里的备注,群聊成员显示名字优先级——群聊成员备注>我对这个用户的备注该成员的网名
  role: 0 | 1 | 2; //群聊角色，0：群主，1：管理员：2：普通成员
  isExited: 0 | 1; //是否已退出，0：是，1：否
  belongToId: string; //用户id，标记这条记录是属于哪个用户的，因为可能会有多个账户在这台设备中登录
  nickname: string; //昵称
  avatar: string; //头像
  groupId: string; //群聊id
}
export const useGroupChatMemberStore = defineStore('groupChatMemberStore', {
  state: (): GroupChatMember[] => [
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
  actions: {},
  getters: {},
});
