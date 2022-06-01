<script setup lang="ts">
  import type { SessionListInfo } from '../../store/modules/sessionListStore';
  import day from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import 'dayjs/locale/zh-cn';

  day.extend(relativeTime);
  day.locale('zh-cn');
  const props = defineProps<{
    list: SessionListInfo;
  }>();

  // 前往聊天页详情
  function goChat(type: 1 | 2, params: string) {
    type === 1
      ? uni.navigateTo({ url: `/pages/main/personChat/chat?sessionId=${params}` })
      : uni.navigateTo({ url: `/pages/main/groupChat/groupChat?sessionId=${params}` });
  }
</script>

<template>
  <!-- 聊天信息条 -->
  <view class="chat" @tap="goChat(props.list.type, props.list.sessionId)">
    <image :src="props.list.avatar" class="user-avatar" />

    <view class="chat-place">
      <view>
        <text class="nickname">{{ props.list.nickname }}</text>
        <text class="time">{{ day().from(day(props.list.updateTime)) }}</text>
      </view>
      <text class="content">
        <text v-if="props.list.type === 2" style="color: blue">{{ props.list.chatorName }}：</text>
        <text v-if="props.list.contentType === 0">{{ props.list.content }}</text>
        <text v-else>[图片]</text>
      </text>
      <uni-badge :text="props.list.unReadCount" size class="msg-tip"></uni-badge>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  .chat {
    display: flex;

    .user-avatar {
      width: 96rpx;
      height: 96rpx;
      border-radius: 50%;
      margin: 27rpx;
    }

    .chat-place {
      width: 560rpx;
      padding: 27rpx;
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
        color: #aaa;
        font-size: 26rpx;
      }

      .msg-tip {
        float: right;
      }
    }
  }
</style>
