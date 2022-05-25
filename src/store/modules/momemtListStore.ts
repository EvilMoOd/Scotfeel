import { defineStore } from 'pinia';
export interface MomentList {
  momentListInfo: MomentListInfo[];
  momentList: string[];
}
export interface MomentListInfo {
  id?: number; //自增主键;
  friendId: string; //朋友ID，如果是我发的动态的话，这个id也会是我的id
  isRead: 0 | 1; //是否已读，具体事件就是用户是否单击了动态头像，0：否，1：是
  belongToId?: string; //用户id，标记这条记录是属于哪个用户的，因为可能会有多个账户在这台设备中登录
  createTime?: number; //用户发动态时间
}
export const useMomentListStore = defineStore('momentListStore', {
  state: (): MomentList => ({
    momentListInfo: [
      {
        id: 14,
        friendId: '7d5e7e76a4534db78b79d80b221df2ae',
        isRead: 0,
        belongToId: '74',
        createTime: 1652422653,
      },
      {
        id: 2,
        friendId: '4c157fb2bffb4e48b8068dead4d379c7',
        isRead: 0,
        belongToId: '74',
        createTime: 1652422653,
      },
      {
        id: 3,
        friendId: '7d5e7e76a4534db78b79d80b221df2ae',
        isRead: 0,
        belongToId: '74',
        createTime: 1652422653,
      },
      {
        id: 144,
        friendId: '7d5e7e76a4534db78b79d80b221df2ae',
        isRead: 0,
        belongToId: '74',
        createTime: 1652422653,
      },
      {
        id: 124,
        friendId: '7d5e7e76a4534db78b79d80b221df2ae',
        isRead: 0,
        belongToId: '74',
        createTime: 1652422653,
      },
      {
        id: 114,
        friendId: '7d5e7e76a4534db78b79d80b221df2ae',
        isRead: 0,
        belongToId: '74',
        createTime: 1652422653,
      },
    ],
    momentList: ['4c157fb2bffb4e48b8068dead4d379c7'],
  }),
  actions: {
    updateMomentList(friendId: string) {
      this.momentList.unshift(friendId);
    },
    newFriendActiveMessage(friendId: string) {
      this.momentListInfo.push({ friendId, isRead: 0 });
    },
  },
  getters: {},
});
