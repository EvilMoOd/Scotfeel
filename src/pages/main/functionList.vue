<script setup lang="ts">
  import { ref } from 'vue';
  import { useSubscribeSpaceStore } from '../../store/modules/spaceStore';
  import { useUserStore } from '../../store/modules/userStore';

  const userStore = useUserStore();
  const spaceStore = useSubscribeSpaceStore();

  defineProps<{
    logout: () => void;
  }>();

  // 展示person
  const spaceShow = ref(false);
  // 打开订阅空间栏
  function openSpace() {
    spaceShow.value = !spaceShow.value;
  }
  // 前往个人主页
  function goPerson() {
    uni.navigateTo({
      url: `/pages/main/chat/personPage?sessionId=${userStore.userInfo?.mainId}`,
    });
  }
  // 前往通讯录
  function goMailList() {
    uni.navigateTo({ url: '/pages/main/menu/mailList' });
  }
  // 前往添加好友
  function goAddFriends() {
    uni.navigateTo({ url: '/pages/main/menu/searchFriend' });
  }
  // 前往创建群聊
  function goCreateGroupChat() {
    uni.navigateTo({ url: '/pages/main/menu/createGroupChat' });
  }
  // 前往创建空间
  function goCreateSpace() {
    uni.navigateTo({ url: '/pages/main/menu/createSpace' });
  }
  // 前往设置与隐私
  function goSetting() {
    uni.navigateTo({ url: '/pages/main/menu/setting' });
  }
</script>

<template>
  <view class="menu">
    <view class="person-top">
      <view class="person-place" @tap="goPerson">
        <image :src="userStore.userInfo?.avatar" class="avatar" />
        <view class="person-msg">
          <view class="name">{{ userStore.userInfo?.nickname }}</view>
          <view class="id-card">{{ userStore.userInfo?.account }}</view>
        </view>
        <uni-icons type="scan" class="icon-erweima" color="#fff" size="24" />
      </view>
      <view class="space" @tap="openSpace">
        订阅空间
        <uni-icons type="bottom" size="16" class="arrow" :style="{ color: '#fff' }"></uni-icons>
      </view>
    </view>
    <!-- 订阅空间 -->
    <scroll-view scroll-y class="space-hidden" :class="{ 'space-show': spaceShow }">
      <view class="space-place">
        <SpaceIdCard
          v-for="space in spaceStore.subscribeSpace"
          :key="space.spaceId"
          :avatar="space.avatar"
          :space-id="space.spaceId"
          :nickname="space.nickname"
          :role="space.role"
        />
      </view>
    </scroll-view>
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
</template>

<style lang="scss" scoped>
  // 侧边栏
  .menu {
    position: absolute;
    z-index: 20;
    width: 65%;
    height: 100vh;
    background-color: #fff;
    transform: translateX(-400rpx);
    visibility: hidden;
    opacity: 0;
    transition: 0.5s;

    .person-top {
      position: absolute;
      z-index: 20;
      width: 100%;
      height: 150rpx;
      padding-top: 50rpx;
      overflow: hidden;
      background-color: $color-sf;

      .person-place {
        display: flex;

        .avatar {
          width: 80rpx;
          height: 80rpx;
          margin: 0 30rpx 0 24rpx;
          border-radius: 50%;
        }

        .person-msg {
          width: 36.5vw;
          color: #fff;
          font-size: 28rpx;

          .id-card {
            color: #fff;
            font-size: 20rpx;
          }
        }

        .icon-erweima {
          height: 40rpx;
          margin-top: 12rpx;
          font-size: 40rpx;
        }
      }

      .space {
        margin-top: 20rpx;
        margin-left: 135rpx;
        color: #fff;
        font-size: 24rpx;

        .arrow {
          margin-left: 170rpx;
        }
      }
    }

    .space-hidden {
      position: absolute;
      left: 16vw;
      z-index: 10;
      width: 327rpx;
      height: 800rpx;
      padding: 10rpx 10rpx 0;
      background-color: #f2f2f2;
      border-radius: 30rpx;
      transform: translateY(-500rpx);
      visibility: hidden;
      opacity: 0;
      transition: 0.5s;
    }

    .space-show {
      transform: translateY(200rpx);
      visibility: visible;
      opacity: 1;

      .space-place {
        display: flex;
        flex-wrap: wrap;
      }
    }

    .function-place {
      position: absolute;
      z-index: 5;
      height: 620rpx;
      margin-top: 200rpx;
      padding: 20rpx;

      .function {
        width: 100%;
        border-bottom: 1rpx solid #f2f2f2;

        .fuc {
          padding: 30rpx;
          font-size: 26rpx;

          text {
            margin-right: 40rpx;
          }
        }
      }

      .setup {
        padding: 30rpx;
        font-size: 26rpx;

        text {
          margin-right: 40rpx;
        }
      }
    }

    .logout {
      margin-top: 880rpx;
      padding: 80rpx 100rpx;
      color: #f25b6c;
      font-size: 28rpx;
      text-align: center;
    }
  }
</style>
