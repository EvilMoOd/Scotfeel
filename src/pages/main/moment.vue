<script setup lang="ts">
  // import { onLoad } from '@dcloudio/uni-app';
  // import { useMomentListStore } from '../../store/modules/momemtListStore';
  // import { getParam } from '../../util/url';

  // const friendId = getParam('friendId');
  // const momentStore = useMomentListStore();
  // onLoad(() => {
  // momentStore.getMoment(friendId);
  // });
</script>

<template>
  <view class="header">
    <Home />
    <text class="title">朋友动态</text>
  </view>
  <MomentList style="background-color: #f2f2f2" />
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
