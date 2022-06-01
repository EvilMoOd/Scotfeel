<script setup lang="ts"></script>

<template>
  <view class="header">
    <Back />
    <view class="title">消息</view>
  </view>
  <view class="function">
    <view>
      <uni-icons type="chat" color="#117986" size="30" />
      <view>评论</view>
    </view>
    <view>
      <uni-icons type="redo" color="#117986" size="30" />
      <view>转发</view>
    </view>

    <view>
      <uni-icons type="heart" color="#117986" size="30" />
      <view>点赞</view>
    </view>
    <view>
      <uni-icons type="star" color="#117986" size="30" />
      <view>订阅</view>
    </view>
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
      left: 10rpx;
      top: 80rpx;
    }

    .title {
      margin-top: 80rpx;
    }
  }

  .function {
    display: flex;
    justify-content: space-between;
    padding: 50rpx 80rpx 30rpx 80rpx;
    font-size: 20rpx;
    text-align: center;
  }
</style>
