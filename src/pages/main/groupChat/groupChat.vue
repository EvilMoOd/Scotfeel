<script setup lang="ts">
  import { onLoad } from '@dcloudio/uni-app';
  import { ref } from 'vue';
  import { useChatRecordStore } from '../../../store/modules/chatRecordStore';
  import { useChattingStore } from '../../../store/modules/chatting';
  import type { Login } from '../../../store/modules/userStore';
  import { useFriendStore } from '../../../store/modules/friendStore';

  const user: Login = uni.getStorageSync('user');
  const chatRecordStore = useChatRecordStore();
  const friendStore = useFriendStore();
  const chat = useChattingStore();

  let msg = ref('');
  //前往群聊介绍页面
  function goGroupIntroduction() {
    uni.navigateTo({ url: '/pages/main/groupChat/groupChatIntro' });
  }
  //过滤对方和自己的消息
  onLoad((params: any) => {
    const record = chatRecordStore.$state.filter(
      (item) => item.sessionId === params.sessionId || item.sessionId === user.userInfo.mainId
    );
    let friendInfo = friendStore.$state.filter((item) => item.friendId === params.sessionId);
    chat.init(record, friendInfo);
  });
</script>

<template>
  <view class="header">
    <Back />
    <view class="user" @tap="goGroupIntroduction">
      <image src="@/assets/images/img1.png" class="avatar" />
      <text class="nickname">呜呜</text>
    </view>
    <uni-icons class="more" type="more-filled" size="5vh" color="#fff"></uni-icons>
  </view>
  <scroll-view scroll-y class="main">
    <view v-for="cr in chat.chatRecord" :key="cr.id">
      <!-- 我的消息 -->

      <view v-if="cr.sessionId === user.userInfo.mainId" class="contain">
        <view :class="cr.contentType === 0 ? 'chat-me' : 'chat-me-img'">
          <view v-if="cr.contentType === 0">{{ cr.content }}</view>
          <image v-if="cr.contentType === 1" :src="cr.content" mode="aspectFit" lazy-load />
        </view>
      </view>

      <!-- 对方的消息 -->
      <view v-else class="chat-friend">
        {{ cr.content }}
      </view>
    </view>
  </scroll-view>
  <view class="footer">
    <input v-model="msg" class="input-msg" />
  </view>
</template>

<style lang="scss" scoped>
  .header {
    @include header;
    display: flex;
    align-items: flex-end;
    .back {
      margin: 30rpx 20rpx;
    }
    .user {
      margin: 20rpx 0;
      .avatar {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 32rpx;
      }
      .nickname {
        font-size: 36rpx;
        color: #fff;
      }
    }
    .more {
      margin: 30rpx;
      margin-left: auto;
    }
  }
  .main {
    height: 88vh;
    background-color: #f6f6f6;
    font-size: 26rpx;
    .chat-friend {
      margin-top: 20rpx;
      background-color: #fff;
      width: fit-content;
      max-width: 60vw;
      border-radius: 0 60rpx 60rpx 60rpx;
      padding: 16rpx 32rpx;
      margin-left: 30rpx;
      word-break: break-all;
    }
    .contain {
      display: flex;
      flex-direction: column;
      .chat-me {
        margin-top: 20rpx;
        margin-left: auto;
        background-color: #d5fad3;
        width: fit-content;
        max-width: 60vw;
        border-radius: 60rpx 0 60rpx 60rpx;
        padding: 16rpx 32rpx;
        margin-right: 30rpx;
        word-break: break-all;
      }
      .chat-me-img {
        margin-top: 20rpx;
        margin-left: auto;
        margin-right: 30rpx;
      }
    }
  }
  .footer {
    width: 100vw;
    height: 10vh;
    position: fixed;
    background-color: #eee;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .input-msg {
      height: 76rpx;
      width: 620rpx;
      background-color: #fff;
      border-radius: 50rpx;
      text-indent: 20rpx;
    }
  }
</style>
