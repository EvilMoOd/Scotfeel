<script setup lang="ts">
  import { ref } from 'vue';
  import { reqDealFriendApply } from '../../../server/api/friend';
  import { useNoticeStore } from '../../../store/modules/noticeStore';

  const message = ref('');
  const success = ref<any>(null);
  const fail = ref<any>(null);
  const noticeStore = useNoticeStore();
  console.log(noticeStore.$state);
  // 处理好友申请
  async function dealApply(applyId: string, status: 0 | 1 | 2) {
    try {
      await reqDealFriendApply(applyId, status);
      const index = noticeStore.applyList.findIndex((item) => item.applyId === applyId);
      noticeStore.dealApply(index);
      if (status === 1) {
        message.value = '已添加好友';
      } else if (status === 2) {
        message.value = '已拒绝';
      }
      success.value.popUp();
    } catch (err) {
      message.value = err as string;
      fail.value.popUp();
    }
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
        position: absolute;
        top: 80rpx;
        left: 680rpx;
        font-size: 60rpx;
        transform: rotate(90deg);
      "
    />
  </view>
  <view class="main">
    <view v-for="(item, index) in noticeStore.applyList" :key="index" class="apply-msg">
      <image :src="item.userAvatar" class="avatar" />
      <view class="apply">
        <view>
          <text class="nickname">{{ item.userNickname }}</text>
        </view>
        <text class="content">{{ item.content }}</text>
        <view class="btn-reject" @tap="dealApply(item.applyId, 2)">拒绝</view>
        <view class="btn-accept" @tap="dealApply(item.applyId, 1)">接受</view>
      </view>
    </view>
  </view>
  <PopMessage ref="success" success>{{ message }}</PopMessage>
  <PopMessage ref="fail">{{ message }}</PopMessage>
</template>

<style lang="scss" scoped>
  .header {
    @include header;

    display: flex;
    justify-content: center;
    color: #fff;
    font-weight: bold;
    font-size: 36rpx;

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
        margin: 32rpx;
        border-radius: 50%;
      }

      .apply {
        width: 550rpx;
        padding: 32rpx 0;
        border-bottom: solid 2rpx #f2f2f2;

        .nickname {
          font-size: 28rpx;
        }

        .content {
          color: #aaa;
          font-size: 22rpx;
        }

        .btn-accept {
          float: right;
          width: 90rpx;
          height: 42rpx;
          margin-top: -20rpx;
          margin-left: 10rpx;
          color: $color-sf;
          font-size: 24rpx;
          text-align: center;
          border: 1px solid $color-sf;
          border-radius: 30rpx;
        }

        .btn-reject {
          float: right;
          width: 90rpx;
          height: 42rpx;
          margin-top: -20rpx;
          margin-left: 10rpx;
          color: #ef4444;
          font-size: 24rpx;
          text-align: center;
          border: 1px solid #ef4444;
          border-radius: 30rpx;
        }
      }
    }
  }
</style>
