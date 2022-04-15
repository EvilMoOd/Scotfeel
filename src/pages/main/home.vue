<script setup lang="ts">
  import { onLoad } from '@dcloudio/uni-app';
  import { ref } from 'vue';
  import { useUserStore } from '../../store/modules/userStore';

  const userStore = useUserStore();

  // 展示person
  let isShow = ref(false);
  let spaceShow = ref(false);
  function displayPerson() {
    isShow.value = !isShow.value;
  }

  //打开消息列表
  function goMessage() {
    uni.navigateTo({ url: '/pages/main/message' });
  }
  //前往聊天页详情
  function goChat() {
    uni.navigateTo({ url: '/pages/main/personChat/chat' });
  }
  function goGroupChat() {
    uni.navigateTo({ url: '/pages/main/groupChat/groupChat' });
  }
  // 打开订阅空间栏
  function openSpace() {
    spaceShow.value = !spaceShow.value;
  }

  //前往个人主页
  function goPerson() {
    uni.navigateTo({ url: '/pages/menu/person' });
  }
  // 前往订阅空间
  function goSpace() {
    uni.navigateTo({ url: '/pages/menu/space' });
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
    uni.navigateTo({ url: '/pages/subscribe/subscribe' });
  }

  // 退出登录
  function loginOut() {
    userStore.loginOut();
    uni.redirectTo({ url: '/pages/login' });
  }

  onLoad(() => {
    //TODO初始化
    if (!uni.getStorageSync('user')) {
      uni.redirectTo({ url: '/pages/login' });
    }
  });
</script>

