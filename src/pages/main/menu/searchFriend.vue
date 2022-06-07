<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import type { PersonInfo } from '../../../server/api/user';
  import { reqSearchUser } from '../../../server/api/user';

  const searchText = ref('');
  const searchInfo = reactive<{ personInfo: PersonInfo | undefined }>({
    personInfo: undefined,
  });
  async function search(content: string) {
    searchInfo.personInfo = await reqSearchUser(content);
  }

  // 前往个人介绍页面
  function goFriendPerson(sessionId: string) {
    uni.navigateTo({ url: `/pages/main/chat/personPage?sessionId=${sessionId}` });
  }
</script>

<template>
  <view class="header">
    <Back class="back" />
    <text class="title">添加好友</text>
  </view>
  <view class="main">
    <uni-easyinput v-model="searchText" placeholder="搜索好友" @confirm="search"></uni-easyinput>
    <view
      v-if="searchInfo.personInfo"
      class="personInfo"
      @tap="goFriendPerson(searchInfo.personInfo?.userId as string)"
    >
      <image :src="searchInfo.personInfo?.avatar" class="avatar" />
      <view class="personMsg">
        <view>
          <text class="nickname">{{ searchInfo.personInfo?.nickname }}</text>
        </view>
        <text class="content">{{ searchInfo.personInfo?.signature }}</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  .header {
    @include header;
    display: flex;
    justify-content: center;
    font-size: 36rpx;
    font-weight: bold;
    color: #fff;
    .back {
      position: absolute;
      top: 80rpx;
      left: 20rpx;
    }
    .title {
      margin-top: 80rpx;
    }
  }
  .main {
    .personInfo {
      display: flex;

      .avatar {
        width: 96rpx;
        height: 96rpx;
        border-radius: 50%;
        margin: 32rpx;
      }

      .personMsg {
        width: 560rpx;
        padding: 32rpx;
        padding-left: 0;
        border-bottom: solid 2rpx #f2f2f2;

        .nickname {
          font-size: 28rpx;
        }

        .content {
          font-size: 22rpx;
          color: #aaa;
        }
      }
    }
  }
</style>
