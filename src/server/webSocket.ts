import { groupChatMessage, personChatMessage } from './api/socketType';

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
    _sendMessage('isOpen');
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
        content.type
      );
    } else if (type === 5) {
    } else if (type === 6) {
    } else if (type === 7) {
    } else if (type === 8) {
    } else if (type === 9) {
    } else if (type === 10) {
    } else if (type === 11) {
    } else if (type === 12) {
    } else if (type === 13) {
    } else if (type === 14) {
    } else if (type === 15) {
    } else if (type === 16) {
    } else if (type === 17) {
    } else if (type === 18) {
    } else if (type === 19) {
    } else if (type === 20) {
    } else if (type === 21) {
    } else if (type === 22) {
    } else if (type === 23) {
    } else if (type === 24) {
    } else if (type === 25) {
    } else if (type === 26) {
    } else if (type === 27) {
    } else if (type === 28) {
    } else if (type === 29) {
    } else if (type === 30) {
    } else if (type === 31) {
    } else if (type === 32) {
    } else if (type === 33) {
    } else if (type === 34) {
    } else if (type === 35) {
    } else if (type === 36) {
    } else if (type === 37) {
    } else if (type === 38) {
    } else if (type === 39) {
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
    sendHeartTime = setInterval(function () {
      _sendMessage('ping');
      console.log('客户端发送心跳ping');
    }, 5000);
  }
  //服务端返回的websocket类型
  function _sendMessage(message: string) {
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
  reconnectFlag = false; //不需要重连
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
