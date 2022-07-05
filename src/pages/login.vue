<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { reqAuthCode } from '../server/api/user';
  import { connectWebSocket } from '../server/webSocket';
  import { useUserStore } from '../store/modules/userStore';

  const userStore = useUserStore();
  const message = ref('');
  const success = ref<any>(null);
  const fail = ref<any>(null);
  // 修改手机号地区类型
  const type = ref(0);
  const phoneTypes = reactive(['+86']);
  function changePhoneType(e: any) {
    type.value = e.detail.value;
  }
  // 登录信息
  const user = reactive({
    phone: '',
    authCode: '',
    agreeAccord: false,
  });

  // 登录
  async function login() {
    const phonePattern = /^1[3456789]\d{9}$/;
    if (!phonePattern.test(user.phone)) {
      message.value = '请输入正确手机号';
      fail.value.popUp();
    } else if (user.agreeAccord !== true) {
      message.value = '请同意相关协议';
      fail.value.popUp();
    } else {
      try {
        await userStore.userLogin(user.phone, user.authCode);
        uni.redirectTo({ url: '/pages/main/home' });
        connectWebSocket(`wss://www.scotfeel.com/wss/`, userStore.token as string);
      } catch (error: any) {
        message.value = error;
        fail.value.popUp();
      }
    }
  }
  // 获取验证码
  const time = ref(60);
  const disabled = ref(false);
  async function getAuthCode() {
    const AuthPattern = /^1[3456789]\d{9}$/;
    if (AuthPattern.test(user.phone)) {
      try {
        await reqAuthCode(user.phone);
        message.value = '验证码已发送至手机';
        success.value.popUp();
        const timer = setInterval(() => {
          time.value -= 1;
        }, 1000);
        // 设置发送成功后禁用时间为60s
        disabled.value = true;
        setTimeout(() => {
          time.value = 60;
          disabled.value = false;
          clearInterval(timer);
        }, 60000);
      } catch (error: any) {
        message.value = error;
        fail.value.popUp();
      }
    } else {
      message.value = '手机号格式有误';
      fail.value.popUp();
    }
  }
  // 同意协议
  function changeChecked() {
    user.agreeAccord = true;
  }
</script>
<template>
  <view class="header">
    <text class="title">Scotfeel</text>
  </view>
  <view class="main">
    <picker mode="selector" :range="phoneTypes" class="phone-types" @change="changePhoneType">
      {{ phoneTypes[type] }}
    </picker>
    <input
      v-model="user.phone"
      type="text"
      class="username"
      placeholder="请输入手机号"
      placeholder-class="placeholder"
    />
    <input
      v-model="user.authCode"
      type="text"
      class="code"
      placeholder="请输入验证码"
      placeholder-class="placeholder"
    />
    <!-- 获取验证码 -->
    <button
      hover-class="get-code-hover"
      plain
      class="get-code"
      :class="disabled ? 'code-color2' : 'code-color1'"
      :disabled="disabled"
      @tap="getAuthCode"
    >
      <text v-if="!disabled" class="code-text">获取验证码</text>
      <text v-else class="code-text">冷却{{ time }}s</text>
    </button>
  </view>
  <!-- 登录 -->
  <button class="sign-in" @tap="login">
    <uni-icons type="arrow-right" :size="30" color="white" />
  </button>
  <view class="footer">
    <radio class="agree" color="#117986" :checked="user.agreeAccord" @tap.once="changeChecked" />
    <text>我已阅读并同意</text>
    <navigator url="/pages/" hover-class="navigator-hover">
      <text class="nav">Scotfeel用户协议</text>
    </navigator>
    和
    <navigator url="/pages/" hover-class="navigator-hover">
      <text class="nav">隐私协议</text>
    </navigator>
  </view>
  <PopMessage ref="success" success>{{ message }}</PopMessage>
  <PopMessage ref="fail">{{ message }}</PopMessage>
</template>

<style lang="scss" scoped>
  .header {
    @include header;
    display: flex;
    justify-content: center;
    .title {
      display: inline-block;
      margin-top: 84rpx;
      font-weight: bold;
      font-size: 46rpx;
      color: #fff;
    }
  }
  .main {
    padding: 32rpx;
    margin-top: 20rpx;
    display: flex;
    flex-wrap: wrap;
    .phone-types {
      margin-right: 32rpx;
      padding: 12rpx;
      border-bottom: solid 1px #d7d7d7;
      width: 76rpx;
    }
    .username {
      padding: 12rpx;
      border-bottom: solid 1px #d7d7d7;
      width: 514rpx;
    }
    .placeholder {
      color: #d7d7d7;
    }
    .code {
      margin-top: 40rpx;
      padding: 12rpx;
      border-bottom: solid 1px #d7d7d7;
      width: 424rpx;
    }
    .get-code {
      width: 200rpx;
      height: 60rpx;
      margin-top: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 46rpx;
      border-color: $color-sf;
      .code-text {
        font-size: 26rpx;
      }
    }
    .code-color1 {
      color: $color-sf;
    }
    .code-color2 {
      color: #aaa;
    }
    .get-code-hover {
      color: #aaa;
    }
  }
  .sign-in {
    width: 96rpx;
    height: 96rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: $color-sf;
    position: absolute;
    left: 600rpx;
    top: 1050rpx;
    @media screen and (min-height: 896px) {
      top: 1350rpx;
    }
  }
  .footer {
    font-size: 24rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 800rpx;
    @media screen and (min-height: 896px) {
      top: 1100rpx;
    }
    .agree {
      transform: scale(0.7);
    }
    .nav {
      color: $color-sf;
    }
  }
</style>
