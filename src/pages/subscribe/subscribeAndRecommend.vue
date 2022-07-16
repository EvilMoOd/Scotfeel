<script setup lang="ts">
  /* eslint-disable no-underscore-dangle */
  import { onMounted, reactive } from 'vue';
  import type { SpaceMoment } from '../../server/api/space';
  import { reqAddLike, reqAllSubscribeMoment, reqCancelLike } from '../../server/api/space';
  import { useSubscribeSpaceStore } from '../../store/modules/spaceStore';

  const spaceStore = useSubscribeSpaceStore();

  const moment = reactive<SpaceMoment[]>([]);
  onMounted(async () => {
    const data = await reqAllSubscribeMoment(1652471824095);
    moment.push(...data);
  });
  // 点赞
  async function changeLikeStatus(index: number) {
    if (moment[index].likeStatus === 1) {
      await reqCancelLike(moment[index]._id);
      moment[index].likeStatus = 0;
    } else {
      await reqAddLike(
        moment[index]._id,
        moment[index].posterUserInfo[0]._id,
        spaceStore.getSpace(moment[index].spaceInfo._id) ? 1 : 0
      );
      moment[index].likeStatus = 1;
    }
  }
  function goSearchSpace() {
    uni.navigateTo({ url: '/pages/subscribe/searchSpace' });
  }
</script>

<template>
  <view class="header">
    <Back class="back" />
    <uni-icons
      type="search"
      size="4vh"
      class="icon-search"
      color="#fff"
      @tap="goSearchSpace"
    ></uni-icons>
  </view>
  <TopTab
    tab1="订阅"
    tab2="动态"
    height="1070rpx"
    style="transform: translateY(-90rpx)"
    font-color="#fff"
    line-color="#fff"
    line-width="80px"
    font-weight="bold"
    bold="space-evenly"
    left="80px"
    right="220px"
  >
    <template #s1>
      <view class="my-space">
        <SpaceCard
          v-for="(item, index) in moment"
          :key="item._id"
          :index="index"
          :space-moment="moment[index]"
          :change-like-status="changeLikeStatus"
        />
      </view>
    </template>
    <template #s2>
      <view>动态</view>
    </template>
  </TopTab>
</template>

<style lang="scss" scoped>
  .header {
    @include header;

    display: flex;
    align-items: flex-end;

    .back {
      position: absolute;
      top: 80rpx;
      left: 20rpx;
      z-index: 100;
    }

    .icon-search {
      position: absolute;
      top: 82rpx;
      left: 676rpx;
      z-index: 100;
    }
  }
</style>
