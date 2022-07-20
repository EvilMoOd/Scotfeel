/* eslint-disable no-underscore-dangle */
import { defineStore } from 'pinia';
import type { User } from '../../server/api/user';
import {
  insertInteractionNotice,
  selectInteractionNotice,
} from '../../server/sql/interactionNotice';
import { insertApplyNotice, selectApplyNotice } from '../../server/sql/applyNotice';
import type { NoticeApply, InteractionNotice, NewSubscribe } from '../../server/webSocketType';
import { useFriendStore } from './friendStore';
import { insertSubscribeNotice, selectSubscribeNotice } from '../../server/sql/subscribeNotice';

const user: User = uni.getStorageSync('user');

export const useNoticeStore = defineStore('notice', {
  state: () => ({
    applyList: [
      {
        applyId: '16',
        applicantId: '79',
        content: 'nostrud minim commodo aliqua',
        applicantSpaceId: '54',
        userAvatar: 'http://dummyimage.com/100x100',
        userNickname: '石洋',
        applyType: 32,
        status: 13,
        updateTime: 1111111111,
      },
      {
        applyId: '47',
        applicantId: '31',
        content: 'culpa minim dolor Ut',
        applicantSpaceId: '79',
        groupId: '73',
        userAvatar: 'http://dummyimage.com/100x100',
        userNickname: '苏磊',
        groupChatNickname: '董勇',
        applyType: 70,
        status: 48,
        updateTime: 1111111111,
      },
      {
        applyId: '33',
        applicantId: '92',
        content: 'qui officia in',
        spaceApplicantType: 76,
        spaceId: '26',
        applicantSpaceId: '33',
        photo: 'http://dummyimage.com/400x400',
        studentFlag: 17,
        studentNumber: '12',
        graduateTime: 621171550476,
        userAvatar: 'http://dummyimage.com/100x100',
        userNickname: '余杰',
        spaceNickname: '刘静',
        applicantSpaceAvatar: 'http://dummyimage.com/100x100',
        applicantSpaceNickname: '姚洋',
        applyType: 93,
        status: 18,
        updateTime: 1111111111,
      },
    ] as NoticeApply[], // 申请列表
    interactionList: [] as InteractionNotice[], // 转发列表
    subscribeList: [] as NewSubscribe[], // 订阅列表
  }),
  actions: {
    async init() {
      this.applyList = await selectApplyNotice(0, user.userInfo?.mainId as string);
      this.interactionList = await selectInteractionNotice(0, user.userInfo?.mainId as string);
      this.subscribeList = await selectSubscribeNotice(0, user.userInfo?.mainId as string);
    },
    // 新通知
    async newApply(application: NoticeApply) {
      insertApplyNotice(
        application.applyId,
        application.applicantId,
        application.content,
        application.spaceApplicantType,
        application.spaceId,
        application.applicantSpaceId,
        application.groupId,
        application.photo,
        application.studentFlag,
        application.studentNumber,
        application.graduateTime,
        application.userAvatar,
        application.userNickname,
        application.groupChatNickname,
        application.spaceNickname,
        application.applicantSpaceAvatar,
        application.applicantSpaceNickname,
        application.applyType,
        application.status,
        application.updateTime,
        user.userInfo?.mainId as string
      );
    },
    async newInteraction(interation: InteractionNotice, noticeType: 1 | 2 | 3) {
      const friendStore = useFriendStore();
      let friend;
      if (noticeType === 1) {
        friend = friendStore.friendsInfo.find(
          (item) => interation.likerInfo[0]._id === item.friendId
        );
      } else if (noticeType === 2) {
        friend = friendStore.friendsInfo.find(
          (item) => interation.reposterInfo[0]._id === item.friendId
        );
      } else {
        friend = friendStore.friendsInfo.find(
          (item) => interation.commenterInfo[0]._id === item.friendId
        );
      }
      insertInteractionNotice(
        interation.momentId,
        interation.momentType,
        interation?.spaceId,
        interation.likerInfo?.[0]._id,
        interation.likerInfo?.[0].nickname,
        interation.likerInfo?.[0].avatar,
        friend?.remarkName as string,
        interation.spaceLikerRemarkName?.[0].remarkName,
        interation.content,
        interation.secondCommentIndex,
        interation.commentedUserInfo?.[0]._id,
        interation.commentedUserInfo?.[0].nickname,
        interation.commentedUserInfo?.[0].avatar,
        interation.commentedUserInfo?.[0].nickname,
        interation.spaceCommentedUserRemarkName?.[0].remarkName,
        interation.commenterInfo?.[0]._id,
        interation.commenterInfo?.[0].nickname,
        interation.commenterInfo?.[0].avatar,
        friend?.remarkName as string,
        interation.spaceCommentedUserRemarkName?.[0].remarkName,
        interation.commentType,
        interation.reposterInfo?.[0]._id,
        interation.reposterInfo?.[0].nickname,
        interation.reposterInfo?.[0].avatar,
        friend?.remarkName as string,
        interation.spaceUserRemarkName?.[0].remarkName,
        interation.userMomentInfo?.[0].content,
        interation.userMomentInfo?.[0].photos?.[0],
        interation.spaceMomentInfo?.[0].content,
        interation.spaceMomentInfo?.[0].photos?.[0],
        noticeType,
        interation.createTime,
        user.userInfo?.mainId as string
      );
    },
    async beSubscribe(subscribeMesssage: NewSubscribe) {
      insertSubscribeNotice(
        subscribeMesssage.userId,
        subscribeMesssage.nickname,
        subscribeMesssage.avatar,
        subscribeMesssage.spaceId,
        subscribeMesssage.spaceNickname,
        subscribeMesssage.spaceAvatar,
        subscribeMesssage.createTime,
        user.userInfo?.mainId as string
      );
    },
    // 处理申请
    dealApply(index: number) {
      this.applyList.splice(index, 1);
    },
  },
});
