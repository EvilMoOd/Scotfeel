/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { defineStore } from 'pinia';
import {
  reqChangeGroupChatNickname,
  reqDismissGroupChat,
  reqUpdateGroupChatAvatar,
} from '../../server/api/groupChat';
import type { GroupChat, GroupMember } from '../../server/api/user';
import { reqImgData } from '../../server/api/user';
import { OBS_URL } from '../../server/http';
import {
  insertGroup,
  batchInsertGroup,
  selectAllGroupChat,
  updateAvatar,
  updateIsDismissed,
  updateMemberCount,
  updateNickname,
  updateSpaceAvatar,
  updateSpaceId,
  updateSpaceNickname,
} from '../../server/sql/groupChat';
import { imgMitt, uploadImage } from '../../util/uploadImage';
import { insertGroupMember, batchInsertGroupMember } from '../../server/sql/groupChatMember';

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
      // 所有群聊信心载入数据库
      // for (const g of groupChat) {
      //   insertGroup(
      //     g.groupId,
      //     g.nickname,
      //     g.avatar,
      //     g.memberCount,
      //     g.spaceId,
      //     g.spaceNickname,
      //     g.spaceAvatar,
      //     g.noticeFlag,
      //     g.isDismissed,
      //     belongToId
      //   );
      // }
      let sqlStr = `insert into groupChat values `;
      let { length } = groupChat;
      // 一次插入5000条记录，不然会报request entity too large
      for (let i = 0; i * 5000 < length; i++) {
        for (let x = i * 5000; x < length && x < 5000 * (i + 1); x++) {
          let sqlStrTemp = `("${groupChat[x].groupId}","${groupChat[x].nickname}","${groupChat[x].avatar}","${groupChat[x].memberCount}","${groupChat[x].spaceId}",
          "${groupChat[x].spaceNickname}","${groupChat[x].spaceAvatar}","${groupChat[x].noticeFlag}","${groupChat[x].isDismissed}","${belongToId}")`;
          if (x !== length - 1 && x !== 5000 * (i + 1) - 1) {
            sqlStrTemp += `,`;
          }
          sqlStr += sqlStrTemp;
        }
        batchInsertGroup(sqlStr);
        // 复原
        sqlStr = `insert into groupChat values `;
      }
      // 所有群成员载入数据库
      // for (const g of groupChatMember) {
      //   insertGroupMember(
      //     g.groupId,
      //     g.memberId,
      //     g.nickname,
      //     g.remarkName,
      //     g.avatar,
      //     g.role,
      //     g.isExited,
      //     belongToId
      //   );
      // }
      sqlStr = `insert into groupChatMember values `;
      length = groupChat.length;
      // 一次插入5000条记录，不然会报request entity too large
      for (let i = 0; i * 5000 < length; i++) {
        for (let x = i * 5000; x < length && x < 5000 * (i + 1); x++) {
          let sqlStrTemp = `("${groupChatMember[x].groupId}","${groupChatMember[x].memberId}","${groupChatMember[x].nickname}","${groupChatMember[x].remarkName}","${groupChatMember[x].avatar}",
          "${groupChatMember[x].role}","${groupChatMember[x].isExited}","${belongToId}")`;
          if (x !== length - 1 && x !== 5000 * (i + 1) - 1) {
            sqlStrTemp += `,`;
          }
          sqlStr += sqlStrTemp;
        }
        batchInsertGroupMember(sqlStr);
        // 复原
        sqlStr = `insert into groupChatMember values `;
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
      await reqChangeGroupChatNickname(nickname, groupId);
      const index = this.groupInfo.findIndex((item) => item.groupId === groupId);
      this.groupInfo[index].nickname = nickname;
      await updateNickname(nickname, groupId, user.userInfo.mainId);
    },
    async changeAvatar(groupId: string) {
      const imgData = await reqImgData();
      uploadImage(
        imgData,
        async () => {
          const imgUrl = `${OBS_URL}/${imgData.imageId}.jpeg`;
          await reqUpdateGroupChatAvatar(imgUrl, groupId);
          const index = this.groupInfo.findIndex((item) => item.groupId === groupId);
          this.groupInfo[index].avatar = imgUrl;
          await updateAvatar(imgUrl, this.groupInfo[index].groupId, user.userInfo.mainId);
          imgMitt.emit('groupAvatar');
        },
        1,
        {
          width: 480,
          height: 480,
        }
      );
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
    async groupBreakOut(groupId: string) {
      await reqDismissGroupChat(groupId);
      const index = this.groupInfo.findIndex((item) => item.groupId === groupId);
      this.groupInfo[index].isDismissed = 1;
      updateIsDismissed(1, groupId, user.userInfo?.mainId as string);
    },
  },
  getters: {},
});
