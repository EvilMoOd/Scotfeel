<script setup lang="ts"></script>

<template>
  <view class="header">
    <back />
    <text class="title">朋友动态</text>
  </view>
  <friendsActive style="background-color: #f2f2f2" />
  <scroll-view scroll-y class="main">
    <view class="posts">
      <view class="post">
        <view class="user">
          <image src="@/assets/images/head.png" class="head" />
          <text class="text">小妮</text>
        </view>
        <view><text>盼望着，春天的脚步接近了</text></view>
        <view class="picture">
          <image src="@/assets/images/img1.png" class="post-img" />
          <image src="@/assets/images/img2.jpg" class="post-img" />
        </view>
        <view class="post-state">
          <view class="co">
            <uni-icons type="chat" size="4vh" class="icon-search" color="$color-sf"></uni-icons>
            评论
          </view>
          <view class="co">
            <uni-icons type="heart" size="4vh" class="icon-search" color="$color-sf"></uni-icons>
            点赞
          </view>
          <view class="time">30分钟前</view>
        </view>
      </view>
      <view class="post">
        <view class="user">
          <image src="@/assets/images/head.png" class="head" />
          <text class="text">小妮</text>
        </view>
        <view><text>盼望着，春天的脚步接近了</text></view>
        <view class="picture">
          <image src="@/assets/images/img1.png" class="post-img" />
          <image src="@/assets/images/img2.jpg" class="post-img" />
        </view>
        <view class="post-state">
          <view class="co">
            <uni-icons type="chat" size="4vh" class="icon-search" color="$color-sf"></uni-icons>
            评论
          </view>
          <view class="co">
            <uni-icons type="heart" size="4vh" class="icon-search" color="$color-sf"></uni-icons>
            点赞
          </view>
          <view class="time">30分钟前</view>
        </view>
      </view>
      <view class="post">
        <view class="user">
          <image src="@/assets/images/head.png" class="head" />
          <text class="text">小妮</text>
        </view>
        <view><text>盼望着，春天的脚步接近了</text></view>
        <view class="picture">
          <image src="@/assets/images/img1.png" class="post-img" />
          <image src="@/assets/images/img2.jpg" class="post-img" />
        </view>
        <view class="post-state">
          <view class="co">
            <uni-icons type="chat" size="4vh" class="icon-search" color="$color-sf"></uni-icons>
            评论
          </view>
          <view class="co">
            <uni-icons type="heart" size="4vh" class="icon-search" color="$color-sf"></uni-icons>
            点赞
          </view>
          <view class="time">30分钟前</view>
        </view>
      </view>
      <view class="post">
        <view class="user">
          <image src="@/assets/images/head.png" class="head" />
          <text class="text">小妮</text>
        </view>
        <view><text>盼望着，春天的脚步接近了</text></view>
        <view class="picture">
          <image src="@/assets/images/img1.png" class="post-img" />
          <image src="@/assets/images/img2.jpg" class="post-img" />
        </view>
        <view class="post-state">
          <view class="co">
            <uni-icons type="chat" size="4vh" class="icon-search" color="$color-sf"></uni-icons>
            评论
          </view>
          <view class="co">
            <uni-icons type="heart" size="4vh" class="icon-search" color="$color-sf"></uni-icons>
            点赞
          </view>
          <view class="time">30分钟前</view>
        </view>
      </view>
    </view>
    <view></view>
  </scroll-view>
</template>

<style lang="scss" scoped>
.header {
  @include header;
  text-align: center;

  .back {
    position: absolute;
    left: 0;
    top: 60rpx;
  }

  .title {
    display: inline-block;
    margin-top: 70rpx;
    font-weight: bold;
    font-size: 38rpx;
    color: #fff;
  }
}

.main {
  height: 990rpx;
  background-color: #f2f2f2;

  .posts {
    .post {
      padding: 40rpx 30rpx 20rpx;
      border-radius: 15rpx;
      background-color: #fff;
      margin-bottom: 20rpx;
      font-size: 28rpx;

      .user {
        font-size: 28rpx;
        margin-bottom: 10rpx;

        .head {
          height: 66rpx;
          width: 66rpx;
          border-radius: 50%;
          vertical-align: middle;
          margin-right: 30rpx;
        }
      }

      .picture {
        .post-img {
          height: 340rpx;
          width: 340rpx;
          object-fit: cover;
          border-radius: 10rpx;
          margin: 2rpx;
          margin-top: 20rpx;
        }
      }

      .post-state {
        display: flex;

        .co {
          margin-left: 40rpx;
          margin-right: 140rpx;
        }

        .time {
          font-size: 16rpx;
          color: #7f7f7f;
          margin-left: auto;
        }
      }
    }
  }
}
</style>
