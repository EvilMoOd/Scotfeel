<script setup lang="ts">
  import { onLoad } from '@dcloudio/uni-app';
  import { ref, reactive } from 'vue';
  import { useChatRecordStore } from '../../../store/modules/chatRecordStore';
  // import { useChattingStore } from '../../../store/modules/chatting';
  import type { Login } from '../../../store/modules/userStore';
  import { useFriendStore } from '../../../store/modules/friendStore';

  const user: Login = uni.getStorageSync('user');
  const chatRecordStore = useChatRecordStore();
  const friendStore = useFriendStore();
  // const chat = useChattingStore();

  let msg = ref('');
  const chat = reactive({
    chatRecord: [
      {
        id: 1,
        sessionId: '85',
        userId: '',
        content: '吃饭了吗',
        contentType: 1,
        belongToId: '20',
        createTime: '1973-11-01 10:21:31',
      },
    ],
    friendInfo: {
      friendId: '85',
      nickname: '可莉',
      remarkName: '起报战议去层定',
      avatar: 'http://dummyimage.com/100x100',
      spaceId: '61',
      isDeletedByFriend: 0,
      belongToId: '13',
      account: 'reprehenderit aliqua pariatur esse',
      backgroundImage: 'http://dummyimage.com/400x400',
      noticeFlag: 0,
    },
  });
  function init(record: any, friendInfo: any) {
    chat.chatRecord = record;
    chat.friendInfo = friendInfo;
  }
  //前往个人介绍页面
  function goFriendPerson() {
    uni.navigateTo({ url: '/pages/main/personChat/friendDetail' });
  }
  //过滤对方和自己的消息
  onLoad((params: any) => {
    const record = chatRecordStore.$state.filter(
      (item) => item.sessionId === params.sessionId || item.sessionId === user.userInfo.mainId
    );
    const friendInfo = friendStore.$state.filter((item) => item.friendId === params.sessionId);
    init(record, friendInfo);
  });
</script>

<template>
  <view class="header">
    <Back />
    <view class="user" @tap="goFriendPerson">
      <image :src="chat.friendInfo.avatar" class="avatar" />
      <text class="nickname">{{ chat.friendInfo.nickname }}</text>
    </view>
    <uni-icons class="more" type="more-filled" size="5vh" color="#fff"></uni-icons>
  </view>
  <scroll-view scroll-y scroll-top="999999" class="main">
    <view v-for="cr in chat.chatRecord" :key="cr.id">
      <!-- 我的消息 -->

      <view v-if="cr.userId === user.userInfo.mainId" class="contain">
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
    height: 78vh;
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
