<script setup lang="ts">
  import { onLoad } from '@dcloudio/uni-app';
  import { reactive, ref } from 'vue';
  import { useFriendStore } from '../../../store/modules/friendStore';
  import PopWindow from '../../../components/PopWindow/PopWindow.vue';
  import type { PersonMessage } from '../../../server/api/user';
  import { reqPersonMessage } from '../../../server/api/user';
  import { useUserStore } from '../../../store/modules/userStore';

  const userStore = useUserStore();
  const friendStore = useFriendStore();
  // 加载个人页信息
  let sessionId: string;
  const personInfo = reactive<{ personPage: PersonMessage; pageType: 0 | 1 | 2 | 3 }>({
    personPage: {
      userId: '7d5e7e76a4534db78b79d80b221df2ae',
      nickname: '用户02',
      remarkName: undefined,
      account: 'SF_W0mWG6bK',
      avatar: 'http://obs.scotfeel.com/61b0b7cc5af7a0db2c245f213bfa637b.jpeg?versionId=null',
      backgroundImage: 'http://obs.scotfeel.com/0d82c86036e94549a04060b250bb7391.jpeg',
      signature: '喜欢写代码',
    },
    pageType: 0, // 页面类型，1为本人，2为朋友，3为陌生人
  });
  onLoad(async (params: any) => {
    sessionId = params.sessionId;
    if (sessionId === userStore.userInfo?.mainId) {
      personInfo.pageType = 1;
      personInfo.personPage.userId = userStore.userInfo.mainId;
      personInfo.personPage.nickname = userStore.userInfo.nickname;
      personInfo.personPage.account = userStore.userInfo.account;
      personInfo.personPage.avatar = userStore.userInfo.avatar;
      personInfo.personPage.backgroundImage = `url(${userStore.userInfo.backgroundImage})`;
      personInfo.personPage.signature = userStore.userInfo.signature;
    } else if (friendStore.getFriendInfo(sessionId)) {
      personInfo.pageType = 2;
      personInfo.personPage.userId = friendStore.friendPage.friendId;
      personInfo.personPage.nickname = friendStore.friendPage.nickname;
      personInfo.personPage.account = friendStore.friendPage.account;
      personInfo.personPage.avatar = friendStore.friendPage.avatar;
      personInfo.personPage.backgroundImage = `url(${friendStore.friendPage.backgroundImage})`;
      personInfo.personPage.signature = friendStore.friendPage.signature;
    } else {
      personInfo.pageType = 3;
      personInfo.personPage = await reqPersonMessage(sessionId);
      const backgroundImg = personInfo.personPage.backgroundImage;
      personInfo.personPage.backgroundImage = `url(${backgroundImg})`;
      console.log(personInfo);
    }
  });

  // 展示功能块
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
  //
  // 我的信息修改
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
  function changeMyNickname(e: string) {
    userStore.changeNickname(e);
    personInfo.personPage.nickname = e;
    show.showChangeMyNickname = false;
    show.showMask = false;
    myInfo.nickname = '';
  }
  // 修改我的个性签名
  function ShowChangeMySignature() {
    show.showChangeMySignature = true;
    show.showMyConfig = false;
    show.showMask = true;
  }
  function changeMySignature(e: string) {
    userStore.changeSignature(e);
    personInfo.personPage.signature = e;
    show.showChangeMySignature = false;
    show.showMask = false;
    myInfo.signature = '';
  }
  //
  // 好友信息修改
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
  const message = ref(null);
  async function changeRemark() {
    try {
      await friendStore.changeRemark(remark.value, personInfo.userId);
      message.value.open();
      hiddenAll();
      personInfo.personPage.remarkName = remark.value;
      remark.value = '';
    } catch (err) {
      uni.showModal({
        title: '修改失败，请检查网络',
      });
    }
  }
  // 删除朋友
  function showDeleteFriend() {
    show.showDeleteFriend = true;
    show.showConfig = false;
    show.showMask = true;
  }
  function deleteFriend() {
    friendStore.deleteFriend(personInfo.personPage.userId);
    show.showDeleteFriend = false;
    show.showMask = false;
  }
  // 发送消息
  function sendMessage() {
    uni.navigateTo({ url: `/pages/main/chat/chat?sessionId=${sessionId}` });
  }
  //
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
          v-if="personInfo.personPage.remarkName"
          style="font-size: 34rpx; font-weight: bold; color: #eee"
        >
          {{ personInfo.personPage.remarkName }}
        </text>
        <text v-else style="font-size: 34rpx; font-weight: bold; color: #eee">
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
  <uni-popup ref="message" type="message">
    <uni-popup-message type="success" message="备注修改成功" :duration="2000"></uni-popup-message>
  </uni-popup>

  <!-- 个人功能弹窗 -->
  <GradientWindow
    style="right: 1rpx; top: 66rpx; text-align: center; line-height: 60rpx; width: 150rpx"
    :show="show.showMyConfig"
  >
    <text @tap="ShowChangeMySignature">个性签名</text>
    <text @tap="showChangeMyNickname">修改昵称</text>
    <text @tap="userStore.changeBackgroundImg">设置背景</text>
    <text @tap="userStore.changeAvatar">设置头像</text>
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
    style="right: 1rpx; top: 66rpx; text-align: center; line-height: 60rpx; width: 150rpx"
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
    <view style="color: red; margin: 50rpx 0; text-align: center" @tap="deleteFriend">
      删除好友
    </view>
  </PopBottom>
  <Mask :show="show.showMask" :hidden="hiddenAll" />
</template>

<style lang="scss" scoped>
  .page {
    transition: 0.7s;
    .header {
      height: 304rpx;
      background-image: v-bind('personInfo.personPage.backgroundImage');
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
      .send-msg-btn {
        width: 250rpx;
        height: 60rpx;
        margin-left: auto;
        line-height: 60rpx;
        text-align: center;
        border: 3px solid $color-sf;
        color: $color-sf;
        border-radius: 30rpx;
        align-self: flex-end;
      }
      .add-friend-btn {
        @extend .send-msg-btn;
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
    .space {
      margin-top: 100rpx;
    }
  }
  .mask {
    @include mask;
  }
</style>
