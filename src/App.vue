<script setup lang="ts">
  import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
  import { reqValidateToken } from './server/api/user';
  import { createChatRecordTable } from './server/sql/chatRecord';
  import { createFriendTable } from './server/sql/friend';
  import { createGroupChatTable } from './server/sql/groupChat';
  import { createSessionListTable } from './server/sql/sessionList';
  import { connectWebSocket } from './server/webSocket';
  import { useFriendStore } from './store/modules/friendStore';
  import { useSessionListStore } from './store/modules/sessionListStore';
  import { useUserStore } from './store/modules/userStore';

  const userStore = useUserStore();
  const sessionListStore = useSessionListStore();
  const friendStore = useFriendStore();

  onLaunch(() => {
    init();
  });
  onShow(() => {
    console.log('App切换至前台');
  });
  onHide(() => {
    console.log('App切换至后台');
  });
  async function init() {
    createFriendTable();
    createGroupChatTable();
    createSessionListTable();
    createChatRecordTable();
    userStore.$subscribe((mutation, state) => {
      uni.setStorageSync('user', state);
    });
    if (!userStore.token) {
      uni.redirectTo({ url: '/pages/login' });
    } else {
      const { token } = await reqValidateToken();
      userStore.token = token;
      connectWebSocket(`wss://www.scotfeel.com/wss/`, token);
      sessionListStore.init(userStore.userInfo?.mainId as string);
      friendStore.init(userStore.userInfo?.mainId as string);
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
