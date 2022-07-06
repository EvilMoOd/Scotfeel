import { defineStore } from 'pinia';
import type {
  ApplyNotice,
  ForwardNotice,
  LikeNotice,
  SubscribeNotice,
} from '../../server/api/notice';
import {
  reqSubscribeNotice,
  reqForwardNotice,
  reqLikeNotice,
  reqCommentsNotice,
  reqApplyNotice,
} from '../../server/api/notice';

const notice = uni.getStorageSync('notice');

export const useNoticeStore = defineStore('notice', {
  state: () => ({
    applyMessage: notice.applyMessage ?? 0,
    applyList: notice.applyList ?? ([] as ApplyNotice[]), // 申请列表
    commentMessage: notice.commentMessage ?? 0,
    commentList: [
      {
        momentId: 3,
        momentType: 0,
        content: 'gitGji',
        commenterInfo: [
          {
            _id: '0d94b112969e4c0abfbd94464795a9a2',
            nickname: '用户02',
            avatar: 'https://p.qqan.com/up/2021-2/16137992359659254.jpg',
          },
        ],
        commenterFriendRemark: [],
        userMomentInfo: [],
        spaceMomentInfo: [],
        commentType: 0,
        createTime: 1653833113530,
      },
      {
        momentId: 3,
        momentType: 0,
        content: 'gitGji',
        commenterInfo: [
          {
            _id: '0d94b112969e4c0abfbd94464795a9a2',
            nickname: '用户02',
            avatar: 'https://p.qqan.com/up/2021-2/16137992359659254.jpg',
          },
        ],
        commenterFriendRemark: [],
        userMomentInfo: [],
        spaceMomentInfo: [],
        commentType: 1,
        createTime: 1653833141007,
      },
      {
        momentId: 2,
        momentType: 1,
        content: 'b8SzIT',
        commenterInfo: [
          {
            _id: '0d94b112969e4c0abfbd94464795a9a2',
            nickname: '用户02',
            avatar: '5111c3226aa49775fa6d0e6087d85359',
          },
        ],
        commenterFriendRemark: [],
        userMomentInfo: [],
        spaceMomentInfo: [
          {
            content: 'EeYB',
            photos: [
              'http://dummyimage.com/400x400',
              'http://dummyimage.com/400x400',
              'http://dummyimage.com/400x400',
              'http://dummyimage.com/400x400',
              'http://dummyimage.com/400x400',
            ],
          },
        ],
        commentType: 0,
        createTime: 1653908167429,
      },
      {
        momentId: 2,
        momentType: 1,
        content: 'b8SzIT',
        commenterInfo: [
          {
            _id: '0d94b112969e4c0abfbd94464795a9a2',
            nickname: '用户02',
            avatar: '5111c3226aa49775fa6d0e6087d85359',
          },
        ],
        commenterFriendRemark: [],
        userMomentInfo: [],
        spaceMomentInfo: [
          {
            content: 'EeYB',
            photos: [
              'http://dummyimage.com/400x400',
              'http://dummyimage.com/400x400',
              'http://dummyimage.com/400x400',
              'http://dummyimage.com/400x400',
              'http://dummyimage.com/400x400',
            ],
          },
        ],
        commentType: 1,
        createTime: 1653908215942,
      },
      {
        momentId: 2,
        momentType: 1,
        content: 'b8SzIT',
        commenterInfo: [
          {
            _id: '0d94b112969e4c0abfbd94464795a9a2',
            nickname: '用户02',
            avatar: 'https://p.qqan.com/up/2021-2/16137992359659254.jpg',
          },
        ],
        commenterFriendRemark: [],
        userMomentInfo: [],
        spaceMomentInfo: [
          {
            content: 'EeYB',
            photos: [
              'https://p.qqan.com/up/2021-2/16137992359659254.jpg',
              'http://dummyimage.com/400x400',
              'http://dummyimage.com/400x400',
              'http://dummyimage.com/400x400',
              'http://dummyimage.com/400x400',
            ],
          },
        ],
        commentType: 1,
        createTime: 1653909600987,
      },
    ], // 评论列表
    likeMessage: notice.likeMessage ?? 0,
    likeList: notice.likeList ?? ([] as LikeNotice[]), // 点赞列表
    forwardMessage: notice.forwardMessage ?? 0,
    forwardList: notice.forwardList ?? ([] as ForwardNotice[]), // 转发列表
    subscribeMessage: notice.subscribeMessage ?? 0,
    subscribeList: notice.subscribeList ?? ([] as SubscribeNotice[]), // 订阅列表
  }),
  actions: {
    // 被干嘛
    async beApply() {
      const data = await reqApplyNotice(this.applyList.length);
      this.applyList.unshift(...data);
      this.applyMessage += 1;
    },
    async beComment() {
      const data = await reqCommentsNotice(this.commentList[0].createTime);
      this.commentList.unshift(...data);
      this.commentMessage += 1;
    },
    async beLike() {
      const data = await reqLikeNotice(this.likeList[0].createTime);
      this.likeList.unshift(...data);
      this.likeMessage += 1;
    },
    async beForward() {
      const data = await reqForwardNotice(this.forwardList[0].createTime);
      this.forwardList.unshift(...data);
      this.forwardMessage += 1;
    },
    async beSubscribe() {
      const data = await reqSubscribeNotice(0);
      this.subscribeList.unshift(...data);
      this.subscribeMessage += 1;
    },
    // 已读
    messageRead() {
      this.commentMessage = 0;
      this.likeMessage = 0;
      this.subscribeMessage = 0;
      this.forwardMessage = 0;
    },
    applyRead() {
      this.applyMessage = 0;
    },
    // 获取申请
    async getApplyInfo() {
      this.applyList = await reqApplyNotice(this.applyList.length);
    },
    async getMessageInfo() {
      this.applyList = await reqApplyNotice(this.applyList.length);
    },
    // 处理申请
    dealApply(index: number) {
      this.applyList.splice(index, 1);
    },
  },
  getters: {
    totalMessage(state) {
      return state.commentMessage + state.likeMessage + state.subscribeMessage;
    },
  },
});
