import { defineStore } from 'pinia';
import { useUserStore } from './userStore';

export interface SessionList {
  sessionListInfo: SessionListInfo[];
}
export interface SessionListInfo {
  sessionId: string; //用户或群聊的id
  contentType: 1 | 2; //最后一次聊天内容的类型，1：文本，2：照片
  content: string; //最后一次聊天内容
  chatorName?: string; //如果是群聊的话，这是最新一条消息发送者的昵称
  unReadCount: number; //未读消息的数量
  belongToId: string; //用户id，标记这条记录是属于哪个用户的，因为可能会有多个账户在这台设备中登录
  updateTime: number; //更新时间
  type: 1 | 2; //会话类型，1：单聊，2：群聊
  chatorId?: string; //如果是群聊的话，这是最新一条消息发送者的id
}
export const useSessionListStore = defineStore('sessionListStore', {
  state: (): SessionList => ({
    sessionListInfo: [
      {
        sessionId: '7d5e7e76a4534db78b79d80b221df2ae',
        contentType: 1,
        content: '您吃了吗',
        chatorName: '可莉',
        unReadCount: 12,
        belongToId: '82',
        updateTime: 1652422653,
        type: 1,
        chatorId: '41',
      },
      {
        sessionId: '4c157fb2bffb4e48b8068dead4d379c7',
        contentType: 1,
        content: 'ea qui amet quis labore',
        chatorName: '大侠',
        unReadCount: 12,
        belongToId: '82',
        updateTime: 1652422111,
        type: 1,
        chatorId: '41',
      },
      {
        sessionId: '25',
        contentType: 1,
        content: 'ea qui amet quis labore',
        chatorName: '徐大虾',
        unReadCount: 1111,
        belongToId: '82',
        updateTime: 1652412653,
        type: 1,
        chatorId: '41',
      },
      {
        sessionId: '35',
        contentType: 1,
        content: 'ea qui amet quis labore',
        chatorName: '雪茶',
        unReadCount: 1,
        belongToId: '82',
        updateTime: 1652412653,
        type: 2,
        chatorId: '41',
      },
      {
        sessionId: '45',
        contentType: 2,
        content: 'ea qui amet quis labore',
        chatorName: 'root',
        unReadCount: 12,
        belongToId: '82',
        updateTime: 1652422999,
        type: 2,
        chatorId: '41',
      },
    ],
  }),
  actions: {
    newMessage(sessionId: string, content: string, contentType: 1 | 2, date: number, type: 1 | 2) {
      const user = useUserStore();
      const sessionIndex = this.sessionListInfo.findIndex((item) => {
        item.sessionId = sessionId;
      });
      let session = this.sessionListInfo[sessionIndex];
      if (session) {
        this.sessionListInfo.splice(sessionIndex, 1);
        this.sessionListInfo.unshift({
          sessionId,
          contentType,
          content,
          chatorName: '',
          unReadCount: session.unReadCount + 1,
          belongToId: user.userInfo.mainId,
          updateTime: date,
          type,
          chatorId: '',
        });
      }
    },
  },
  getters: {},
});
