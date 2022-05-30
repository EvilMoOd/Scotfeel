<script setup lang="ts">
  // 空间名片卡片
  const props = defineProps<{
    img: string;
    spaceId?: string;
    nickname: string;
    role?: 1 | 2 | 3 | 4;
  }>();

  // 前往订阅空间
  function goSpace() {
    uni.navigateTo({ url: `/pages/space/space?spaceId=${props.spaceId}` });
  }
</script>

<template>
  <!-- 空间小名片 -->
  <view class="space-item" @tap="goSpace">
    <image :src="props.img" class="space-img" />
    <br />
    <text>{{ props.nickname }}</text>
    <view v-if="props.role" class="identify">
      {{
        props.role === 1
          ? '空间主'
          : props.role === 2
          ? '管理员'
          : props.role === 3
          ? '成员'
          : '订阅者'
      }}
    </view>
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
      width: 90rpx;
      color: $color-sf;
      border: 1px solid $color-sf;
      border-radius: 30rpx;
      margin: 10rpx 0;
    }
  }
</style>
