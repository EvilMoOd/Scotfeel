import { defineStore } from 'pinia';
export interface SessionList {
  sessionId: string; //用户或群聊的id
  contentType: string; //最后一次聊天内容
  content: string; //最后一次聊天内容的类型，1：文本，2：照片
  chatorName: string; //如果是群聊的话，这是最新一条消息发送者的昵称
  unReadCount: number; //未读消息的数量
  belongToId: string; //用户id，标记这条记录是属于哪个用户的，因为可能会有多个账户在这台设备中登录
  updateTime: string; //更新时间
  type: 0 | 1; //会话类型，1：单聊，2：群聊
  chatorId: string; //如果是群聊的话，这是最新一条消息发送者的id
}
export const useSessionListStore = defineStore('sessionListStore', {
  state: (): SessionList => ({
    sessionId: '46',
    contentType: 'laboris consequat',
    content: 'ea qui amet quis labore',
    chatorName: '力处五现',
    unReadCount: 12,
    belongToId: '82',
    updateTime: '1985-01-15 22:01:48',
    type: 0,
    chatorId: '41',
  }),
  actions: {},
  getters: {},
});
