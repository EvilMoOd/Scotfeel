import { defineStore } from 'pinia';
export interface ChatRecord {
  id?: string; //主键，自增
  sessionId: string; //和会话列表的id是一样的，用户或群聊的id，如果这条聊天记录是我和A用户的聊天会话里，那么id就是A用户的id，如果这是群聊会话的聊天记录，那么id就是群聊的id
  userId?: string; //发送消息的用户id
  content: string; //消息内容
  contentType: 0 | 1; //消息类型，0：文本内容，1：照片
  belongToId?: string; //用户id，标记这条记录是属于哪个用户的，因为可能会有多个账户在这台设备中登录
  createTime: string; //消息时间
}
export const useChatRecordStore = defineStore('chatRecordStore', {
  state: (): ChatRecord[] => [
    {
      sessionId: '91',
      userId: '',
      content: 'consectetur',
      contentType: 1,
      belongToId: '20',
      createTime: '1973-11-01 10:21:31',
    },
  ],
  actions: {
    newPersonMessage(sessionId: string, content: string, contentType: 0 | 1, createTime: string) {
      this.$state.push({ sessionId, content, contentType, createTime });
      //TODO sql
    },
    newGroupMessage(
      sessionId: string,
      userId: string,
      content: string,
      contentType: 0 | 1,
      createTime: string
    ) {
      this.$state.push({ sessionId, userId, content, contentType, createTime });
      //TODO sql
    },
  },
  getters: {},
});
