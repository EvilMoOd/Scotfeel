import { defineStore } from 'pinia';
import type { MomentInfo } from '../../server/api/moment';
import { reqAddLike, reqCancelLike, reqAllFriendsMoment, reqMoment } from '../../server/api/moment';

export interface Moment {
  momentInfo: MomentInfo[];
}
export const useMomentStore = defineStore('moment', {
  state: (): Moment => ({
    momentInfo: [],
  }),
  actions: {
    async init(params: { friendId?: string; all?: string }) {
      if (params.all !== undefined) {
        // TODO 最后一条moment的id
        const data = await reqAllFriendsMoment(1652471824095);
        this.momentInfo.unshift(...data);
      } else {
        const data = await reqMoment(params.friendId as string, this.momentInfo[0].createTime);
        this.momentInfo.unshift(...data);
      }
    },
    async like(index: number) {
      await reqAddLike({
        momentId: this.momentInfo[index]._id,
        posterId: this.momentInfo[index].posterInfo[0]._id,
      });
      this.momentInfo[index].likeStatus = 1;
    },
    async cancelLike(index: number) {
      await reqCancelLike(this.momentInfo[index]._id);
      this.momentInfo[index].likeStatus = 0;
    },
  },
  getters: {},
});
