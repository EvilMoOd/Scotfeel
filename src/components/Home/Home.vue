<script setup lang="ts">
  // 返回
  function goHome() {
    uni.redirectTo({ url: '/pages/main/home' });
  }
</script>

<template>
  <!-- 返回 -->
  <uni-icons class="home" type="home" size="4vh" color="#fff" @tap="goHome"></uni-icons>
</template>

<style lang="scss" scoped>
  .home {
    position: absolute;
    top: 60rpx;
    left: 20rpx;
  }
</style>
