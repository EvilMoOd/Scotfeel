<script setup lang="ts">
  import { ref } from 'vue';

  const isShow = ref(false);
</script>

<template>
  <view class="header">
    <Back />
    <uni-icons type="more-filled" color="#fff" size="28" class="more-icon" @click="isShow = true" />
    <view class="more-hidden" :class="{ 'more-show': isShow }">
      <text>
        进群审核
        <switch color="#117986" style="transform: scale(0.5); margin: -10rpx -20rpx 0 -20rpx" />
      </text>
      <text>修改群聊昵称</text>
      <text>设置头像</text>
      <text style="color: #d9001b">解散</text>
    </view>
    <image src="@/assets/images/head.png" class="head" />
    <view>AMCC肌肉车俱乐部</view>
  </view>
  <view class="list">
    <view class="item">
      <text>消息免打扰</text>
      <switch color="#117986" style="transform: scale(0.5); float: right; margin-top: -10rpx" />
    </view>
    <view class="item">
      <text>设置群里的昵称</text>
      <AppIcon icon="fa:pencil" class="pencil"></AppIcon>
    </view>
  </view>
  <view class="br"></view>
  <view class="function">
    <view class="list2">
      <uni-icons
        type="personadd"
        color="#3EA8C2"
        size="24"
        style="display: inline-block; vertical-align: middle"
      />
      <text style="margin-left: 36rpx">邀请朋友</text>
    </view>
    <view class="list2">
      <uni-icons
        type="image"
        color="#3EA8C2"
        size="24"
        style="display: inline-block; vertical-align: middle"
      />
      <text style="margin-left: 36rpx">创建空间</text>
    </view>
  </view>
  <hr />
  <view class="list3">
    <view class="item">
      <image src="@/assets/images/head.png" class="head-user" mode="scaleToFill" />
      <text>海浪线</text>
      <view style="float: right; color: #3ea8c2; margin-top: 10rpx">群主</view>
    </view>
    <view class="item">
      <image src="@/assets/images/head.png" class="head-user" mode="scaleToFill" />
      <text>法医</text>
    </view>
  </view>
  <view v-show="isShow" class="mask" @click="isShow = false"></view>
</template>

<style lang="scss" scoped>
  .header {
    height: 392rpx;
    background-color: $color-sf;
    text-align: center;
    color: #fff;

    .back {
      float: left;
      margin-left: 24rpx;
      margin-top: 60rpx;
    }

    .more-icon {
      float: right;
      margin-right: 24rpx;
      margin-top: 60rpx;
    }
    .more-hidden {
      padding: 18rpx 6rpx;
      width: 234rpx;
      font-size: 26rpx;
      border-radius: 20rpx;
      display: flex;
      flex-direction: column;
      position: absolute;
      z-index: 100;
      right: 1rpx;
      top: 66rpx;
      background-color: #fff;
      box-shadow: 0 0 4rpx $color-sf;
      color: #000;
      @include hidden;
      text {
        margin: 10rpx 0;
      }
    }
    .more-show {
      @include show;
    }

    .head {
      width: 124rpx;
      height: 124rpx;
      border-radius: 50%;
      border: 3px solid #fff;
      margin-top: 108rpx;
    }
  }

  .list {
    font-size: 28rpx;
    padding: 0 36rpx 0 52rpx;

    .item {
      border-bottom: 1px solid #f2f2f2;
      padding: 36rpx 0;

      .pencil {
        display: inline-block;
        margin-left: 390rpx;
        color: #7f7f7f;
      }
    }
  }

  .br {
    height: 20rpx;
    background-color: #f2f2f2;
  }

  .function {
    padding: 0 56rpx;
    font-size: 28rpx;
    color: #4fb0c8;

    .list2 {
      margin: 24rpx 0;
    }
  }

  hr {
    width: 586rpx;
    margin-left: 120rpx;
    background-color: #f2f2f2;
    border: none;
    height: 1px;
  }

  .list3 {
    margin: 24rpx 0;
    padding: 0 56rpx;
    font-size: 26rpx;

    .item {
      margin: 30rpx 0;

      .head-user {
        width: 66rpx;
        height: 66rpx;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 20rpx;
      }
    }
  }
  .mask {
    width: 750rpx;
    height: 1334rpx;
    position: absolute;
    top: 0;
    z-index: 90;
  }
</style>
