/* eslint-disable @typescript-eslint/no-misused-promises */
import { defineStore } from 'pinia';
import { reqChangeGroupChatNickname, reqUpdateGroupChatAvatar } from '../../server/api/groupChat';
import type { GroupMember } from '../../server/api/user';
import { reqImgData } from '../../server/api/user';
import { OBS_URL } from '../../server/http';
import { updateAvatar, updateMemberCount, updateNickname } from '../../server/sql/groupChat';
import { createUUID } from '../../server/utils/uuid';

export interface GroupChat {
  groupInfo: GroupPage[];
  groupPage: GroupPage;
}
export interface GroupPage {
  groupId: string; // 群聊id
  nickname: string; // 群聊昵称
  avatar: string; // 群聊头像
  memberCount: number; // 群聊成员数
  spaceId?: string; // 群聊绑定的空间id
  belongToId: string; // 属于哪个用户
  isDismissed: 0 | 1; // 是否已解散，0：否，1：是；当群聊已解散时，则客户端直接在会话列表标识，并且将不能够再进入到群聊的聊天框中
  spaceNickname?: string; // 群聊绑定的空间昵称
  spaceAvatar?: string; // 群聊绑定的空间头像
  noticeFlag: 0 | 1; // 是否设为免打扰，0：否，1：是
  groupMember: GroupMember[];
}

const user = uni.getStorageSync('user');
export const useGroupChatStore = defineStore('groupChatStore', {
  state: (): GroupChat => ({
    groupInfo: [],

    groupPage: {
      groupId: '35',
      nickname: '考研摆烂',
      avatar: `http://obs.scotfeel.com/61b0b7cc5af7a0db2c245f213bfa637b.jpeg?versionId=null`,
      memberCount: 0,
      spaceId: '29',
      belongToId: '41',
      isDismissed: 0,
      spaceNickname: '金娟',
      spaceAvatar: `http://obs.scotfeel.com/61b0b7cc5af7a0db2c245f213bfa637b.jpeg?versionId=null`,
      noticeFlag: 1,
      groupMember: [],
    },
  }),

  actions: {
    // 获取群聊信息
    getFriendInfo(groupId: string) {
      this.groupPage = this.groupInfo.find((item) => item.groupId === groupId) as GroupPage;
    },
    // 修改昵称
    async changeNickname(nickname: string, groupId: string) {
      try {
        await reqChangeGroupChatNickname(nickname, groupId);
        const index = this.groupInfo.findIndex((item) => item.groupId === groupId);
        this.groupInfo[index].nickname = nickname;
        await updateNickname(nickname, groupId, user.userInfo.mainId);
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
    changeAvatar(groupId: string) {
      uni.chooseImage({
        count: 1,
        crop: {
          width: 48,
          height: 48,
        },
        success: async (chooseImageRes) => {
          const imgId = createUUID();
          const imgData = await reqImgData();
          const tempFilePaths = chooseImageRes.tempFilePaths;
          console.log(tempFilePaths);
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
              await reqUpdateGroupChatAvatar(imgUrl, groupId);
              const index = this.groupInfo.findIndex((item) => item.groupId === groupId);
              this.groupInfo[index].avatar = imgUrl;
              await updateAvatar(imgUrl, this.groupInfo[index].groupId, user.userInfo.mainId);
            },
            fail: () =>
              uni.showModal({
                title: '更改失败',
              }),
          });
        },
      });
    },
    updateGroupChatAvatar(groupId: string, avatar: string) {
      const index = this.groupInfo.findIndex((item) => item.groupId === groupId);
      this.groupInfo[index].avatar = avatar;
      updateAvatar(avatar, groupId, user.userInfo?.mainId as string);
    },
    updateGroupChatNickname(groupId: string, nickname: string) {
      const index = this.groupInfo.findIndex((item) => item.groupId === groupId);
      this.groupInfo[index].nickname = nickname;
      updateNickname(nickname, groupId, user.userInfo?.mainId as string);
    },
    updateGroupCount(groupId: string, count: number) {
      const index = this.groupInfo.findIndex((item) => item.groupId === groupId);
      this.groupInfo[index].memberCount = count;
      updateMemberCount(count, groupId, user.userInfo?.mainId as string);
    },
    updateGroupSpaceId() {},
    updateGroupSpaceNickname() {},
    updateGroupSpaceAvatar() {},
    groupBreakOut() {},
  },
  getters: {},
});
