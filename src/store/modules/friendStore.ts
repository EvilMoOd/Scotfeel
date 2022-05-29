import { defineStore } from 'pinia';
import { reqChangeFriendRemark, reqDeleteFriend } from '../../server/api/friend';
import type { FriendInfo } from '../../server/api/user';
import {
  updateAccount,
  updateAvatar,
  updateBackgroundImage,
  updateIsDeletedByFriend,
  updateNickname,
  updateRemarkName,
  updateSignature,
  updateSpaceId,
} from '../../server/sql/friend';
export interface Friend {
  friendsInfo: FriendInfo[];
  friendPage: FriendInfo;
}
const user = uni.getStorageSync('user');

export const useFriendStore = defineStore('friend', {
  state: (): Friend => ({
    friendsInfo: [
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
        signature: '这是个性签名',
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
        signature: '这是个性签名',
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
        signature: '这是个性签名',
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
        signature: '这是个性签名',
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
        signature: '这是个性签名',
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
        signature: '这是个性签名',
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
        signature: '这是个性签名',
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
      signature: '这是个性签名',
      noticeFlag: 0,
    },
  }),
  actions: {
    getFriendInfo(friendId: string) {
      this.friendPage = this.friendsInfo.find((item) => item.friendId === friendId) as FriendInfo;
    },
    async changeRemark(remark: string, friendId: string) {
      await reqChangeFriendRemark(remark, friendId);
      const index = this.friendsInfo.findIndex((item) => item.friendId === friendId);
      this.friendsInfo[index].remarkName = remark;
      await updateRemarkName(remark, friendId, user.userInfo.mainId);
    },
    async deleteFriend(friendId: string) {
      await reqDeleteFriend(friendId);
      const index = this.friendsInfo.findIndex((item) => item.friendId === friendId);
      this.friendsInfo.splice(index, 1);
      await updateIsDeletedByFriend(1, friendId, user.userInfo.mainId);
    },
    async updateFriendAvatar(friendId: string, avatar: string, belongToId: string) {
      const index = this.friendsInfo.findIndex((item) => (item.friendId = friendId));
      this.friendsInfo[index].avatar = avatar;
      await updateAvatar(avatar, friendId, belongToId);
    },
    async updateFriendNickname(friendId: string, nickname: string, belongToId: string) {
      const index = this.friendsInfo.findIndex((item) => (item.friendId = friendId));
      this.friendsInfo[index].nickname = nickname;
      await updateNickname(nickname, friendId, belongToId);
    },
    async updateFriendAccount(friendId: string, account: string, belongToId: string) {
      const index = this.friendsInfo.findIndex((item) => (item.friendId = friendId));
      this.friendsInfo[index].account = account;
      await updateAccount(account, friendId, belongToId);
    },
    async updateFriendBackgroundImg(friendId: string, backgroundImage: string, belongToId: string) {
      const index = this.friendsInfo.findIndex((item) => (item.friendId = friendId));
      this.friendsInfo[index].backgroundImage = backgroundImage;
      await updateBackgroundImage(backgroundImage, friendId, belongToId);
    },
    async updateFriendSignature(friendId: string, signature: string, belongToId: string) {
      const index = this.friendsInfo.findIndex((item) => (item.friendId = friendId));
      this.friendsInfo[index].signature = signature;
      await updateSignature(signature, friendId, belongToId);
    },
    async updateFriendSpaceId(friendId: string, spaceId: string, belongToId: string) {
      const index = this.friendsInfo.findIndex((item) => (item.friendId = friendId));
      this.friendsInfo[index].spaceId = spaceId;
      await updateSpaceId(spaceId, friendId, belongToId);
    },
  },
  getters: {},
});
