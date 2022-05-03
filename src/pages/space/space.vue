<script setup lang="ts">
  import { ref } from 'vue';
  import { useSubscribeSpaceStore } from '../../store/modules/subscribeSpaceStore';

  const spaceStore = useSubscribeSpaceStore();

  const isShow = ref(false);
  function showMember() {
    isShow.value = !isShow.value;
  }
  function hiddenMemberList() {
    isShow.value = !isShow.value;
  }

  function joinSpace() {
    uni.navigateTo({ url: '/pages/space/applySpace' });
  }
  function goSpaceDetail() {
    uni.navigateTo({ url: '/pages/space/spaceDetail' });
  }
</script>

<template>
  <scroll-view scroll-y class="space-body">
    <view class="header">
      <Back class="back" />
      <uni-icons type="camera" color="#fff" size="4vh" class="publicActive" />
      <uni-icons type="bars" color="#fff" size="4vh" class="more" @tap="showMember" />
      <view class="space-msg">
        <Avatar img-src="/src/assets/images/img3.png" :type="3" @tap="goSpaceDetail" />
        <view class="msg">
          <text style="color: #fff">ACM</text>
          <br />
          <text style="color: #aaa; font-size: 24rpx">@ACM</text>
        </view>
      </view>
      <view class="introduction">中美式肌肉俱乐部（American Muscl Club of China...</view>
      <view v-if="!spaceStore.inSpace" class="subscribe">订阅</view>
      <view :class="spaceStore.inSpace ? 'inSpace' : 'join'" @click="joinSpace">加入</view>
    </view>
    <view class="main">
      <view class="space-sp">
        <text>30订阅&nbsp;&nbsp;</text>
        <text>10成员</text>
      </view>
      <view class="space-place">
        <SpaceCard />
        <SpaceCard />
        <SpaceCard />
        <SpaceCard />
      </view>
    </view>
  </scroll-view>
  <transition name="member">
    <view v-if="isShow" class="space-member-container">
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
    </view>
  </transition>
  <view v-show="isShow" class="mask" @tap="hiddenMemberList"></view>
</template>

<style lang="scss" scoped>
  .space-body {
    .header {
      width: 750rpx;
      height: 458rpx;
      background-image: url('@/assets/images/img4.png');
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

  .space-member-container {
    position: absolute;
    z-index: 20;
    box-sizing: border-box;
    top: 968rpx;
    left: 34rpx;
    height: 366rpx;
    width: 680rpx;
    background-color: #fff;
    border-radius: 30rpx 30rpx 0 0;
    padding: 0 60rpx;
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
  }
  .mask {
    width: 100vw;
    height: 100vh;
    background-color: rgba($color: #f2f2f2, $alpha: 0.6);
    position: absolute;
    top: 0;
    z-index: 10;
  }

  .member-enter-from,
  .member-leave-to {
    top: 1375rpx;
  }

  .member-enter-active,
  .member-leave-active {
    transition: all 0.5s ease-out;
  }

  .member-enter-to,
  .member-leave-from {
    top: 968rpx;
  }
</style>
