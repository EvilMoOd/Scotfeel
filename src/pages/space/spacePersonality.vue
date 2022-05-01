<script setup lang="ts"></script>

<template>
  <view class="header">
    <Back class="back" />
    <view class="title">私密设置</view>
  </view>
  <view class="main">
    <view class="item">
      <text>
        设置为私密空间
        <switch color="#117986" style="transform: scale(0.5); margin: -10rpx -20rpx 0 -20rpx" />
      </text>
    </view>
    <view class="item">
      <text>
        设置为私密空间
        <switch color="#117986" style="transform: scale(0.5); margin: -10rpx -20rpx 0 -20rpx" />
      </text>
    </view>
    <view class="item">
      <text>
        设置为私密空间
        <switch color="#117986" style="transform: scale(0.5); margin: -10rpx -20rpx 0 -20rpx" />
      </text>
    </view>
    <view class="item">
      <text>
        设置为私密空间
        <switch color="#117986" style="transform: scale(0.5); margin: -10rpx -20rpx 0 -20rpx" />
      </text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  .header {
    @include header;
    color: #fff;
    text-align: center;
    overflow: hidden;
    .back {
      position: absolute;
      top: 80rpx;
      left: 20rpx;
    }
    .title {
      margin-top: 82rpx;
      font-size: 40rpx;
      font-weight: bold;
    }
  }
  .main {
    .item {
      padding: 30rpx 50rpx;
      border-bottom: 1px solid #aaa;
    }
  }
</style>
