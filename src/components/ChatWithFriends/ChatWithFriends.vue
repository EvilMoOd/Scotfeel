<script setup lang="ts">
  //前往聊天页详情
  function goChat() {
    uni.navigateTo({ url: '/pages/main/personChat/chat' });
  }
</script>

<template>
  <!-- 聊天信息条 -->
  <view class="chat" @tap="goChat">
    <image src="@/assets/images/img1.png" class="user-head" />
    <view class="chat-place">
      <view>
        <text class="nickname">呜呜</text>
        <text class="time">18:22</text>
      </view>
      <text class="content">今晚八点一起攻沙</text>

      <view class="msg-tip">19</view>
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
        width: 36rpx;
        height: 36rpx;
        border-radius: 50%;
        float: right;
        background-color: #f25b6c;
        text-align: center;
        color: #fff;
        font-size: 26rpx;
      }
    }
  }
</style>
