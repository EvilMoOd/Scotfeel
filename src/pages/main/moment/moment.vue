<script setup lang="ts">
  import { onLoad } from '@dcloudio/uni-app';
  import { ref } from 'vue';
  import { useMomentStore, noMore } from '../../../store/modules/momentStore';

  const momentStore = useMomentStore();
  onLoad((params) => {
    momentStore.init(params);
    console.log(momentStore.momentInfo);
  });
  // 点赞
  async function changeLikeStatus(index: number) {
    momentStore.momentInfo[index].likeStatus === 1
      ? momentStore.cancelLike(index)
      : momentStore.like(index);
  }
  // 前往发布动态页
  function goSendMoment() {
    uni.navigateTo({ url: '/pages/main/moment/createMoment' });
  }
  // 加载新动态
  const loading = ref('more');
  async function getNewMoment() {
    loading.value = 'loading';
    await momentStore.getNewMoment();
    noMore.on('noMore', (e: any) => {
      loading.value = e;
    });
  }

  const success = ref(null);
  const fail = ref(null);

  function successDelete() {
    success.value.popUp();
  }
  function failDelete() {
    fail.value.popUp();
  }
</script>

<template>
  <view class="header">
    <Home />
    <text class="title">朋友动态</text>
    <uni-icons type="camera" color="#fff" size="30" class="send-moment" @tap="goSendMoment" />
  </view>
  <MomentList style="background-color: #f2f2f2" />
  <scroll-view scroll-y class="main" lower-threshold="0" @scrolltolower="getNewMoment">
    <view class="posts">
      <ActiveCard
        v-for="(item, index) in momentStore.momentInfo"
        :key="item._id"
        :moment="item"
        :index="index"
        :change-like-status="changeLikeStatus"
        :success="successDelete"
        :fail="failDelete"
      />
      <uni-load-more icon-type="circle" :status="loading" />
    </view>
    <view></view>
  </scroll-view>
  <PopMessage ref="success" success>动态已删除</PopMessage>
  <PopMessage ref="fail">动态删除失败</PopMessage>
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
