import { defineStore } from 'pinia';
import type { SubscribedSpaceInfo } from '../../server/api/space';
import { reqSubscribedSpace } from '../../server/api/space';

// const user = uni.getStorageSync('user');
export const useSubscribeSpaceStore = defineStore('subscribeDSpace', {
  state: () => ({
    subscribeSpace: [] as SubscribedSpaceInfo[],
  }),
  actions: {
    async init(userId: string) {
      const data = await reqSubscribedSpace(userId);
      this.subscribeSpace.push(...data);
    },
    getSpace(spaceId: string) {
      return this.subscribeSpace.find((item) => {
        return spaceId === item.spaceId;
      });
    },
  },
});
