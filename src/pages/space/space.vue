<script setup lang="ts">
  /* eslint-disable no-underscore-dangle */
  import { computed, reactive, ref } from 'vue';
  import { onLoad } from '@dcloudio/uni-app';
  import { useSubscribeSpaceStore } from '../../store/modules/spaceStore';
  import PopBottom from '../../components/PopBottom/PopBottom.vue';
  import type { Comments, SpaceMoment, SubscribedSpaceInfo } from '../../server/api/space';
  import {
    reqApplyJoinSpace,
    reqGetOneLevelComment,
    reqCancelSubscribeSpace,
    reqSubscribeSpace,
    reqCancelLike,
    reqAddLike,
    reqSpaceInfo,
    reqASpaceMoment,
  } from '../../server/api/space';
  import { useUserStore } from '../../store/modules/userStore';

  // 判断该空间是否为用户订阅的空间
  const spaceStore = useSubscribeSpaceStore();
  let spaceId: string;
  const userStore = useUserStore();
  // 空间信息
  const space = reactive({
    spaceInfo: {
      mainId: '25606d2bb91c4638a84cc9109444d666',
      nickname: '号级级特候',
      account: 'SF_LqJDPOFJ',
      introduction: '优秀空间',
      identify: 0,
      avatar: 'http://dummyimage.com/100x100',
      countSubscriber: 2,
      countMember: 3,
      backgroundImage: 'http://dummyimage.com/100x100',
      privateFlag: 0, // 是否为私密空间，0：否，1:是
      verifyFlag: 0, // 是否需要审核，0:否，1：是
      inviteFlag: 0, // 是否只能通过邀请进入，0：否，1：是
      recommendFlag: 0, // 是否允许系统推荐给其它用户，0：否，1：是
    },
    inSpace: {
      spaceId: '25606d2bb91c4638a84cc9109444d666',
      nickname: '田敏',
      avatar: `http://obs.scotfeel.com/61b0b7cc5af7a0db2c245f213bfa637b.jpeg?versionId=null`,
      role: 4,
    } as SubscribedSpaceInfo,
    spaceMoment: [] as SpaceMoment[],
  });
  const imgUrl = computed(() => {
    return `url(${space.spaceInfo.backgroundImage})`;
  });
  onLoad(async (params) => {
    spaceId = params.spaceId as string;
    space.spaceInfo = await reqSpaceInfo(spaceId);
    space.inSpace = spaceStore.getSpace(space.spaceInfo.mainId) as SubscribedSpaceInfo;
    space.spaceMoment = await reqASpaceMoment(space.spaceInfo.mainId, 1652471824095);
  });

  // 功能区
  // 订阅空间
  async function subscribe() {
    await reqSubscribeSpace(spaceId);
  }
  // 取消订阅
  async function cancelSubscribe() {
    await reqCancelSubscribeSpace(spaceId);
  }
  // 加入空间
  async function joinSpace() {
    if (space.spaceInfo.verifyFlag === 1) {
      uni.navigateTo({ url: `/pages/space/applySpace?spaceId=${space.spaceInfo.mainId}` });
    } else {
      await reqApplyJoinSpace(spaceId, userStore.userInfo?.mainId as string, '', 1, 1);
    }
  }
  function goSpaceDetail() {
    uni.navigateTo({
      url: `/pages/space/spaceDetail?spaceId=${space.spaceInfo.mainId}&privateFlag=${space.spaceInfo.privateFlag}&verifyFlag=${space.spaceInfo.verifyFlag}&inviteFlag=${space.spaceInfo.inviteFlag}&recommendFlag=${space.spaceInfo.recommendFlag}&nickname=${space.spaceInfo.nickname}&avatar=${space.spaceInfo.avatar}`,
    });
  }
  // 前往发布动态页
  function goCreateSpaceMoment() {
    uni.navigateTo({ url: `/pages/space/createSpaceMoment?spaceId=${space.spaceInfo.mainId}` });
  }
  // 动态区
  // 点赞
  async function changeLikeStatus(index: number) {
    if (space.spaceMoment[index].likeStatus === 1) {
      await reqCancelLike(space.spaceMoment[index]._id);
      space.spaceMoment[index].likeStatus = 0;
    } else {
      await reqAddLike(
        space.spaceMoment[index]._id,
        space.spaceMoment[index].posterUserInfo[0]._id,
        space.inSpace ? 1 : 0
      );
      space.spaceMoment[index].likeStatus = 1;
    }
  }
  // 评论
  const momentId = ref<number>();
  const commentInfo = reactive<Comments[]>([
    {
      spaceMemberFlag: 1,
      content:
        'b8SzITadipisicingipsumelitnisicillumsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
      commentedUserInfo: [
        {
          _id: '0d94b112969e4c0abfbd94464795a9a2',
          nickname: '用户02',
          avatar: 'https://p.qqan.com/up/2021-2/16137992359659254.jpg',
        },
      ],
      commentedUserRemarkName: [],
      commenterInfo: [
        {
          _id: '0d94b112969e4c0abfbd94464795a9a2',
          nickname: '用户02',
          avatar: 'https://p.qqan.com/up/2021-2/16137992359659254.jpg',
        },
      ],
      commenterRemarkName: [
        {
          remarkName: '232fds',
        },
      ],
      secondCommentIndex: 'adipisicingipsumelitnisicillum',
      createTime: 1653908215942,
    },
  ]);

  // 展示区
  const show = reactive({
    showMask: false,
    showComment: false,
    showMember: false,
  });
  function showMember() {
    show.showMember = true;
    show.showMask = true;
  }
  async function showComment(index: number) {
    show.showComment = true;
    show.showMask = true;
    // TODO offset
    momentId.value = space.spaceMoment[index]._id;
    const commentData = await reqGetOneLevelComment(momentId.value, spaceId, 0);
    commentInfo.length = 0;
    commentInfo.push(...commentData);
  }
  function hiddenAll() {
    show.showMask = false;
    show.showMember = false;
    show.showComment = false;
  }
