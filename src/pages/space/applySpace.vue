<script setup lang="ts">
  import { useSpaceStore } from '../../store/modules/spaceStore';

  const spaceStore = useSpaceStore();

  function enterInSpace() {
    spaceStore.inSpace = true;
    uni.navigateTo({ url: '/pages/space/space' });
  }
</script>

<template>
  <view class="header">
    <Back class="back" />
    <text class="title">申请加入空间</text>
  </view>
  <view class="main">
    <text>申请理由</text>
    <textarea class="applyReason" cols="30" rows="10"></textarea>
    <view class="enter" @click="enterInSpace">确定</view>
  </view>
</template>

<style lang="scss" scoped>
  .header {
    @include header;
    display: flex;
    justify-content: center;
    font-size: 36rpx;
    font-weight: bold;
    color: #fff;
    .back {
      position: absolute;
      top: 80rpx;
      left: 20rpx;
    }
    .title {
      margin-top: 80rpx;
    }
  }
  .main {
    padding: 50rpx;
    .applyReason {
      margin-top: 20rpx;
      background-color: #f2f2f2;
      border-radius: 40rpx;
      padding: 20rpx;
    }
    .enter {
      width: 100rpx;
      height: 50rpx;
      text-align: center;
      line-height: 50rpx;
      background-color: #aaa;
    }
  }
</style>
