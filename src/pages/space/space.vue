<script setup lang="ts">
  import { useSpaceStore } from '../../store/modules/spaceStore';

  const spaceStore = useSpaceStore();

  function joinSpace() {
    uni.navigateTo({ url: '/pages/space/applySpace' });
  }
</script>

<template>
  <scroll-view scroll-y>
    <view class="header">
      <Back class="back" />
      <view class="space-msg">
        <image class="avatar" src="@/assets/images/img3.png" mode="scaleToFill" />
        <view class="msg">
          <text style="color: #fff">ACM</text>
          <br />
          <text style="color: #aaa; font-size: 24rpx">@ACM</text>
        </view>
      </view>
      <view class="introduction">中美式肌肉俱乐部（American Muscl Club of China...</view>
      <view class="subscribe">订阅</view>
      <view :class="spaceStore.inSpace ? 'inSpace' : 'join'" @click="joinSpace">加入</view>
    </view>
    <view class="main">
      <view class="space-sp">
        <text>30订阅&nbsp;&nbsp;</text>
        <text>10成员</text>
      </view>
      <ActiveCard />
      <ActiveCard />
      <ActiveCard />
      <ActiveCard />
    </view>
  </scroll-view>
</template>

<style lang="scss" scoped>
  .header {
    width: 750rpx;
    height: 458rpx;
    background-image: url('@/assets/images/img1.png');
    background-size: cover;
    overflow: hidden;
    font-size: 26rpx;
    .back {
      position: absolute;
      top: 62rpx;
      left: 26rpx;
    }
    .space-msg {
      margin-top: 136rpx;
      margin-left: 40rpx;
      display: flex;
      .avatar {
        width: 96rpx;
        height: 96rpx;
        border-radius: 20rpx;
        border: 6rpx solid #fff;
      }
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
    height: 860rpx;
    background-color: #fff;
    .space-sp {
      padding: 10rpx 10rpx 30rpx 520rpx;
      font-size: 26rpx;
      color: #797979;
    }
  }
</style>
