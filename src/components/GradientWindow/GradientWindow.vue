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
    position: absolute;
    z-index: 100;
    display: flex;
    flex-direction: column;
    padding: 18rpx 20rpx;
    color: #000;
    font-size: 26rpx;
    background-color: #fff;
    border-radius: 20rpx;
    box-shadow: 0 0 4rpx $color-sf;
    @include hidden;
  }

  .more-show {
    @include show;
  }
</style>
