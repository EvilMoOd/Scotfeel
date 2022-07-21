/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-floating-promises */
import mitt from 'mitt';
import { debounce } from 'lodash-es';
import { useFriendStore } from '../store/modules/friendStore';
import { useMomentListStore } from '../store/modules/momemtListStore';
import { useNoticeStore } from '../store/modules/noticeStore';
import { useSessionListStore } from '../store/modules/sessionListStore';
import { useUserStore } from '../store/modules/userStore';
import { insertRecord } from './sql/chatRecord';
import { createUUID } from './utils/uuid';
import { useGroupChatStore } from '../store/modules/groupStore';
import {
  insertGroupMember,
  updateGMAvatar,
  updateGMNickname,
  updateGMRemarkName,
  updateGMRole,
  updateIsExited,
} from './sql/groupChatMember';
import { useSubscribeSpaceStore } from '../store/modules/spaceStore';
import { useNoticeCountStore } from '../store/modules/noticeCountStore';
import { reqImNode } from './api/user';

let reconnectFlag = true; // 是否需要重新连接，用户退出登录后不需要，应用进入后台后不需要
let sendHeartTime: number;
let closeConnTime: number;
let socketTask: any;
export const personMsg = mitt();

export function connectWebSocket(url: string, token: string): void {
  const user = useUserStore();
  const momentStore = useMomentListStore();
  const sessionListStore = useSessionListStore();
  const noticeStore = useNoticeStore();
  const noticeCountStore = useNoticeCountStore();
  const friendStore = useFriendStore();
  const groupStore = useGroupChatStore();
  const spaceStore = useSubscribeSpaceStore();
  connectSocket();
  // 连接socket
  function connectSocket(): void {
    console.log('连接connectSocket');
    // 需带上token，验证用户合法性以及用户id和连接进行绑定
    socketTask = uni.connectSocket({
      url,
      complete: () => {},
    });
    // 监听连接成功
    socketTask.onOpen(() => _onOpen());
    // 监听接收信息
    socketTask.onMessage((data: string | ArrayBuffer) => _onMessage(data));
    // 监听断开
    socketTask.onClose(() => _onClose());
    // 监听错误
    socketTask.onError(() => _onError());
  }
  function _onOpen(): void {
    // 用户上线
    console.log('websocket连接成功');
    // 发送信息告诉服务器将离线消息发送过来
    const messageFromClient = {
      toId: 'fsdf',
      content: token,
      contentType: 0,
      messageType: 5,
      time: 723409723432,
      sequenceId: createUUID(),
    };
    _sendMessage(JSON.stringify(messageFromClient));
  }
  // #region 监听接收消息
  function _onMessage(res: any): void {
    const data = JSON.parse(res.data);
    const { content, messageType, sequenceId } = data;
    console.log(`收到第${messageType}类ws消息，内容是`, content);
    // 回复ACK表示接受到信息
    if (messageType !== 1 && messageType !== 2) {
      _sendMessage(
        JSON.stringify({
          sequenceId,
          messageType: 2,
        })
      );
    }
    if (messageType === 1) {
      // 1、心跳
      clearTimeout(closeConnTime); // 关掉旧的定时任务
      // console.log('关闭检测服务器10秒内是否在线定时任务');
      _closeConn(); // 又开启一个新的定时任务
      // console.log('收到服务器心跳回复pong');
    } else if (messageType === 2) {
      // 2、ACK
    } else if (messageType === 3) {
      // 3、一条个人消息
      personMsg.emit('msg', content);
      insertRecord(
        content.fromId,
        content.fromId,
        content.content,
        content.contentType,
        content.date,
        user.userInfo?.mainId as string
      );
      // 插入会话列表中，防抖
      debounce(() => {
        sessionListStore.newMessage(
          content.fromId,
          content.content,
          content.contentType,
          content.date,
          1
        );
      }, 1000)();
    } else if (messageType === 4) {
      // 4、一条群聊消息
      personMsg.emit('gMsg', content);
      insertRecord(
        content.groupId,
        content.fromId,
        content.content,
        content.contentType,
        content.date,
        user.userInfo?.mainId as string
      );
      debounce(() => {
        sessionListStore.newMessage(
          content.groupId,
          content.content,
          content.contentType,
          content.date,
          2,
          content.fromId
        );
      }, 1000)();
    } else if (messageType === 5) {
      // 5、朋友动态列表
      momentStore.updateMomentList(content.firendId, content.momentId);
    } else if (messageType === 6) {
      // 6、有申请请求
      // TODO 系统app弹窗
    } else if (messageType === 7) {
      // 7、被评论消息
      noticeStore.newInteraction(content, 3);
      noticeCountStore.newInteraction();
    } else if (messageType === 8) {
      // 8、被点赞消息
      noticeStore.newInteraction(content, 1);
      noticeCountStore.newInteraction();
    } else if (messageType === 9) {
      // 9、被订阅消息
      noticeStore.beSubscribe(content);
      noticeCountStore.newInteraction();
    } else if (messageType === 10) {
      // 10、被申请添加朋友
      noticeStore.newApply(content);
      noticeCountStore.newApply();
    } else if (messageType === 11) {
      // 11、被同意添加好友
      friendStore.agreeFriend(content);
      sessionListStore.newMessage(
        content.friend.friendId,
        `你好，我是${content.nickname as string}`,
        0,
        Date.now(),
        1
      );
    } else if (messageType === 12) {
      // 12、被删除好友
      friendStore.beDeleteFriend(content.friendId);
    } else if (messageType === 13) {
      // 13、更新好友头像
      friendStore.updateFriendAvatar(
        content.friendId,
        content.avatar,
        user.userInfo?.mainId as string
      );
    } else if (messageType === 14) {
      // 14、更新朋友昵称
      friendStore.updateFriendNickname(
        content.friendId,
        content.nickname,
        user.userInfo?.mainId as string
      );
    } else if (messageType === 15) {
      // 15、更新朋友account
      friendStore.updateFriendAccount(
        content.friendId,
        content.account,
        user.userInfo?.mainId as string
      );
    } else if (messageType === 16) {
      // 16、更新朋友背景照片
      friendStore.updateFriendBackgroundImg(
        content.friendId,
        content.backgroundImage,
        user.userInfo?.mainId as string
      );
    } else if (messageType === 17) {
      // 17、更新朋友个性签名
      friendStore.updateFriendSignature(
        content.friendId,
        content.signature,
        user.userInfo?.mainId as string
      );
    } else if (messageType === 18) {
      // 18、更新我和朋友所绑定的空间ID
      friendStore.updateFriendSpaceId(
        content.friendId,
        content.spaceId,
        user.userInfo?.mainId as string
      );
    } else if (messageType === 19) {
      // 19、被同意加入群聊
      groupStore.newGroup(
        content.groupChatInfo,
        content.memberInfo,
        user.userInfo?.mainId as string
      );
      console.log(content.groupInfo);
    } else if (messageType === 20) {
      // 20、被移除群聊
      content.memberId === user.userInfo?.mainId
        ? groupStore.removeGroupMemberButMe(content.groupId)
        : groupStore.removeGroupMember(content.groupId, content.memberId);
    } else if (messageType === 21) {
      // 21、更新群聊头像
      groupStore.updateGroupChatAvatar(content.groupId, content.avatar);
    } else if (messageType === 22) {
      // 22、更新群聊昵称
      groupStore.updateGroupChatNickname(content.groupId, content.nickname);
    } else if (messageType === 23) {
      // 23、更新群聊成员数量
      groupStore.updateGroupCount(content.groupId, content.count);
    } else if (messageType === 24) {
      // 24、更新群绑定的空间ID
      groupStore.updateGroupSpaceId(content.groupId, content.spaceId);
    } else if (messageType === 25) {
      // 25、更新群绑定的空间昵称
      groupStore.updateGroupSpaceNickname(content.groupId, content.spaceNickname);
    } else if (messageType === 26) {
      // 26、更新群绑定的空间的头像
      groupStore.updateGroupSpaceAvatar(content.groupId, content.spaceAvatar);
    } else if (messageType === 27) {
      // 27、有群新成员加入
      insertGroupMember(
        content.groupId,
        content.memberId,
        content.nickname,
        content.memberRemark,
        content.avatar,
        content.role,
        0,
        user.userInfo?.mainId as string
      );
    } else if (messageType === 28) {
      // 28、群成员头像更新
      updateGMAvatar(
        content.avatar,
        content.groupId,
        content.memberId,
        user.userInfo?.mainId as string
      );
    } else if (messageType === 29) {
      updateGMNickname(
        content.nickname,
        content.groupId,
        content.memberId,
        user.userInfo?.mainId as string
      );
      // 29、群成员昵称更新
    } else if (messageType === 30) {
      // 30、群成员的群备注更新
      updateGMRemarkName(
        content.memberRemark,
        content.groupId,
        content.memberId,
        content.user.userInfo?.mainId as string
      );
    } else if (messageType === 31) {
      // 31、群成员的角色更新
      updateGMRole(
        content.role,
        content.groupId,
        content.memberId,
        user.userInfo?.mainId as string
      );
    } else if (messageType === 32) {
      // 32、群成员退出
      updateIsExited(1, content.groupId, content.memberId, user.userInfo?.mainId as string);
    } else if (messageType === 33) {
      // 33、群解散
      groupStore.groupBreakOut(content.groupId);
      console.log('群聊解散');
    } else if (messageType === 34) {
      // 34、被同意加入空间
      spaceStore.addSpace(content.Space);
    } else if (messageType === 35) {
      // 35、更新空间昵称
      spaceStore.updateSpaceNickname(content.spaceId, content.nickname);
    } else if (messageType === 36) {
      // 36、更新空间头像
      spaceStore.updateSpaceAvatar(content.spaceId, content.avatar);
    } else if (messageType === 37) {
      // 37、空间内的角色更新
      spaceStore.updateSpaceRole(content.spaceId, content.role);
    } else if (messageType === 38) {
      // 38、空间被设为私密空间
      spaceStore.removeSpace(content.spaceId);
    } else if (messageType === 39) {
      // TODO 39、kickout
    } else if (messageType === 40) {
      // TODO 40、用户二维码更新
    } else if (messageType === 41) {
      // 41、在线获取新群聊信息
      groupStore.newGroup(
        content.groupChatInfo,
        content.memberInfo,
        user.userInfo?.mainId as string
      );
    } else if (messageType === 42) {
      // 42、订阅或加入空间时获取空间信息
      spaceStore.addSpace(content.Space);
    } else if (messageType === 43) {
      // console.log('绑定连接成功');
      _sendHeart(); // 连接服务端成功后开始发送心跳
      _closeConn(); // 并打开心跳回复检测
    } else if (messageType === 44) {
      // 44、动态被转发
      noticeStore.newInteraction(content, 2);
      noticeCountStore.newInteraction();
    } else if (messageType === 45) {
      //  45、加入群聊获得群聊信息
      noticeStore.newApply(content);
      noticeCountStore.newApply();
    } else if (messageType === 46) {
      //  46、加入空间获取空间信息
      noticeStore.newApply(content);
      noticeCountStore.newApply();
    }
  }
  // #endregion

  // 监听关闭
  function _onClose(): void {
    // 用户下线
    // console.log('监听到连接关闭');
    // console.log('关闭心跳任务');
    clearInterval(sendHeartTime); // 关掉心跳任务
    // console.log('关闭检测服务器10秒内是否在线定时任务');
    clearTimeout(closeConnTime); // 定时任务
    socketTask = null;
    // console.log('socket连接已关闭');
    _reconnect();
  }
  // 监听连接错误
  function _onError(): void {
    // 用户下线
    console.log('监听到连接错误');
  }

  // 5s发送一个心跳
  function _sendHeart(): void {
    const messageFromClient = {
      toId: 'ping',
      content: '..',
      contentType: 0,
      messageType: 1,
      time: Date.now(),
      sequenceId: createUUID(),
    };
    sendHeartTime = setInterval(() => {
      _sendMessage(JSON.stringify(messageFromClient));
      // console.log('客户端发送心跳ping');
    }, 5000);
  }
  // 断线重连
  function _reconnect(): void {
    // console.log('进入reconnect准备重新连接');
    if (reconnectFlag) {
      // console.log('重连----------------------');
      setTimeout(() => {
        connectScotfeel(token);
      }, 3000);
    }
  }
}
// 发送消息
export function _sendMessage(message: any): void {
  socketTask.send({
    data: message,
    // success() {
    //   console.log(message);
    // },
    // fail() {
    //   console.log(message);
    // },
  });
}
// 退出登录关闭websocket
export function logoutCloseWebsocket(): void {
  // console.log('正在断开连接，用户退出登录...');
  reconnectFlag = false; // 不需要重连
  _close();
}
// 10秒后如未收到服务器的回复心跳则断开
export function _closeConn(): void {
  // console.log('开启检测服务器10秒内是否在线定时任务');
  closeConnTime = setTimeout(() => {
    _close();
  }, 10000);
}
// 关闭连接，不需要重连
export function _close(): void {
  // console.log('正在手动断开连接...');
  socketTask.close({
    success() {
      // console.log('断开success');
    },
    fail() {
      // console.log('断开fail');
    },
  });
  clearInterval(sendHeartTime); // 关掉心跳任务
  clearTimeout(closeConnTime); // 关掉定时任务
  socketTask = null;
}

export async function connectScotfeel(token: string) {
  try {
    const im = await reqImNode();
    connectWebSocket(`wss://www.scotfeel.com/wss/${im.ip}${im.port}`, token);
  } catch (error) {
    connectScotfeel(token);
  }
}
