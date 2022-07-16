<script setup lang="ts">
  import { useGroupChatStore } from '../../../store/modules/groupStore';

  const groupStore = useGroupChatStore();

  function goGroupDetail(groupId: string) {
    uni.navigateTo({ url: `/pages/main/groupChat/groupChat?sessionId=${groupId}` });
  }
</script>

<template>
  <view class="header">
    <Back />
    <view class="title">群聊</view>
    <uni-icons class="back" type="search" size="5vh" color="#fff"></uni-icons>
  </view>
  <scroll-view scroll-y class="main">
    <view class="mail">
      <view
        v-for="group in groupStore.groupInfo"
        :key="group.groupId"
        class="list"
        @tap="goGroupDetail(group.groupId)"
      >
        <view v-if="group.isDismissed == 0">
          <image :src="group.avatar" class="avatar" />
          <text class="nickname">{{ group.nickname }}</text>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 160rpx;
    background-color: $color-sf;

    .back {
      margin: 20rpx;
    }

    .title {
      display: inline-block;
      margin-bottom: 24rpx;
      color: #fff;
      font-weight: bold;
      font-size: 38rpx;
    }
  }

  .main {
    height: 1170rpx;
    background-color: #f0f1f2;

    .mail {
      margin-top: 40rpx;

      .list {
        padding: 12rpx 24rpx;
        background-color: #fff;

        .avatar {
          width: 80rpx;
          height: 80rpx;
          margin-right: 32rpx;
          vertical-align: middle;
          border-radius: 50%;
        }

        .nickname {
          font-weight: bolder;
          font-size: 36rpx;
        }
      }
    }
  }
</style>
