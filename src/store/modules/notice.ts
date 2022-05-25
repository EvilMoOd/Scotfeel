import { defineStore } from 'pinia';
export const useNoticeStore = defineStore('notice', {
  state: () => ({
    applyMessage: 0,
    commentMessage: 0,
    likeMessage: 0,
    subscribeMessage: 0,
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
