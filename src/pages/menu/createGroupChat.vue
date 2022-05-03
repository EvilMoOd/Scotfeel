<script setup lang="ts">
  import { reactive } from 'vue';

  const list = reactive([
    {
      letter: 'A',
      data: [
        '阿克苏机场',
        '阿拉山口机场',
        '阿勒泰机场',
        '阿里昆莎机场',
        '安庆天柱山机场',
        '澳门国际机场',
      ],
    },
    {
      letter: 'Z',
      data: ['保山机场', '包头机场', '北海福成机场', '北京南苑机场', '北京首都国际机场'],
    },
  ]);
</script>

<template>
  <view class="header">
    <Back />
    <view class="title">创建群聊</view>
    <uni-icons class="back" type="search" size="5vh" color="#fff"></uni-icons>
  </view>
  <scroll-view scroll-y class="main">
    <uni-indexed-list :options="list" :showSelect="false"></uni-indexed-list>
  </scroll-view>
</template>

<style lang="scss" scoped>
  .header {
    height: 160rpx;
    background-color: $color-sf;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .back {
      margin: 20rpx;
    }

    .title {
      display: inline-block;
      margin-bottom: 24rpx;
      font-weight: bold;
      font-size: 38rpx;
      color: #fff;
    }
  }

  .main {
    height: 1170rpx;
    background-color: #f0f1f2;
  }
</style>
