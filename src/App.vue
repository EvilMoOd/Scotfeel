<script setup lang="ts">
  import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
  import { reqImNode, reqValidateToken } from './server/api/user';
  import { createChatRecordTable } from './server/sql/chatRecord';
  import { createFriendTable } from './server/sql/friend';
  import { createGroupChatTable } from './server/sql/groupChat';
  import { createGroupMemberTable } from './server/sql/groupChatMember';
  import { createSessionListTable } from './server/sql/sessionList';
  import { createSubscribeTable } from './server/sql/subscribedSpace';
  import { connectWebSocket } from './server/webSocket';
  import { useFriendStore } from './store/modules/friendStore';
  import { useGroupChatStore } from './store/modules/groupStore';
  import { useMomentListStore } from './store/modules/momemtListStore';
  import { useNoticeStore } from './store/modules/noticeStore';
  import { useSessionListStore } from './store/modules/sessionListStore';
  import { useSubscribeSpaceStore } from './store/modules/spaceStore';
  import { useUserStore } from './store/modules/userStore';

  const userStore = useUserStore();
  const noticeStore = useNoticeStore();
  const sessionListStore = useSessionListStore();
  const momentListStore = useMomentListStore();
  const friendStore = useFriendStore();
  const groupStore = useGroupChatStore();
  const spaceStore = useSubscribeSpaceStore();

  async function init() {
    // 初始化数据库
    createFriendTable();
    createGroupChatTable();
    createGroupMemberTable();
    createSessionListTable();
    createChatRecordTable();
    createSubscribeTable();
    // 持久化用户库
    userStore.$subscribe((mutation, state) => {
      uni.setStorageSync('user', state);
    });
    // 持久化消息库
    noticeStore.$subscribe((mutation, state) => {
      uni.setStorageSync('notice', state);
    });
    // 持久化动态列表
    momentListStore.$subscribe((mutation, state) => {
      uni.setStorageSync('momentList', state);
    });
    // 初始化用户信息
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
      const im = await reqImNode();
      setTimeout(() => {
        connectWebSocket(`wss://www.scotfeel.com/wss/${im.ip}${im.port}`, token);
      }, 1000);
    }
  }
  onLaunch(() => {
    init();
  });
  onShow(() => {
    console.log('App切换至前台');
  });
  onHide(() => {
    console.log('App切换至后台');
  });
</script>
<style>
  ::-webkit-scrollbar {
    display: none;
    width: 0 !important;
    height: 0 !important;
    background: transparent;
    appearance: none;
  }

  .body {
    font-size: 32rpx;
  }
</style>
