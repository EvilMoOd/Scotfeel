<script setup lang="ts">
  import { ref } from 'vue';

  defineProps<{
    success?: boolean;
  }>();

  const popShow = ref(false);
  function popUp() {
    popShow.value = true;
    setTimeout(() => {
      popShow.value = false;
    }, 2000);
  }
  defineExpose({
    popUp,
  });
</script>

<template>
  <view
    class="pop"
    :class="{ 'pop-out': popShow, 'pop-in': !popShow, success: success, fail: !success }"
  >
    <view :class="success ? 'success' : 'fail'"><slot></slot></view>
  </view>
</template>

<style lang="scss" scoped>
  .pop {
    position: absolute;
    z-index: 100;
    top: 0vh;
    left: 15vw;
    width: 70vw;
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
  .success {
    background-color: #e1f3d8;
    color: #b1cf4a;
  }
  .fail {
    background-color: #fde2e2;
    color: #f793a9;
  }
  .pop-in {
    transform: translateY(100rpx);
    visibility: hidden;
    opacity: 0;
  }
  .pop-out {
    transform: translateY(200rpx);
    visibility: visible;
    opacity: 0.9;
    filter: blur(3);
  }
</style>
