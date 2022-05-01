<script setup lang="ts">
  import Active from './Active.vue';
  //朋友动态栏
  function goFriendsActive() {
    uni.navigateTo({ url: '/pages/main/friendsActive' });
  }
</script>

<template>
  <!-- 朋友动态栏 -->
  <view class="friends-active">
    <view class="friend-active">
      <!-- 可能有bug这里 -->
      <scroll-view scroll-x="true">
        <Active img="/src/assets/images/head.png" />
        <Active img="/src/assets/images/head.png" />
        <Active img="/src/assets/images/head.png" />
        <Active img="/src/assets/images/head.png" />
        <Active img="/src/assets/images/head.png" />
        <Active img="/src/assets/images/head.png" />
      </scroll-view>
    </view>
    <view class="more-active" @tap="goFriendsActive">全部</view>
  </view>
</template>

<style lang="scss" scoped>
  .friends-active {
    display: flex;
    height: 190rpx;
    border-bottom: solid 2rpx #f2f2f2;
    justify-content: center;
    .friend-active {
      overflow: hidden;
      white-space: nowrap;
      width: 600rpx;
    }
    .more-active {
      display: inline-block;
      align-self: center;
      border-radius: 50%;
      margin-left: 28rpx;
      color: $color-sf;
    }
  }
</style>
