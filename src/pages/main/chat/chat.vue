<script setup lang="ts">
  import { onLoad } from '@dcloudio/uni-app';
  import { ref, reactive, nextTick } from 'vue';
  import { debounce } from 'lodash-es';
  import { useFriendStore } from '../../../store/modules/friendStore';
  import type { ChatRecord } from '../../../server/sql/chatRecord';
  import { insertRecord, selectSingleChat } from '../../../server/sql/chatRecord';
  import { personMsg, _sendMessage } from '../../../server/webSocket';
  import { createUUID } from '../../../server/utils/uuid';
  import type { FriendInfo } from '../../../server/api/user';
  import { useSessionListStore } from '../../../store/modules/sessionListStore';
  import { useUserStore } from '../../../store/modules/userStore';

  export interface Chat {
    chatRecord: ChatRecord[];
    friendInfo: FriendInfo;
  }

  const userStore = useUserStore();
  const friendStore = useFriendStore();
  const sessionListStore = useSessionListStore();
  let sessionId: string;
  // 输入信息
  const msg = ref('');

  // 前往个人介绍页面
  function goFriendPerson() {
    uni.navigateTo({ url: `/pages/main/chat/personPage?sessionId=${sessionId}` });
  }
  // 过滤对方和自己的消息
  const scroll = ref(0);
  const chat = reactive<Chat>({
    chatRecord: [],
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
      signature: '',
    },
  });

  // 初始化
  async function init(friendInfo: any) {
    chat.friendInfo = friendInfo;
    // TODO lastid需要修改
    const chatRecord = await selectSingleChat(
      10000,
      sessionId,
      userStore.userInfo?.mainId as string
    );
    chat.chatRecord = chatRecord.reverse();
    scroll.value += 1000;
  }
  onLoad((params) => {
    // 初始化sessionId
    sessionId = params.sessionId as string;
    // 初始化朋友信息
    const friendInfo = friendStore.friendsInfo.find((item) => item.friendId === sessionId);
    init(friendInfo);
    // 监听页面实时消息
    personMsg.on('msg', (e: any) => {
      if (e.fromId === sessionId) {
        chat.chatRecord.push({
          sessionId: e.fromId,
          userId: e.fromId,
          content: e.content,
          contentType: e.contentType,
          belongToId: userStore.userInfo?.mainId as string,
          createTime: e.createTime,
        });
        scroll.value += 1000;
      }
    });
  });
  // 发送消息
  function submitMessage(e: any) {
    const newMsg: ChatRecord = {
      sessionId,
      userId: userStore.userInfo?.mainId as string,
      belongToId: userStore.userInfo?.mainId as string,
      content: e.detail.value,
      contentType: 0,
      createTime: Date.now(),
    };
    chat.chatRecord.push(newMsg);
    msg.value = '';
    // TODO消息发送加载图标
    _sendMessage(
      JSON.stringify({
        toId: sessionId,
        content: e.detail.value,
        contentType: 0,
        messageType: 3,
        time: Date.now(),
        sequenceId: createUUID(),
      })
    );
    insertRecord(
      sessionId,
      userStore.userInfo?.mainId as string,
      e.detail.value,
      0,
      Date.now(),
      userStore.userInfo?.mainId as string
    );
    debounce(() => {
      sessionListStore.newMessage(sessionId, e.detail.value, 0, Date.now(), 1);
    }, 1000)();
    nextTick(() => {
      scroll.value += 10000;
    });
  }
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

  <scroll-view scroll-y :scroll-top="scroll" class="main">
    <view v-for="cr in chat.chatRecord" :key="cr.id">
      <!-- 我的消息 -->

      <view v-if="cr.userId === userStore.userInfo?.mainId" class="contain">
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
    <textarea
      v-model="msg"
      class="input-msg"
      auto-height
      auto-blur
      maxlength="-1"
      confirm-type="send"
      confirm-hold
      @confirm="submitMessage"
    />
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
    max-height: 30vh;
    min-height: 10vh;
    position: fixed;
    background-color: #eee;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .input-msg {
      // height: 76rpx;
      max-height: 25vh;
      width: 620rpx;
      padding: 20rpx;
      background-color: #fff;
      border-radius: 50rpx;
      text-indent: 20rpx;
    }
  }
</style>