</script>

<template>
  <view class="page">
    <scroll-view scroll-y class="space-body" :class="{ mask: show.showMask }">
      <view class="header">
        <Back class="back" />
        <uni-icons
          type="camera"
          color="#fff"
          size="4vh"
          class="public-active"
          @tap="goCreateSpaceMoment"
        />
        <uni-icons type="bars" color="#fff" size="4vh" class="more" @tap="showMember" />
        <view class="space-msg">
          <Avatar :img-src="space.spaceInfo.avatar" :type="3" @tap="goSpaceDetail" />
          <view class="msg">
            <text style="color: #fff">{{ space.spaceInfo.nickname }}</text>
            <br />
            <text style="color: #aaa; font-size: 24rpx">{{ space.spaceInfo.account }}</text>
          </view>
        </view>
        <view class="introduction">{{ space.spaceInfo.introduction }}</view>
        <view v-if="!space.inSpace" class="subscribe" @tap="subscribe">订阅</view>
        <view
          v-if="space.inSpace?.role === 1 || space.inSpace?.role === 2 || space.inSpace?.role === 3"
          class="in-space"
          @tap="cancelSubscribe"
        >
          已加入
        </view>
        <view v-else class="join" @click="joinSpace">加入</view>
      </view>
      <view class="main">
        <view class="space-sp">
          <text>{{ space.spaceInfo.countSubscriber }}订阅&nbsp;&nbsp;</text>
          <text>{{ space.spaceInfo.countMember }}成员</text>
        </view>
        <view class="space-place">
          <SpaceCard
            v-for="(item, index) in space.spaceMoment"
            :key="item._id"
            :index="index"
            :space-moment="space.spaceMoment[index]"
            :change-like-status="changeLikeStatus"
            :show-comment="showComment"
          />
        </view>
      </view>
    </scroll-view>
  </view>
  <!-- 评论区 -->
  <PopBottom :pop-show="show.showComment">
    <scroll-view scroll-y style="height: 80vh">
      <Comment
        v-for="(item, index) in commentInfo"
        :key="index"
        :one-comment="item"
        :moment-id="momentId"
        :space-id="spaceId"
      />
    </scroll-view>
  </PopBottom>
  <PopBottom :pop-show="show.showMember">
    <scroll-view scroll-y class="member-list">
      <view class="member-item">
        <Avatar img-src="/src/assets/images/img3.png" :type="1" />
        <text class="username">里尔</text>
        <text class="leave">退出</text>
      </view>
      <view class="member-item">
        <Avatar img-src="/src/assets/images/img3.png" :type="2" />
        <text class="username">里尔</text>
        <text class="leave">退出</text>
      </view>
      <view class="member-item">
        <Avatar img-src="/src/assets/images/img3.png" :type="2" />
        <text class="username">里尔</text>
        <text class="leave">退出</text>
      </view>
      <view class="member-item">
        <Avatar img-src="/src/assets/images/img3.png" :type="2" />
        <text class="username">里尔</text>
        <text class="leave">退出</text>
      </view>
    </scroll-view>
  </PopBottom>
  <Mask :show="show.showMask" :hidden="hiddenAll" />
