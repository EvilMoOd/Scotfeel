<script setup lang="ts">
  const props = defineProps<{
    show: boolean;
  }>();
</script>

<template>
  <view class="gradient" :class="{ 'more-show': props.show }">
    <slot></slot>
  </view>
</template>

<style lang="scss" scoped>
  .gradient {
    padding: 18rpx 20rpx;
    font-size: 26rpx;
    border-radius: 20rpx;
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 100;
    background-color: #fff;
    box-shadow: 0 0 4rpx $color-sf;
    color: #000;
    @include hidden;
  }
  .more-show {
    @include show;
  }
</style>
