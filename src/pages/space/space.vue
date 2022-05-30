<script setup lang="ts">
  import { computed, reactive, ref } from 'vue';
  import type { SubscribeSpace } from '../../store/modules/spaceStore';
  import { useSubscribeSpaceStore } from '../../store/modules/spaceStore';
  import PopBottom from '../../components/PopBottom/PopBottom.vue';
  import { onLoad } from '@dcloudio/uni-app';
  import type { SpaceInfo, SpaceMoment } from '../../server/api/space';
  import {
    reqCancelSubscribeSpace,
    reqSubscribeSpace,
    reqCancelLike,
    reqAddLike,
    reqSpaceInfo,
    reqASpaceMoment,
  } from '../../server/api/space';

  import { getParam } from '../../util/url';

  // 判断该空间是否为用户订阅的空间
  const spaceStore = useSubscribeSpaceStore();
  const spaceId = getParam('spaceId');

  interface Space {
    spaceInfo: SpaceInfo;
    inSpace?: SubscribeSpace;
    spaceMoment: SpaceMoment[];
  }

  const space = reactive<Space>({
    spaceInfo: {
      mainId: '2c513f023a514e2083c3294d24cc3aa6',
      nickname: '号级级特候',
      account: 'SF_LqJDPOFJ',
      introduction: '优秀空间',
      identify: 0,
      avatar: 'http://dummyimage.com/100x100',
      countSubscriber: 2,
      countMember: 3,
      backgroundImage: 'http://dummyimage.com/100x100',
    },
    inSpace: {
      spaceId: '2c513f023a514e2083c3294d24cc3aa6',
      belongToId: '79',
      nickname: '田敏',
      avatar: `http://obs.scotfeel.com/61b0b7cc5af7a0db2c245f213bfa637b.jpeg?versionId=null`,
      role: 1,
    },
    spaceMoment: [],
  });
  const imgUrl = computed(() => {
    return `url(${space.spaceInfo.backgroundImage})`;
  });
  onLoad(async () => {
    space.spaceInfo = await reqSpaceInfo(spaceId);
    space.inSpace = spaceStore.getSpace(space.spaceInfo.mainId);
    space.spaceMoment = await reqASpaceMoment();
  });

  const isShow = ref(false);
  function showMember() {
    isShow.value = !isShow.value;
  }
  function hiddenMemberList() {
    isShow.value = !isShow.value;
  }

  function joinSpace() {
    uni.navigateTo({ url: `/pages/space/applySpace?spaceId=${space.spaceInfo.mainId}` });
  }
  function goSpaceDetail() {
    uni.navigateTo({ url: `/pages/space/spaceDetail?spaceId=${space.spaceInfo.mainId}` });
  }
  // 点赞
  async function changeLikeStatus(index: number) {
    if (space.spaceMoment[index].likeStatus === 1) {
      await reqCancelLike(space.spaceMoment[index]._id);
      space.spaceMoment[index].likeStatus = 0;
    } else {
      await reqAddLike(
        space.spaceMoment[index]._id,
        space.spaceMoment[index].posterInfo[0]._id,
        space.inSpace ? 1 : 0
      );
      space.spaceMoment[index].likeStatus = 1;
    }
  }
  // 订阅空间
  async function subscribe() {
    await reqSubscribeSpace(spaceId);
  }
  // 取消订阅
  async function cancelSubscribe() {
    await reqCancelSubscribeSpace(spaceId);
  }
</script>

<template>
  <view class="page">
    <scroll-view scroll-y class="space-body" :class="{ mask: isShow }">
      <view class="header">
        <Back class="back" />
        <uni-icons type="camera" color="#fff" size="4vh" class="publicActive" />
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
          class="inSpace"
          @tap="cancelSubscribe"
        ></view>
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
            :poster-info="item.posterInfo[0]"
            :content="item.content"
            :like-count="item.likedCount"
            :like-status="item.likeStatus"
            :commented-count="item.commentedCount"
            :photos="item.photos"
            :change-like-status="changeLikeStatus"
            :liked-count="item.likedCount"
            :comments="item.comments"
            :create-time="item.createTime"
          />
        </view>
      </view>
    </scroll-view>
  </view>
  <PopBottom :pop-show="isShow">
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
  <Mask :show="isShow" :hidden="hiddenMemberList" />
</template>

<style lang="scss" scoped>
  .page {
    height: 100vh;
    .space-body {
      transition: 0.7s;
      .header {
        width: 750rpx;
        height: 458rpx;
        background-image: v-bind('imgUrl');
        background-size: cover;
        overflow: hidden;
        font-size: 26rpx;
        .back {
          position: absolute;
          top: 62rpx;
          left: 26rpx;
        }
        .publicActive {
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
          margin-top: 136rpx;
          margin-left: 40rpx;
          display: flex;
          .msg {
            margin-left: 20rpx;
          }
        }
        .introduction {
          margin-top: 60rpx;
          margin-left: 40rpx;
          width: 50%;
          height: 70rpx;
          font-size: 22rpx;
          color: #fff;
          overflow: hidden;
        }
        .subscribe {
          position: absolute;
          top: 374rpx;
          width: 82rpx;
          height: 50rpx;
          left: 540rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: $color-sf;
          border-radius: 10rpx;
          color: #fff;
          &:active {
            background-color: #226068;
          }
        }
        .join {
          position: absolute;
          top: 374rpx;
          left: 632rpx;
          width: 96rpx;
          height: 50rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fbb148;
          border-radius: 30rpx;
          color: #fff;
          &:active {
            background-color: #ca9230;
          }
        }
        .inSpace {
          position: absolute;
          top: 374rpx;
          left: 632rpx;
          width: 96rpx;
          height: 50rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #d7d7d7;
          border-radius: 30rpx;
          color: #fff;
        }
      }
      .main {
        border-radius: 40rpx 40rpx 0 0;
        margin-top: -30rpx;
        width: 100vw;
        height: 900rpx;
        background-color: #fff;
        .space-sp {
          padding: 10rpx 10rpx 30rpx 520rpx;
          font-size: 26rpx;
          color: #797979;
        }
        .space-place {
          background-color: #f2f2f2;
        }
      }
    }
  }
  .member-list {
    margin-top: 30rpx;
    height: 336rpx;
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
