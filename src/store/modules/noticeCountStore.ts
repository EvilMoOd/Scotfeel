import { defineStore } from 'pinia';

const noticeCount = uni.getStorageSync('noticeCount');

export const useNoticeCountStore = defineStore('noticeCount', {
  state: () => ({
    applyCount: noticeCount.applyCount ?? 0,
    interactionCount: noticeCount.interactionCount ?? 0,
    subscribeCount: noticeCount.subscribeCount ?? 0,
  }),
  actions: {
    // 被干嘛
    async newApply() {
      this.applyCount += 1;
    },
    async newInteraction() {
      this.interactionCount += 1;
    },
    async newSubscribe() {
      this.subscribeCount += 1;
    },
    // 已读
    messageRead() {
      this.interactionCount = 0;
      this.subscribeCount = 0;
    },
    applyRead() {
      this.applyCount = 0;
    },
  },
  getters: {
    totalMessage(state) {
      return state.applyCount + state.interactionCount + state.subscribeCount;
    },
  },
});
