import { defineStore } from 'pinia';
export interface ChatRecord {
  id: string; //主键，自增
  sessionId: string; //和会话列表的id是一样的，用户或群聊的id，如果这条聊天记录是我和A用户的聊天会话里，那么id就是A用户的id，如果这是群聊会话的聊天记录，那么id就是群聊的id
  content: string; //发送这条消息的用户的ID
  contentType: string; //消息内容
  belongToId: string; //消息类型，1：文本内容，2：照片
  createTime: string; //用户id，标记这条记录是属于哪个用户的，因为可能会有多个账户在这台设备中登录
}
export const useChatRecordStore = defineStore('chatRecordStore', {
  state: (): ChatRecord => ({
    id: '91',
    sessionId: '91',
    content: 'consectetur',
    contentType: 'laborum sint anim deserunt mollit',
    belongToId: '20',
    createTime: '1973-11-01 10:21:31',
  }),
  actions: {},
  getters: {},
});
