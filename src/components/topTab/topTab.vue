<script setup lang="ts">
  // 顶部选项卡
  import { ref } from 'vue';

  const props = defineProps<{
    tab1: string;
    tab2: string;
    height: string;
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
    <swiper :current="currentTab" :style="{ height }" @change="log">
      <swiper-item>
        <scroll-view scroll-y>
          <slot name="s1"></slot>
        </scroll-view>
      </swiper-item>
      <swiper-item>
        <scroll-view scroll-y>
          <slot name="s2"></slot>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<style lang="scss" scoped>
  .space {
    margin-top: 20rpx;
    .tab-name {
      display: flex;
      justify-content: space-around;
    }
    .line {
      height: 10rpx;
      width: 112rpx;
      margin-top: 20rpx;
      background-color: $color-sf;
    }
    .left {
      transition: transform 0.5s;
      transform: translate(130rpx);
    }
    .right {
      transition: transform 0.5s;
      transform: translate(500rpx);
    }
  }
</style>
