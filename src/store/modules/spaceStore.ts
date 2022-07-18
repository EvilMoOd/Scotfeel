import { defineStore } from 'pinia';
import type { SubscribedSpaceInfo } from '../../server/api/space';
import type { SubscribedSpace } from '../../server/api/user';
import { insert, selectAllSpaces } from '../../server/sql/subscribedSpace';

const user = uni.getStorageSync('user');
export const useSubscribeSpaceStore = defineStore('subscribeDSpace', {
  state: () => ({
    subscribeSpace: [] as SubscribedSpaceInfo[],
  }),
  actions: {
    async init(belongToId: string) {
      this.subscribeSpace = await selectAllSpaces(belongToId);
    },
    async loginInit(subscribedSpace: SubscribedSpace[]) {
      this.subscribeSpace = subscribedSpace;
      // eslint-disable-next-line no-restricted-syntax
      for (const s of subscribedSpace) {
        insert(s.spaceId, s.nickname, s.avatar, s.role, user.userInfo.mainId);
      }
    },
    getSpace(spaceId: string) {
      return this.subscribeSpace.find((item) => {
        return spaceId === item.spaceId;
      });
    },
  },
});
