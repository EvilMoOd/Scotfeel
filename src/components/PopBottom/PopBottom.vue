<script setup lang="ts">
  const props = defineProps<{
    popShow: boolean;
  }>();
</script>

<template>
  <view class="pop-container" :class="{ 'space-member-container-show': props.popShow }">
    <slot></slot>
  </view>
</template>

<style lang="scss" scoped>
  .pop-container {
    position: fixed;
    z-index: 20;
    box-sizing: border-box;
    bottom: 0;
    left: 34rpx;
    height: 366rpx;
    width: 680rpx;
    background-color: #fff;
    border-radius: 30rpx 30rpx 0 0;
    padding: 0 60rpx;
    transform: translateY(366rpx);
    transition: 0.7s;
    visibility: hidden;
  }
  .space-member-container-show {
    transform: translateY(0);
    visibility: visible;
  }
</style>
