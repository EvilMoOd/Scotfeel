import { useChatRecordStore } from '../../store/modules/chatRecordStore';

const chatRecordStore = useChatRecordStore();

//3、一条个人消息
export function personChatMessage(
  fromId: string,
  content: string,
  contentType: 0 | 1,
  date: string
) {
  chatRecordStore.newPersonMessage(fromId, content, contentType, date);
}
//4、一条群聊消息
export function groupChatMessage(
  groupId: string,
  fromId: string,
  content: string,
  contentType: 0 | 1,
  date: string
) {
  chatRecordStore.newGroupMessage(groupId, fromId, content, contentType, date);
}
