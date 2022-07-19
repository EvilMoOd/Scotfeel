import { defineStore } from 'pinia';
import type { SubscribedSpaceInfo } from '../../server/api/space';
import type { SubscribedSpace, User } from '../../server/api/user';
import { deleteSpace, insertSpace, selectAllSpaces } from '../../server/sql/subscribedSpace';

const user: User = uni.getStorageSync('user');
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
        insertSpace(s.spaceId, s.nickname, s.avatar, s.role, user.userInfo?.mainId as string);
      }
    },
    getSpace(spaceId: string) {
      return this.subscribeSpace.find((item) => {
        return spaceId === item.spaceId;
      });
    },
    addSpace(newSpace: SubscribedSpaceInfo) {
      this.subscribeSpace.push(newSpace);
      insertSpace(
        newSpace.spaceId,
        newSpace.nickname,
        newSpace.avatar,
        newSpace.role,
        user.userInfo?.mainId as string
      );
    },
    removeSpace(spaceId: string) {
      const index = this.subscribeSpace.findIndex((item) => item.spaceId === spaceId);
      this.subscribeSpace.splice(index, 1);
      deleteSpace(spaceId, user.userInfo?.mainId as string);
    },
    updateSpaceAvatar(spaceId: string, avatar: string) {
      const index = this.subscribeSpace.findIndex((item) => item.spaceId === spaceId);
      this.subscribeSpace[index].avatar = avatar;
    },
    updateSpaceNickname(spaceId: string, nickname: string) {
      const index = this.subscribeSpace.findIndex((item) => item.spaceId === spaceId);
      this.subscribeSpace[index].nickname = nickname;
    },
    updateSpaceRole(spaceId: string, role: 0 | 1 | 2 | 3 | 4) {
      const index = this.subscribeSpace.findIndex((item) => item.spaceId === spaceId);
      this.subscribeSpace[index].role = role;
    },
  },
});
