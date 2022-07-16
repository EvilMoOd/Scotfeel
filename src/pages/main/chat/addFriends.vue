<script setup lang="ts">
  import { onLoad } from '@dcloudio/uni-app';
  import { onBeforeUnmount, reactive, ref } from 'vue';
  import { reqAddFriend } from '../../../server/api/friend';
  import PopMessage from '../../../components/PopMessage/PopMessage.vue';

  const apply = reactive({
    content: '',
    appliedUserId: '',
  });

  onLoad((params) => {
    apply.appliedUserId = params.appliedUserId as string;
  });
  // 添加好友
  type PopMessageType = InstanceType<typeof PopMessage>;
  const success = ref<PopMessageType>();
  const fail = ref<PopMessageType>();
  let timer: number;
  async function addFriend() {
    try {
      await reqAddFriend(apply.content, apply.appliedUserId);
      success.value.popUp();
      timer = setTimeout(() => {
        uni.navigateBack({
          delta: 1,
        });
      }, 3000);
    } catch (err) {
      fail.value.popUp();
    }
  }
  onBeforeUnmount(() => {
    clearTimeout(timer);
  });
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
  <PopMessage ref="success" success>添加好友成功</PopMessage>
  <PopMessage ref="fail">添加好友失败</PopMessage>
</template>

<style lang="scss" scoped>
  .header {
    @include header;

    display: flex;
    justify-content: center;
    color: #fff;
    font-weight: bold;
    font-size: 36rpx;

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
      padding: 20rpx;
      background-color: #f2f2f2;
      border-radius: 40rpx;
    }

    .determine {
      width: 120rpx;
      height: 120rpx;
      margin: 500rpx;
    }
  }
</style>
