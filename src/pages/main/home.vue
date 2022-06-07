<script setup lang="ts">
  import { ref } from 'vue';
  import { selectAllRecord } from '../../server/sql/chatRecord';
  import { selectAllFriends } from '../../server/sql/friend';
  import { selectAllGroupChat } from '../../server/sql/groupChat';
  import { selectAllSession } from '../../server/sql/sessionList';
  import { useNoticeStore } from '../../store/modules/noticeStore';
  import { useSessionListStore } from '../../store/modules/sessionListStore';
  import { useUserStore } from '../../store/modules/userStore';
  import FunctionList from './functionList.vue';

  const noticeStore = useNoticeStore();
  const sessionListStore = useSessionListStore();
  const userStore = useUserStore();
  console.log(userStore.userInfo);

  const isShow = ref(false);
  function displayPerson() {
    isShow.value = !isShow.value;
  }

  // function goMoment() {
  //   uni.navigateTo({ url: '/pages/main/moment' });
  // }

  // 有申请添加好友
  // function applyMessage(arguments) {}
  function goApply() {
    uni.navigateTo({ url: '/pages/main/message/apply' });
  }
  // 打开消息列表
  function goMessage() {
    uni.navigateTo({ url: '/pages/main/message/message' });
  }
  // 前往订阅页面
  function goSubscribe() {
    uni.navigateTo({ url: '/pages/subscribe/subscribeAndRecommend' });
  }

  async function deleteTable() {
    const f = await selectAllFriends(userStore.userInfo?.mainId as string);
    console.log(f);
    const ss = await selectAllSession(userStore.userInfo?.mainId as string);
    console.log(ss);
    const record = await selectAllRecord(userStore.userInfo?.mainId as string);
    console.log(record);
    const group = await selectAllGroupChat(userStore.userInfo?.mainId as string);
    console.log(group);
    console.log(userStore.token);
  }
</script>

<template>
  <!-- 首页聊天区 -->
  <view class="body" :class="{ mask: isShow }">
    <view class="header">
      <text class="title" @tap="displayPerson">Scotfeel</text>
      <view class="notice" @tap="goMessage">
        <uni-icons type="notification" size="4vh" color="#fff"></uni-icons>
        <uni-badge :text="noticeStore.totalMessage" size="small" class="msg-tip"></uni-badge>
      </view>
      <view class="new-apply" @tap="goApply">
        <uni-icons type="person" color="#fff" size="4vh" />
        <uni-badge :text="noticeStore.applyMessage" size="small" class="msg-tip2"></uni-badge>
      </view>
      <uni-icons
        type="search"
        size="4vh"
        class="icon-search"
        color="#fff"
        @tap="deleteTable"
      ></uni-icons>
    </view>
    <!-- 聊天列表 -->
    <scroll-view scroll-y="true" class="main">
      <MomentList />
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
  <Mask :show="isShow" :hidden="displayPerson" />
  <view class="subscribe" @tap="goSubscribe">
    <uni-icons type="arrow-right" color="#fff" size="40" />
  </view>
</template>

<style lang="scss" scoped>
  .body {
    position: absolute;
    z-index: 1;
    transition: 0.7s;

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
        position: absolute;
        top: 86rpx;
        left: 592rpx;
        .msg-tip {
          position: absolute;
          top: -12rpx;
          left: 25rpx;
        }
      }
      .new-apply {
        position: absolute;
        top: 83rpx;
        left: 502rpx;
        .msg-tip2 {
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
  .mask {
    @include mask;
  }
</style>
