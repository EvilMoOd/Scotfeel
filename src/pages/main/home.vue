<script setup lang="ts">
  import { onLoad } from '@dcloudio/uni-app';
  import { ref } from 'vue';
  import { useSubscribeSpaceStore } from '../../store/modules/subscribeSpaceStore';
  import { useUserStore } from '../../store/modules/userStore';
  // import { useInitStore } from '../../store/modules/initStore';

  const userStore = useUserStore();
  const subscribedSpaceStore = useSubscribeSpaceStore();
  // 展示person
  let isShow = ref(false);
  let spaceShow = ref(false);
  function displayPerson() {
    isShow.value = !isShow.value;
  }

  //打开消息列表
  function goMessage() {
    uni.navigateTo({ url: '/pages/main/message/message' });
  }

  // 打开订阅空间栏
  function openSpace() {
    spaceShow.value = !spaceShow.value;
  }
  //前往个人主页
  function goPerson() {
    uni.navigateTo({ url: '/pages/menu/person' });
  }
  //前往通讯录
  function goMailList() {
    uni.navigateTo({ url: '/pages/menu/mailList' });
  }
  //前往添加好友
  function goAddFriends() {
    uni.navigateTo({ url: '/pages/menu/addFriends' });
  }
  //前往创建群聊
  function goCreateGroupChat() {
    uni.navigateTo({ url: '/pages/menu/createGroupChat' });
  }
  //前往创建空间
  function goCreateSpace() {
    uni.navigateTo({ url: '/pages/menu/createSpace' });
  }
  // 前往设置与隐私
  function goSetting() {
    uni.navigateTo({ url: '/pages/menu/setting' });
  }
  // 前往订阅页面
  function goSubscribe() {
    uni.navigateTo({ url: '/pages/subscribe/subscribeAndRecommand' });
  }

  // 退出登录
  function logout() {
    userStore.userLogout();
    uni.redirectTo({ url: '/pages/login' });
  }

  onLoad(() => {
    //TODO初始化
    // initStore.init();
  });
</script>

