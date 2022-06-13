<script setup lang="ts">
  import { onLoad } from '@dcloudio/uni-app';
  import { useMomentStore } from '../../../store/modules/momentStore';

  const momentStore = useMomentStore();
  onLoad((params) => {
    momentStore.init(params);
  });
  // 点赞
  async function changeLikeStatus(index: number) {
    momentStore.momentInfo[index].likeStatus === 1
      ? momentStore.cancelLike(index)
      : momentStore.like(index);
  }
</script>

<template>
  <view class="header">
    <Home />
    <text class="title">朋友动态</text>
    <uni-icons type="camera" color="#fff" size="30" class="send-moment" @tap="" />
  </view>
  <MomentList style="background-color: #f2f2f2" />
  <scroll-view scroll-y class="main">
    <view class="posts">
      <ActiveCard
        v-for="(item, index) in momentStore.momentInfo"
        :key="item._id"
        :moment="item"
        :index="index"
        :change-like-status="changeLikeStatus"
      />
    </view>
    <view></view>
  </scroll-view>
</template>

<style lang="scss" scoped>
  .header {
    @include header;
    text-align: center;

    .title {
      display: inline-block;
      margin-top: 70rpx;
      font-weight: bold;
      font-size: 38rpx;
      color: #fff;
    }
    .send-moment {
      position: absolute;
      top: 58rpx;
      left: 668rpx;
    }
  }

  .main {
    height: 980rpx;
    background-color: #f2f2f2;
  }
</style>
