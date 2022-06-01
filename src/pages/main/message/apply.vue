<script setup lang="ts">
  import { onLoad } from '@dcloudio/uni-app';
  import { reactive } from 'vue';
  import { reqDealFriendApply } from '../../../server/api/friend';
  import type { ApplyNotice } from '../../../server/api/notice';
  import { reqApplyNotice } from '../../../server/api/notice';

  interface Apply {
    applyInfo: ApplyNotice[];
  }
  const apply = reactive<Apply>({
    applyInfo: [],
  });
  onLoad(async () => {
    const data = await reqApplyNotice(apply.applyInfo.length);
    console.log(data);
    apply.applyInfo.push(...data);
  });
  // 处理好友申请
  async function dealApply(applyId: string, status: 0 | 1 | 2) {
    console.log(applyId);
    const data = await reqDealFriendApply(applyId, status);
    console.log(data);
  }
</script>

<template>
  <view class="header">
    <Back class="back" />
    <text class="title">消息</text>
    <uni-icons
      type="more-filled"
      color="#fff"
      style="
        font-size: 60rpx;
        position: absolute;
        top: 80rpx;
        left: 680rpx;
        transform: rotate(90deg);
      "
    />
  </view>
  <view class="main">
    <view v-for="(item, index) in apply.applyInfo" :key="index" class="apply-msg">
      <image :src="item.userAvatar" class="avatar" />
      <view class="apply">
        <view>
          <text class="nickname">{{ item.userNickname }}</text>
        </view>
        <text class="content">{{ item.content }}</text>
        <view class="btn-reject" @tap="dealApply(item.applicantId, 2)">拒绝</view>
        <view class="btn-accept" @tap="dealApply(item.applicantId, 1)">接受</view>
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
    padding: 20rpx;
    .apply-msg {
      display: flex;

      .avatar {
        width: 96rpx;
        height: 96rpx;
        border-radius: 50%;
        margin: 32rpx;
      }

      .apply {
        width: 550rpx;
        padding: 32rpx 0;
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
          margin-left: 10rpx;
          width: 90rpx;
          height: 42rpx;
          border-radius: 30rpx;
          text-align: center;
          border: 1px solid $color-sf;
          color: $color-sf;
          font-size: 24rpx;
        }
        .btn-reject {
          float: right;
          margin-top: -20rpx;
          margin-left: 10rpx;
          width: 90rpx;
          height: 42rpx;
          border-radius: 30rpx;
          text-align: center;
          border: 1px solid #ef4444;
          color: #ef4444;
          font-size: 24rpx;
        }
      }
    }
  }
</style>
