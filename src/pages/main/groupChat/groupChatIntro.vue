<script setup lang="ts">
  import { onLoad } from '@dcloudio/uni-app';
  import { reactive } from 'vue';
  import {
    reqChangeRemark,
    reqDismissGroupChat,
    reqSetGroupNoNotify,
    reqUpdateVerify,
  } from '../../../server/api/groupChat';
  import { useGroupChatStore } from '../../../store/modules/groupStore';

  const groupStore = useGroupChatStore();
  let sessionId: string;
  onLoad((params: any) => {
    sessionId = params.sessionId;
    groupStore.getFriendInfo(sessionId);
  });

  // 展示功能块
  const show = reactive({
    isShow: false,
    isShowConfig: false,
    isShowChangeNickname: false,
    isShowChangeRemark: false,
  });

  // 展示功能块
  function showConfig() {
    show.isShowConfig = true;
    show.isShow = true;
  }
  function hiddenAll() {
    show.isShowChangeRemark = false;
    show.isShowChangeNickname = false;
    show.isShowConfig = false;
    show.isShow = false;
  }
  // 修改昵称输入框
  function showChangeNickname() {
    show.isShowChangeNickname = true;
    show.isShowConfig = false;
    show.isShow = true;
  }
  function showChangeRemark() {
    show.isShowChangeRemark = true;
    show.isShowConfig = false;
    show.isShow = true;
  }
  const Input = reactive({
    nickname: '',
    remark: '',
  });
  // 修改群聊昵称
  function changeGroupNickname(e: string) {
    groupStore.changeNickname(e, sessionId);
    show.isShowChangeRemark = false;
    Input.remark = '';
  }
  // 解散群聊
  const dismissGroup = async () => {
    await reqDismissGroupChat(sessionId);
    console.log('群聊已解散');
  };
  // 修改我的群聊备注
  const setMyRemark = async (e: string) => {
    await reqChangeRemark(e, sessionId);
    show.isShowChangeRemark = false;
    Input.remark = '';
  };
  const switches = reactive<{ mute: boolean; verify: boolean }>({
    mute: true,
    verify: false,
  });
  // 消息免打扰
  async function changeMute() {
    await reqSetGroupNoNotify(sessionId, switches.mute ? 1 : 0);
  }
  // 进群审核开关
  async function changeVerify() {
    await reqUpdateVerify(sessionId, switches.verify ? 1 : 0);
  }
</script>

<template>
  <view class="page" :class="show.isShow ? 'mask' : ''">
    <view class="header">
      <Back />
      <uni-icons type="more-filled" color="#fff" size="28" class="more-icon" @click="showConfig" />
      <image src="@/assets/images/head.png" class="head" />
      <view>AMCC肌肉车俱乐部</view>
    </view>
    <view class="list">
      <view class="item">
        <text>消息免打扰</text>
        <switch
          color="#117986"
          style="transform: scale(0.5); float: right; margin-top: -10rpx"
          :checked="switches.mute"
          @change="changeMute"
        />
      </view>
      <view class="item" @tap="showChangeRemark">
        <text>设置群里的昵称</text>
      </view>
    </view>
    <view class="br"></view>
    <view class="function">
      <view class="list2">
        <uni-icons
          type="personadd"
          color="#3EA8C2"
          size="24"
          style="display: inline-block; vertical-align: middle"
        />
        <text style="margin-left: 36rpx">邀请朋友</text>
      </view>
      <view class="list2">
        <uni-icons
          type="image"
          color="#3EA8C2"
          size="24"
          style="display: inline-block; vertical-align: middle"
        />
        <text style="margin-left: 36rpx">创建空间</text>
      </view>
    </view>
    <hr />
    <view class="list3">
      <view class="item">
        <image src="@/assets/images/head.png" class="head-user" mode="scaleToFill" />
        <text>海浪线</text>
        <view style="float: right; color: #3ea8c2; margin-top: 10rpx">群主</view>
      </view>
      <view class="item">
        <image src="@/assets/images/head.png" class="head-user" mode="scaleToFill" />
        <text>法医</text>
      </view>
    </view>
  </view>
  <GradientWindow
    style="right: 1rpx; top: 66rpx; text-align: center; line-height: 60rpx"
    :show="show.isShowConfig"
  >
    <view>
      进群审核
      <switch
        color="#117986"
        style="transform: scale(0.5); margin: -10rpx -20rpx 0 -20rpx"
        :checked="switches.verify"
        @change="changeVerify"
      />
    </view>
    <text @tap="showChangeNickname">修改群聊昵称</text>
    <text @tap="groupStore.changeAvatar(sessionId)">设置头像</text>
    <text style="color: #d9001b" @tap="dismissGroup">解散</text>
  </GradientWindow>
  <PopWindow :pop-show="show.isShowChangeNickname">
    <uni-easyinput
      v-model="Input.nickname"
      type="text"
      placeholder="请输入新昵称"
      trim
      maxlength="10"
      :styles="{ borderColor: '#fff' }"
      @confirm="(e:string) => changeGroupNickname"
    />
  </PopWindow>
  <PopWindow :pop-show="show.isShowChangeRemark">
    <uni-easyinput
      v-model="Input.remark"
      type="text"
      placeholder="我的群备注"
      trim
      maxlength="10"
      :styles="{ borderColor: '#fff' }"
      @confirm="(e:string) => setMyRemark(e)"
    />
  </PopWindow>
  <Mask :show="show.isShow" :hidden="hiddenAll" />
</template>

<style lang="scss" scoped>
  .page {
    transition: 0.7s;
    .header {
      height: 392rpx;
      background-color: $color-sf;
      text-align: center;
      color: #fff;

      .back {
        float: left;
        margin-left: 24rpx;
        margin-top: 60rpx;
      }

      .more-icon {
        float: right;
        margin-right: 24rpx;
        margin-top: 60rpx;
      }

      .head {
        width: 124rpx;
        height: 124rpx;
        border-radius: 50%;
        border: 3px solid #fff;
        margin-top: 108rpx;
      }
    }
    .list {
      font-size: 28rpx;
      padding: 0 36rpx 0 52rpx;

      .item {
        border-bottom: 1px solid #f2f2f2;
        padding: 36rpx 0;

        .pencil {
          display: inline-block;
          margin-left: 390rpx;
          color: #7f7f7f;
        }
      }
    }
    .br {
      height: 20rpx;
      background-color: #f2f2f2;
    }
    .function {
      padding: 0 56rpx;
      font-size: 28rpx;
      color: #4fb0c8;

      .list2 {
        margin: 24rpx 0;
      }
    }
    hr {
      width: 586rpx;
      margin-left: 120rpx;
      background-color: #f2f2f2;
      border: none;
      height: 1px;
    }
    .list3 {
      margin: 24rpx 0;
      padding: 0 56rpx;
      font-size: 26rpx;

      .item {
        margin: 30rpx 0;

        .head-user {
          width: 66rpx;
          height: 66rpx;
          border-radius: 50%;
          vertical-align: middle;
          margin-right: 20rpx;
        }
      }
    }
  }
  .mask {
    @include mask;
  }
</style>
