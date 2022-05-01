<script setup lang="ts">
  import { ref } from 'vue';

  const isShow = ref(false);
</script>

<template>
  <view class="header">
    <Back />
    <uni-icons type="more-filled" color="#fff" size="28" class="more-icon" @click="isShow = true" />
    <transition name="more">
      <view v-show="isShow" class="more">
        <text>
          展示在个人主页
          <switch color="#117986" style="transform: scale(0.5); margin: -10rpx -20rpx 0 -20rpx" />
        </text>
        <text>
          首页左滑默认空间
          <switch color="#117986" style="transform: scale(0.5); margin: -10rpx -20rpx 0 -20rpx" />
        </text>
        <text>设置空间昵称</text>
        <text>设置空间背景</text>
        <text>私密设置</text>
        <text>设置头像</text>
        <text>空间认证</text>
      </view>
    </transition>
    <image src="@/assets/images/head.png" class="avatar" />
    <view>AMCC肌肉车俱乐部</view>
  </view>
  <view class="list">
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
  <TopTab tab1="用户成员" tab2="空间成员" height="550rpx">
    <template #s1>
      <scroll-view scroll-y class="member-list">
        <view class="item">
          <image src="@/assets/images/head.png" class="head-user" mode="scaleToFill" />
          <text>海浪线</text>
          <view style="float: right; color: #3ea8c2; margin-top: 10rpx">群主</view>
        </view>
        <view class="item">
          <image src="@/assets/images/head.png" class="head-user" mode="scaleToFill" />
          <text>法医</text>
        </view>
        <view class="item">
          <image src="@/assets/images/head.png" class="head-user" mode="scaleToFill" />
          <text>法医</text>
        </view>
        <view class="item">
          <image src="@/assets/images/head.png" class="head-user" mode="scaleToFill" />
          <text>法医</text>
        </view>
        <view class="item">
          <image src="@/assets/images/head.png" class="head-user" mode="scaleToFill" />
          <text>法医</text>
        </view>
        <view class="item">
          <image src="@/assets/images/head.png" class="head-user" mode="scaleToFill" />
          <text>法医</text>
        </view>
        <view class="item">
          <image src="@/assets/images/head.png" class="head-user" mode="scaleToFill" />
          <text>法医</text>
        </view>
      </scroll-view>
    </template>
    <template #s2>
      <view class="my-space">
        <SpaceIdCard img="/src/assets/images/head.png" />
        <SpaceIdCard img="/src/assets/images/head.png" />
        <SpaceIdCard img="/src/assets/images/head.png" />
        <SpaceIdCard img="/src/assets/images/head.png" />
        <SpaceIdCard img="/src/assets/images/head.png" />
        <SpaceIdCard img="/src/assets/images/head.png" />
        <SpaceIdCard img="/src/assets/images/head.png" />
        <SpaceIdCard img="/src/assets/images/head.png" />
        <SpaceIdCard img="/src/assets/images/head.png" />
        <SpaceIdCard img="/src/assets/images/head.png" />
        <SpaceIdCard img="/src/assets/images/head.png" />
        <SpaceIdCard img="/src/assets/images/head.png" />
      </view>
    </template>
  </TopTab>

  <view v-show="isShow" class="mask" @tap="isShow = false"></view>
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
    .more {
      padding: 18rpx 6rpx;
      width: 294rpx;
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

      text {
        margin: 10rpx 0;
      }
    }

    .avatar {
      width: 144rpx;
      height: 144rpx;
      border-radius: 30rpx;
      border: 3px solid #fff;
      margin-top: 108rpx;
    }
  }

  .list {
    font-size: 28rpx;
    padding: 30rpx 36rpx 30rpx 52rpx;

    .item {
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

  .member-list {
    box-sizing: border-box;
    padding: 0 30rpx;
    height: 600rpx;
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

  .my-space {
    height: 550rpx;
    padding: 30rpx;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .mask {
    width: 750rpx;
    height: 1334rpx;
    position: absolute;
    top: 0;
    z-index: 90;
  }

  .more-enter-active {
    animation: bounce-in 0.5s;
  }

  .more-leave-active {
    transition: opacity 0.5s ease;
    animation: bounce-in 0.5s reverse;
  }

  .more-enter-from,
  .more-leave-to {
    opacity: 0;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }

    50% {
      transform: scale(1.25);
    }

    100% {
      transform: scale(1);
    }
  }
</style>
