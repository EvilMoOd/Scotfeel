<script setup lang="ts">
  import { computed } from 'vue';
  import { useFriendStore } from '../../store/modules/friendStore';
  import type { MomentListInfo } from '../../store/modules/momemtListStore';

  const props = defineProps<{
    list: MomentListInfo;
  }>();

  //查找朋友信息
  const friendStore = useFriendStore();
  const friendInfo = computed(() =>
    friendStore.friendInfo.find((item) => item.friendId === props.list.friendId)
  );
</script>

<template>
  <!-- 朋友动态栏中的每个圈 -->
  <view class="active">
    <image :src="friendInfo?.avatar" class="avatar" />
    <view class="username">{{ friendInfo?.nickname }}</view>
  </view>
</template>

<style lang="scss" scoped>
  .active {
    display: inline-block;
    height: 100rpx;
    width: 100rpx;
    border-radius: 50%;
    margin-top: 28rpx;
    margin-right: 48rpx;
    background-image: linear-gradient(#aaf0d8, #2ed);
    padding: 6rpx;
    .avatar {
      height: 100%;
      width: 100%;
      border-radius: 50%;
    }
    .username {
      margin-top: 5rpx;
      font-size: 22rpx;
      text-align: center;
    }
  }
</style>
