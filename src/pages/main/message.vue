<script setup lang="ts"></script>

<template>
  <view class="header">
    <back />
    <view class="title">消息</view>
  </view>
  <view class="function">
    <view>
      <uni-icons type="person" color="$color-sf" size="30" />
      <view>申请</view>
    </view>

    <view>
      <uni-icons type="chat" color="$color-sf" size="30" />
      <view>评论</view>
    </view>
    <view>
      <uni-icons type="heart" color="$color-sf" size="30" />
      <view>点赞</view>
    </view>
    <view>
      <uni-icons type="star" color="$color-sf" size="30" />
      <view>订阅</view>
    </view>
  </view>
  <view class="chat1">
    <image src="@/assets/images/head.png" class="user-head" />
    <view class="chat-place">
      <view>
        <text class="nickname">可莉</text>
      </view>
      <text class="content">今晚八点一起攻沙</text>
      <view class="btn-accept">接受</view>
    </view>
  </view>
  <view class="chat1">
    <image src="@/assets/images/head.png" class="user-head" />
    <view class="chat-place">
      <view>
        <text class="nickname">可莉</text>
      </view>
      <text class="content">今晚八点一起攻沙</text>
      <view class="btn-accept">接受</view>
    </view>
  </view>
  <view class="chat1">
    <image src="@/assets/images/head.png" class="user-head" />
    <view class="chat-place">
      <view>
        <text class="nickname">可莉</text>
      </view>
      <text class="content">今晚八点一起攻沙</text>
      <view class="btn-accept">接受</view>
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
      left: 10rpx;
      top: 80rpx;
    }

    .title {
      margin-top: 80rpx;
    }
  }

  .function {
    display: flex;
    justify-content: space-between;
    padding: 50rpx 80rpx 30rpx 80rpx;
    font-size: 20rpx;
    text-align: center;
  }

  .chat1 {
    display: flex;

    .user-head {
      width: 96rpx;
      height: 96rpx;
      border-radius: 50%;
      margin: 32rpx;
    }

    .chat-place {
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
        width: 90rpx;
        height: 42rpx;
        border-radius: 30rpx;
        text-align: center;
        border: 1px solid $color-sf;
        color: $color-sf;
        font-size: 24rpx;
      }
    }
  }
</style>
