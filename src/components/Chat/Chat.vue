<script setup lang="ts">
  import { useFriendStore } from '../../store/modules/friendStore';
  import type { SessionListInfo } from '../../store/modules/sessionListStore';
  import day from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import 'dayjs/locale/zh-cn';
  import { computed } from 'vue';
  import { useGroupChatStore } from '../../store/modules/groupStore';

  day.extend(relativeTime);
  day.locale('zh-cn');
  const props = defineProps<{
    list: SessionListInfo;
  }>();
  //查找朋友信息
  const friendStore = useFriendStore();
  const friendInfo = computed(() =>
    friendStore.friendInfo.find((item) => item.friendId === props.list.sessionId)
  );
  //查找群聊信息
  const groupStore = useGroupChatStore();
  const groupInfo = computed(() =>
    groupStore.groupInfo.find((item) => item.groupId === props.list.sessionId)
  );
  //前往聊天页详情
  function goChat(type: 1 | 2, params: string) {
    type === 1
      ? uni.navigateTo({ url: `/pages/main/personChat/chat?sessionId=${params}` })
      : uni.navigateTo({ url: `/pages/main/groupChat/groupChat?sessionId=${params}` });
  }
</script>

<template>
  <!-- 聊天信息条 -->
  <view class="chat" @tap="goChat(props.list.type, props.list.sessionId)">
    <image v-if="props.list.type === 1" :src="friendInfo?.avatar" class="user-head" />
    <image v-if="props.list.type === 2" :src="groupInfo?.avatar" class="user-head" />

    <view class="chat-place">
      <view>
        <!-- TODO -->
        <text v-if="props.list.type === 1" class="nickname">{{ friendInfo?.nickname }}</text>
        <text v-if="props.list.type === 2" class="nickname">{{ groupInfo?.nickname }}</text>
        <text class="time">{{ day().from(day.unix(props.list.updateTime)) }}</text>
      </view>
      <text class="content">
        <text v-if="props.list.type === 2" style="color: blue">{{ props.list.chatorName }}：</text>
        <text v-if="props.list.contentType === 1">{{ props.list.content }}</text>
        <text v-else>[图片]</text>
      </text>
      <uni-badge :text="props.list.unReadCount" size class="msg-tip"></uni-badge>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  .chat {
    display: flex;

    .user-head {
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
