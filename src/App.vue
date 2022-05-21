<script setup lang="ts">
  import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
  import { createChatRecordTable } from './server/sql/chatRecord';

  // import { createTable, insert } from './server/sql/groupChat';
  onLaunch(() => {
    createChatRecordTable();
  });
  onShow(() => {
    console.log('App Show');
  });
  onHide(() => {
    console.log('App Hide');
  });
</script>
<style>
  ::-webkit-scrollbar {
    display: none;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    background: transparent;
  }
  .body {
    font-size: 32rpx;
  }
</style>
