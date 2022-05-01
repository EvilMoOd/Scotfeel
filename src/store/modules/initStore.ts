import webSocket from '../../server/webSocket';
import { defineStore } from 'Pinia';
import {
  getApplyCount,
  getNoticeCount,
  getSessionList,
  getFriendListLetterSort,
  getGroupListLetterSort,
  getApplyList,
  getCommonList,
  getLikeList,
  getSubscribeList,
  getSubscribeSpaceList,
  getMomentList,
} from '../../util/init';

interface Init {
  url: string;
  systemInfo: any; //设备信息
  webSocket: any;
  currentChatId: null; //当前聊天页面的ID
  applyCount: number; //申请未处理数
  noticeCount: number; //消息未读数
  sessionList: object[]; //会话列表
  friendListLetterSort: object[]; //按字母排序的朋友列表
  groupListLetterSort: object[]; //按字母排序的群聊列表
  applyList: object[]; //申请列表
  commomList: object[]; //评论列表
  likeList: object[]; //点赞列表
  subscribList: object[]; //订阅列表
  subscribSpaceList: object[]; //订阅空间列表
  momentList: object[]; //呈现在首页的朋友动态列表
}

export const useInitStore = defineStore('init', {
  state: (): Init => ({
    url: 'ws://localhost:8088',
    webSocket: null,
    systemInfo: [], //设备信息
    currentChatId: null, //当前聊天页面的ID
    applyCount: 0, //申请未处理数
    noticeCount: 0, //消息未读数
    sessionList: [], //会话列表
    friendListLetterSort: [], //按字母排序的朋友列表
    groupListLetterSort: [], //按字母排序的群聊列表
    applyList: [], //申请列表
    commomList: [], //评论列表
    likeList: [], //点赞列表
    subscribList: [], //订阅列表
    subscribSpaceList: [], //订阅空间列表
    momentList: [], //呈现在首页的朋友动态列表
  }),
  actions: {
    init() {
      //存到状态中
      //存储到本地存储中
      this.webSocket = new webSocket({ url: this.url });
      //携带token信息进行连接
      // uni.connectSocket({
      // 	url: this.wsUrl + '?type=index' + '&token=' + uni.getStorageSync('token')
      // });
      this.systemInfo = uni.getSystemInfoSync();
      //获取申请未处理数
      getApplyCount();
      //消息未读数
      getNoticeCount();
      //会话列表
      getSessionList();
      //按字母排序的朋友列表
      getFriendListLetterSort();
      //按字母排序的群聊列表
      getGroupListLetterSort();
      //申请列表
      getApplyList();
      //评论列表
      getCommonList();
      //点赞列表
      getLikeList();
      //订阅列表
      getSubscribeList();
      //订阅空间列表
      getSubscribeSpaceList();
      //呈现在首页的朋友动态列表
      getMomentList();
    },
    logout() {
      this.webSocket.logoutClose(); //断开后不再重连
      uni.setStorageSync('userInfo', false);
      (this.webSocket = null),
        (this.currentChatId = null), //当前聊天页面的ID
        (this.applyCount = 0), //申请未处理数
        (this.noticeCount = 0), //消息未读数
        (this.sessionList = []), //会话列表
        (this.friendListLetterSort = []), //按字母排序的朋友列表
        (this.groupListLetterSort = []), //按字母排序的群聊列表
        (this.applyList = []), //申请列表
        (this.commomList = []), //评论列表
        (this.likeList = []), //点赞列表
        (this.subscribList = []), //订阅列表
        (this.subscribSpaceList = []), //订阅空间列表
        (this.momentList = []), //呈现在首页的朋友动态列表
        // 跳转到登录页
        uni.reLaunch({
          url: '/pages/index/login',
        });
    },
  },
});
