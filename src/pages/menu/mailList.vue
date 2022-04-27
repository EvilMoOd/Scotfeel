<script setip lang="ts"></script>

<template>
  <view class="header">
    <Back />
    <view class="title">通讯录</view>
    <uni-icons class="back" type="search" size="5vh" color="#fff"></uni-icons>
  </view>
  <scroll-view scroll-y class="main">
    <view class="top">
      <view class="list">
        <image src="@/assets/images/img3.png" class="head" />
        <text class="nickname">新朋友</text>
      </view>
      <view class="list">
        <image src="@/assets/images/img3.png" class="head" />
        <text class="nickname">群聊</text>
      </view>
    </view>
    <view class="mail">
      <view class="list">
        <image src="@/assets/images/img3.png" class="head" />
        <text class="nickname">新朋友</text>
      </view>
      <view class="list">
        <image src="@/assets/images/img3.png" class="head" />
        <text class="nickname">新朋友</text>
      </view>
      <view class="list">
        <image src="@/assets/images/img3.png" class="head" />
        <text class="nickname">新朋友</text>
      </view>
      <view class="list">
        <image src="@/assets/images/img3.png" class="head" />
        <text class="nickname">新朋友</text>
      </view>
      <view class="list">
        <image src="@/assets/images/img3.png" class="head" />
        <text class="nickname">新朋友</text>
      </view>
      <view class="list">
        <image src="@/assets/images/img3.png" class="head" />
        <text class="nickname">新朋友</text>
      </view>
      <view class="list">
        <image src="@/assets/images/img3.png" class="head" />
        <text class="nickname">新朋友</text>
      </view>
      <view class="list">
        <image src="@/assets/images/img3.png" class="head" />
        <text class="nickname">新朋友</text>
      </view>
      <view class="list">
        <image src="@/assets/images/img3.png" class="head" />
        <text class="nickname">新朋友</text>
      </view>
      <view class="list">
        <image src="@/assets/images/img3.png" class="head" />
        <text class="nickname">新朋友</text>
      </view>
      <view class="list">
        <image src="@/assets/images/img3.png" class="head" />
        <text class="nickname">新朋友</text>
      </view>
    </view>
  </scroll-view>
</template>

<style lang="scss" scoped>
  .header {
    height: 160rpx;
    background-color: $color-sf;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .back {
      margin: 20rpx;
    }

    .title {
      display: inline-block;
      margin-bottom: 24rpx;
      font-weight: bold;
      font-size: 38rpx;
      color: #fff;
    }
  }

  .main {
    height: 1170rpx;
    background-color: #f0f1f2;

    .top {
      .list {
        padding: 12rpx 24rpx;
        background-color: #fff;

        .head {
          width: 80rpx;
          height: 80rpx;
          border-radius: 50%;
          vertical-align: middle;
          margin-right: 32rpx;
        }

        .nickname {
          font-size: 36rpx;
          font-weight: bolder;
        }
      }
    }

    .mail {
      margin-top: 40rpx;

      .list {
        padding: 12rpx 24rpx;
        background-color: #fff;

        .head {
          width: 80rpx;
          height: 80rpx;
          border-radius: 50%;
          vertical-align: middle;
          margin-right: 32rpx;
        }

        .nickname {
          font-size: 36rpx;
          font-weight: bolder;
        }
      }
    }
  }
</style>
