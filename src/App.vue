<script setup lang="ts">
  import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
  import { reqValidateToken } from './server/api/user';
  import { createChatRecordTable } from './server/sql/chatRecord';
  import { createSessionListTable } from './server/sql/sessionList';
  import { connectWebSocket } from './server/webSocket';
  import { useSessionListStore } from './store/modules/sessionListStore';
  import { useUserStore } from './store/modules/userStore';
  // import { createTable, insert } from './server/sql/groupChat';

  const userStore = useUserStore();
  const sessionListStore = useSessionListStore();

  onLaunch(() => {
    init();
  });
  onShow(() => {
    console.log('App Show');
  });
  onHide(() => {
    console.log('App Hide');
  });
  async function init() {
    userStore.$subscribe((mutation, state) => {
      uni.setStorageSync('user', state);
    });
    const { token } = await reqValidateToken();
    userStore.token = token;
    connectWebSocket(`wss://www.scotfeel.com/wss/`, token);
    createSessionListTable();
    createChatRecordTable();
    // TODO 启动初始化，登录的时候也要初始化
    if (!userStore.token) {
      uni.redirectTo({ url: '/pages/login' });
    } else {
      sessionListStore.init(userStore.userInfo.mainId);
    }
  }
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
