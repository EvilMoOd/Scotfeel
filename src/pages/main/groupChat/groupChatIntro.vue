<script setup lang="ts">
  import { onLoad } from '@dcloudio/uni-app';
  import { reactive, ref } from 'vue';
  import {
    reqChangeMemberRole,
    reqChangeRemark,
    reqRemoveGroupMember,
    reqSetGroupNoNotify,
    reqUpdateVerify,
  } from '../../../server/api/groupChat';
  import type { GroupMember } from '../../../server/api/user';
  import {
    selectAllMemberInfo,
    updateGMRemarkName,
    updateGMRole,
    updateIsExited,
  } from '../../../server/sql/groupChatMember';
  import { useGroupChatStore } from '../../../store/modules/groupStore';
  import { useUserStore } from '../../../store/modules/userStore';
  import { imgMitt } from '../../../util/uploadImage';

  const userStore = useUserStore();
  const groupStore = useGroupChatStore();
  const message = ref('');
  const success = ref<any>(null);
  const fail = ref<any>(null);
  // 获取群成员信息
  const group = reactive<{ groupMember: GroupMember[] }>({
    groupMember: [],
  });
  let sessionId: string;
  onLoad(async (params) => {
    sessionId = params.sessionId as string;
    groupStore.getGroupInfo(sessionId);
    const groupMember = await selectAllMemberInfo(sessionId, userStore.userInfo?.mainId as string);
    group.groupMember = groupMember.filter((item) => item.isExited === 0);
    console.log(group.groupMember);
  });

  // 展示功能块
  const show = reactive({
    isShow: false,
    isShowConfig: false,
    isShowChangeNickname: false,
    isShowChangeRemark: false,
  });
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
  // 修改群聊头像
  async function changeGroupAvatar() {
    try {
      await groupStore.changeAvatar(sessionId);
      imgMitt.on('groupAvatar', () => {
        message.value = '头像修改成功';
        success.value.popUp();
      });
    } catch (err) {
      message.value = '头像修改失败';
      fail.value.popUp();
    }
  }
  // 修改群聊昵称
  const Input = reactive({
    nickname: '',
    remark: '',
  });
  async function changeGroupNickname(e: string) {
    try {
      await groupStore.changeNickname(e, sessionId);
      Input.nickname = '';
      hiddenAll();
      message.value = '昵称修改成功';
      success.value.popUp();
    } catch (err) {
      message.value = '昵称修改失败';
      fail.value.popUp();
    }
  }
  // 修改我的群聊备注
  const setMyRemark = async (e: string) => {
    try {
      await reqChangeRemark(e, sessionId);
      hiddenAll();
      Input.remark = '';
      updateGMRemarkName(
        e,
        sessionId,
        userStore.userInfo?.mainId as string,
        userStore.userInfo?.mainId as string
      );
      message.value = '昵称修改成功';
      success.value.popUp();
    } catch (err) {
      message.value = '昵称修改失败';
      fail.value.popUp();
    }
  };
  // 解散群聊
  const dismissGroup = async () => {
    await groupStore.groupBreakOut(sessionId);
    uni.navigateBack({
      delta: 2,
    });
  };

  // 消息免打扰
  const switches = reactive<{ mute: boolean; verify: boolean }>({
    mute: true,
    verify: false,
  });
  async function changeMute() {
    await reqSetGroupNoNotify(sessionId, switches.mute ? 1 : 0);
  }
  // 进群审核开关
  async function changeVerify() {
    await reqUpdateVerify(sessionId, switches.verify ? 1 : 0);
  }
  // 更新成员角色
  async function setManager(memberId: string) {
    await reqChangeMemberRole(sessionId, memberId, 1);
    updateGMRole(1, sessionId, memberId, userStore.userInfo?.mainId as string);
  }
  async function cancelManager(memberId: string) {
    await reqChangeMemberRole(sessionId, memberId, 2);
    updateGMRole(2, sessionId, memberId, userStore.userInfo?.mainId as string);
  }
  async function kickOut(memberId: string) {
    await reqRemoveGroupMember(memberId, sessionId);
    updateIsExited(1, sessionId, memberId, userStore.userInfo?.mainId as string);
  }
</script>

