import { useChatRecordStore } from '../store/modules/chatRecordStore';
import { useMomentListStore } from '../store/modules/momemtListStore';
import type { GroupChat } from '../store/modules/groupChatStore';
import type { GroupChatMember } from '../store/modules/groupChatMemberStore';

const chatRecordStore = useChatRecordStore();
const momentListStore = useMomentListStore();

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
//5、朋友动态列表
export function friendsActiveList(friendId: string) {
  momentListStore.newFriendActiveMessage(friendId);
}
//6、有申请请求
export function applyMessage() {
  // body
}
// 7、被评论消息
export function commentMessage() {}
// 8、被点赞消息
export function LikeMessage() {}
// 9、被订阅消息
export function beingSubscribe() {}
// 10、被申请添加朋友
export function beingFriendAdd(friendId: string, nickname: string, avatar: string) {
  console.log(friendId, nickname, avatar);
}
// 11、被同意添加好友
export function beingAgreeByFriend() {}
// 12、被删除好友
export function beingDeleteByFriend(friendId: string) {
  console.log(friendId);
}
// 13、更新好友头像
export function updateFriendAvatar(friendId: string, avatar: string) {
  console.log(friendId, avatar);
}
// 14、更新朋友昵称
export function updateFriendNickname(friendId: string, nickname: string) {
  console.log(friendId, nickname);
}
// 15、更新朋友account
export function updateFriendAccount(friendId: string, account: string) {
  console.log(friendId, account);
}
// 16、更新朋友背景照片
export function updateFriendBackgroundImg(friendId: string, backgroundImage: string) {
  console.log(friendId, backgroundImage);
}
// 17、更新朋友个性签名
export function updateFriendSignature(friendId: string, signature: string) {
  console.log(friendId, signature);
}
// 18、更新我和朋友所绑定的空间ID
export function updateFriendSpaceId(friendId: string, spaceId: string) {
  console.log(friendId, spaceId);
}
// 19、被同意加入群聊
export function beingAgreeJoinGroupChat(groupChatInfo: GroupChat, memberInfo: GroupChatMember) {
  console.log(groupChatInfo, memberInfo);
}
// 20、被移除群聊
export function beingKickOutGroupChat(groupId: string, memberId: string) {
  console.log(groupId, memberId);
}
// 21、更新群聊头像
export function updateGroupChatAvatar(groupId: string, avatar: string) {
  console.log(groupId, avatar);
}
// 22、更新群聊昵称
export function updateGroupChatNickname(groupId: string, nickname: string) {
  console.log(groupId, nickname);
}
// 23、更新群聊成员数量
export function updateGroupCount(groupId: string, count: number) {
  console.log(groupId, count);
}
// 24、更新群绑定的空间ID
export function updateGroupSpaceId(groupId: string, spaceId: string) {
  console.log(groupId, spaceId);
}
// 25、更新群绑定的空间昵称
export function updateGroupSpaceNickname(groupId: string, spaceId: string, spaceNickname: string) {
  console.log(groupId, spaceId, spaceNickname);
}
// 26、更新群绑定的空间的头像
export function updateGroupSpaceAvatar(groupId: string, spaceId: string, spaceAvatar: string) {
  console.log(groupId, spaceId, spaceAvatar);
}
// 27、有群新成员加入
export function newGroupMemberJoinIn() {}
// 28、群成员头像更新
export function updateGroupMemberAvatar(groupId: string, memberId: string, avatar: string) {
  console.log(groupId, memberId, avatar);
}
// 29、群成员昵称更新
export function updateGroupMemberNickname(groupId: string, memberId: string, nickname: string) {
  console.log(groupId, memberId, nickname);
}
// 30、群成员的群备注更新
export function updateGroupMemberRemark(groupId: string, memberId: string, memberRemark: string) {
  console.log(groupId, memberId, memberRemark);
}
// 31、群成员的角色更新
export function updateGroupMember(groupId: string, memberId: string, role: number) {
  console.log(groupId, memberId, role);
}
// 32、群成员退出
export function GroupMemberOut(groupId: string, memberId: string) {
  console.log(groupId, memberId);
}
// 33、群解散
export function groupBreakOut(groupId: string) {
  console.log(groupId);
}
// 34、被同意加入空间
export function beingAgreeInSpace() {}
// 35、更新空间昵称
export function updateSpaceNickname(spaceId: string, nickname: string) {
  console.log(spaceId, nickname);
}
// 36、更新空间头像
export function updateSpaceAvatar(spaceId: string, avatar: string) {
  console.log(spaceId, avatar);
}
// 37、空间内的角色更新
export function updateSpaceRole() {}
// 38、空间被设为私密空间
export function changeSpaceToPrivate(spaceId: string) {
  console.log(spaceId);
}
// 39、kickout
export function kickOut() {}
