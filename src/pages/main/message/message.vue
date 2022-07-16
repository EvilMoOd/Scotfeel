<script setup lang="ts">
  import { ref } from 'vue';
  import { useNoticeStore } from '../../../store/modules/noticeStore';

  const currentTab = ref(0);
  const tab = [
    {
      icon: 'chat',
      title: '评论',
    },
    {
      icon: 'redo',
      title: '转发',
    },
    {
      icon: 'heart',
      title: '点赞',
    },
    {
      icon: 'star',
      title: '订阅',
    },
  ];

  const noticeStore = useNoticeStore();
</script>

<template>
  <view class="header">
    <Back />
    <view class="title">消息</view>
  </view>
  <view class="function">
    <view v-for="(item, index) in tab" :key="index">
      <uni-icons :type="item.icon" color="#117986" size="30" @tap="() => (currentTab = index)" />
      <view>{{ item.title }}</view>
    </view>
  </view>
  <swiper :current="currentTab" style="height: 1000rpx">
    <swiper-item>
      <scroll-view scroll-y style="height: 1000rpx">
        <view v-for="(item, index) in noticeStore.commentList" :key="index" class="apply-msg">
          <image :src="item.commenterInfo[0].avatar" class="avatar" />
          <view class="apply">
            <view>
              <text class="nickname">{{ item.commenterInfo[0].nickname }}</text>
            </view>
            <text class="content">{{ item.content }}</text>
            <!-- TODO 处理评论图片和没图片问题 -->
            <image
              :src="
                item.momentType === 0
                  ? item.userMomentInfo[0]?.photos[0]
                  : item.spaceMomentInfo[0]?.photos[0]
              "
              mode="scaleToFill"
            />
          </view>
        </view>
      </scroll-view>
    </swiper-item>
    <swiper-item>
      <scroll-view scroll-y style="height: 200px">123</scroll-view>
    </swiper-item>
    <swiper-item>
      <scroll-view scroll-y style="height: 200px">123</scroll-view>
    </swiper-item>
    <swiper-item>
      <scroll-view scroll-y style="height: 200px">123</scroll-view>
    </swiper-item>
  </swiper>
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
      left: 10rpx;
    }

    .title {
      margin-top: 80rpx;
    }
  }

  .function {
    display: flex;
    justify-content: space-between;
    padding: 50rpx 80rpx 30rpx;
    font-size: 20rpx;
    text-align: center;
  }

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
</style>
