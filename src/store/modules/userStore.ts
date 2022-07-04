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
import { uploadImage } from '../../util/uploadImage';
import { useFriendStore } from './friendStore';
import { useGroupChatStore } from './groupStore';

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
      const { userInfo, token, friend, groupChat, groupChatMember } = await reqUserLogin(
        phone,
        authCode
      );
      this.userInfo = userInfo;
      this.token = token;
      const friendStore = useFriendStore();
      const groupStore = useGroupChatStore();
      friendStore.loginInit(friend, userInfo?.mainId as string);
      groupStore.loginInit(groupChat, userInfo?.mainId as string, groupChatMember);
    },
    // 退出登录
    async userLogout() {
      await reqUserLogout();
      this.userInfo = undefined;
      this.token = undefined;
      deleteFriendTable();
      deleteGroupTable();
      deleteGroupMemberTable();
    },
    // 修改昵称
    async changeNickname(nickname: string) {
      try {
        await reqChangeNickname(nickname);
        this.userInfo.nickname = nickname;
        uni.showModal({
          title: '修改成功',
        });
      } catch (err) {
        uni.showModal({
          title: '修改失败，请检查网络',
        });
      }
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
        },
        1,
        {
          width: 48,
          height: 48,
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
      try {
        await reqChangeSignal(signature);
        this.userInfo.signature = signature;
        uni.showModal({
          title: '修改成功',
        });
      } catch (err) {
        uni.showModal({
          title: '修改失败，请检查网络',
        });
      }
    },
  },
  getters: {
    backgroundImg(): string {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return `url(${this.userInfo?.backgroundImage})`;
    },
  },
});
