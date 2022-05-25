<script setup lang="ts">
  import { useSubscribeSpaceStore } from '../../store/modules/spaceStore';

  const spaceStore = useSubscribeSpaceStore();

  function enterInSpace() {
    uni.navigateTo({ url: '/pages/space/space' });
  }
</script>

<template>
  <view class="header">
    <Back class="back" />
    <text class="title">申请加入空间</text> 
  </view>
  <view class="main">
    <text>申请理由</text>
    <textarea class="applyReason" cols="30" rows="10"></textarea>
    <image
      src="@/assets/images/determine.jpg"
      class="determine"
      mode="aspectFill"
      @tap="enterInSpace"
    />
  </view>
</template>

<style lang="scss" scoped>
  .header {
    @include header;
    display: flex;
    justify-content: center;
    font-size: 36rpx;
    font-weight: bold;
    color: #fff;
    .back {
      position: absolute;
      top: 80rpx;
      left: 20rpx;
    }
    .title {
      margin-top: 80rpx;
    }
  }
  .main {
    padding: 50rpx;
    .applyReason {
      margin-top: 20rpx;
      background-color: #f2f2f2;
      border-radius: 40rpx;
      padding: 20rpx;
    }
    .determine {
      margin: 500rpx;
      width: 120rpx;
      height: 120rpx;
    }
  }
</style>
