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
    top: 0;
    left: 10vw;
    z-index: 100;
    display: flex;
    justify-content: center;
    width: 80vw;
    padding: 3vw;
    background-color: #fff;
    border-radius: 30rpx;
    box-shadow: 0 3px 8px 6px rgb(7 17 27 / 6%);
    transition: 0.5s;

    &:hover {
      box-shadow: 0 3px 8px 6px rgb(7 17 27 / 15%);
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
