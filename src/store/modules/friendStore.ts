import { defineStore } from 'pinia';
import { reqChangeFriendRemark, reqDeleteFriend } from '../../server/api/friend';
import type { FriendInfo } from '../../server/api/user';
import {
  insertFriend,
  selectAllFriends,
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
    friendsInfo: [],
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
    async init(belongToId: string) {
      this.friendsInfo = await selectAllFriends(belongToId);
    },
    loginInit(friends: FriendInfo[], belongToId: string) {
      this.friendsInfo = friends;
      for (const f of friends) {
        console.log(belongToId);
        insertFriend(
          f.friendId,
          f.nickname,
          f.remarkName,
          f.avatar,
          f.spaceId,
          f.isDeletedByFriend,
          f.account,
          f.backgroundImage,
          f.signature,
          f.noticeFlag,
          belongToId
        );
      }
    },
    getFriendInfo(friendId: string) {
      const friend = this.friendsInfo.find((item) => item.friendId === friendId) as FriendInfo;
      this.friendPage = friend;
      return friend;
    },
    agreeFriend(friendInfo: FriendInfo) {
      this.friendsInfo.push(friendInfo);
      console.log(this.friendsInfo);
      insertFriend(
        friendInfo.friendId,
        friendInfo.nickname,
        friendInfo.remarkName,
        friendInfo.avatar,
        friendInfo.spaceId,
        friendInfo.isDeletedByFriend,
        friendInfo.account,
        friendInfo.backgroundImage,
        friendInfo.signature,
        friendInfo.noticeFlag,
        user.userInfo.mainId
      );
    },
    async changeRemark(remark: string, friendId: string) {
      await reqChangeFriendRemark(remark, friendId);
      const index = this.friendsInfo.findIndex((item) => item.friendId === friendId);
      this.friendsInfo[index].remarkName = remark;
      await updateRemarkName(remark, friendId, user.userInfo.mainId);
    },
    async deleteFriend(friendId: string) {
      const data = await reqDeleteFriend(friendId);
      console.log(data);
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
