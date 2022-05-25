import { defineStore } from 'pinia';
import { reqChangeFriendRemark, reqDeleteFriend, reqGetAllFriends } from '../../server/api/friend';
import { updateIsDeletedByFriend, updateRemarkName } from '../../server/sql/friend';
import type { User } from './userStore';
export interface Friend {
  friendInfo: FriendInfo[];
  friendPage: FriendInfo;
}
export interface FriendInfo {
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
const user: User = uni.getStorageSync('user');

export const useFriendStore = defineStore('friend', {
  state: (): Friend => ({
    friendInfo: [
      {
        friendId: '7d5e7e76a4534db78b79d80b221df2ae',
        nickname: '可莉',
        remarkName: '起报战议去层定',
        avatar: `http://obs.scotfeel.com/61b0b7cc5af7a0db2c245f213bfa637b.jpeg?versionId=null`,
        spaceId: '61',
        isDeletedByFriend: 0,
        belongToId: '13',
        account: ' pariatur esse',
        backgroundImage: `http://obs.scotfeel.com/61b0b7cc5af7a0db2c245f213bfa637b.jpeg?versionId=null`,
        noticeFlag: 0,
      },
      {
        friendId: '4c157fb2bffb4e48b8068dead4d379c7',
        nickname: '路飞',
        remarkName: '起报战议去层定',
        avatar:
          'http://obs.scotfeel.com/20140310191629_mfHn4.jpeg?versionId=G0011180F1864C41FFFF92CC2544BC2B',
        spaceId: '61',
        isDeletedByFriend: 0,
        belongToId: '13',
        account: ' pariatur esse',
        backgroundImage: `http://obs.scotfeel.com/61b0b7cc5af7a0db2c245f213bfa637b.jpeg?versionId=null`,
        noticeFlag: 0,
      },
      {
        friendId: '15',
        nickname: '大侠',
        remarkName: '起报战议去层定',
        avatar: 'http://obs.scotfeel.com/61b0b7cc5af7a0db2c245f213bfa637b.jpeg?versionId=null',
        spaceId: '61',
        isDeletedByFriend: 0,
        belongToId: '13',
        account: ' pariatur esse',
        backgroundImage: ``,
        noticeFlag: 0,
      },
      {
        friendId: '25',
        nickname: '徐大虾',
        remarkName: '起报战议去层定',
        avatar: `http://obs.scotfeel.com/61b0b7cc5af7a0db2c245f213bfa637b.jpeg?versionId=null`,
        spaceId: '61',
        isDeletedByFriend: 0,
        belongToId: '13',
        account: ' pariatur esse',
        backgroundImage: `http://obs.scotfeel.com/61b0b7cc5af7a0db2c245f213bfa637b.jpeg?versionId=null`,
        noticeFlag: 0,
      },
      {
        friendId: '1',
        nickname: '杜明',
        remarkName: '起报战议去层定',
        avatar: `http://obs.scotfeel.com/f215a614ab4040ad85518b982ddec046.jpeg?versionId=G0011180F1CDB35CFFFF92C62676C8E7`,
        spaceId: '61',
        isDeletedByFriend: 0,
        belongToId: '13',
        account: ' pariatur esse',
        backgroundImage: `http://obs.scotfeel.com/61b0b7cc5af7a0db2c245f213bfa637b.jpeg?versionId=null`,
        noticeFlag: 0,
      },
      {
        friendId: '2',
        nickname: '杜明',
        remarkName: '起报战议去层定',
        avatar: `http://obs.scotfeel.com/61b0b7cc5af7a0db2c245f213bfa637b.jpeg?versionId=null`,
        spaceId: '61',
        isDeletedByFriend: 0,
        belongToId: '13',
        account: ' pariatur esse',
        backgroundImage: `http://obs.scotfeel.com/61b0b7cc5af7a0db2c245f213bfa637b.jpeg?versionId=null`,
        noticeFlag: 0,
      },
      {
        friendId: '3',
        nickname: '杜明',
        remarkName: '起报战议去层定',
        avatar: `http://obs.scotfeel.com/61b0b7cc5af7a0db2c245f213bfa637b.jpeg?versionId=null`,
        spaceId: '61',
        isDeletedByFriend: 0,
        belongToId: '13',
        account: ' pariatur esse',
        backgroundImage: `http://obs.scotfeel.com/61b0b7cc5af7a0db2c245f213bfa637b.jpeg?versionId=null`,
        noticeFlag: 0,
      },
    ],
    friendPage: {
      friendId: '85',
      nickname: '可莉',
      remarkName: '起报战议去层定',
      avatar: `http://obs.scotfeel.com/61b0b7cc5af7a0db2c245f213bfa637b.jpeg?versionId=null`,
      spaceId: '61',
      isDeletedByFriend: 0,
      belongToId: '13',
      account: ' pariatur esse',
      backgroundImage: `http://obs.scotfeel.com/61b0b7cc5af7a0db2c245f213bfa637b.jpeg?versionId=null`,
      noticeFlag: 0,
    },
  }),
  actions: {
    getFriendInfo(friendId: string) {
      this.friendPage = this.friendInfo.find((item) => item.friendId === friendId) as FriendInfo;
    },
    async changeRemark(remark: string, friendId: string) {
      await reqChangeFriendRemark(remark, friendId);
      let index = this.friendInfo.findIndex((item) => item.friendId === friendId);
      this.friendInfo[index].remarkName = remark;
      updateRemarkName(remark, friendId, user.userInfo.mainId);
    },
    async deleteFriend(friendId: string) {
      await reqDeleteFriend(friendId);
      let index = this.friendInfo.findIndex((item) => item.friendId === friendId);
      this.friendInfo.splice(index, 1);
      updateIsDeletedByFriend(1, friendId, user.userInfo.mainId);
    },
    async getAllFriends() {
      const friends = await reqGetAllFriends();
      this.friendInfo = friends;
    },
  },
  getters: {},
});
