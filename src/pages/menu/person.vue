<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useUserStore } from '../../store/modules/userStore';

  const userStore = useUserStore();

  const show = reactive({
    isShow: false,
    isShowConfig: false,
    isShowChangeNickname: false,
    isShowChangeSignature: false,
  });

  const nickname = ref('');
  const signature = ref('');

  // 展示功能块
  function showConfig() {
    show.isShowConfig = true;
    show.isShow = true;
  }
  function hiddenAll() {
    show.isShowChangeNickname = false;
    show.isShowChangeSignature = false;
    show.isShowConfig = false;
    show.isShow = false;
  }
  // 展示修改昵称输入框
  function showChangeNickname() {
    show.isShowChangeNickname = true;
    show.isShowConfig = false;
    show.isShow = true;
  }
  // 展示修改个性签名输入框
  function ShowChangeSignature() {
    show.isShowChangeSignature = true;
    show.isShowConfig = false;
    show.isShow = true;
  }
  // 修改昵称
  function changeNickname(e: string) {
    userStore.changeNickname(e);
    show.isShowChangeNickname = false;
    nickname.value = '';
  }
  function changeSignature(e: string) {
    userStore.changeSignature(e);
    show.isShowChangeSignature = false;
    signature.value = '';
  }
</script>

<template>
  <view class="page" :class="show.isShow ? 'mask' : ''">
    <view class="header">
      <Back class="icon-back" />
      <uni-icons type="more-filled" color="#aaa" size="28" class="icon-more" @tap="showConfig" />
    </view>
    <view class="id-card">
      <image :src="userStore.userInfo?.avatar" mode="scaleToFill" class="avatar" />
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
  </view>
  <GradientWindow
    style="right: 1rpx; top: 66rpx; text-align: center; line-height: 60rpx; width: 150rpx"
    :show="show.isShowConfig"
  >
    <text @tap="ShowChangeSignature">个性签名</text>
    <text @tap="showChangeNickname">修改昵称</text>
    <text @tap="userStore.changeBackgroundImg">设置背景</text>
    <text @tap="userStore.changeAvatar">设置头像</text>
  </GradientWindow>
  <PopWindow :pop-show="show.isShowChangeNickname">
    <uni-easyinput
      v-model="nickname"
      type="text"
      placeholder="请输入新昵称"
      trim
      maxlength="10"
      :styles="{ borderColor: '#fff' }"
      @confirm="(e:string) =>changeNickname(e) "
    />
  </PopWindow>
  <PopWindow :pop-show="show.isShowChangeSignature">
    <uni-easyinput
      v-model="signature"
      type="text"
      placeholder="请输入个性签名"
      trim
      maxlength="30"
      :styles="{ borderColor: '#fff' }"
      @confirm="(e:string) => changeSignature"
    />
  </PopWindow>

  <Mask :show="show.isShow" :hidden="hiddenAll" />
</template>
<style lang="scss" scoped>
  .page {
    transition: 0.7s;
    .header {
      height: 304rpx;
      background-image: v-bind('userStore.backgroundImg');
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
  }

  .space {
    margin-top: 100rpx;
  }
  .mask {
    @include mask;
  }
</style>
