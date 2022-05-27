<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { reqAuthCode } from '../server/api/user';
  import { useUserStore } from '../store/modules/userStore';

  const userStore = useUserStore();
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
      uni.showModal({ title: '请输入正确手机号' });
    } else if (user.agreeAccord !== true) {
      uni.showModal({ title: '请同意相关协议' });
    } else {
      try {
        await userStore.userLogin(user.phone, user.authCode);
        uni.redirectTo({ url: '/pages/main/home' });
      } catch (error: any) {
        uni.showModal({ title: error });
      }
    }
  }
  // 获取验证码
  const disabled = ref(false);
  async function getAuthCode() {
    const AuthPattern = /^1[3456789]\d{9}$/;
    if (AuthPattern.test(user.phone)) {
      try {
        await reqAuthCode(user.phone);
        // 设置发送成功后禁用时间为60s
        disabled.value = true;
        setTimeout(() => {
          disabled.value = false;
        }, 60000);
      } catch (error: any) {
        uni.showModal({ title: error });
      }
    } else {
      uni.showModal({ title: '手机号格式有误' });
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
      <text class="code-text">获取验证码</text>
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
