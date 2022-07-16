<script setup lang="ts">
  const props = defineProps<{
    show: boolean;
    hidden: () => void;
  }>();
</script>

<template>
  <view v-show="props.show" class="mask" @tap="props.hidden"></view>
</template>

<style lang="scss" scoped>
  .mask {
    position: absolute;
    top: 0;
    z-index: 10;
    width: 100vw;
    height: 100vh;
  }
</style>
