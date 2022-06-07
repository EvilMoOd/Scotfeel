/* eslint-disable @typescript-eslint/no-misused-promises */
import { defineStore } from 'pinia';
import { reqChangeGroupChatNickname, reqUpdateGroupChatAvatar } from '../../server/api/groupChat';
import type { GroupChat, GroupMember } from '../../server/api/user';
import { reqImgData } from '../../server/api/user';
import { OBS_URL } from '../../server/http';
import {
  insertGroup,
  selectAllGroupChat,
  updateAvatar,
  updateIsDismissed,
  updateMemberCount,
  updateNickname,
  updateSpaceAvatar,
  updateSpaceId,
  updateSpaceNickname,
} from '../../server/sql/groupChat';
import { insertGroupMember } from '../../server/sql/groupChatMember';
import { createUUID } from '../../server/utils/uuid';

export interface Group {
  groupInfo: GroupChat[];
  groupPage: GroupChat;
}

const user = uni.getStorageSync('user');
export const useGroupChatStore = defineStore('groupChatStore', {
  state: (): Group => ({
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
    },
  }),

  actions: {
    async init(belongToId: string) {
      this.groupInfo = await selectAllGroupChat(belongToId);
    },
    loginInit(groupChat: GroupChat[], belongToId: string, groupChatMember: GroupMember[]) {
      this.groupInfo = groupChat;
      console.log(this.groupInfo);
      // 所有群聊信心载入数据库
      for (const g of groupChat) {
        insertGroup(
          g.groupId,
          g.nickname,
          g.avatar,
          g.memberCount,
          g.spaceId,
          g.spaceNickname,
          g.spaceAvatar,
          g.noticeFlag,
          g.isDismissed,
          belongToId
        );
      }
      // 所有群成员载入数据库
      for (const g of groupChatMember) {
        insertGroupMember(
          g.groupId,
          g.memberId,
          g.nickname,
          g.remarkName,
          g.avatar,
          g.role,
          g.isExited,
          belongToId
        );
      }
    },
    // 创建或被拉入新的群聊
    newGroup(groupChatInfo: GroupChat, memberInfo: GroupMember[], belongToId: string) {
      this.groupInfo.push(groupChatInfo);
      console.log(this.groupInfo);
      // 所有群聊信心载入数据库
      insertGroup(
        groupChatInfo.groupId,
        groupChatInfo.nickname,
        groupChatInfo.avatar,
        groupChatInfo.memberCount,
        groupChatInfo.spaceId,
        groupChatInfo.spaceNickname,
        groupChatInfo.spaceAvatar,
        groupChatInfo.noticeFlag,
        0,
        belongToId
      );
      // 所有群成员载入数据库
      for (const g of memberInfo) {
        insertGroupMember(
          g.groupId,
          g.memberId,
          g.nickname,
          g.remarkName,
          g.avatar,
          g.role,
          g.isExited,
          belongToId
        );
      }
    },
    // 获取群聊信息
    getGroupInfo(groupId: string) {
      this.groupPage = this.groupInfo.find((item) => item.groupId === groupId) as GroupChat;
    },
    // 修改群聊信息
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
    // ws更新群聊信息
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
    updateGroupSpaceId(groupId: string, spaceId: string) {
      const index = this.groupInfo.findIndex((item) => item.groupId === groupId);
      this.groupInfo[index].spaceId = spaceId;
      updateSpaceId(spaceId, groupId, user.userInfo?.mainId as string);
    },
    updateGroupSpaceNickname(groupId: string, spaceNickname: string) {
      const index = this.groupInfo.findIndex((item) => item.groupId === groupId);
      this.groupInfo[index].spaceNickname = spaceNickname;
      updateSpaceNickname(spaceNickname, groupId, user.userInfo?.mainId as string);
    },
    updateGroupSpaceAvatar(groupId: string, avatar: string) {
      const index = this.groupInfo.findIndex((item) => item.groupId === groupId);
      this.groupInfo[index].spaceAvatar = avatar;
      updateSpaceAvatar(avatar, groupId, user.userInfo?.mainId as string);
    },
    // 群解散
    groupBreakOut(groupId: string) {
      const index = this.groupInfo.findIndex((item) => item.groupId === groupId);
      this.groupInfo[index].isDismissed = 1;
      updateIsDismissed(1, groupId, user.userInfo?.mainId as string);
    },
  },
  getters: {},
});
