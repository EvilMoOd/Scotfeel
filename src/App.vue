<script setup lang="ts">
  import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
  import { reqValidateToken } from './server/api/user';
  import { createChatRecordTable } from './server/sql/chatRecord';
  import { createFriendTable } from './server/sql/friend';
  import { createGroupChatTable } from './server/sql/groupChat';
  import { createGroupMemberTable } from './server/sql/groupChatMember';
  import { createSessionListTable } from './server/sql/sessionList';
  import { connectWebSocket } from './server/webSocket';
  import { useFriendStore } from './store/modules/friendStore';
  import { useGroupChatStore } from './store/modules/groupStore';
  import { useSessionListStore } from './store/modules/sessionListStore';
  import { useSubscribeSpaceStore } from './store/modules/spaceStore';
  import { useUserStore } from './store/modules/userStore';

  const userStore = useUserStore();
  const sessionListStore = useSessionListStore();
  const friendStore = useFriendStore();
  const groupStore = useGroupChatStore();
  const spaceStore = useSubscribeSpaceStore();

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
    // 初始化数据库
    createFriendTable();
    createGroupChatTable();
    createGroupMemberTable();
    createSessionListTable();
    createChatRecordTable();
    // 初始化用户信息
    userStore.$subscribe((mutation, state) => {
      uni.setStorageSync('user', state);
    });
    if (!userStore.token) {
      uni.redirectTo({ url: '/pages/login' });
    } else {
      // 鉴权
      const { token } = await reqValidateToken();
      userStore.token = token;
      // 连接ws
      sessionListStore.init(userStore.userInfo?.mainId as string);
      friendStore.init(userStore.userInfo?.mainId as string);
      groupStore.init(userStore.userInfo?.mainId as string);
      spaceStore.init(userStore.userInfo?.mainId as string);
      setTimeout(function () {
        connectWebSocket(`wss://www.scotfeel.com/wss/`, token);
      }, 1000);
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