<template>
  <!-- 首页聊天区 -->
  <view class="body">
    <view class="header">
      <text class="title" @tap="displayPerson">Scotfeel</text>
      <uni-icons
        @tap="goMessage"
        type="notification"
        size="4vh"
        class="icon-bell"
        color="#fff"
      ></uni-icons>
      <uni-icons type="search" size="4vh" class="icon-search" color="#fff"></uni-icons>
    </view>
    <!-- 聊天列表 -->
    <scroll-view scroll-y="true" class="main">
      <friendsActive />
      <view class="chat-list">
        <view class="chat1" @tap="goChat">
          <image src="@/assets/images/img1.png" class="user-head" />
          <view class="chat-place">
            <view>
              <text class="nickname">呜呜</text>
              <text class="time">18:22</text>
            </view>
            <text class="content">今晚八点一起攻沙</text>

            <view class="msg-tip">19</view>
          </view>
        </view>
        <view class="chat1" @tap="goGroupChat">
          <image src="@/assets/images/img2.jpg" class="user-head" />
          <view class="chat-place">
            <view>
              <text class="nickname">某某群聊</text>
              <text class="time">18:22</text>
            </view>
            <text class="content">今晚八点一起攻沙</text>

            <view class="msg-tip">19</view>
          </view>
        </view>
        <view class="chat1">
          <image src="@/assets/images/head.png" class="user-head" />
          <view class="chat-place">
            <view>
              <text class="nickname">可莉</text>
              <text class="time">18:22</text>
            </view>
            <text class="content">今晚八点一起攻沙</text>

            <view class="msg-tip">19</view>
          </view>
        </view>
        <view class="chat1">
          <image src="@/assets/images/head.png" class="user-head" />
          <view class="chat-place">
            <view>
              <text class="nickname">可莉</text>
              <text class="time">18:22</text>
            </view>
            <text class="content">今晚八点一起攻沙</text>

            <view class="msg-tip">19</view>
          </view>
        </view>
        <view class="chat1">
          <image src="@/assets/images/head.png" class="user-head" />
          <view class="chat-place">
            <view>
              <text class="nickname">可莉</text>
              <text class="time">18:22</text>
            </view>
            <text class="content">今晚八点一起攻沙</text>

            <view class="msg-tip">19</view>
          </view>
        </view>
        <view class="chat1">
          <image src="@/assets/images/head.png" class="user-head" />
          <view class="chat-place">
            <view>
              <text class="nickname">可莉</text>
              <text class="time">18:22</text>
            </view>
            <text class="content">今晚八点一起攻沙</text>

            <view class="msg-tip">19</view>
          </view>
        </view>
        <view class="chat1">
          <image src="@/assets/images/head.png" class="user-head" />
          <view class="chat-place">
            <view>
              <text class="nickname">可莉</text>
              <text class="time">18:22</text>
            </view>
            <text class="content">今晚八点一起攻沙</text>

            <view class="msg-tip">19</view>
          </view>
        </view>
        <view class="chat1">
          <image src="@/assets/images/head.png" class="user-head" />
          <view class="chat-place">
            <view>
              <text class="nickname">可莉</text>
              <text class="time">18:22</text>
            </view>
            <text class="content">今晚八点一起攻沙</text>

            <view class="msg-tip">19</view>
          </view>
        </view>
        <view class="chat1">
          <image src="@/assets/images/head.png" class="user-head" />
          <view class="chat-place">
            <view>
              <text class="nickname">可莉</text>
              <text class="time">18:22</text>
            </view>
            <text class="content">今晚八点一起攻沙</text>

            <view class="msg-tip">19</view>
          </view>
        </view>
        <view class="chat1">
          <image src="@/assets/images/head.png" class="user-head" />
          <view class="chat-place">
            <view>
              <text class="nickname">可莉</text>
              <text class="time">18:22</text>
            </view>
            <text class="content">今晚八点一起攻沙</text>

            <view class="msg-tip">19</view>
          </view>
        </view>
        <view class="chat1">
          <image src="@/assets/images/head.png" class="user-head" />
          <view class="chat-place">
            <view>
              <text class="nickname">可莉</text>
              <text class="time">18:22</text>
            </view>
            <text class="content">今晚八点一起攻沙</text>

            <view class="msg-tip">19</view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>

  <!-- 个人中心 -->
  <transition name="menu">
    <view class="menu" v-show="isShow">
      <view class="person-top">
        <view class="person-place" @tap="goPerson">
          <image src="@/assets/images/myhead.png" class="person-head" />
          <view class="person-msg">
            <view class="name">木有鱼丸</view>
            <view class="idCard">@pdd</view>
          </view>
          <view class="iconfont icon-erweima" :style="{ color: '#fff' }"></view>
        </view>
        <view class="space" @tap="openSpace">
          订阅空间
          <uni-icons type="bottom" size="16" class="arrow" :style="{ color: '#fff' }"></uni-icons>
        </view>
      </view>
      <!-- 订阅空间 -->
      <scroll-view scroll-y class="space-show" v-show="spaceShow">
        <view class="space-place">
          <spaceCard img="/src/assets/head.png" />
          <spaceCard img="/src/assets/head.png" />
          <spaceCard img="/src/assets/head.png" />
          <spaceCard img="/src/assets/head.png" />
          <spaceCard img="/src/assets/head.png" />
          <spaceCard img="/src/assets/head.png" />
          <spaceCard img="/src/assets/head.png" />
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
      <view class="logout" @tap="loginOut">退出登录</view>
    </view>
  </transition>
  <!-- 遮罩 -->
  <view class="mask" v-show="isShow" @tap="displayPerson"></view>
  <view class="subscribe" @tap="goSubscribe">
    <appIcon icon="mdi:arrow-right-thin" class="icon-arrow"></appIcon>
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

        .chat1 {
          display: flex;

          .user-head {
            width: 96rpx;
            height: 96rpx;
            border-radius: 50%;
            margin: 32rpx;
          }

          .chat-place {
            width: 560rpx;
            padding: 32rpx;
            padding-left: 0;
            border-bottom: solid 2rpx #f2f2f2;

            .nickname-tip {
              color: #3ea8c2;
              font-size: 26rpx;
            }

            .time {
              color: #797979;
              font-size: 26rpx;
              float: right;
            }

            .content {
              font-size: 26rpx;
            }

            .msg-tip {
              width: 36rpx;
              height: 36rpx;
              border-radius: 50%;
              float: right;
              background-color: #f25b6c;
              text-align: center;
              color: #fff;
              font-size: 26rpx;
            }
          }
        }
      }
    }
  }

  // 侧边栏
  .menu {
    height: 100vh;
    width: 65%;
    position: absolute;
    z-index: 10;
    background-color: #fff;
    animation: moveIn 0.2s linear;

    .person-top {
      width: 100%;
      height: 150rpx;
      background-color: $color-sf;
      padding-top: 50rpx;
      overflow: hidden;

      .person-place {
        display: flex;

        .person-head {
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

      .space-place {
        display: flex;
        flex-wrap: wrap;
      }
    }

    .function-place {
      height: 620rpx;
      padding: 20rpx;

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
  .menu-enter-from {
    left: -65vw;
  }

  .menu-enter-active {
    transition: all 0.3s ease-out;
  }

  .menu-enter-to {
    left: 0vw;
  }

  .menu-leave-from {
    left: 0vw;
  }

  .menu-leave-active {
    transition: all 0.3s ease-out;
  }

  .menu-leave-to {
    left: -65vw;
  }
</style>
