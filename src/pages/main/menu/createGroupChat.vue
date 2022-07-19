<script setup lang="ts">
  import { computed, onBeforeUnmount, reactive, ref } from 'vue';
  import { reqCreateGroupChat } from '../../../server/api/groupChat';
  import type { FriendInfo } from '../../../server/api/user';
  import { useFriendStore } from '../../../store/modules/friendStore';
  import { useUserStore } from '../../../store/modules/userStore';

  const message = ref('');
  const success = ref<any>(null);
  const fail = ref<any>(null);
  const userStore = useUserStore();
  const friendStore = useFriendStore();

  const chooseFriends = reactive<FriendInfo[]>([]);
  const createInfo = computed(() => {
    const InfoArr: any[] = [];
    chooseFriends.forEach((element) => {
      const info = {
        memberId: element.friendId,
        memberNickname: element.nickname,
        memberAvatar: element.avatar,
      };
      InfoArr.push(info);
    });
    return InfoArr;
  });
  // 创建群聊
  let timer: any;
  async function done() {
    try {
      await reqCreateGroupChat([
        {
          memberId: userStore.userInfo?.mainId,
          memberNickname: userStore.userInfo?.nickname,
          memberAvatar: userStore.userInfo?.avatar,
        },
        ...createInfo.value,
      ]);
      message.value = '群聊创建成功';
      success.value.popUp();
      timer = setTimeout(() => {
        uni.navigateBack({
          delta: 1,
        });
      }, 3000);
    } catch (err) {
      message.value = '群聊创建失败';
      fail.value.popUp();
    }
  }

  onBeforeUnmount(() => {
    clearTimeout(timer);
  });
</script>

<template>
  <view class="header">
    <Back />
    <view class="title">创建群聊</view>
    <uni-icons class="next" type="checkmarkempty" size="5vh" color="#fff" @tap="done"></uni-icons>
  </view>
  <scroll-view scroll-x class="top">
    <view class="choose">
      <image
        v-for="friend in chooseFriends"
        :key="friend.friendId"
        :src="friend.avatar"
        mode="scaleToFill"
        class="avatar"
      />
    </view>
  </scroll-view>
  <scroll-view scroll-y class="main">
    <view class="mail">
      <view
        v-for="friend in friendStore.friendsInfo"
        :key="friend.friendId"
        class="list"
        @tap="chooseFriends.find((item) => item === friend) ? '' : chooseFriends.push(friend)"
      >
        <image :src="friend.avatar" class="avatar" />
        <text class="nickname">{{ friend.nickname }}</text>
      </view>
    </view>
  </scroll-view>
  <PopMessage ref="success" success>{{ message }}</PopMessage>
  <PopMessage ref="fail">{{ message }}</PopMessage>
</template>

<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 160rpx;
    background-color: $color-sf;

    .next {
      margin: 20rpx;
    }

    .title {
      display: inline-block;
      margin-bottom: 24rpx;
      color: #fff;
      font-weight: bold;
      font-size: 38rpx;
    }
  }

  .top {
    height: 92rpx;
    padding: 15rpx;
    background-color: #fff;

    .choose {
      .avatar {
        width: 80rpx;
        height: 80rpx;
        margin-left: 20rpx;
        vertical-align: middle;
        border-radius: 50%;
      }
    }
  }

  .main {
    height: 1170rpx;
    background-color: #f0f1f2;

    .mail {
      margin-top: 40rpx;

      .list {
        padding: 12rpx 24rpx;
        background-color: #fff;

        .avatar {
          width: 80rpx;
          height: 80rpx;
          margin-right: 32rpx;
          vertical-align: middle;
          border-radius: 50%;
        }

        .nickname {
          font-weight: bolder;
          font-size: 36rpx;
        }
      }
    }
  }
</style>
