/* eslint-disable no-plusplus */
import { defineStore } from 'pinia';
import { reqChangeFriendRemark, reqDeleteFriend } from '../../server/api/friend';
import type { FriendInfo } from '../../server/api/user';
import {
  insertFriend,
  batchInsertFriend,
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
    // 登录初始化
    loginInit(friends: FriendInfo[], belongToId: string) {
      this.friendsInfo = friends;
      // eslint-disable-next-line no-restricted-syntax
      // for (const f of friends) {
      //   insertFriend(
      //     f.friendId,
      //     f.nickname,
      //     f.remarkName,
      //     f.avatar,
      //     f.spaceId,
      //     f.isDeletedByFriend,
      //     f.account,
      //     f.backgroundImage,
      //     f.signature,
      //     f.noticeFlag,
      //     belongToId
      //   );
      // }
      let sqlStr = `insert into friend values `;
      const { length } = friends;
      // 一次插入5000条记录，不然会报request entity too large
      for (let i = 0; i * 5000 < length; i++) {
        for (let x = i * 5000; x < length && x < 5000 * (i + 1); x++) {
          let sqlStrTemp = `("${friends[x].friendId}","${friends[x].nickname}","${friends[x].remarkName}","${friends[x].avatar}","${friends[x].spaceId}",
            "${friends[x].isDeletedByFriend}","${friends[x].account}","${friends[x].backgroundImage}","${friends[x].noticeFlag}","${belongToId}","${friends[x].signature}")`;
          if (x !== length - 1 && x !== 5000 * (i + 1) - 1) {
            sqlStrTemp += `,`;
          }
          sqlStr += sqlStrTemp;
        }
        batchInsertFriend(sqlStr);
        // 复原
        sqlStr = `insert into friend values `;
      }
    },
    getFriendInfo(friendId: string) {
      const friend = this.friendsInfo.find(
        (item) => item.friendId === friendId && item.isDeletedByFriend !== 1
      ) as FriendInfo;
      this.friendPage = friend;
      return friend;
    },
    agreeFriend(friendInfo: FriendInfo) {
      const index = this.friendsInfo.findIndex((item) => friendInfo.friendId === item.friendId);
      if (index === -1) {
        this.friendsInfo.push({
          friendId: friendInfo.friendId,
          nickname: friendInfo.nickname,
          remarkName: friendInfo.remarkName,
          avatar: friendInfo.avatar,
          spaceId: friendInfo.spaceId,
          isDeletedByFriend: 0,
          account: friendInfo.account,
          backgroundImage: friendInfo.backgroundImage,
          signature: friendInfo.signature,
          noticeFlag: friendInfo.noticeFlag,
          belongToId: user.userInfo.mainId,
        });
        insertFriend(
          friendInfo.friendId,
          friendInfo.nickname,
          friendInfo.remarkName,
          friendInfo.avatar,
          friendInfo.spaceId,
          0,
          friendInfo.account,
          friendInfo.backgroundImage,
          friendInfo.signature,
          friendInfo.noticeFlag,
          user.userInfo.mainId
        );
      } else {
        this.friendsInfo[index].isDeletedByFriend = 0;
        updateIsDeletedByFriend(0, this.friendsInfo[index].friendId, user.userInfo.mainId);
      }
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
      this.friendsInfo[index].isDeletedByFriend = 1;
      await updateIsDeletedByFriend(1, friendId, user.userInfo.mainId);
    },
    async updateFriendAvatar(friendId: string, avatar: string, belongToId: string) {
      const index = this.friendsInfo.findIndex((item) => item.friendId === friendId);
      this.friendsInfo[index].avatar = avatar;
      await updateAvatar(avatar, friendId, belongToId);
    },
    async updateFriendNickname(friendId: string, nickname: string, belongToId: string) {
      const index = this.friendsInfo.findIndex((item) => item.friendId === friendId);
      this.friendsInfo[index].nickname = nickname;
      await updateNickname(nickname, friendId, belongToId);
    },
    async updateFriendAccount(friendId: string, account: string, belongToId: string) {
      const index = this.friendsInfo.findIndex((item) => item.friendId === friendId);
      this.friendsInfo[index].account = account;
      await updateAccount(account, friendId, belongToId);
    },
    async updateFriendBackgroundImg(friendId: string, backgroundImage: string, belongToId: string) {
      const index = this.friendsInfo.findIndex((item) => item.friendId === friendId);
      this.friendsInfo[index].backgroundImage = backgroundImage;
      await updateBackgroundImage(backgroundImage, friendId, belongToId);
    },
    async updateFriendSignature(friendId: string, signature: string, belongToId: string) {
      const index = this.friendsInfo.findIndex((item) => item.friendId === friendId);
      this.friendsInfo[index].signature = signature;
      await updateSignature(signature, friendId, belongToId);
    },
    async updateFriendSpaceId(friendId: string, spaceId: string, belongToId: string) {
      const index = this.friendsInfo.findIndex((item) => item.friendId === friendId);
      this.friendsInfo[index].spaceId = spaceId;
      await updateSpaceId(spaceId, friendId, belongToId);
    },
    // 被好友删除
    async beDeleteFriend(friendId: string) {
      const index = this.friendsInfo.findIndex((item) => item.friendId === friendId);
      this.friendsInfo[index].isDeletedByFriend = 1;
      await updateIsDeletedByFriend(1, friendId, user.userInfo.mainId);
    },
  },
  getters: {},
});
