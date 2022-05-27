<script setup lang="ts">
  const props = defineProps<{
    popShow: boolean;
  }>();
</script>

<template>
  <view class="pop" :class="props.popShow ? 'pop-out' : 'pop-in'"><slot></slot></view>
</template>

<style lang="scss" scoped>
  .pop {
    position: absolute;
    z-index: 100;
    top: 0vh;
    left: 10vw;
    background-color: #fff;
    width: 80vw;
    transition: 0.5s;
    display: flex;
    justify-content: center;
    padding: 3vw;
    border-radius: 30rpx;
    box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.06);
    &:hover {
      box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.15);
      transition: all 0.3s;
    }
  }
  .pop-in {
    transform: translateY(-200rpx);
    visibility: hidden;
    opacity: 0;
  }
  .pop-out {
    transform: translateY(200rpx);
    visibility: visible;
    opacity: 1;
  }
</style>
