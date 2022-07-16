<script setup lang="ts">
  import { onLoad } from '@dcloudio/uni-app';
  import { ref, reactive, nextTick } from 'vue';
  import type { ChatRecord } from '../../../server/sql/chatRecord';
  import { selectGroupChat, insertRecord } from '../../../server/sql/chatRecord';
  import { personMsg, _sendMessage } from '../../../server/webSocket';
  import { createUUID } from '../../../server/utils/uuid';
  import type { GroupChat } from '../../../server/api/user';
  import { useSessionListStore } from '../../../store/modules/sessionListStore';
  import { debounce } from 'lodash-es';
  import { useUserStore } from '../../../store/modules/userStore';
  import { useGroupChatStore } from '../../../store/modules/groupStore';
  import { selectAllMemberInfo } from '../../../server/sql/groupChatMember';

  export interface Chat {
    chatRecord: ChatRecord[];
    groupInfo: GroupChat;
  }

  const userStore = useUserStore();
  const groupStore = useGroupChatStore();
  const sessionListStore = useSessionListStore();
  let sessionId: string;
  let groupMemberIds: string[] = [];
  // 输入信息
  const msg = ref('');

  // 前往群聊介绍页面
  function goGroupIntroduction() {
    uni.navigateTo({ url: `/pages/main/groupChat/groupChatIntro?sessionId=${sessionId}` });
  }
  // 过滤对方和自己的消息
  const scroll = ref(0);
  const chat = reactive<Chat>({
    chatRecord: [],
    groupInfo: {
      groupId: '35',
      nickname: '考研摆烂',
      avatar: '61b0b7cc5af7a0db2c245f213bfa637b',
      memberCount: 0,
      spaceId: '29',
      belongToId: '41',
      isDismissed: 0,
      spaceNickname: '金娟',
      spaceAvatar: '61b0b7cc5af7a0db2c245f213bfa637b',
      noticeFlag: 1,
    },
  });
  onLoad((params: any) => {
    // 初始化sessionId
    sessionId = params.sessionId;
    // 初始化朋友信息
    const groupInfo = groupStore.groupInfo.find((item) => item.groupId === sessionId);
    init(groupInfo);
    // 监听页面实时消息
    personMsg.on('gMsg', (e: any) => {
      if (e.groupId === sessionId) {
        chat.chatRecord.push({
          sessionId: e.groupId,
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
  // 初始化
  async function init(groupInfo: any) {
    chat.groupInfo = groupInfo;
    // TODO lastid需要修改
    const record = await selectGroupChat(10000, sessionId, userStore.userInfo?.mainId as string);
    chat.chatRecord = record.reverse();
    const groupMember = await selectAllMemberInfo(sessionId, userStore.userInfo?.mainId as string);
    groupMemberIds = groupMember.map((item) => item.memberId);
    scroll.value += 1000;
  }
  // 发送消息
  function submitMessage(e: any) {
    const newMsg: ChatRecord = {
      sessionId: sessionId,
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
        groupMemberIds,
        content: e.detail.value,
        contentType: 0,
        messageType: 4,
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
      sessionListStore.newMessage(sessionId, e.detail.value, 0, Date.now(), 2);
    }, 1000)();
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
        margin-right: 32rpx;
        vertical-align: middle;
        border-radius: 50%;
      }

      .nickname {
        color: #fff;
        font-size: 36rpx;
      }
    }

    .more {
      margin: 30rpx;
      margin-left: auto;
    }
  }

  .main {
    height: 78vh;
    font-size: 26rpx;
    background-color: #f6f6f6;

    .chat-friend {
      width: fit-content;
      max-width: 60vw;
      margin-top: 20rpx;
      margin-left: 30rpx;
      padding: 16rpx 32rpx;
      word-break: break-all;
      background-color: #fff;
      border-radius: 0 60rpx 60rpx;
    }

    .contain {
      display: flex;
      flex-direction: column;

      .chat-me {
        width: fit-content;
        max-width: 60vw;
        margin-top: 20rpx;
        margin-right: 30rpx;
        margin-left: auto;
        padding: 16rpx 32rpx;
        word-break: break-all;
        background-color: #d5fad3;
        border-radius: 60rpx 0 60rpx 60rpx;
      }

      .chat-me-img {
        margin-top: 20rpx;
        margin-right: 30rpx;
        margin-left: auto;
      }
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    min-height: 10vh;
    max-height: 30vh;
    background-color: #eee;

    .input-msg {
      width: 620rpx;
      // height: 76rpx;
      max-height: 25vh;
      padding: 20rpx;
      text-indent: 20rpx;
      background-color: #fff;
      border-radius: 50rpx;
    }
  }
</style>
