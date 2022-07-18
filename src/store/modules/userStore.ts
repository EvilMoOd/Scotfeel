/* eslint-disable @typescript-eslint/no-misused-promises */
import { defineStore } from 'pinia';
import type { User } from '../../server/api/user';
import {
  reqChangeAvatar,
  reqChangeBackground,
  reqChangeNickname,
  reqChangeSignal,
  reqImgData,
  reqUserLogin,
  reqUserLogout,
} from '../../server/api/user';
import { OBS_URL } from '../../server/http';
import { deleteFriendTable } from '../../server/sql/friend';
import { deleteGroupTable } from '../../server/sql/groupChat';
import { deleteGroupMemberTable } from '../../server/sql/groupChatMember';
import { deleteSpaceTable } from '../../server/sql/subscribedSpace';
import { logoutCloseWebsocket } from '../../server/webSocket';
import { imgMitt, uploadImage } from '../../util/uploadImage';
import { useFriendStore } from './friendStore';
import { useGroupChatStore } from './groupStore';
import { useSubscribeSpaceStore } from './spaceStore';

// 从本地仓库捞数据
const user: User = uni.getStorageSync('user');

// eslint-disable-next-line import/prefer-default-export
export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: user.userInfo,
    token: user.token,
  }),
  actions: {
    // 登录
    async userLogin(phone: string, authCode: string) {
      const { userInfo, token, friend, groupChat, groupChatMember, subscribedSpace } =
        await reqUserLogin(phone, authCode);
      this.userInfo = userInfo;
      this.token = token;
      const friendStore = useFriendStore();
      const groupStore = useGroupChatStore();
      const spaceStore = useSubscribeSpaceStore();
      friendStore.loginInit(friend, userInfo?.mainId as string);
      groupStore.loginInit(groupChat, userInfo?.mainId as string, groupChatMember);
      spaceStore.loginInit(subscribedSpace);
    },
    // 退出登录
    async userLogout() {
      await reqUserLogout();
      this.userInfo = undefined;
      this.token = undefined;
      uni.removeStorageSync('user');
      uni.removeStorageSync('notice');
      uni.removeStorageSync('momentList');
      logoutCloseWebsocket();
      deleteFriendTable();
      deleteGroupTable();
      deleteGroupMemberTable();
      deleteSpaceTable();
    },
    // 修改昵称
    async changeNickname(nickname: string) {
      await reqChangeNickname(nickname);
      this.userInfo.nickname = nickname;
    },
    // 修改头像
    async changeAvatar() {
      const imgData = await reqImgData();
      uploadImage(
        imgData,
        async () => {
          const imgUrl = `${OBS_URL}/${imgData.imageId}.jpeg`;
          await reqChangeAvatar(imgUrl);
          this.userInfo.avatar = imgUrl;
          imgMitt.emit('myAvatar');
        },
        1,
        {
          width: 480,
          height: 480,
        }
      );
    },
    // 修改背景
    async changeBackgroundImg() {
      const imgData = await reqImgData();
      uploadImage(
        imgData,
        async () => {
          const imgUrl = `${OBS_URL}/${imgData.imageId}.jpeg`;
          await reqChangeBackground(imgUrl);
          this.userInfo.backgroundImage = imgUrl;
          imgMitt.emit('myBackground');
        },
        1,
        {
          width: 375,
          height: 152,
        }
      );
    },
    // 修改个性签名
    async changeSignature(signature: string) {
      await reqChangeSignal(signature);
      this.userInfo.signature = signature;
    },
  },
  getters: {
    backgroundImg(): string {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return `url(${this.userInfo?.backgroundImage})`;
    },
  },
});
