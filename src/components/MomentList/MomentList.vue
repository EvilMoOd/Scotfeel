<script setup lang="ts">
  import { useMomentListStore } from '../../store/modules/momemtListStore';
  import Active from './Active.vue';
  // 朋友动态栏
  const momentListStore = useMomentListStore();
  function goAllMoment() {
    uni.redirectTo({ url: '/pages/main/moment/moment?all=1' });
  }
  function goMoment(params: string) {
    uni.redirectTo({ url: `/pages/main/moment/moment?friendId=${params}` });
  }
</script>

<template>
  <!-- 朋友动态栏 -->
  <view class="moment-list">
    <view class="moment">
      <!-- 可能有bug这里 -->
      <scroll-view scroll-x="true">
        <Active
          v-for="(list, index) in momentListStore.momentList"
          :key="index"
          :list="list"
          @tap="goMoment(list.friendId)"
        />
      </scroll-view>
    </view>
    <view class="more-active" @tap="goAllMoment">全部</view>
  </view>
</template>

<style lang="scss" scoped>
  .moment-list {
    display: flex;
    justify-content: center;
    height: 190rpx;
    border-bottom: solid 2rpx #f2f2f2;

    .moment {
      width: 600rpx;
      overflow: hidden;
      white-space: nowrap;
    }

    .more-active {
      display: inline-block;
      align-self: center;
      margin-left: 28rpx;
      color: $color-sf;
      border-radius: 50%;
    }
  }
</style>
