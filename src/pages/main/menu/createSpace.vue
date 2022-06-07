<script setup lang="ts">
  import { computed, reactive } from 'vue';
  import { reqSetSpace } from '../../../server/api/space';
  import type { FriendInfo } from '../../../server/api/user';
  import { useFriendStore } from '../../../store/modules/friendStore';

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
  async function done() {
    console.log(createInfo.value);
    const data = await reqSetSpace(createInfo.value);
    console.log(data);
  }
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
</template>

<style lang="scss" scoped>
  .header {
    height: 160rpx;
    background-color: $color-sf;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .next {
      margin: 20rpx;
    }

    .title {
      display: inline-block;
      margin-bottom: 24rpx;
      font-weight: bold;
      font-size: 38rpx;
      color: #fff;
    }
  }
  .top {
    height: 92rpx;
    background-color: #fff;
    padding: 15rpx;
    .choose {
      .avatar {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        vertical-align: middle;
        margin-left: 20rpx;
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
          border-radius: 50%;
          vertical-align: middle;
          margin-right: 32rpx;
        }

        .nickname {
          font-size: 36rpx;
          font-weight: bolder;
        }
      }
    }
  }
</style>
