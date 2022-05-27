<script setup lang="ts">
  import { ref } from 'vue';

  const searchText = ref('');
  function search() {}
  // 前往添加好友申请
  function goAddFriends() {
    uni.navigateTo({ url: '/pages/menu/addFriends' });
  }
</script>

<template>
  <view class="header">
    <Back class="back" />
    <text class="title">添加好友</text>
  </view>
  <view class="main">
    <uni-easyinput v-model="searchText" placeholder="搜索好友" @confirm="search"></uni-easyinput>
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
      top: 80rpx;
      left: 20rpx;
    }
    .title {
      margin-top: 80rpx;
    }
  }
</style>
