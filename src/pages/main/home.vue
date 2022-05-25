<script setup lang="ts">
  import { onLoad } from '@dcloudio/uni-app';
  import { ref } from 'vue';
  import { useSessionListStore } from '../../store/modules/sessionListStore';
  import { useUserStore } from '../../store/modules/userStore';
  import FunctionList from './functionList.vue';

  const sessionListStore = useSessionListStore();
  const userStore = useUserStore();
  console.log(userStore.userInfo);

  let isShow = ref(false);
  function displayPerson() {
    isShow.value = !isShow.value;
  }

  //打开消息列表
  function goMessage() {
    uni.navigateTo({ url: '/pages/main/message/message' });
  }
  // 前往订阅页面
  function goSubscribe() {
    uni.navigateTo({ url: '/pages/subscribe/subscribeAndRecommand' });
  }

  onLoad(() => {
    //TODO初始化
    if (!userStore.token) {
      uni.redirectTo({ url: '/pages/login' });
    }
  });
</script>

<template>
  <!-- 首页聊天区 -->
  <view class="body">
    <view class="header">
      <text class="title" @tap="displayPerson">Scotfeel</text>
      <view class="notice">
        <uni-icons type="notification" size="4vh" color="#fff" @tap="goMessage"></uni-icons>
        <uni-badge :text="1" size="small" class="msg-tip"></uni-badge>
      </view>
      <uni-icons type="search" size="4vh" class="icon-search" color="#fff"></uni-icons>
    </view>
    <!-- 聊天列表 -->
    <scroll-view scroll-y="true" class="main">
      <FriendsActive />
      <view class="chat-list">
        <view
          v-for="(list, index) in sessionListStore.sessionListInfo"
          :key="sessionListStore.sessionListInfo[index].sessionId"
        >
          <Chat :list="list" />
        </view>
      </view>
    </scroll-view>
  </view>

  <!-- 个人中心 -->
  <FunctionList :class="{ 'show-menu': isShow }" />
  <!-- 遮罩 -->
  <view v-show="isShow" class="mask" @tap="displayPerson"></view>
  <view class="subscribe" @tap="goSubscribe">
    <AppIcon icon="mdi:arrow-right-thin" class="icon-arrow"></AppIcon>
  </view>
</template>

<style lang="scss" scoped>
  .body {
    position: absolute;
    z-index: 1;

    .header {
      @include header;

      .title {
        display: inline-block;
        margin-left: 26rpx;
        margin-top: 86rpx;
        font-weight: bold;
        font-size: 40rpx;
        color: #fff;
      }

      .notice {
        position: relative;
        top: -56rpx;
        left: 592rpx;
        .msg-tip {
          position: absolute;
          top: -12rpx;
          left: 25rpx;
        }
      }

      .icon-search {
        position: absolute;
        top: 82rpx;
        left: 676rpx;
      }
    }

    .main {
      .chat-list {
        height: 980rpx;

        @media screen and (min-height: 800px) {
          height: 1260rpx;
        }
      }
    }
  }

  .show-menu {
    visibility: visible;
    opacity: 1;
    transform: translateX(0);
  }

  .mask {
    width: 100vw;
    height: 100vh;
    background-color: rgba($color: #333, $alpha: 0.6);
    position: absolute;
    z-index: 9;
  }

  //订阅空间
  .subscribe {
    width: 80rpx;
    height: 80rpx;
    background-color: $color-sf;
    border-radius: 50%;
    position: fixed;
    z-index: 2;
    bottom: 20rpx;
    right: 100rpx;

    .icon-arrow {
      font-size: 100rpx;
      color: #fff;
      margin-top: -10rpx;
      margin-left: -10rpx;
    }
  }
</style>
