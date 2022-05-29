import { defineStore } from 'pinia';
export const useNoticeStore = defineStore('notice', {
  state: () => ({
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
  },
  getters: {
    totalMessage(state) {
      return state.applyMessage + state.commentMessage + state.likeMessage + state.subscribeMessage;
    },
  },
});
