<script setup lang="ts">
  // 顶部选项卡
  import { ref } from 'vue';

  const props = defineProps<{
    tab1: string;
    tab2: string;
    height: string;
    fontColor: string; // 字体颜色
    lineColor: string; // 线条颜色
    bold: string; // 宽度 space-evenly || space-around
    left: string; // 条左右
    right: string;
    lineWidth: string;
  }>();

  const active = ref(true);
  const currentTab = ref(0);
  function log() {
    active.value = !active.value;
  }
  function changeCurrent1() {
    currentTab.value = 0;
  }
  function changeCurrent2() {
    currentTab.value = 1;
  }
</script>

<template>
  <!-- swiper+长滚动条 -->
  <view class="space">
    <view class="tab-name">
      <text class="swiper-name" @tap="changeCurrent1">{{ props.tab1 }}</text>
      <text class="swiper-name" @tap="changeCurrent2">{{ props.tab2 }}</text>
    </view>
    <hr class="line" :class="[active ? 'left' : 'right']" />
    c
  </view>
</template>

<style lang="scss" scoped>
  .space {
    margin-top: 20rpx;
    .tab-name {
      display: flex;
      justify-content: v-bind('bold');
      color: v-bind('fontColor');
      font-weight: bold;
    }
    .line {
      height: 10rpx;
      width: v-bind('lineWidth');
      margin-top: 20rpx;
      border: none;
      background-color: v-bind('lineColor');
    }
    .left {
      transition: transform 0.5s;
      transform: translate(v-bind('left'));
    }
    .right {
      transition: transform 0.5s;
      transform: translate(v-bind('right'));
    }
  }
</style>