</template>

<style lang="scss" scoped>
  .page {
    height: 100vh;

    .space-body {
      transition: 0.7s;

      .header {
        width: 750rpx;
        height: 458rpx;
        overflow: hidden;
        font-size: 26rpx;
        background-image: v-bind('imgUrl');
        background-size: cover;

        .back {
          position: absolute;
          top: 62rpx;
          left: 26rpx;
        }

        .public-active {
          position: absolute;
          top: 62rpx;
          left: 580rpx;
        }

        .more {
          position: absolute;
          top: 62rpx;
          left: 682rpx;
        }

        .space-msg {
          display: flex;
          margin-top: 136rpx;
          margin-left: 40rpx;

          .msg {
            margin-left: 20rpx;
          }
        }

        .introduction {
          width: 50%;
          height: 70rpx;
          margin-top: 60rpx;
          margin-left: 40rpx;
          overflow: hidden;
          color: #fff;
          font-size: 22rpx;
        }

        .subscribe {
          position: absolute;
          top: 374rpx;
          left: 540rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 82rpx;
          height: 50rpx;
          color: #fff;
          background-color: $color-sf;
          border-radius: 10rpx;

          &:active {
            background-color: #226068;
          }
        }

        .join {
          position: absolute;
          top: 374rpx;
          left: 632rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 96rpx;
          height: 50rpx;
          color: #fff;
          background-color: #fbb148;
          border-radius: 30rpx;

          &:active {
            background-color: #ca9230;
          }
        }

        .in-space {
          position: absolute;
          top: 374rpx;
          left: 632rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 96rpx;
          height: 50rpx;
          color: #fff;
          background-color: #d7d7d7;
          border-radius: 30rpx;
        }
      }

      .main {
        width: 100vw;
        height: 900rpx;
        margin-top: -30rpx;
        background-color: #fff;
        border-radius: 40rpx 40rpx 0 0;

        .space-sp {
          padding: 10rpx 10rpx 30rpx 520rpx;
          color: #797979;
          font-size: 26rpx;
        }

        .space-place {
          background-color: #f2f2f2;
        }
      }
    }
  }

  .member-list {
    height: 336rpx;
    margin-top: 30rpx;

    .member-item {
      padding: 15rpx 0;
      border-bottom: 1px solid #f2f2f2;

      .username {
        margin-left: 20rpx;
      }

      .leave {
        margin-left: 300rpx;
        color: $color-sf;
      }
    }
  }

  .mask {
    filter: blur(3px);
  }
</style>
