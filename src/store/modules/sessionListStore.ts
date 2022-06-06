import { defineStore } from 'pinia';
import { useUserStore } from './userStore';
import { insertSession, selectAllSession, updateSession } from '../../server/sql/sessionList';
import { useFriendStore } from './friendStore';
import { selectOneMemberInfo } from '../../server/sql/groupChatMember';

export interface SessionList {
  sessionListInfo: SessionListInfo[];
}
export interface SessionListInfo {
  sessionId: string; // 用户或群聊的id
  contentType: 1 | 0; // 最后一次聊天内容的类型，0：文本，1：照片
  content: string; // 最后一次聊天内容
  chatorName?: string; // 如果是群聊的话，这是最新一条消息发送者的昵称
  unReadCount: number; // 未读消息的数量
  belongToId?: string; // 用户id，标记这条记录是属于哪个用户的，因为可能会有多个账户在这台设备中登录
  updateTime: number; // 更新时间
  type: 1 | 2; // 会话类型，1：单聊，2：群聊
  chatorId?: string; // 如果是群聊的话，这是最新一条消息发送者的id
  avatar: string;
  nickname: string;
}
export const useSessionListStore = defineStore('sessionListStore', {
  state: (): SessionList => ({
    sessionListInfo: [],
  }),
  actions: {
    async init(userId: string) {
      this.sessionListInfo = await selectAllSession(userId);
    },
    // 有新消息，更新会话列表
    async newMessage(
      sessionId: string,
      content: string,
      contentType: 1 | 0,
      date: number,
      type: 1 | 2,
      chatorId = ''
    ) {
      const user = useUserStore();
      // 查找朋友信息
      const friendStore = useFriendStore();
      const friendInfo = friendStore.friendsInfo.find((item) => item.friendId === sessionId);
      const sessionIndex = this.sessionListInfo.findIndex((item) => item.sessionId === sessionId);
      let chatorName = '';
      if (type === 2) {
        const { nickname } = await selectOneMemberInfo(
          sessionId,
          chatorId,
          user.userInfo?.mainId as string
        );
        chatorName = nickname;
      }

      if (sessionIndex === -1) {
        // 会话未在会话列表中
        this.sessionListInfo.unshift({
          sessionId,
          contentType,
          content,
          chatorName,
          unReadCount: 1,
          belongToId: user.userInfo?.mainId,
          updateTime: date,
          type,
          chatorId,
          avatar: friendInfo?.avatar as string,
          nickname: friendInfo?.nickname as string,
        });
        insertSession(
          sessionId,
          chatorName,
          chatorId,
          content,
          contentType,
          1,
          type,
          date,
          user.userInfo?.mainId as string
        );
        console.log('会话列表插入完毕');
      } else if (sessionIndex === 0) {
        // 会话在会话列表第一项
        this.sessionListInfo[0].content = content;
        this.sessionListInfo[0].contentType = contentType;
        // this.sessionListInfo[0].chatorName = chatorName;
        this.sessionListInfo[0].unReadCount++;
        this.sessionListInfo[0].updateTime = date;
        updateSession(
          chatorName,
          chatorId,
          content,
          contentType,
          date,
          this.sessionListInfo[0].sessionId,
          user.userInfo?.mainId as string
        );
        console.log('在更新会话列表');
      } else {
        // 会话在会话列表中
        const session = this.sessionListInfo[sessionIndex];
        this.sessionListInfo.splice(sessionIndex, 1);
        setTimeout(() => {
          this.sessionListInfo.unshift({
            sessionId,
            contentType,
            content,
            chatorName,
            unReadCount: session.unReadCount + 1,
            belongToId: user.userInfo?.mainId,
            updateTime: date,
            type,
            chatorId,
            avatar: friendInfo?.avatar as string,
            nickname: friendInfo?.nickname as string,
          });
          updateSession(
            chatorName,
            chatorId,
            content,
            contentType,
            date,
            this.sessionListInfo[0].sessionId,
            user.userInfo?.mainId as string
          );
        }, 0);
      }
    },
    // 查找群聊信息
    // const groupStore = useGroupChatStore();
    // const groupInfo = computed(() =>
    //   groupStore.groupInfo.find((item) => item.groupId === props.list.sessionId)
    // );
    agreeApply() {
      this.sessionListInfo.unshift();
    },
  },
  getters: {},
});
