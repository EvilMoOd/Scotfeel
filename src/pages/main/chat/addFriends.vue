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
  const message = ref('');
  const success = ref<any>(null);
  const fail = ref<any>(null);
  let timer: number;
  async function addFriend() {
    try {
      await reqAddFriend(apply.content, apply.appliedUserId);
      message.value = '好友添加成功';
      success.value.popUp();
      timer = setTimeout(() => {
        uni.navigateBack({
          delta: 1,
        });
      }, 3000);
    } catch (err) {
      message.value = '好友添加失败';
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
    <textarea v-model="apply.content" class="apply-reason" cols="30" rows="10"></textarea>
    <image
      src="@/assets/images/determine.jpg"
      class="determine"
      mode="aspectFill"
      @tap="addFriend"
    />
  </view>
  <PopMessage ref="success" success>{{ message }}</PopMessage>
  <PopMessage ref="fail">{{ message }}</PopMessage>
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

    .apply-reason {
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
