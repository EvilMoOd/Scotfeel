<script setup lang="ts">
  import { onLoad } from '@dcloudio/uni-app';
  import { reactive, ref } from 'vue';
  import { useFriendStore } from '../../../store/modules/friendStore';
  import PopWindow from '../../../components/PopWindow/PopWindow.vue';
  import type { PersonMessage } from '../../../server/api/user';
  import { reqPersonMessage } from '../../../server/api/user';

  const friendStore = useFriendStore();
  const personInfo = reactive<PersonMessage>({
    userId: '7d5e7e76a4534db78b79d80b221df2ae',
    nickname: '用户02',
    remarkName: '丽丽',
    account: 'SF_W0mWG6bK',
    avatar: 'http://obs.scotfeel.com/61b0b7cc5af7a0db2c245f213bfa637b.jpeg?versionId=null',
    backgroundImage: 'http://obs.scotfeel.com/61b0b7cc5af7a0db2c245f213bfa637b.jpeg?versionId=null',
    signature: '喜欢写代码',
    relationship: 1,
  });
  let sessionId: string;
  onLoad(async (params: any) => {
    sessionId = params.sessionId;
    const data = await reqPersonMessage(sessionId);
    personInfo.account = data.account;
    personInfo.avatar = data.account;
    personInfo.backgroundImage = data.backgroundImage;
    personInfo.nickname = data.nickname;
    personInfo.relationship = data.relationship;
    personInfo.remarkName = data.remarkName;
    personInfo.signature = data.signature;
    personInfo.userId = data.userId;
  });

  // 展示功能块
  const show = reactive({
    isShow: false,
    isShowChangeNickname: false,
    isShowConfig: false,
  });
  function showConfig() {
    show.isShowConfig = true;
    show.isShow = true;
  }
  function hiddenAll() {
    show.isShowChangeNickname = false;
    show.isShowConfig = false;
    show.isShow = false;
  }
  // 修改备注输入框
  function showChangeRemark() {
    show.isShowChangeNickname = true;
    show.isShowConfig = false;
    show.isShow = true;
  }
  const remark = ref('');
  // 修改备注
  const message = ref(null);
  async function changeRemark() {
    try {
      await friendStore.changeRemark(remark.value, personInfo.userId);
      message.value.open();
      hiddenAll();
      personInfo.remarkName = remark.value;
      remark.value = '';
    } catch (err) {
      uni.showModal({
        title: '修改失败，请检查网络',
      });
    }
  }
  // 删除朋友
  function deleteFriend() {
    friendStore.deleteFriend(personInfo.userId);
  }
  // 发送消息
  function sendMessage() {
    uni.navigateTo({ url: `/pages/main/personChat/chat?sessionId=${sessionId}` });
  }
</script>

<template>
  <view class="page" :class="show.isShow ? 'mask' : ''">
    <view class="header">
      <image
        :src="personInfo.backgroundImage"
        mode="scaleToFill"
        style="position: absolute; z-index: -100; width: 750rpx; height: 304rpx"
      />
      <Back class="icon-back" />
      <uni-icons type="more-filled" color="#aaa" size="28" class="icon-more" @click="showConfig" />
    </view>
    <view class="id-card">
      <image :src="personInfo.avatar" mode="scaleToFill" class="avatar" />
      <view>
        <text v-if="personInfo.remarkName" style="font-size: 34rpx; font-weight: bold; color: #fff">
          {{ personInfo.remarkName }}
        </text>
        <text v-else style="font-size: 34rpx; font-weight: bold; color: #fff">
          {{ personInfo.nickname }}
        </text>
        <br />
        <text style="font-size: 28rpx">{{ personInfo.account }}</text>
      </view>
      <view class="send-msg-btn" @tap="sendMessage">发送消息</view>
    </view>
    <view class="introduction">{{ personInfo.signature }}</view>
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
  <GradientWindow
    style="right: 1rpx; top: 66rpx; text-align: center; line-height: 60rpx; width: 150rpx"
    :show="show.isShowConfig"
  >
    <text @tap="showChangeRemark">设置备注</text>
    <text>创建空间</text>
    <text style="color: #d9001b" @tap="deleteFriend">删除</text>
  </GradientWindow>
  <PopWindow :pop-show="show.isShowChangeNickname">
    <uni-easyinput
      v-model="remark"
      type="text"
      placeholder="请输入新昵称"
      trim
      maxlength="10"
      :styles="{ borderColor: '#fff' }"
      @confirm="changeRemark"
    />
  </PopWindow>
  <Mask :show="show.isShow" :hidden="hiddenAll" />
</template>
<style lang="scss" scoped>
  .page {
    transition: 0.7s;
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
    }

    .id-card {
      position: relative;
      padding: 0 0 0 60rpx;
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
