<script setup lang="ts">
  //前往群聊页
  function goGroupChat() {
    uni.navigateTo({ url: '/pages/main/groupChat/groupChat' });
  }
</script>

<template>
  <!-- 群聊消息条 -->
  <view class="chat" @tap="goGroupChat">
    <image src="@/assets/images/img2.jpg" class="user-head" />
    <view class="chat-place">
      <view>
        <text class="nickname">某某群聊</text>
        <text class="time">18:22</text>
      </view>
      <text class="content">今晚八点一起攻沙</text>
      <uni-badge text="22" size class="msg-tip"></uni-badge>
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
