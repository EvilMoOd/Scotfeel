<script setup lang="ts">
  // 空间名片卡片
  const props = defineProps<{
    avatar: string;
    spaceId: string;
    nickname: string;
    role: 0 | 1 | 2 | 3 | 4;
  }>();

  // 前往订阅空间
  function goSpace() {
    uni.navigateTo({ url: `/pages/space/space?spaceId=${props.spaceId}` });
  }
</script>

<template>
  <!-- 空间小名片 -->
  <view class="space-item" @tap="goSpace">
    <image :src="avatar" class="space-img" />
    <br />
    <text>{{ nickname }}</text>
    <view v-if="role" class="identify">
      {{ role === 1 ? '空间主' : role === 2 ? '管理员' : role === 3 ? '成员' : '订阅者' }}
    </view>
  </view>
</template>

<style lang="scss" scoped>
  .space-item {
    width: 100rpx;
    margin: 10rpx 5rpx;
    padding: 16rpx 26rpx;
    font-size: 16rpx;
    text-align: center;
    background-color: #fff;
    border-radius: 30rpx;
    box-shadow: 1rpx 3rpx 3rpx #aaaa;

    .space-img {
      width: 96rpx;
      height: 96rpx;
      margin-bottom: 10rpx;
      border-radius: 30rpx;
    }

    text {
      font-weight: bold;
    }

    .identify {
      display: inline-block;
      width: 90rpx;
      margin: 10rpx 0;
      padding: 4rpx;
      color: $color-sf;
      border: 1px solid $color-sf;
      border-radius: 30rpx;
    }
  }
</style>
