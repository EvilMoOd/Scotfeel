<script setup lang="ts">
  //空间名片卡片
  const props = defineProps<{
    img: string;
  }>();

  // 前往订阅空间
  function goSpace() {
    uni.navigateTo({ url: '/pages/space/space' });
  }
</script>

<template>
  <view class="space-item" @tap="goSpace">
    <image :src="props.img" class="space-img" />
    <br />
    <text>健身俱乐部</text>
    <view class="identify">管理员</view>
  </view>
</template>

<style lang="scss" scoped>
  .space-item {
    width: 100rpx;
    background-color: #fff;
    margin: 10rpx 5rpx;
    padding: 16rpx 26rpx;
    font-size: 16rpx;
    text-align: center;
    border-radius: 30rpx;
    box-shadow: 1rpx 3rpx 3rpx #aaaa;

    .space-img {
      width: 96rpx;
      height: 96rpx;
      border-radius: 30rpx;
      margin-bottom: 10rpx;
    }
    text {
      font-weight: bold;
    }
    .identify {
      display: inline-block;
      padding: 4rpx;
      width: 60rpx;
      color: $color-sf;
      border: 1px solid $color-sf;
      border-radius: 30rpx;
      margin: 10rpx;
    }
  }
</style>
