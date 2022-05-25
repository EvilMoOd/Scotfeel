<script setup lang="ts">
  import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
  import { reqValidateToken } from './server/api/user';
  import { createChatRecordTable } from './server/sql/chatRecord';
  import { connectWebSocket } from './server/webSocket';
  import { useUserStore } from './store/modules/userStore';
  import { useFriendStore } from './store/modules/friendStore';
  // import { createTable, insert } from './server/sql/groupChat';

  const user = useUserStore();
  const friendStore = useFriendStore();

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
    user.$subscribe((mutation, state) => {
      uni.setStorageSync('user', state);
    });
    const { token } = await reqValidateToken();
    user.token = token;
    //TODO这里要加token
    connectWebSocket(`wss://www.scotfeel.com/wss/`, token);
    createChatRecordTable();
    friendStore.getAllFriends();
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
