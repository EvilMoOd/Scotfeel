import { defineStore } from 'pinia';
export interface Friend {
  friendId: string; //用户id或群聊id
  nickname: string; //昵称
  remarkName: string; //备注
  avatar: string; //头像
  spaceId?: string; //所绑定的空间ID
  isDeletedByFriend?: 0 | 1; //是否已被朋友删除，0：否，1：是
  belongToId?: string; //用户id，标记这条记录是属于哪个用户的，因为可能会有多个账户在这台设备中登录
  account?: string; //@id(用户）
  backgroundImage?: string; //背景照片(用户）
  noticeFlag?: 0 | 1; //是否设为免打扰，0：否，1：是
}
export const useFriendStore = defineStore('friend', {
  state: (): Friend[] => [
    {
      friendId: '85',
      nickname: '可莉',
      remarkName: '起报战议去层定',
      avatar: 'http://dummyimage.com/100x100',
      spaceId: '61',
      isDeletedByFriend: 0,
      belongToId: '13',
      account: 'reprehenderit aliqua pariatur esse',
      backgroundImage: 'http://dummyimage.com/400x400',
      noticeFlag: 0,
    },
    {
      friendId: '18',
      nickname: '可莉',
      remarkName: '起报战议去层定',
      avatar: 'http://dummyimage.com/100x100',
      spaceId: '61',
      isDeletedByFriend: 0,
      belongToId: '13',
      account: 'reprehenderit aliqua pariatur esse',
      backgroundImage: 'http://dummyimage.com/400x400',
      noticeFlag: 0,
    },
    {
      friendId: '15',
      nickname: '大侠',
      remarkName: '起报战议去层定',
      avatar: 'http://dummyimage.com/100x100',
      spaceId: '61',
      isDeletedByFriend: 0,
      belongToId: '13',
      account: 'reprehenderit aliqua pariatur esse',
      backgroundImage: 'http://dummyimage.com/400x400',
      noticeFlag: 0,
    },
    {
      friendId: '25',
      nickname: '徐大虾',
      remarkName: '起报战议去层定',
      avatar: 'http://dummyimage.com/100x100',
      spaceId: '61',
      isDeletedByFriend: 0,
      belongToId: '13',
      account: 'reprehenderit aliqua pariatur esse',
      backgroundImage: 'http://dummyimage.com/400x400',
      noticeFlag: 0,
    },
    {
      friendId: '85',
      nickname: '杜明',
      remarkName: '起报战议去层定',
      avatar: 'http://dummyimage.com/100x100',
      spaceId: '61',
      isDeletedByFriend: 0,
      belongToId: '13',
      account: 'reprehenderit aliqua pariatur esse',
      backgroundImage: 'http://dummyimage.com/400x400',
      noticeFlag: 0,
    },
    {
      friendId: '85',
      nickname: '杜明',
      remarkName: '起报战议去层定',
      avatar: 'http://dummyimage.com/100x100',
      spaceId: '61',
      isDeletedByFriend: 0,
      belongToId: '13',
      account: 'reprehenderit aliqua pariatur esse',
      backgroundImage: 'http://dummyimage.com/400x400',
      noticeFlag: 0,
    },
    {
      friendId: '85',
      nickname: '杜明',
      remarkName: '起报战议去层定',
      avatar: 'http://dummyimage.com/100x100',
      spaceId: '61',
      isDeletedByFriend: 0,
      belongToId: '13',
      account: 'reprehenderit aliqua pariatur esse',
      backgroundImage: 'http://dummyimage.com/400x400',
      noticeFlag: 0,
    },
  ],
  actions: {},
  getters: {},
});
