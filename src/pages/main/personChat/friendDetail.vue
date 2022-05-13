<script setup lang="ts">
  import { ref } from 'vue';
  import { reqChangeFriendRemark } from '../../../server/api/friend';
  import { useUserStore } from '../../../store/modules/userStore';

  const userStore = useUserStore();

  const isShow = ref(false);
  const isShowConfig = ref(false);
  const isShowChangeNickname = ref(false);
  const remark = ref('');

  //展示功能块
  function showConfig() {
    isShowConfig.value = true;
    isShow.value = true;
  }
  function hiddenAll() {
    isShowChangeNickname.value = false;
    isShowConfig.value = false;
    isShow.value = false;
  }
  //修改备注输入框
  function showChangeRemark() {
    isShowChangeNickname.value = true;
    isShowConfig.value = false;
    isShow.value = true;
  }
  //修改备注
  async function changeRemark() {
    try {
      await reqChangeFriendRemark();
      uni.showModal({
        title: '修改成功',
      });
    } catch (err) {
      uni.showModal({
        title: '修改失败，请检查网络',
      });
    }
  }
  //删除朋友
</script>

<template>
  <view class="header">
    <image
      :src="userStore.userInfo.backgroundImage"
      mode="scaleToFill"
      style="position: absolute; z-index: -100; width: 750rpx; height: 304rpx"
    />
    <Back class="icon-back" />
    <uni-icons type="more-filled" color="#aaa" size="28" class="icon-more" @click="showConfig" />
    <view class="more" :class="{ 'more-show': isShowConfig }">
      <text @tap="showChangeRemark">设置备注</text>
      <text>创建空间</text>
      <text style="color: #d9001b" @tap="deleteFriend">删除</text>
    </view>
  </view>
  <view class="id-card">
    <image :src="userStore.userInfo.avatar" mode="scaleToFill" class="avatar" />
    <view>
      <text style="font-size: 34rpx; font-weight: bold; color: #fff">科比</text>
      <br />
      <text style="font-size: 28rpx">@kobe</text>
    </view>
  </view>
  <view class="introduction">这是一段个人介绍</view>
  <TopTab tab1="订阅空间" tab2="动态" height="350px">
    <template #s1>
      <view class="my-space">
        <SpaceIdCard img="/src/assets/images/head.png" />
      </view>
    </template>
    <template #s2>
      <view>动态</view>
    </template>
  </TopTab>
  <uni-easyinput
    v-if="isShowChangeNickname"
    v-model="remark"
    type="text"
    placeholder="请输入新昵称"
    trim
    class="input"
    maxlength="10"
    @confirm="changeRemark"
  />
  <view v-show="isShow" class="mask" @click="hiddenAll"></view>
</template>
<style lang="scss" scoped>
  .header {
    height: 304rpx;
    .icon-back {
      float: left;
      margin-left: 26rpx;
      margin-top: 66rpx;
    }

    .icon-more {
      float: right;
      margin-top: 66rpx;
      margin-right: 26rpx;
    }

    .more {
      padding: 18rpx 36rpx;
      width: 104rpx;
      font-size: 26rpx;
      border-radius: 20rpx;
      display: flex;
      flex-direction: column;
      position: absolute;
      z-index: 100;
      right: 1rpx;
      top: 66rpx;
      background-color: #fff;
      box-shadow: 0 0 4rpx $color-sf;
      @include hidden;

      text {
        margin: 10rpx 0;
      }
    }
    .more-show {
      @include show;
    }
  }

  .id-card {
    position: relative;
    padding: 0 60rpx;
    top: -64rpx;
    display: flex;
    align-items: center;

    .avatar {
      border-radius: 50%;
      width: 128rpx;
      height: 128rpx;
      border: 3px solid #fff;
    }
  }

  .introduction {
    margin: -40rpx 96rpx;
    font-size: 22rpx;
    color: #555;
  }
  .my-space {
    height: 400rpx;
    padding: 30rpx;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .input {
    position: absolute;
    z-index: 100;
    top: 10vh;
  }
  .mask {
    width: 750rpx;
    height: 1334rpx;
    position: absolute;
    top: 0;
    z-index: 90;
  }

  .space {
    margin-top: 100rpx;
  }
</style>
