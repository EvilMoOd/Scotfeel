<script setup lang="ts">
  const props = defineProps<{
    img: string;
  }>();
  //前往朋友动态
  function goFriendsActive() {
    uni.navigateTo({ url: '/pages/main/friendsActive' });
  }
</script>

<template>
  <!-- 朋友动态栏中的每个圈 -->
  <view class="active" @tap="goFriendsActive">
    <image :src="props.img" class="avatar" />
    <view class="username">小可莉</view>
  </view>
</template>

<style lang="scss" scoped>
  .active {
    display: inline-block;
    height: 100rpx;
    width: 100rpx;
    border-radius: 50%;
    margin-top: 28rpx;
    margin-right: 48rpx;
    background-image: linear-gradient(#aaf0d8, #2ed);
    padding: 6rpx;
    .avatar {
      height: 100%;
      width: 100%;
      border-radius: 50%;
    }
    .username {
      margin-top: 5rpx;
      font-size: 22rpx;
      text-align: center;
    }
  }
</style>
