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
    width: 80rpx;
    height: 80rpx;
    margin-right: 30rpx;
    vertical-align: middle;
    border-radius: 50%;
  }

  .space {
    width: 80rpx;
    height: 80rpx;
    margin-right: 30rpx;
    vertical-align: middle;
    border-radius: 20rpx;
  }

  .space-border {
    width: 96rpx;
    height: 96rpx;
    vertical-align: middle;
    border: 6rpx solid #fff;
    border-radius: 20rpx;
  }
</style>
