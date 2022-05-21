import { defineStore } from 'pinia';

export interface Space {
  subscribeSpace: SubscribeSpace[];
}
export interface SubscribeSpace {
  spaceId: string; //空间id
  belongToId: string; //用户id，标记这条记录是属于哪个用户的，因为可能会有多个账户在这台设备中登录
  nickname: string; //空间昵称
  avatar: string; //空间头像
  role: 0 | 1 | 2 | 3 | 4; //角色：1：空间主，2：管理员，3：普通成员，4：订阅者
}
export const useSubscribeSpaceStore = defineStore('subscribeDSpace', {
  state: (): Space => ({
    subscribeSpace: [
      {
        spaceId: '53',
        belongToId: '79',
        nickname: '田敏',
        avatar: 'http://dummyimage.com/100x100',
        role: 0,
      },
    ],
  }),
  actions: {},
});
