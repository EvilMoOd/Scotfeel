import { defineStore } from 'pinia';
import type { MomentInfo } from '../../server/api/moment';
import { reqMoment } from '../../server/api/moment';

export interface Moment {
  momentInfo: MomentInfo[];
}
export const useMomentStore = defineStore('moment', {
  state: (): Moment => ({
    momentInfo: [
      {
        _id: '3795c98fbffa4f1eb3d7e627fc542805',
        posterInfo: [
          {
            _id: '0d94b112969e4c0abfbd94464795a9a2',
            nickname: '用户02',
            avatar: '5111c3226aa49775fa6d0e6087d85359',
          },
        ],
        friendRemark: [
          {
            remarkName: 'test',
          },
        ],
        content: '今晚的月亮很亮',
        interactFlag: 1,
        likedCount: 0,
        likeStatus: 0,
        commentedCount: 2,
        photos: ['61b0b7cc5af7a0db2c245f213bfa637b'],
        comments: [
          {
            momentId: '3795c98fbffa4f1eb3d7e627fc542805',
            content: '评论动态',
            commentedUserInfo: [
              {
                _id: '0d94b112969e4c0abfbd94464795a9a2',
                nickname: '用户02',
                avatar: '5111c3226aa49775fa6d0e6087d85359',
              },
            ],
            commentedUserRemark: [
              {
                remarkName: 'test',
              },
            ],
            commenterInfo: [
              {
                _id: '4c157fb2bffb4e48b8068dead4d379c7',
                nickname: '用户0176',
                avatar: '5111c3226aa49775fa6d0e6087d85359',
              },
            ],
            commenterRemark: [],
            commentType: 0,
            createTime: 1653076750890,
          },
          {
            momentId: '3795c98fbffa4f1eb3d7e627fc542805',
            content: '回复评论',
            commentedUserInfo: [
              {
                _id: '0d94b112969e4c0abfbd94464795a9a2',
                nickname: '用户02',
                avatar: '5111c3226aa49775fa6d0e6087d85359',
              },
            ],
            commentedUserRemark: [
              {
                remarkName: 'test',
              },
            ],
            commenterInfo: [
              {
                _id: '4c157fb2bffb4e48b8068dead4d379c7',
                nickname: '用户0176',
                avatar: '5111c3226aa49775fa6d0e6087d85359',
              },
            ],
            commenterRemark: [],
            commentType: 1,
            createTime: 1653076796455,
          },
        ],
        createTime: 1652980849034,
        repostedMomentId: null,
        repostedMomentSpaceId: null,
        repostedMomentPosterUserInfo: [],
        repostedMomentPosterSpaceInfo: [],
        repostedMomentPosterType: 0,
        isReposted: 0,
        srepostedMomentInfo: [],
      },
    ],
  }),
  actions: {
    async getMoment(friendId: string) {
      const data = await reqMoment(friendId, this.momentInfo[0].createTime);
      this.momentInfo.push(...data);
    },
  },
  getters: {},
});
