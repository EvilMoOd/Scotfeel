import {
  applyMessage,
  beingAgreeByFriend,
  beingAgreeInSpace,
  beingAgreeJoinGroupChat,
  beingDeleteByFriend,
  beingFriendAdd,
  beingKickOutGroupChat,
  beingSubscribe,
  changeSpaceToPrivate,
  commentMessage,
  friendsActiveList,
  groupBreakOut,
  groupChatMessage,
  GroupMemberOut,
  kickOut,
  LikeMessage,
  newGroupMemberJoinIn,
  personChatMessage,
  updateFriendAccount,
  updateFriendAvatar,
  updateFriendBackgroundImg,
  updateFriendNickname,
  updateFriendSignature,
  updateFriendSpaceId,
  updateGroupChatAvatar,
  updateGroupChatNickname,
  updateGroupCount,
  updateGroupMember,
  updateGroupMemberAvatar,
  updateGroupMemberNickname,
  updateGroupMemberRemark,
  updateGroupSpaceAvatar,
  updateGroupSpaceId,
  updateGroupSpaceNickname,
  updateSpaceAvatar,
  updateSpaceNickname,
  updateSpaceRole,
} from './socketType';
import { createUUID } from './utils/uuid';

let reconnectFlag = true; //是否需要重新连接，用户退出登录后不需要，应用进入后台后不需要
let sendHeartTime: any;
let closeConnTime: any;
let socketTask: any;
export function connectWebSocket(url: string) {
  connectSocket();
  // 连接socket
  function connectSocket() {
    console.log('连接connectSocket');
    //需带上token，验证用户合法性以及用户id和连接进行绑定
    socketTask = uni.connectSocket({
      url: url,
      complete: () => {},
    });
    // 监听连接成功
    socketTask.onOpen(() => _onOpen());
    // 监听接收信息
    socketTask.onMessage((data: String | ArrayBuffer) => _onMessage(data));
    // 监听断开
    socketTask.onClose(() => _onClose());
    // 监听错误
    socketTask.onError(() => _onError());
  }
  function _onOpen() {
    // 用户上线
    console.log('websocket连接成功');
    //发送信息告诉服务器将离线消息发送过来
    let messageFromClient = {
      toId: 'fsdf',
      content:
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpblVzZXIiOnsibWFpbklkIjoiMGQ5NGIxMTI5NjllNGMwYWJmYmQ5NDQ2NDc5NWE5YTIiLCJyb2xlcyI6WyJjb21tb25fdXNlciJdLCJlbmFibGVkIjpmYWxzZSwicGFzc3dvcmQiOm51bGwsInVzZXJuYW1lIjpudWxsLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiY29tbW9uX3VzZXIifV0sImFjY291bnROb25FeHBpcmVkIjpmYWxzZSwiYWNjb3VudE5vbkxvY2tlZCI6ZmFsc2UsImNyZWRlbnRpYWxzTm9uRXhwaXJlZCI6ZmFsc2V9LCJleHAiOjE2NTc3MzgwNzR9.RpKE2Cgq13z_Ml70yJEQi9Jb96XYSumWt6vawhPVnUzv0H8_JPoloPW9goDrTncEt7kZlShlv6KUrZyp9NeQrw',
      contentType: 0,
      messageType: 5,
      time: 723409723432,
      sequenceId: createUUID(),
    };
    _sendMessage(messageFromClient);
    _sendHeart(); //连接服务端成功后开始发送心跳
    _closeConn(); //并打开心跳回复检测
  }
  // 监听接收消息
  function _onMessage(res: any) {
    const { data } = res;
    console.log(data);
    const { content, type } = data;
    if (type === 1) {
      HeartPong();
    } else if (type === 2) {
      Ack();
    } else if (type === 3) {
      personChatMessage(content.fromId, content.content, content.contentType, content.date);
    } else if (type === 4) {
      groupChatMessage(
        content.groupId,
        content.fromId,
        content.content,
        content.contentType,
        content.date
      );
    } else if (type === 5) {
      friendsActiveList(content.friendId);
    } else if (type === 6) {
      applyMessage();
    } else if (type === 7) {
      commentMessage();
    } else if (type === 8) {
      LikeMessage();
    } else if (type === 9) {
      beingSubscribe();
    } else if (type === 10) {
      beingFriendAdd();
    } else if (type === 11) {
      beingAgreeByFriend();
    } else if (type === 12) {
      beingDeleteByFriend();
    } else if (type === 13) {
      updateFriendAvatar();
    } else if (type === 14) {
      updateFriendNickname();
    } else if (type === 15) {
      updateFriendAccount();
    } else if (type === 16) {
      updateFriendBackgroundImg;
    } else if (type === 17) {
      updateFriendSignature();
    } else if (type === 18) {
      updateFriendSpaceId();
    } else if (type === 19) {
      beingAgreeJoinGroupChat();
    } else if (type === 20) {
      beingKickOutGroupChat();
    } else if (type === 21) {
      updateGroupChatAvatar();
    } else if (type === 22) {
      updateGroupChatNickname();
    } else if (type === 23) {
      updateGroupCount();
    } else if (type === 24) {
      updateGroupSpaceId();
    } else if (type === 25) {
      updateGroupSpaceNickname();
    } else if (type === 26) {
      updateGroupSpaceAvatar();
    } else if (type === 27) {
      newGroupMemberJoinIn();
    } else if (type === 28) {
      updateGroupMemberAvatar();
    } else if (type === 29) {
      updateGroupMemberNickname();
    } else if (type === 30) {
      updateGroupMemberRemark();
    } else if (type === 31) {
      updateGroupMember();
    } else if (type === 32) {
      GroupMemberOut();
    } else if (type === 33) {
      groupBreakOut();
    } else if (type === 34) {
      beingAgreeInSpace();
    } else if (type === 35) {
      updateSpaceNickname();
    } else if (type === 36) {
      updateSpaceAvatar();
    } else if (type === 37) {
      updateSpaceRole();
    } else if (type === 38) {
      changeSpaceToPrivate();
    } else if (type === 39) {
      kickOut();
    } else if (type === 40) {
    }
  }
  // 监听关闭
  function _onClose() {
    // 用户下线
    console.log('监听到连接关闭');
    console.log('关闭心跳任务');
    clearInterval(sendHeartTime); //关掉心跳任务
    console.log('关闭检测服务器10秒内是否在线定时任务');
    clearTimeout(closeConnTime); //定时任务
    socketTask = null;
    console.log('socket连接已关闭');
    _reconnect();
  }
  // 监听连接错误
  function _onError() {
    // 用户下线
    console.log('监听到连接错误');
  }

  //5s发送一个心跳
  function _sendHeart() {
    let messageFromClient02 = {
      toId: 'fsdf',
      content:
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpblVzZXIiOnsibWFpbklkIjoiMGQ5NGIxMTI5NjllNGMwYWJmYmQ5NDQ2NDc5NWE5YTIiLCJyb2xlcyI6WyJjb21tb25fdXNlciJdLCJlbmFibGVkIjpmYWxzZSwicGFzc3dvcmQiOm51bGwsInVzZXJuYW1lIjpudWxsLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiY29tbW9uX3VzZXIifV0sImFjY291bnROb25FeHBpcmVkIjpmYWxzZSwiYWNjb3VudE5vbkxvY2tlZCI6ZmFsc2UsImNyZWRlbnRpYWxzTm9uRXhwaXJlZCI6ZmFsc2V9LCJleHAiOjE2NTc3MzgwNzR9.RpKE2Cgq13z_Ml70yJEQi9Jb96XYSumWt6vawhPVnUzv0H8_JPoloPW9goDrTncEt7kZlShlv6KUrZyp9NeQrw',
      contentType: 0,
      messageType: 1,
      time: 723409723432,
      sequenceId: createUUID(),
    };
    sendHeartTime = setInterval(function () {
      _sendMessage(JSON.stringify(messageFromClient02));
      console.log('客户端发送心跳ping');
    }, 5000);
  }
  //服务端返回的websocket类型
  function _sendMessage(message: any) {
    socketTask.send({
      data: message,
      success() {
        console.log('发送信息:' + message + '  success');
      },
      fail() {
        console.log('发送信息' + message + '  fail');
      },
    });
  }
  // 断线重连
  function _reconnect() {
    console.log('进入reconnect准备重新连接');
    if (reconnectFlag) {
      setTimeout(function () {
        connectSocket();
      }, 3000);
    }
  }
}
//退出登录关闭websocket
export function logoutCloseWebsocket() {
  console.log('正在断开连接，用户退出登录...');
  reconnectFlag = false; //不需要重连
  _close();
}
//10秒后如未收到服务器的回复心跳则断开
export function _closeConn() {
  console.log('开启检测服务器10秒内是否在线定时任务');
  closeConnTime = setTimeout(function () {
    _close();
  }, 10000);
}
//关闭连接，不需要重连
function _close() {
  console.log('正在手动断开连接...');
  socketTask.close({
    success() {
      console.log('断开success');
    },
    fail() {
      console.log('断开fail');
    },
  });
  clearInterval(sendHeartTime); //关掉心跳任务
  clearTimeout(closeConnTime); //关掉定时任务
  socketTask = null;
}

// 1、心跳
function HeartPong() {
  clearTimeout(closeConnTime); //关掉旧的定时任务
  console.log('关闭检测服务器10秒内是否在线定时任务');
  _closeConn(); //又开启一个新的定时任务
  console.log('收到服务器心跳回复pong');
}
//2、ACK
function Ack() {}
