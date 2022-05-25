<script setup lang="ts">
  import { onLoad } from '@dcloudio/uni-app';
  import { ref, reactive, nextTick } from 'vue';
  import type { User } from '../../../store/modules/userStore';
  import { insertRecord, selectSingleChat } from '../../../server/sql/chatRecord';
  import type { GroupInfo } from '../../../store/modules/groupStore';
  import { useGroupChatStore } from '../../../store/modules/groupStore';

  export interface Chat {
    chatRecord: ChatRecord[];
    groupInfo: GroupInfo;
  }
  export interface ChatRecord {
    id?: number;
    sessionId: string;
    userId: string;
    content: string;
    contentType: number;
    belongToId: string;
    createTime: number;
  }

  const user: User = uni.getStorageSync('user');
  const groupStore = useGroupChatStore();
  let sessionId: string;
  //输入信息
  let msg = ref('');

  //前往群聊介绍页面
  function goGroupIntroduction() {
    uni.navigateTo({ url: `/pages/main/groupChat/groupChatIntro?sessionId=${sessionId}` });
  }
  //过滤对方和自己的消息
  const scroll = ref(0);
  const chat = reactive<Chat>({
    chatRecord: [
      {
        id: 1,
        sessionId: '85',
        userId: '',
        content: '吃饭了吗',
        contentType: 1,
        belongToId: '20',
        createTime: 11111111111,
      },
    ],
    groupInfo: {
      groupId: '35',
      nickname: '考研摆烂',
      avatar: '61b0b7cc5af7a0db2c245f213bfa637b',
      memberCount: 'in reprehenderit',
      spaceId: '29',
      belongToId: '41',
      isDismissed: 0,
      spaceNickname: '金娟',
      spaceAvatar: '61b0b7cc5af7a0db2c245f213bfa637b',
      noticeFlag: 1,
    },
  });
  onLoad((params: any) => {
    sessionId = params.sessionId;
    const groupInfo = groupStore.groupInfo.find((item) => item.groupId === sessionId);
    init(groupInfo);
  });
  //初始化
  async function init(groupInfo: any) {
    chat.groupInfo = groupInfo;
    const record = await selectSingleChat(10000, sessionId, user.userInfo.mainId);
    chat.chatRecord = record as ChatRecord[];
    scroll.value += 1000;
  }
  //发送消息
  function submitMessage(e: any) {
    const newMsg = {
      id: 1,
      sessionId: sessionId,
      userId: user.userInfo.mainId,
      belongToId: user.userInfo.mainId,
      content: e.detail.value,
      contentType: 0,
      createTime: 11111111111,
    };
    chat.chatRecord.push(newMsg);
    console.log(chat.chatRecord);
    msg.value = '';
    insertRecord(
      sessionId,
      user.userInfo.mainId,
      e.detail.value,
      0,
      new Date().getTime(),
      user.userInfo.mainId
    );
    nextTick(() => (scroll.value += 10000));
  }
</script>

<template>
  <view class="header">
    <Back />
    <view class="user" @tap="goGroupIntroduction">
      <image :src="chat.groupInfo.avatar" class="avatar" />
      <text class="nickname">{{ chat.groupInfo.nickname }}</text>
    </view>
    <uni-icons class="more" type="more-filled" size="5vh" color="#fff"></uni-icons>
  </view>

  <scroll-view scroll-y :scroll-top="scroll" class="main">
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
