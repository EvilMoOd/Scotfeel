<script setup lang="ts">
  import { onLoad } from '@dcloudio/uni-app';
  import { reactive, ref } from 'vue';
  import { useFriendStore } from '../../../store/modules/friendStore';
  import PopWindow from '../../../components/PopWindow/PopWindow.vue';
  import type { PersonMessage } from '../../../server/api/user';
  import { reqPersonMessage } from '../../../server/api/user';
  import { useUserStore } from '../../../store/modules/userStore';
  import { useSubscribeSpaceStore } from '../../../store/modules/spaceStore';
  import { imgMitt } from '../../../util/uploadImage';
  import type { SubscribedSpaceInfo } from '../../../server/api/space';
  import { reqSubscribedSpace } from '../../../server/api/space';

  const userStore = useUserStore();
  const friendStore = useFriendStore();
  const spaceStore = useSubscribeSpaceStore();
  const message = ref('');
  const success = ref<any>(null);
  const fail = ref<any>(null);
  // #region 加载个人页信息
  let sessionId: string;
  const personInfo = reactive<{
    personPage: PersonMessage;
    subscribeSpace: SubscribedSpaceInfo[];
    pageType: 0 | 1 | 2 | 3;
  }>({
    personPage: {
      userId: '',
      nickname: '',
      remarkName: undefined,
      account: '',
      avatar: '',
      backgroundImage: '',
      signature: '',
    },
    subscribeSpace: [],
    pageType: 0, // 页面类型，1为本人，2为朋友，3为陌生人
  });
  onLoad(async (params) => {
    sessionId = params.sessionId as string;
    if (sessionId === userStore.userInfo?.mainId) {
      personInfo.pageType = 1;
      // 个人信息
      personInfo.personPage.userId = userStore.userInfo.mainId;
      personInfo.personPage.nickname = userStore.userInfo.nickname;
      personInfo.personPage.account = userStore.userInfo.account;
      personInfo.personPage.avatar = userStore.userInfo.avatar;
      personInfo.personPage.backgroundImage = `url(${userStore.userInfo.backgroundImage})`;
      personInfo.personPage.signature = userStore.userInfo.signature;
      // 订阅空间
      personInfo.subscribeSpace.push(...spaceStore.subscribeSpace);
    } else if (friendStore.getFriendInfo(sessionId)) {
      personInfo.pageType = 2;
      personInfo.personPage.userId = friendStore.friendPage.friendId;
      personInfo.personPage.nickname = friendStore.friendPage.nickname;
      personInfo.personPage.remarkName = friendStore.friendPage.remarkName;
      personInfo.personPage.account = friendStore.friendPage.account;
      personInfo.personPage.avatar = friendStore.friendPage.avatar;
      personInfo.personPage.backgroundImage = `url(${friendStore.friendPage.backgroundImage})`;
      personInfo.personPage.signature = friendStore.friendPage.signature;
      const spaceData = await reqSubscribedSpace(personInfo.personPage.userId);
      personInfo.subscribeSpace.push(...spaceData);
    } else {
      personInfo.pageType = 3;
      personInfo.personPage = await reqPersonMessage(sessionId);
      const backgroundImg = personInfo.personPage.backgroundImage;
      personInfo.personPage.backgroundImage = `url(${backgroundImg})`;
      const spaceData = await reqSubscribedSpace(personInfo.personPage.userId);
      personInfo.subscribeSpace.push(...spaceData);
    }
  });
  // #endregion

  // #region  展示功能块
  const show = reactive({
    showMask: false,
    showMyConfig: false,
    showChangeMyNickname: false,
    showChangeMySignature: false,
    showConfig: false,
    showChangeNickname: false,
    showDeleteFriend: false,
  });

  function hiddenAll() {
    show.showMask = false;
    show.showMyConfig = false;
    show.showChangeMyNickname = false;
    show.showChangeMySignature = false;
    show.showConfig = false;
    show.showChangeNickname = false;
    show.showDeleteFriend = false;
  }
  // #endregion

  // #region 我的信息修改
  function showMyConfig() {
    show.showMask = true;
    show.showMyConfig = true;
  }
  const myInfo = reactive({
    nickname: '',
    signature: '',
  });
  // 修改我的昵称
  function showChangeMyNickname() {
    show.showChangeMyNickname = true;
    show.showMyConfig = false;
    show.showMask = true;
  }
  async function changeMyNickname(e: string) {
    try {
      await userStore.changeNickname(e);
      personInfo.personPage.nickname = e;
      show.showChangeMyNickname = false;
      show.showMask = false;
      myInfo.nickname = '';
      message.value = '昵称修改成功';
      success.value.popUp();
    } catch (err) {
      message.value = '昵称修改失败';
      fail.value.popUp();
    }
  }
  // 修改我的个性签名
  function ShowChangeMySignature() {
    show.showChangeMySignature = true;
    show.showMyConfig = false;
    show.showMask = true;
  }
  async function changeMySignature(e: string) {
    try {
      await userStore.changeSignature(e);
      message.value = '个性签名修改成功';
      success.value.popUp();
      personInfo.personPage.signature = e;
      show.showChangeMySignature = false;
      show.showMask = false;
      myInfo.signature = '';
    } catch (err) {
      message.value = '个性签名修改失败';
      fail.value.popUp();
    }
  }
  // 头像
  async function changeMyAvatar() {
    try {
      await userStore.changeAvatar();
      imgMitt.on('myAvatar', () => {
        message.value = '头像修改成功';
        success.value.popUp();
      });
    } catch (err) {
      message.value = '头像修改失败';
      fail.value.popUp();
    }
  }
  // 背景
  async function changeMyBackgroundImg() {
    try {
      await userStore.changeBackgroundImg();
      imgMitt.on('myBackground', () => {
        message.value = '背景修改成功';
        success.value.popUp();
      });
    } catch (err) {
      message.value = '背景修改失败';
      fail.value.popUp();
    }
  }
  // #endregion

  // #region 好友信息修改
  function showConfig() {
    show.showMask = true;
    show.showConfig = true;
  }
  // 修改备注输入框
  function showChangeRemark() {
    show.showChangeNickname = true;
    show.showConfig = false;
    show.showMask = true;
  }
  // 修改备注
  const remark = ref('');
  async function changeRemark() {
    try {
      await friendStore.changeRemark(remark.value, personInfo.personPage.userId);
      message.value = '备注已修改';
      success.value.popUp();
      hiddenAll();
      personInfo.personPage.remarkName = remark.value;
      remark.value = '';
    } catch (err) {
      message.value = '备注修改失败';
      fail.value.popUp();
    }
  }
  // 删除朋友
  function showDeleteFriend() {
    show.showDeleteFriend = true;
    show.showConfig = false;
    show.showMask = true;
  }
  async function deleteFriend() {
    try {
      await friendStore.deleteFriend(personInfo.personPage.userId);
      show.showDeleteFriend = false;
      show.showMask = false;
      message.value = '好友已删除';
      success.value.popUp();
    } catch (err) {
      message.value = '删除失败';
      fail.value.popUp();
    }
  }
  // #endregion

  // 发送消息
  function sendMessage() {
    uni.navigateTo({ url: `/pages/main/chat/chat?sessionId=${sessionId}` });
  }
  // 非好友
  // 前往添加好友申请
  function goAddFriends() {
    uni.navigateTo({
      url: `/pages/main/chat/addFriends?appliedUserId=${personInfo.personPage.userId}`,
    });
  }
