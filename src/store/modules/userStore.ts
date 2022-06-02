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
import { deleteSessionTable } from '../../server/sql/sessionList';
import { createUUID } from '../../server/utils/uuid';
import { useFriendStore } from './friendStore';

// 从本地仓库捞数据
const user: User = uni.getStorageSync('user');

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: user.userInfo,
    token: user.token,
  }),
  actions: {
    // 登录
    async userLogin(phone: string, authCode: string) {
      const { userInfo, token, friend } = await reqUserLogin(phone, authCode);
      this.userInfo = userInfo;
      this.token = token;
      const friendStore = useFriendStore();
      console.log(userInfo?.mainId);
      friendStore.loginInit(friend, userInfo?.mainId as string);
    },
    // 退出登录
    async userLogout() {
      await reqUserLogout();
      this.userInfo = undefined;
      this.token = undefined;
      deleteFriendTable();
      deleteSessionTable();
    },
    // 修改昵称
    async changeNickname(nickname: string) {
      try {
        await reqChangeNickname(nickname);
        this.userInfo.signature = nickname;
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
    changeAvatar() {
      uni.chooseImage({
        count: 1,
        crop: {
          width: 48,
          height: 48,
        },
        success: async (chooseImageRes): Promise<void> => {
          const imgId = createUUID();
          const imgData = await reqImgData();
          const tempFilePaths = chooseImageRes.tempFilePaths;
          uni.uploadFile({
            url: OBS_URL,
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              key: `user/${imgId}.jpeg`, // 地址和文件名,照片名字需以"user/"开头
              AccessKeyId: imgData.accessKeyId, // 获取ak
              'x-obs-acl': 'public-read', // 设置为公共读
              policy: imgData.policy,
              'content-type': 'image/jpeg', // 文件类型
              'x-obs-security-token': imgData.securitytoken,
              signature: imgData.signature, // 获取后端生成的signature
            },
            timeout: 10000,
            success: async ({ data }) => {
              const imgUrl = `http://obs.scotfeel.com/${imgId}.jpeg?versionId=${data}`;
              await reqChangeAvatar(imgUrl);
              this.userInfo.avatar = imgUrl;
            },
            fail: () =>
              uni.showModal({
                title: '更改失败',
              }),
          });
        },
      });
    },
    // 修改背景
    changeBackgroundImg() {
      uni.chooseImage({
        count: 1,
        success: async (chooseImageRes) => {
          const imgId = createUUID();
          const imgData = await reqImgData();
          const tempFilePaths = chooseImageRes.tempFilePaths;
          uni.uploadFile({
            url: OBS_URL,
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              key: `user/${imgId}.jpeg`, // 地址和文件名,照片名字需以"user/"开头
              AccessKeyId: imgData.accessKeyId, // 获取ak
              'x-obs-acl': 'public-read', // 设置为公共读
              policy: imgData.policy,
              'content-type': 'image/jpeg', // 文件类型
              'x-obs-security-token': imgData.securitytoken,
              signature: imgData.signature, // 获取后端生成的signature
            },
            timeout: 10000,
            success: async ({ data }) => {
              const imgUrl = `http://obs.scotfeel.com/${imgId}.jpeg?versionId=${data}`;
              await reqChangeBackground(imgUrl);
              this.userInfo.backgroundImage = imgUrl;
            },
            fail: () =>
              uni.showModal({
                title: '更改失败',
              }),
          });
        },
      });
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
