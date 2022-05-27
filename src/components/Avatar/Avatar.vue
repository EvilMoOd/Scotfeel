<script setup lang="ts">
  const props = defineProps<{
    imgSrc: string;
    type: 1 | 2 | 3; // 1代表个人头像，2代表空间头像
  }>();
</script>

<template>
  <image
    :src="props.imgSrc"
    mode="scaleToFill"
    :class="props.type === 1 ? 'person' : props.type === 2 ? 'space' : 'space-border'"
  />
</template>

<style lang="scss" scoped>
  .person {
    height: 80rpx;
    width: 80rpx;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 30rpx;
  }
  .space {
    width: 80rpx;
    height: 80rpx;
    border-radius: 20rpx;
    vertical-align: middle;
    margin-right: 30rpx;
  }
  .space-border {
    width: 96rpx;
    height: 96rpx;
    border-radius: 20rpx;
    border: 6rpx solid #fff;
    vertical-align: middle;
  }
</style>
