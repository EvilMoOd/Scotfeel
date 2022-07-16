<script setup lang="ts">
  import { onLoad } from '@dcloudio/uni-app';
  import { reactive, ref } from 'vue';
  import type { SpaceMember, UserMember } from '../../server/api/space';
  import {
    reqUpdateRemark,
    reqDeleteMember,
    reqUpdateRole,
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

  let spaceId: string;
  const success = ref(null);
  const fail = ref(null);
  const message = ref('');
  // 展示模块
  const show = reactive({
    maskShow: false,
    showConfig: false,
    showChangeNickname: false,
    showChangeIntroduction: false,
    showPrivate: false,
    showEditMember: -1,
    showChangeRemark: false,
  });
  function hiddenAll() {
    show.maskShow = false;
    show.showConfig = false;
    show.showChangeNickname = false;
    show.showChangeIntroduction = false;
    show.showPrivate = false;
    show.showChangeRemark = false;
  }
  // 空间基础信息
  const spaceInfo = reactive({
    avatar: '',
    spaceNickname: '',
    spaceIntroduction: '',
    displayOnPage: true,
    defaultSpace: false,
    private: false,
    verify: false,
    invite: false,
    recommend: true,
    myRemarkName: '',
    userMember: [] as UserMember[],
    spaceMember: [] as SpaceMember[],
  });
  onLoad(async (params) => {
    spaceId = params.spaceId as string;
    spaceInfo.avatar = params.avatar as string;
    spaceInfo.spaceNickname = params.nickname as string;
    spaceInfo.private = params.privateFlag === '1';
    spaceInfo.verify = params.verifyFlag === '1';
    spaceInfo.recommend = params.recommendFlag === '1';
    spaceInfo.invite = params.inviteFlag === '1';
    const member = await reqUserMember(spaceId);
    spaceInfo.userMember.push(...member);
    const space = await reqSpaceMember(spaceId);
    spaceInfo.spaceMember.push(...space);
  });

  // 修改昵称
  async function changeNickname(e: string) {
    await reqUpdateNickname(e, spaceId);
  }
  // 修改空间介绍
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
  // 空间角色
  async function roleSpaceMaster() {
    try {
      await reqUpdateRole(spaceInfo.userMember[show.showEditMember].userId, 1, spaceId);
      message.value = '空间主设定成功';
      success.value.popUp();
    } catch (err) {
      message.value = '空间主设定失败';
      fail.value.popUp();
    }
  }
  async function roleSpaceManager() {
    try {
      await reqUpdateRole(spaceInfo.userMember[show.showEditMember].userId, 2, spaceId);
      message.value = '管理员设定成功';
      success.value.popUp();
    } catch (err) {
      message.value = '管理员设定失败';
      fail.value.popUp();
    }
  }
  // 移除成员
  async function deleteMember() {
    try {
      await reqDeleteMember(spaceInfo.userMember[show.showEditMember].userId, 1, spaceId);
      message.value = '移除成功';
      success.value.popUp();
    } catch (err) {
      message.value = '移除失败';
      fail.value.popUp();
    }
  }
  // 设置个人在空间里的备注
  async function changeRemark(e: string) {
    await reqUpdateRemark(e, spaceId);
    spaceInfo.myRemarkName = '';
  }
</script>

<template>
  <view
    class="page"
    :class="show.maskShow ? 'mask' : ''"
    @tap="
      () => {
        show.showEditMember = -1;
      }
    "
  >
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
      <image :src="spaceInfo.avatar" class="avatar" />
      <view>{{ spaceInfo.spaceNickname }}</view>
    </view>
    <view class="list">
      <view class="item">
        <text
          @tap="
            () => {
              show.showChangeRemark = true;
              show.maskShow = true;
            }
          "
        >
          设置群里的昵称
        </text>
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
    </view>
    <hr />
    <TopTab
      tab1="用户成员"
      tab2="空间成员"
      height="540rpx"
      font-color="#000"
      line-color="#117986"
      bold="space-around"
      left="75px"
      right="260px"
      line-width="54px"
    >
      <template #s1>
        <scroll-view scroll-y class="member-list">
          <view
            v-for="(item, index) in spaceInfo.userMember"
            :key="item.userId"
            class="item"
            @longpress="
              () => {
                show.showEditMember = index;
              }
            "
          >
            <image :src="item.avatar" class="avatar-user" mode="scaleToFill" />
            <text>{{ item.remarkName ? item.remarkName : item.nickName }}</text>
            <view style="float: right; margin-top: 10rpx; color: #3ea8c2">
              {{ item.role === 1 ? '空间主' : item.role === 2 ? '管理员' : '成员' }}
            </view>
            <GradientWindow
              :show="show.showEditMember === index"
              style=" top: -20rpx; left: 400rpx;text-align: center"
            >
              <view @tap="roleSpaceMaster">设为空间主</view>
              <view @tap="roleSpaceManager">设为管理员</view>
              <view style="color: #d9001b" @tap="deleteMember">移除</view>
            </GradientWindow>
          </view>
        </scroll-view>
      </template>
      <template #s2>
        <view class="my-space">
          <SpaceIdCard
            v-for="(item, index) in spaceInfo.spaceMember"
            :key="index"
            :avatar="item.avatar"
            :space-id="item.spaceId"
            :nick-name="item.nickName"
          />
        </view>
      </template>
    </TopTab>
  </view>
  <GradientWindow
    style="
      top: 66rpx;
      right: 1rpx;
      margin: 10rpx;
      line-height: 60rpx;
      text-align: center;
      border-bottom: 5px solid #eee;
    "
    :show="show.showConfig"
  >
    <view>
      展示在个人主页
      <switch
        color="#117986"
        style=" margin: -10rpx -20rpx 0;transform: scale(0.5)"
        :checked="spaceInfo.displayOnPage"
        @change="changeDisplayOnPersonPage"
      />
    </view>
    <view>
      首页左滑默认空间
      <switch
        color="#117986"
        style=" margin: -10rpx -20rpx 0;transform: scale(0.5)"
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
      <view style=" margin: 10rpx;text-align: center; border-bottom: 5px solid #eee">
        设置为私密空间
        <switch
          color="#117986"
          style=" margin: -10rpx -20rpx 0;transform: scale(0.5)"
          :checked="spaceInfo.private"
          @change="
            () => {
              spaceInfo.private = !spaceInfo.private;
              setSpacePrivate();
            }
          "
        />
      </view>
      <view style=" margin: 10rpx;text-align: center; border-bottom: 5px solid #eee">
        进入空间需要审核
        <switch
          color="#117986"
          style=" margin: -10rpx -20rpx 0;transform: scale(0.5)"
          :checked="spaceInfo.verify"
          @change="
            () => {
              spaceInfo.verify = !spaceInfo.verify;
              setSpacePrivate();
            }
          "
        />
      </view>
      <view style=" margin: 10rpx;text-align: center; border-bottom: 5px solid #eee">
        空间成员只能被邀请
        <switch
          color="#117986"
          style=" margin: -10rpx -20rpx 0;transform: scale(0.5)"
          :checked="spaceInfo.invite"
          @change="
            () => {
              spaceInfo.invite = !spaceInfo.invite;
              setSpacePrivate();
            }
          "
        />
      </view>
      <view style=" margin: 10rpx;text-align: center">
        是否允许系统推荐给其他用户
        <switch
          color="#117986"
          style=" margin: -10rpx -20rpx 0;transform: scale(0.5)"
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
  <PopWindow :pop-show="show.showChangeRemark">
    <uni-easyinput
      v-model="spaceInfo.myRemarkName"
      type="text"
      placeholder="请输入在空间中的备注"
      trim
      maxlength="10"
      :styles="{ borderColor: '#fff' }"
      @confirm="changeRemark"
    />
  </PopWindow>
  <PopMessage ref="success" success>{{ message }}</PopMessage>
  <PopMessage ref="fail">{{ message }}</PopMessage>
  <Mask :show="show.maskShow" class="mask" :hidden="hiddenAll" />
</template>

<style lang="scss" scoped>
  .page {
    transition: 0.7s;

    .header {
      height: 392rpx;
      color: #fff;
      text-align: center;
      background-color: $color-sf;

      // margin: 10rpx;
      border-bottom: 5px solid #eee;

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

      .avatar {
        width: 144rpx;
        height: 144rpx;
        margin-top: 108rpx;
        border: 3px solid #fff;
        border-radius: 30rpx;
      }
    }

    .list {
      padding: 30rpx 36rpx 30rpx 52rpx;
      font-size: 28rpx;

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

    .member-list {
      box-sizing: border-box;
      height: 600rpx;
      padding: 0 30rpx;

      .item {
        position: relative;
        margin: 30rpx 0;

        .avatar-user {
          width: 66rpx;
          height: 66rpx;
          margin-right: 20rpx;
          vertical-align: middle;
          border-radius: 50%;
        }
      }
    }

    .my-space {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      height: 550rpx;
      padding: 30rpx;
    }
  }

  .mask {
    @include mask;
  }
</style>