<template>
  <!-- 首页聊天区 -->
  <view class="body">
    <view class="header">
      <text class="title" @tap="displayPerson">Scotfeel</text>
      <uni-icons
        type="notification"
        size="4vh"
        class="icon-bell"
        color="#fff"
        @tap="goMessage"
      ></uni-icons>
      <uni-icons type="search" size="4vh" class="icon-search" color="#fff"></uni-icons>
    </view>
    <!-- 聊天列表 -->
    <scroll-view scroll-y="true" class="main">
      <FriendsActive />
      <view class="chat-list">
        <ChatWithFriends />
        <GroupChat />
        <ChatWithFriends />
        <ChatWithFriends />
        <ChatWithFriends />
        <GroupChat />
        <GroupChat />
        <GroupChat />
      </view>
    </scroll-view>
  </view>

  <!-- 个人中心 -->
  <transition name="menu">
    <view v-show="isShow" class="menu">
      <view class="person-top">
        <view class="person-place" @tap="goPerson">
          <image :src="userStore.userInfo.avatar" class="avatar" />
          <view class="person-msg">
            <view class="name">{{ userStore.userInfo.nickname }}</view>
            <view class="idCard">{{ userStore.userInfo.account }}</view>
          </view>
          <view class="iconfont icon-erweima" :style="{ color: '#fff' }"></view>
        </view>
        <view class="space" @tap="openSpace">
          订阅空间
          <uni-icons type="bottom" size="16" class="arrow" :style="{ color: '#fff' }"></uni-icons>
        </view>
      </view>
      <!-- 订阅空间 -->
      <transition name="space">
        <scroll-view v-show="spaceShow" scroll-y class="space-show">
          <view class="space-place">
            <SpaceIdCard :img="subscribedSpaceStore.avatar" />
            <SpaceIdCard :img="subscribedSpaceStore.avatar" />
            <SpaceIdCard :img="subscribedSpaceStore.avatar" />
            <SpaceIdCard :img="subscribedSpaceStore.avatar" />
            <SpaceIdCard :img="subscribedSpaceStore.avatar" />
            <SpaceIdCard :img="subscribedSpaceStore.avatar" />
            <SpaceIdCard :img="subscribedSpaceStore.avatar" />
            <SpaceIdCard :img="subscribedSpaceStore.avatar" />
            <SpaceIdCard :img="subscribedSpaceStore.avatar" />
          </view>
        </scroll-view>
      </transition>
      <!-- 菜单项 -->
      <view class="function-place">
        <view class="function">
          <view class="fuc">
            <uni-icons type="scan" size="25"></uni-icons>
            扫一扫
          </view>
          <view class="fuc" @tap="goMailList">
            <uni-icons type="contact" size="25"></uni-icons>
            通讯录
          </view>
          <view class="fuc" @tap="goAddFriends">
            <uni-icons type="personadd" size="25"></uni-icons>
            添加好友
          </view>
          <view class="fuc" @tap="goCreateGroupChat">
            <uni-icons type="staff" size="25"></uni-icons>
            创建群聊
          </view>
          <view class="fuc" @tap="goCreateSpace">
            <uni-icons type="home" size="25"></uni-icons>
            创建空间
          </view>
        </view>
        <view class="setup" @tap="goSetting">
          <uni-icons type="gear" size="25"></uni-icons>
          设置与隐私
        </view>
      </view>
      <!-- 退出登录 -->
      <view class="logout" @tap="logout">退出登录</view>
    </view>
  </transition>
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

      .icon-bell {
        position: absolute;
        top: 82rpx;
        left: 592rpx;
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

        @media screen and (min-height: 896px) {
          height: 1280rpx;
        }
      }
    }
  }

  // 侧边栏
  .menu {
    height: 100vh;
    width: 65%;
    position: absolute;
    z-index: 20;
    background-color: #fff;
    animation: moveIn 0.2s linear;

    .person-top {
      position: absolute;
      z-index: 20;
      width: 100%;
      height: 150rpx;
      background-color: $color-sf;
      padding-top: 50rpx;
      overflow: hidden;

      .person-place {
        display: flex;

        .avatar {
          margin: 0 30rpx 0 24rpx;
          width: 80rpx;
          height: 80rpx;
          border-radius: 50%;
        }

        .person-msg {
          color: #fff;
          font-size: 28rpx;
          width: 36.5vw;

          .idCard {
            color: #fff;
            font-size: 20rpx;
          }
        }

        .icon-erweima {
          margin-top: 12rpx;
          font-size: 40rpx;
          height: 40rpx;
        }
      }

      .space {
        font-size: 24rpx;
        margin-top: 20rpx;
        color: #fff;
        margin-left: 135rpx;

        .arrow {
          margin-left: 170rpx;
        }
      }
    }

    .space-show {
      position: absolute;
      z-index: 10;
      left: 16vw;
      width: 327rpx;
      height: 800rpx;
      padding: 10rpx 10rpx 0 10rpx;
      background-color: #f2f2f2;
      border-radius: 30rpx;
      margin-top: 200rpx;
      .space-place {
        display: flex;
        flex-wrap: wrap;
      }
    }

    .function-place {
      position: absolute;
      z-index: 5;
      height: 620rpx;
      padding: 20rpx;
      margin-top: 200rpx;

      .function {
        width: 100%;
        border-bottom: 1rpx solid #f2f2f2;

        .fuc {
          font-size: 26rpx;
          padding: 30rpx;

          text {
            margin-right: 40rpx;
          }
        }
      }

      .setup {
        font-size: 26rpx;
        padding: 30rpx;

        text {
          margin-right: 40rpx;
        }
      }
    }

    .logout {
      margin-top: 880rpx;
      text-align: center;
      color: #f25b6c;
      font-size: 28rpx;
      padding: 80rpx 100rpx;
    }
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

  //个人中心弹窗动画
  .menu-enter-from,
  .menu-leave-to {
    left: -65vw;
  }

  .menu-enter-active,
  .menu-leave-active {
    transition: all 0.3s ease-out;
  }

  .menu-enter-to,
  .menu-leave-from {
    left: 0vw;
  }

  .space-enter-from,
  .space-leave-to {
    top: -800rpx;
  }

  .space-enter-active,
  .space-leave-active {
    transition: all 0.3s ease-out;
  }

  .space-enter-to,
  .space-leave-from {
    top: 0;
  }
</style>
