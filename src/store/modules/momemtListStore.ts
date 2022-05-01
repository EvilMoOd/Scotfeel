import { defineStore } from 'pinia';
export interface MomentList {
  friendId: string; //自增主键
  isRead: number; //朋友ID，如果是我发的动态的话，这个id也会是我的id
  belongToId: string; //是否已读，具体事件就是用户是否单击了动态头像，0：否，1：是
  createTime: string; //用户id，标记这条记录是属于哪个用户的，因为可能会有多个账户在这台设备中登录
  id: number; //用户发动态时间
}
export const useMomentListStore = defineStore('momentListStore', {
  state: (): MomentList => ({
    friendId: '18',
    isRead: 33,
    belongToId: '74',
    createTime: '1978-02-28 09:08:00',
    id: 14,
  }),
  actions: {},
  getters: {},
});
