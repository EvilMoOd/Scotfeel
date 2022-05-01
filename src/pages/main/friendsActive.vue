<script setup lang="ts"></script>

<template>
  <view class="header">
    <Back />
    <text class="title">朋友动态</text>
  </view>
  <FriendsActive style="background-color: #f2f2f2" />
  <scroll-view scroll-y class="main">
    <view class="posts">
      <ActiveCard />
      <ActiveCard />
      <ActiveCard />
      <ActiveCard />
    </view>
    <view></view>
  </scroll-view>
</template>

<style lang="scss" scoped>
  .header {
    @include header;
    text-align: center;

    .back {
      position: absolute;
      left: 0;
      top: 60rpx;
    }

    .title {
      display: inline-block;
      margin-top: 70rpx;
      font-weight: bold;
      font-size: 38rpx;
      color: #fff;
    }
  }

  .main {
    height: 980rpx;
    background-color: #f2f2f2;
  }
</style>
