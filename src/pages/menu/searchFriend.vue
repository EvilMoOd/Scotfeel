<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import type { PersonInfo } from '../../server/api/user';
  import { reqSearchUser } from '../../server/api/user';

  const searchText = ref('');
  const searchInfo = reactive<{ personInfo: PersonInfo | undefined }>({
    personInfo: undefined,
  });
  async function search(content: string) {
    const result = await reqSearchUser(content);
    console.log(result);
    searchInfo.personInfo = result;
  }
  // 前往添加好友申请
  function goAddFriends() {
    uni.navigateTo({
      url: `/pages/menu/addFriends?appliedUserId=${searchInfo.personInfo?.userId}`,
    });
  }
</script>

<template>
  <view class="header">
    <Back class="back" />
    <text class="title">添加好友</text>
  </view>
  <view class="main">
    <uni-easyinput v-model="searchText" placeholder="搜索好友" @confirm="search"></uni-easyinput>
    <view v-if="searchInfo.personInfo" class="personInfo">
      <image :src="searchInfo.personInfo?.avatar" class="avatar" />
      <view class="personMsg">
        <view>
          <text class="nickname">{{ searchInfo.personInfo?.nickname }}</text>
        </view>
        <text class="content">{{ searchInfo.personInfo?.signature }}</text>
        <view class="btn-accept" @tap="goAddFriends">添加好友</view>
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

        .btn-accept {
          float: right;
          margin-top: -20rpx;
          width: 150rpx;
          height: 42rpx;
          border-radius: 30rpx;
          text-align: center;
          border: 1px solid $color-sf;
          color: $color-sf;
          font-size: 24rpx;
        }
      }
    }
  }
</style>
