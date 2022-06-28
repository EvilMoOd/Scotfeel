<script setup lang="ts">
  import { onLoad } from '@dcloudio/uni-app';
  import { reactive } from 'vue';
  import type { SpaceMember, UserMember } from '../../server/api/space';
  import {
    reqChangeAvatar,
    reqSetBackGroundImg,
    reqSetDefaultSpace,
    reqSetPrivate,
    reqShowInPersonPage,
    reqSpaceMember,
    reqUpdateIntroduction,
    reqUpdateNickname,
    reqUserMember,
  } from '../../server/api/space';
  import { reqImgData } from '../../server/api/user';
  import { OBS_URL } from '../../server/http';
  import { uploadImage } from '../../util/uploadImage';

  let spaceId: any;
  // 展示模块
  const show = reactive({
    maskShow: false,
    showConfig: false,
    showChangeNickname: false,
    showChangeIntroduction: false,
    showPrivate: false,
  });
  function hiddenAll() {
    show.maskShow = false;
    show.showConfig = false;
    show.showChangeNickname = false;
    show.showChangeIntroduction = false;
    show.showPrivate = false;
  }
  // 空间基础信息
  onLoad(async (params) => {
    console.log(params);
    spaceId = params.spaceId;
    spaceInfo.private = params.privateFlag === '1';
    spaceInfo.verify = params.verifyFlag === '1';
    spaceInfo.recommend = params.recommendFlag === '1';
    spaceInfo.invite = params.inviteFlag === '1';
    const member = await reqUserMember(spaceId);
    spaceInfo.userMember.push(...member);
    const space = await reqSpaceMember(spaceId);
    spaceInfo.spaceMember.push(...space);
  });
  const spaceInfo = reactive({
    spaceNickname: '',
    spaceIntroduction: '',
    displayOnPage: true,
    defaultSpace: false,
    private: false,
    verify: false,
    invite: false,
    recommend: true,
    userMember: [] as UserMember[],
    spaceMember: [] as SpaceMember[],
  });
  // 修改昵称
  async function changeNickname(e: string) {
    await reqUpdateNickname(e, spaceId);
    spaceInfo.spaceNickname = '';
  }
  async function changeIntroduction(e: string) {
    await reqUpdateIntroduction(e, spaceId);
    spaceInfo.spaceIntroduction = '';
  }
  // 是否展示在个人主页
  async function changeDisplayOnPersonPage() {
    spaceInfo.displayOnPage = !spaceInfo.displayOnPage;
    await reqShowInPersonPage(spaceInfo.displayOnPage ? 0 : 1, spaceId);
  }
  // 左滑默认空间
  async function setDefaultSpace() {
    spaceInfo.defaultSpace = !spaceInfo.defaultSpace;
    await reqSetDefaultSpace(spaceId);
  }
  // 设置空间头像
  async function changeSpaceAvatar() {
    const imgData = await reqImgData();
    uploadImage(
      imgData,
      async () => {
        const imgUrl = `${OBS_URL}/${imgData.imageId}.jpeg`;
        await reqChangeAvatar(imgUrl, spaceId);
      },
      1,
      {
        width: 48,
        height: 48,
      }
    );
  }
  // 设置空间背景
  async function changeSpaceBackgroundImg() {
    const imgData = await reqImgData();
    uploadImage(imgData, async () => {
      const imgUrl = `${OBS_URL}/${imgData.imageId}.jpeg`;
      await reqSetBackGroundImg(imgUrl, spaceId);
    });
  }
  // 空间私密设置
  async function setSpacePrivate() {
    await reqSetPrivate(
      spaceId,
      spaceInfo.private ? 1 : 0,
      spaceInfo.verify ? 1 : 0,
      spaceInfo.invite ? 1 : 0,
      spaceInfo.recommend ? 1 : 0
    );
  }
</script>

