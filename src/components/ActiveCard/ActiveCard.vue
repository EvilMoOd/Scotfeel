<script setup lang="ts">
  import { ref } from 'vue';

  const pageIndex = ref(0);
  const changePage = (e: any) => {
    pageIndex.value = e.detail.current;
  };
</script>

<template>
  <!-- 朋友动态卡片 -->
  <view class="post">
    <view class="user">
      <image src="@/assets/images/head.png" class="head" />
      <text class="text">小妮</text>
    </view>
    <view><text>盼望着，春天的脚步接近了</text></view>
    <view class="image-container">
      <view class="pageindex">{{ pageIndex + 1 }}/2</view>
      <swiper class="picture" @change="changePage">
        <swiper-item>
          <image src="@/assets/images/img1.png" class="post-img" mode="aspectFill" />
        </swiper-item>
        <swiper-item>
          <image src="@/assets/images/img2.jpg" class="post-img" mode="aspectFill" />
        </swiper-item>
      </swiper>
    </view>

    <view class="post-state">
      <view>
        <uni-icons type="chat" size="3vh" color="#117986"></uni-icons>
        评论
      </view>
      <view>
        <uni-icons type="heart" size="3vh" color="#117986"></uni-icons>
        点赞
      </view>
      <view class="time">30分钟前</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  .post {
    height: 730rpx;
    width: 678rpx;
    padding: 60rpx 36rpx;
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

    .image-container {
      position: relative;
      .pageindex {
        position: absolute;
        top: 500rpx;
        right: 20rpx;
        z-index: 10;
        width: 82rpx;
        height: 46rpx;
        background-color: #666060;
        text-align: center;
        line-height: 46rpx;
        border-radius: 30rpx;
        color: #fff;
        opacity: 0.5;
      }
      .picture {
        height: 566rpx;
        object-fit: cover;
        .post-img {
          height: 100%;
          width: 100%;
          border-radius: 10rpx;
          margin: 2rpx;
          margin-top: 20rpx;
        }
      }
    }

    .post-state {
      display: flex;
      justify-content: space-between;
      margin-top: 20rpx;
      line-height: 1.5em;
      height: 1.5em;
    }
  }
</style>
