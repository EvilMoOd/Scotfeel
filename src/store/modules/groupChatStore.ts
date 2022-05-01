import { defineStore } from 'pinia';
export interface GroupChat {
  groupId: string; //群聊id
  nickname: string; //群聊昵称
  avatar: string; //群聊头像
  memberCount: string; //群聊成员数
  spaceId: string; //群聊绑定的空间id
  belongToId: string; //属于哪个用户
  isDismissed: 0 | 1; //是否已解散，0：否，1：是；当群聊已解散时，则客户端直接在会话列表标识，并且将不能够再进入到群聊的聊天框中
  spaceNickname: string; //群聊绑定的空间昵称
  spaceAvatar: string; //群聊绑定的空间头像
  noticeFlag: 0 | 1; //是否设为免打扰，0：否，1：是
}
export const useGroupChatStore = defineStore('groupChatStore', {
  state: (): GroupChat => ({
    groupId: '78',
    nickname: '张霞',
    avatar: 'http://dummyimage.com/100x100',
    memberCount: 'in reprehenderit',
    spaceId: '29',
    belongToId: '41',
    isDismissed: 0,
    spaceNickname: '金娟',
    spaceAvatar: 'http://dummyimage.com/100x100',
    noticeFlag: 1,
  }),
  actions: {},
  getters: {},
});
