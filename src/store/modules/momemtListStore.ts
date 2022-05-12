import { defineStore } from 'pinia';
export interface MomentList {
  id?: number; //自增主键;
  friendId: string; //朋友ID，如果是我发的动态的话，这个id也会是我的id
  isRead: 0 | 1; //是否已读，具体事件就是用户是否单击了动态头像，0：否，1：是
  belongToId?: string; //用户id，标记这条记录是属于哪个用户的，因为可能会有多个账户在这台设备中登录
  createTime?: string; //用户发动态时间
}
export const useMomentListStore = defineStore('momentListStore', {
  state: (): MomentList[] => [
    {
      id: 14,
      friendId: '18',
      isRead: 0,
      belongToId: '74',
      createTime: '1978-02-28 09:08:00',
    },
  ],
  actions: {
    newFriendActiveMessage(friendId: string) {
      this.$state.push({ friendId, isRead: 0 });
    },
  },
  getters: {},
});
