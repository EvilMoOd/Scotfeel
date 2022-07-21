import { defineStore } from 'pinia';

export interface MomentListInfo {
  friendId: string; // 朋友ID，如果是我发的动态的话，这个id也会是我的id
  momentId: string; // 加载的动态id
  read: 0 | 1; // 是否已读，具体事件就是用户是否单击了动态头像，0：否，1：是
  updateTime: number; // 用户发动态时间
}
export const useMomentListStore = defineStore('momentListStore', {
  state: () => ({
    momentList: [] as MomentListInfo[],
  }),
  actions: {
    // 朋友更新动态
    updateMomentList(friendId: string, momentId: string) {
      this.momentList.unshift({
        friendId,
        momentId,
        read: 0,
        updateTime: Date.now(),
      });
    },
  },
  getters: {},
});
