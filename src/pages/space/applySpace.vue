<script setup lang="ts">
  import { reactive } from 'vue';
  import { reqApplyJoinSpace } from '../../server/api/space';
  import { useUserStore } from '../../store/modules/userStore';
  import { getParam } from '../../util/url';

  const userStore = useUserStore();
  const spaceId = getParam('spaceId');

  const applyForm = reactive({
    content: '',
    applicantType: true,
    studentFlag: false,
    studentNumber: '',
    graduateTime: -1,
    photos: [],
  });

  async function enterInSpace() {
    await reqApplyJoinSpace(spaceId, userStore.userInfo?.mainId, applyForm.content);
    uni.navigateTo({ url: '/pages/space/space' });
  }
  function cc() {
    console.log(applyForm.photos);
  }
</script>

<template>
  <view class="header">
    <Back class="back" />
    <text class="title">申请加入空间</text>
  </view>
  <view class="main">
    <text>申请理由</text>
    <textarea v-model="applyForm.content" class="applyReason" cols="30" rows="10"></textarea>
    <view>
      <text v-if="applyForm.applicantType">以个人加入该空间</text>
      <text v-else>以空间加入该空间</text>
      <switch
        color="#117986"
        style="transform: scale(0.5); margin: -10rpx -20rpx 0 -20rpx"
        :checked="applyForm.applicantType"
        @change="
          () => {
            applyForm.applicantType = !applyForm.applicantType;
          }
        "
      />
    </view>
    <view>
      我是学生
      <switch
        color="#117986"
        style="transform: scale(0.5); margin: -10rpx -20rpx 0 -20rpx"
        :checked="applyForm.studentFlag"
        @change="
          () => {
            applyForm.studentFlag = !applyForm.studentFlag;
          }
        "
      />
      <uni-easyinput
        v-if="applyForm.studentFlag"
        v-model="applyForm.studentNumber"
        type="text"
        placeholder="请输入学号"
      />
      <uni-file-picker
        v-if="applyForm.studentFlag"
        v-model="applyForm.photos"
        limit="1"
        title="请选择学生证明图片"
        @select="cc"
      ></uni-file-picker>
    </view>
    <image
      src="@/assets/images/determine.jpg"
      class="determine"
      mode="aspectFill"
      @tap="enterInSpace"
    />
  </view>
</template>

<style lang="scss" scoped>
  .header {
    @include header;
    display: flex;
    justify-content: center;
    font-size: 36rpx;
    font-weight: bold;
    color: #fff;
    .back {
      position: absolute;
      top: 80rpx;
      left: 20rpx;
    }
    .title {
      margin-top: 80rpx;
    }
  }
  .main {
    padding: 50rpx;
    .applyReason {
      margin-top: 20rpx;
      background-color: #f2f2f2;
      border-radius: 40rpx;
      padding: 20rpx;
    }
    .determine {
      margin: 100rpx 500rpx;
      width: 120rpx;
      height: 120rpx;
    }
  }
</style>
