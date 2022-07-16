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
    bottom: 0;
    left: 34rpx;
    z-index: 20;
    box-sizing: border-box;
    width: 680rpx;
    max-height: 80vh;
    padding: 0 60rpx;
    background-color: #fff;
    border-radius: 30rpx 30rpx 0 0;
    box-shadow: 5px -5px 5px 0 #eee;
    transform: translateY(366rpx);
    visibility: hidden;
    transition: 0.7s;
  }

  .space-member-container-show {
    transform: translateY(0);
    visibility: visible;
  }
</style>