<template>
  <view class="page" :class="show.isShow ? 'mask' : ''">
    <view class="header">
      <Back />
      <uni-icons type="more-filled" color="#fff" size="28" class="more-icon" @click="showConfig" />
      <image :src="groupStore.groupPage.avatar" class="head" />
      <view>{{ groupStore.groupPage.nickname }}</view>
    </view>
    <view class="list">
      <view class="item">
        <text>消息免打扰</text>
        <switch
          color="#117986"
          style="float: right; margin-top: -10rpx; transform: scale(0.5)"
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
      <uni-swipe-action>
        <uni-swipe-action-item v-for="item in group.groupMember" :key="item.groupId">
          <view class="item">
            <image :src="item.avatar" class="avatar-user" mode="scaleToFill" />
            <text v-if="item.remarkName && item.remarkName !== 'null'">{{ item.remarkName }}</text>
            <text v-else>{{ item.nickname }}</text>
            <view v-if="item.role === 0" style="float: right; margin-top: 10rpx; color: #3ea8c2">
              群主
            </view>
            <view
              v-else-if="item.role === 1"
              style="float: right; margin-top: 10rpx; color: #3ea8c2"
            >
              管理员
            </view>
            <view v-else style="float: right; margin-top: 10rpx; color: #aaa">成员</view>
          </view>
          <template #right>
            <view
              v-if="item.role === 2"
              class="slot-button"
              style="background-color: #06b6d4"
              @tap="setManager(item.memberId)"
            >
              <text class="slot-button-text">设为管理</text>
            </view>
            <view
              v-else-if="item.role === 1"
              class="slot-button"
              style="background-color: #06b6d4"
              @tap="cancelManager(item.memberId)"
            >
              <text class="slot-button-text">取消管理</text>
            </view>
            <view
              v-if="item.role !== 0 && item.memberId !== userStore.userInfo?.mainId"
              class="slot-button"
              style="background-color: #ff5a5f"
              @tap="kickOut(item.memberId)"
            >
              <text class="slot-button-text">踢出</text>
            </view>
          </template>
        </uni-swipe-action-item>
      </uni-swipe-action>
    </view>
  </view>
  <GradientWindow
    style="top: 66rpx; right: 1rpx; line-height: 60rpx; text-align: center"
    :show="show.isShowConfig"
  >
    <view>
      进群审核
      <switch
        color="#117986"
        style="margin: -10rpx -20rpx 0; transform: scale(0.5)"
        :checked="switches.verify"
        @change="changeVerify"
      />
    </view>
    <text @tap="showChangeNickname">修改群聊昵称</text>
    <text @tap="changeGroupAvatar">设置头像</text>
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
      @confirm="changeGroupNickname"
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
  <PopMessage ref="success" success>{{ message }}</PopMessage>
  <PopMessage ref="fail">{{ message }}</PopMessage>
</template>

<style lang="scss" scoped>
  .page {
    transition: 0.7s;

    .header {
      height: 392rpx;
      color: #fff;
      text-align: center;
      background-color: $color-sf;

      .back {
        float: left;
        margin-top: 60rpx;
        margin-left: 24rpx;
      }

      .more-icon {
        float: right;
        margin-top: 60rpx;
        margin-right: 24rpx;
      }

      .head {
        width: 124rpx;
        height: 124rpx;
        margin-top: 108rpx;
        border: 3px solid #fff;
        border-radius: 50%;
      }
    }

    .list {
      padding: 0 36rpx 0 52rpx;
      font-size: 28rpx;

      .item {
        padding: 36rpx 0;
        border-bottom: 1px solid #f2f2f2;

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
      color: #4fb0c8;
      font-size: 28rpx;

      .list2 {
        margin: 24rpx 0;
      }
    }

    hr {
      width: 586rpx;
      height: 1px;
      margin-left: 120rpx;
      background-color: #f2f2f2;
      border: none;
    }

    .list3 {
      margin: 24rpx 0;
      padding: 0 56rpx;
      font-size: 26rpx;

      .item {
        margin: 30rpx 0;

        .avatar-user {
          width: 66rpx;
          height: 66rpx;
          margin-right: 20rpx;
          vertical-align: middle;
          border-radius: 50%;
        }
      }

      .button-text {
        font-size: 15px;
      }

      .slot-button {
        display: flex;
        flex: 1;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 100%;
        padding: 0 20px;
        color: #fff;
      }
    }
  }

  .mask {
    @include mask;
  }
</style>
