<script setup lang="ts"></script>

<template>
  <view class="header">
    <Back class="back" />
    <text class="title">消息</text>
    <uni-icons
      type="more-filled"
      color="#fff"
      style="
        font-size: 60rpx;
        position: absolute;
        top: 80rpx;
        left: 680rpx;
        transform: rotate(90deg);
      "
    />
  </view>
  <view class="main">
    <text>申请理由</text>
    <textarea class="applyReason" cols="30" rows="10"></textarea>
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
  }
</style>
