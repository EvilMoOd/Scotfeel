<script setup lang="ts">
  import { onLoad } from '@dcloudio/uni-app';
  import { reactive, ref } from 'vue';
  import { reqAddFriend } from '../../../server/api/friend';

  const apply = reactive({
    content: '',
    appliedUserId: '',
  });

  onLoad((params: any) => {
    apply.appliedUserId = params.appliedUserId;
  });

  const message = ref(null);
  async function addFriend() {
    try {
      console.log(apply.appliedUserId);
      await reqAddFriend(apply.content, apply.appliedUserId);
      message.value.open();
      setTimeout(() => {
        uni.navigateBack({
          delta: 1,
        });
      }, 3000);
    } catch (err) {
      uni.showModal({
        title: '添加失败，请检查网络',
      });
    }
  }
</script>

<template>
  <view class="header">
    <Back class="back" />
    <text class="title">添加好友</text>
  </view>
  <view class="main">
    <text>发送添加邀请</text>
    <textarea v-model="apply.content" class="applyReason" cols="30" rows="10"></textarea>
    <image
      src="@/assets/images/determine.jpg"
      class="determine"
      mode="aspectFill"
      @tap="addFriend"
    />
  </view>
  <uni-popup ref="message" type="message">
    <uni-popup-message type="success" message="添加成功" :duration="2000"></uni-popup-message>
  </uni-popup>
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
      margin: 500rpx;
      width: 120rpx;
      height: 120rpx;
    }
  }
</style>
