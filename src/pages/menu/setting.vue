<script setup lang="ts">
  import { deleteChatTable } from '../../server/sql/chatRecord';
  import { deleteSessionTable } from '../../server/sql/sessionList';

  async function clearRecord() {
    const data = await deleteChatTable();
    console.log(data);
    const w = deleteSessionTable();
    console.log(w);
  }
</script>

<template>
  <view class="clear" @tap="clearRecord">清空聊天记录</view>
</template>

<style lang="scss" scoped>
  .clear {
    height: 200rpx;
    background-color: $color-sf;
    text-align: center;
  }
</style>