</script>

<template>
  <view class="page" :class="show.showMask ? 'mask' : ''">
    <view class="header">
      <Back class="icon-back" />
      <uni-icons
        v-if="personInfo.pageType === 1"
        type="more-filled"
        color="#aaa"
        size="28"
        class="icon-more"
        @tap="showMyConfig"
      />
      <uni-icons
        v-else-if="personInfo.pageType === 2"
        type="more-filled"
        color="#aaa"
        size="28"
        class="icon-more"
        @tap="showConfig"
      />
    </view>
    <view class="id-card">
      <image :src="personInfo.personPage.avatar" mode="scaleToFill" class="avatar" />
      <view>
        <text
          v-if="personInfo.personPage.remarkName && personInfo.personPage.remarkName !== 'null'"
          style="color: #eee; font-weight: bold; font-size: 34rpx"
        >
          {{ personInfo.personPage.remarkName }}
        </text>
        <text v-else style="color: #eee; font-weight: bold; font-size: 34rpx">
          {{ personInfo.personPage.nickname }}
        </text>
        <br />
        <text style="font-size: 28rpx">{{ personInfo.personPage.account }}</text>
      </view>
      <view v-if="personInfo.pageType === 2" class="send-msg-btn" @tap="sendMessage">发送消息</view>
      <view v-if="personInfo.pageType === 3" class="add-friend-btn" @tap="goAddFriends">
        添加好友
      </view>
    </view>
    <view class="introduction">{{ personInfo.personPage.signature }}</view>
    <TopTab
      tab1="订阅空间"
      tab2="动态"
      height="350px"
      font-color="#000"
      line-color="#117986"
      bold="space-around"
      left="75px"
      right="260px"
      line-width="54px"
    >
      <template #s1>
        <view class="my-space">
          <SpaceIdCard
            v-for="item in personInfo.subscribeSpace"
            :key="item.spaceId"
            :avatar="item.avatar"
            :nickname="item.nickname"
            :space-id="item.spaceId"
          />
        </view>
      </template>
      <template #s2>
        <view>动态</view>
      </template>
    </TopTab>
  </view>
  <PopMessage ref="success" success>备注修改成功</PopMessage>
  <PopMessage ref="fail">备注修改失败</PopMessage>

  <!-- 个人功能弹窗 -->
  <GradientWindow
    style="top: 66rpx; right: 1rpx; width: 150rpx; line-height: 60rpx; text-align: center"
    :show="show.showMyConfig"
  >
    <text @tap="ShowChangeMySignature">个性签名</text>
    <text @tap="showChangeMyNickname">修改昵称</text>
    <text @tap="changeMyBackgroundImg">设置背景</text>
    <text @tap="changeMyAvatar">设置头像</text>
  </GradientWindow>
  <PopWindow :pop-show="show.showChangeMyNickname">
    <uni-easyinput
      v-model="myInfo.nickname"
      type="text"
      placeholder="请输入新昵称"
      trim
      maxlength="10"
      :styles="{ borderColor: '#fff' }"
      @confirm="changeMyNickname"
    />
  </PopWindow>
  <PopWindow :pop-show="show.showChangeMySignature">
    <uni-easyinput
      v-model="myInfo.signature"
      type="text"
      placeholder="请输入个性签名"
      trim
      maxlength="30"
      :styles="{ borderColor: '#fff' }"
      @confirm="changeMySignature"
    />
  </PopWindow>
  <!-- 朋友功能弹窗 -->
  <GradientWindow
    style="top: 66rpx; right: 1rpx; width: 150rpx; line-height: 60rpx; text-align: center"
    :show="show.showConfig"
  >
    <text @tap="showChangeRemark">设置备注</text>
    <text>创建空间</text>
    <text style="color: #d9001b" @tap="showDeleteFriend">删除</text>
  </GradientWindow>
  <PopWindow :pop-show="show.showChangeNickname">
    <uni-easyinput
      v-model="remark"
      type="text"
      placeholder="请输入好友备注"
      trim
      maxlength="10"
      :styles="{ borderColor: '#fff' }"
      @confirm="changeRemark"
    />
  </PopWindow>
  <PopBottom :pop-show="show.showDeleteFriend">
    <view style="margin: 50rpx 0; color: red; text-align: center" @tap="deleteFriend">
      删除好友
    </view>
  </PopBottom>
  <Mask :show="show.showMask" :hidden="hiddenAll" />
  <PopMessage ref="success" success>{{ message }}</PopMessage>
  <PopMessage ref="fail">{{ message }}</PopMessage>