<template>
  <view class="page" :class="show.maskShow ? 'mask' : ''">
    <view class="header">
      <Back />
      <uni-icons
        type="more-filled"
        color="#fff"
        size="28"
        class="more-icon"
        @tap="
          () => {
            show.maskShow = true;
            show.showConfig = true;
          }
        "
      />
      <image src="@/assets/images/head.png" class="avatar" />
      <view>AMCC肌肉车俱乐部</view>
    </view>
    <view class="list">
      <view class="item">
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
    <TopTab tab1="用户成员" tab2="空间成员" height="540rpx">
      <template #s1>
        <scroll-view scroll-y class="member-list">
          <view v-for="item in spaceInfo.userMember" :key="item.userId" class="item">
            <image :src="item.avatar" class="avatar-user" mode="scaleToFill" />
            <text>{{ item.nickName }}</text>
            <view style="float: right; color: #3ea8c2; margin-top: 10rpx">
              {{ item.role === 1 ? '空间主' : item.role === 2 ? '管理员' : '成员' }}
            </view>
          </view>
        </scroll-view>
      </template>
      <template #s2>
        <view class="my-space">
          <SpaceIdCard
            v-for="(item, index) in spaceInfo.spaceMember"
            :key="index"
            :img="item.avatar"
            :nick-name="item.nickName"
          />
        </view>
      </template>
    </TopTab>
  </view>
  <GradientWindow
    style="
      right: 1rpx;
      top: 66rpx;
      text-align: center;
      margin: 10rpx;
      border-bottom: 5px solid #eee;
      line-height: 60rpx;
    "
    :show="show.showConfig"
  >
    <view>
      展示在个人主页
      <switch
        color="#117986"
        style="transform: scale(0.5); margin: -10rpx -20rpx 0 -20rpx"
        :checked="spaceInfo.displayOnPage"
        @change="changeDisplayOnPersonPage"
      />
    </view>
    <view>
      首页左滑默认空间
      <switch
        color="#117986"
        style="transform: scale(0.5); margin: -10rpx -20rpx 0 -20rpx"
        :checked="spaceInfo.defaultSpace"
        @change="setDefaultSpace"
      />
    </view>
    <view
      @tap="
        () => {
          show.showChangeNickname = true;
          show.maskShow = true;
          show.showConfig = false;
        }
      "
    >
      设置空间昵称
    </view>
    <view
      @tap="
        () => {
          show.showChangeIntroduction = true;
          show.maskShow = true;
          show.showConfig = false;
        }
      "
    >
      设置空间介绍
    </view>
    <view
      @tap="
        () => {
          show.showConfig = false;
          show.showPrivate = true;
          show.maskShow = true;
        }
      "
    >
      私密设置
    </view>
    <view @tap="changeSpaceBackgroundImg">设置空间背景</view>
    <view @tap="changeSpaceAvatar">设置头像</view>
    <view>空间认证</view>
  </GradientWindow>
  <PopWindow :pop-show="show.showChangeNickname">
    <uni-easyinput
      v-model="spaceInfo.spaceNickname"
      type="text"
      placeholder="请输入空间昵称"
      trim
      maxlength="30"
      :styles="{ borderColor: '#fff' }"
      @confirm="changeNickname"
    />
  </PopWindow>
  <PopWindow :pop-show="show.showChangeIntroduction">
    <uni-easyinput
      v-model="spaceInfo.spaceIntroduction"
      type="text"
      placeholder="请输入空间介绍"
      trim
      maxlength="30"
      :styles="{ borderColor: '#fff' }"
      @confirm="changeIntroduction"
    />
  </PopWindow>
  <PopBottom :pop-show="show.showPrivate">
    <view style="padding-top: 30rpx">
      <view style="text-align: center; margin: 10rpx; border-bottom: 5px solid #eee">
        设置为私密空间
        <switch
          color="#117986"
          style="transform: scale(0.5); margin: -10rpx -20rpx 0 -20rpx"
          :checked="spaceInfo.private"
          @change="
            () => {
              spaceInfo.private = !spaceInfo.private;
              setSpacePrivate();
            }
          "
        />
      </view>
      <view style="text-align: center; margin: 10rpx; border-bottom: 5px solid #eee">
        进入空间需要审核
        <switch
          color="#117986"
          style="transform: scale(0.5); margin: -10rpx -20rpx 0 -20rpx"
          :checked="spaceInfo.verify"
          @change="
            () => {
              spaceInfo.verify = !spaceInfo.verify;
              setSpacePrivate();
            }
          "
        />
      </view>
      <view style="text-align: center; margin: 10rpx; border-bottom: 5px solid #eee">
        空间成员只能被邀请
        <switch
          color="#117986"
          style="transform: scale(0.5); margin: -10rpx -20rpx 0 -20rpx"
          :checked="spaceInfo.invite"
          @change="
            () => {
              spaceInfo.invite = !spaceInfo.invite;
              setSpacePrivate();
            }
          "
        />
      </view>
      <view style="text-align: center; margin: 10rpx">
        是否允许系统推荐给其他用户
        <switch
          color="#117986"
          style="transform: scale(0.5); margin: -10rpx -20rpx 0 -20rpx"
          :checked="spaceInfo.recommend"
          @change="
            () => {
              spaceInfo.recommend = !spaceInfo.recommend;
              setSpacePrivate();
            }
          "
        />
      </view>
    </view>
  </PopBottom>
  <Mask :show="show.maskShow" class="mask" :hidden="hiddenAll" />
</template>

<style lang="scss" scoped>
  .page {
    transition: 0.7s;
    .header {
      height: 392rpx;
      background-color: $color-sf;
      text-align: center;
      // margin: 10rpx;
      border-bottom: 5px solid #eee;
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

      .avatar {
        width: 144rpx;
        height: 144rpx;
        border-radius: 30rpx;
        border: 3px solid #fff;
        margin-top: 108rpx;
      }
    }

    .list {
      font-size: 28rpx;
      padding: 30rpx 36rpx 30rpx 52rpx;

      .item {
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

    .member-list {
      box-sizing: border-box;
      padding: 0 30rpx;
      height: 600rpx;
      .item {
        margin: 30rpx 0;

        .avatar-user {
          width: 66rpx;
          height: 66rpx;
          border-radius: 50%;
          vertical-align: middle;
          margin-right: 20rpx;
        }
      }
    }

    .my-space {
      height: 550rpx;
      padding: 30rpx;
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
    }
  }

  .mask {
    @include mask;
  }
</style>
