import { defineStore } from 'pinia';
import type {
  ApplyNotice,
  CommenterInfo,
  LikeNotice,
  SubscribeNotice,
} from '../../server/api/notice';
import { reqApplyNotice } from '../../server/api/notice';

interface Notice {
  applyMessage: number;
  applyList: ApplyNotice[]; // 申请列表
  commentMessage: number;
  commentList: CommenterInfo[]; // 评论列表
  likeMessage: number;
  likeList: LikeNotice[]; // 点赞列表
  subscribeMessage: number;
  subscribeList: SubscribeNotice[]; // 订阅列表
}

export const useNoticeStore = defineStore('notice', {
  // TODO持久化存储
  state: (): Notice => ({
    applyMessage: 0,
    applyList: [], // 申请列表
    commentMessage: 0,
    commentList: [], // 评论列表
    likeMessage: 0,
    likeList: [], // 点赞列表
    subscribeMessage: 0,
    subscribeList: [], // 订阅列表
  }),
  actions: {
    beApply() {
      this.applyMessage++;
    },
    beComment() {
      this.commentMessage++;
    },
    beLike() {
      this.likeMessage++;
    },
    beSubscribe() {
      this.subscribeMessage++;
    },
    async getNoticeInfo() {
      this.applyList = await reqApplyNotice(this.applyList.length);
    },
  },
  getters: {
    totalMessage(state) {
      return state.commentMessage + state.likeMessage + state.subscribeMessage;
    },
  },
});