</template>

<style lang="scss" scoped>
  .page {
    transition: 0.7s;

    .header {
      height: 304rpx;
      background-image: v-bind('personInfo.personPage.backgroundImage');

      .icon-back {
        float: left;
        margin-top: 66rpx;
        margin-left: 26rpx;
      }

      .icon-more {
        float: right;
        margin-top: 66rpx;
        margin-right: 26rpx;
      }
    }

    .id-card {
      position: relative;
      top: -64rpx;
      display: flex;
      align-items: center;
      padding: 0 60rpx;

      .avatar {
        width: 128rpx;
        height: 128rpx;
        border: 3px solid #fff;
        border-radius: 50%;
      }

      .send-msg-btn {
        align-self: flex-end;
        width: 250rpx;
        height: 60rpx;
        margin-left: auto;
        color: $color-sf;
        line-height: 60rpx;
        text-align: center;
        border: 3px solid $color-sf;
        border-radius: 30rpx;
      }

      .add-friend-btn {
        /* stylelint-disable-next-line scss/at-extend-no-missing-placeholder */
        @extend .send-msg-btn;
      }
    }

    .introduction {
      margin: -40rpx 96rpx;
      color: #555;
      font-size: 22rpx;
    }

    .my-space {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      height: 400rpx;
      padding: 30rpx;
    }

    .space {
      margin-top: 100rpx;
    }
  }

  .mask {
    @include mask;
  }
</style>
