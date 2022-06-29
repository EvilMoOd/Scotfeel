import mitt from 'mitt';
import { defineStore } from 'pinia';
import type { MomentInfo } from '../../server/api/moment';
import {
  reqDeleteMoment,
  reqAddLike,
  reqCancelLike,
  reqAllFriendsMoment,
  reqMoment,
} from '../../server/api/moment';

export interface Moment {
  momentInfo: MomentInfo[];
}
export const noMore = mitt();
export const useMomentStore = defineStore('moment', {
  state: (): Moment => ({
    momentInfo: [],
  }),
  actions: {
    async init(params: { friendId?: string; all?: string }) {
      if (params.all !== undefined) {
        // TODO 最后一条moment的id
        const data = await reqAllFriendsMoment(
          this.momentInfo.length === 0
            ? 9223372036854
            : this.momentInfo[this.momentInfo.length - 1]._id
        );
        const newMomentInfo = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const newMoment of data) {
          if (this.momentInfo.find((item) => item._id === newMoment._id) == null) {
            newMomentInfo.push(newMoment);
          }
        }
        this.momentInfo.unshift(...newMomentInfo);
      } else {
        const data = await reqMoment(params.friendId as string, this.momentInfo[0].createTime);
        this.momentInfo.unshift(...data);
      }
    },
    async getNewMoment() {
      const data = await reqAllFriendsMoment(this.momentInfo[this.momentInfo.length - 1]._id);
      if (data.length === 0) {
        noMore.emit('noMore', 'noMore');
      } else {
        noMore.emit('noMore', 'more');
        this.momentInfo.push(...data);
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
    async deleteMoment(momentId: number, index: number) {
      await reqDeleteMoment(momentId);
      this.momentInfo.splice(index, 1);
    },
  },
  getters: {},
});
