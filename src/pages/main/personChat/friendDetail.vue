<script setup lang="ts">
  import { ref } from 'vue';
  import { request, OBS_URL } from '../../../server/http';
  import { useUserStore } from '../../../store/modules/userStore';

  const userStore = useUserStore();

  const isShow = ref(false);
  const isShowConfig = ref(false);
  const isShowChangeNickname = ref(false);
  const nickname = ref('');
  const signature = ref('');

  function goBack() {
    uni.navigateBack({
      delta: 1,
    });
  }
  //展示功能块
  function showConfig() {
    isShowConfig.value = true;
    isShow.value = true;
  }
  function hiddenAll() {
    isShowChangeNickname.value = false;
    isShowConfig.value = false;
    isShow.value = false;
  }
  //修改昵称
  function showChangeNickname() {
    isShowChangeNickname.value = true;
    isShowConfig.value = false;
    isShow.value = true;
  }
  async function changeNickname() {
    try {
      const result = await request({
        url: '/user/update/nickname',
        method: 'GET',
        data: { nickname },
      });
      console.log(result);
      uni.showModal({
        title: '修改成功',
      });
    } catch (err) {
      uni.showModal({
        title: '修改失败，请检查网络',
      });
    }
  }
  //修改头像
  function changeAvatar() {
    uni.chooseImage({
      count: 1,
      crop: {
        width: 48,
        height: 48,
      },
      success: (chooseImageRes) => {
        const tempFilePaths = chooseImageRes.tempFilePaths;
        uni.uploadFile({
          url: OBS_URL,
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            key: 'user/avatar.jpg', //地址和文件名,照片名字需以"user/"开头
            AccessKeyId: 'Y9CYVOBP0JQG93BXSSQ1', //获取ak
            'x-obs-acl': 'public-read', //设置为公共读
            policy:
              'eyJleHBpcmF0aW9uIjoiMjAyMi0wNC0wOFQyMjo1ODo0NFoiLCJjb25kaXRpb25zIjpbeyJ4LW9icy1hY2wiOiJwdWJsaWMtcmVhZCJ9LHsieC1vYnMtc2VjdXJpdHktdG9rZW4iOiJnUXBqYmkxdWIzSjBhQzAwamNHVm1sMkoxTjlpSUdoUXhHaHZkSjRvcnBVMF9VQVpDZDM1TS0wRTJfT0dabUwzdldaaVZZcllqTGQwMVo4QmtJS3I0YUJXdGF0WURWbHZBZ2g1QVBtUGNJR0Jja0taYlZZR1o4eXFlY2RDR3psanJ2bkp3YjJwTTlVaTg2TUZVMmxhM1dMRXdPeDFxcEYyaEIwYlpUR2pXTnJ6NFVQLUJpeVJGdXhxUzRZOS10WXJMZi1aV0xlaVZjRHlza0VhQWFUeUlqRlVJQXRKZXM3YTltTGtBcEVBNlhpRDFmejhtYjF3SjJBMzN0TFg2QUJOOGJSV21fOTdxc3FwZmJUTEVFR0hmcjVkc2JCU19JOG5ob210emVsM01USE5WdW42OEt3TUxIWmFSWWd1Z0xRaEFMYmJLQUFjVlRuRjVnVWNXd0VhaGpWLUtRdzY2QUxOeVhvUE1ESjUzeHUxdDZMOEx0RVNLeHRBeUhEMTlfSFc1RURmSzVWY3NweFdEVHU3LWdON0pGV29zWW43SWI3ZnJ5Z25fN0pTMV9kNEJmTVp6ZVh0LUpubGlvUnUzVkdDb1JQTF9yNlNBVFQ5LWMtSmVUeXNuSHFUaWZnOWdwYnFfdEdPU202WHRNYVJjV1FSdXJSWW5MY2oxVURZRmxKeV94eE5WbThLSld2YlZ1aTJFVlBaczRSZmo3alczdkdpLXdRcXlHd1lta1Z3WkZuRU9xYUtVOWdXWGxkMC0yMnZxNE1ycng1UmZVLWlDVXhfeU1Kd2hEal9VX25oWjAyTGY3M0FSejU2akZrLVZzNzN0Nm85WG1icGc1UGpJd1g4ekdfUk9QUi1mbUtKemI2LUlFS21xdEdzSkpnS1dVZ1ZBTlgzWFZza1Bod0pkWDNSWGFRcDBoam5EQkdfMHI2ejVwcW96VmFISVphblN2ckw5NlNEaTlNUmY2ZkpKYnY2dHR4cmMzSm41WGxLRUtiSXVtdXlnc3lhbkhhSFNMTWVBZUwzajlITE9yU2dRazNLTjh3VW54b1pLckE0WU5nRjdILXVqUVNCMi1kQjRBVkRDMTlDZW8xeXRteHYifSx7ImJ1Y2tldCI6InNjb3RmZWVsLnBob3RvIn0seyJjb250ZW50LXR5cGUiOiJpbWFnZS9qcGVnIn0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJ1c2VyLyJdXX0=',
            'content-type': 'image/jpeg', //文件类型
            'x-obs-security-token':
              'gQpjbi1ub3J0aC00jcGVml2J1N9iIGhQxGhvdJ4orpU0_UAZCd35M-0E2_OGZmL3vWZiVYrYjLd01Z8BkIKr4aBWtatYDVlvAgh5APmPcIGBckKZbVYGZ8yqecdCGzljrvnJwb2pM9Ui86MFU2la3WLEwOx1qpF2hB0bZTGjWNrz4UP-BiyRFuxqS4Y9-tYrLf-ZWLeiVcDyskEaAaTyIjFUIAtJes7a9mLkApEA6XiD1fz8mb1wJ2A33tLX6ABN8bRWm_97qsqpfbTLEEGHfr5dsbBS_I8nhomtzel3MTHNVun68KwMLHZaRYgugLQhALbbKAAcVTnF5gUcWwEahjV-KQw66ALNyXoPMDJ53xu1t6L8LtESKxtAyHD19_HW5EDfK5VcspxWDTu7-gN7JFWosYn7Ib7frygn_7JS1_d4BfMZzeXt-JnlioRu3VGCoRPL_r6SATT9-c-JeTysnHqTifg9gpbq_tGOSm6XtMaRcWQRurRYnLcj1UDYFlJy_xxNVm8KJWvbVui2EVPZs4Rfj7jW3vGi-wQqyGwYmkVwZFnEOqaKU9gWXld0-22vq4Mrrx5RfU-iCUx_yMJwhDj_U_nhZ02Lf73ARz56jFk-Vs73t6o9Xmbpg5PjIwX8zG_ROPR-fmKJzb6-IEKmqtGsJJgKWUgVANX3XVskPhwJdX3RXaQp0hjnDBG_0r6z5pqozVaHIZanSvrL96SDi9MRf6fJJbv6ttxrc3Jn5XlKEKbIumuygsyanHaHSLMeAeL3j9HLOrSgQk3KN8wUnxoZKrA4YNgF7H-ujQSB2-dB4AVDC19Ceo1ytmxv',
            signature: 'agJ1CC6pVbEh/wFqdiib6BlQVjI=', //获取后端生成的signature
          },
          timeout: 10000,
          success: (uploadFileRes) => {
            console.log(uploadFileRes.data);
          },
        });
      },
    });
  }
  //修改背景
  function changeBackgoundImg() {
    uni.chooseImage({
      count: 1,
      success: (chooseImageRes) => {
        const tempFilePaths = chooseImageRes.tempFilePaths;
        uni.uploadFile({
          url: OBS_URL,
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            key: 'user/avatar.jpg', //地址和文件名,照片名字需以"user/"开头
            AccessKeyId: 'Y9CYVOBP0JQG93BXSSQ1', //获取ak
            'x-obs-acl': 'public-read', //设置为公共读
            policy:
              'eyJleHBpcmF0aW9uIjoiMjAyMi0wNC0wOFQyMjo1ODo0NFoiLCJjb25kaXRpb25zIjpbeyJ4LW9icy1hY2wiOiJwdWJsaWMtcmVhZCJ9LHsieC1vYnMtc2VjdXJpdHktdG9rZW4iOiJnUXBqYmkxdWIzSjBhQzAwamNHVm1sMkoxTjlpSUdoUXhHaHZkSjRvcnBVMF9VQVpDZDM1TS0wRTJfT0dabUwzdldaaVZZcllqTGQwMVo4QmtJS3I0YUJXdGF0WURWbHZBZ2g1QVBtUGNJR0Jja0taYlZZR1o4eXFlY2RDR3psanJ2bkp3YjJwTTlVaTg2TUZVMmxhM1dMRXdPeDFxcEYyaEIwYlpUR2pXTnJ6NFVQLUJpeVJGdXhxUzRZOS10WXJMZi1aV0xlaVZjRHlza0VhQWFUeUlqRlVJQXRKZXM3YTltTGtBcEVBNlhpRDFmejhtYjF3SjJBMzN0TFg2QUJOOGJSV21fOTdxc3FwZmJUTEVFR0hmcjVkc2JCU19JOG5ob210emVsM01USE5WdW42OEt3TUxIWmFSWWd1Z0xRaEFMYmJLQUFjVlRuRjVnVWNXd0VhaGpWLUtRdzY2QUxOeVhvUE1ESjUzeHUxdDZMOEx0RVNLeHRBeUhEMTlfSFc1RURmSzVWY3NweFdEVHU3LWdON0pGV29zWW43SWI3ZnJ5Z25fN0pTMV9kNEJmTVp6ZVh0LUpubGlvUnUzVkdDb1JQTF9yNlNBVFQ5LWMtSmVUeXNuSHFUaWZnOWdwYnFfdEdPU202WHRNYVJjV1FSdXJSWW5MY2oxVURZRmxKeV94eE5WbThLSld2YlZ1aTJFVlBaczRSZmo3alczdkdpLXdRcXlHd1lta1Z3WkZuRU9xYUtVOWdXWGxkMC0yMnZxNE1ycng1UmZVLWlDVXhfeU1Kd2hEal9VX25oWjAyTGY3M0FSejU2akZrLVZzNzN0Nm85WG1icGc1UGpJd1g4ekdfUk9QUi1mbUtKemI2LUlFS21xdEdzSkpnS1dVZ1ZBTlgzWFZza1Bod0pkWDNSWGFRcDBoam5EQkdfMHI2ejVwcW96VmFISVphblN2ckw5NlNEaTlNUmY2ZkpKYnY2dHR4cmMzSm41WGxLRUtiSXVtdXlnc3lhbkhhSFNMTWVBZUwzajlITE9yU2dRazNLTjh3VW54b1pLckE0WU5nRjdILXVqUVNCMi1kQjRBVkRDMTlDZW8xeXRteHYifSx7ImJ1Y2tldCI6InNjb3RmZWVsLnBob3RvIn0seyJjb250ZW50LXR5cGUiOiJpbWFnZS9qcGVnIn0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJ1c2VyLyJdXX0=',
            'content-type': 'image/jpeg', //文件类型
            'x-obs-security-token':
              'gQpjbi1ub3J0aC00jcGVml2J1N9iIGhQxGhvdJ4orpU0_UAZCd35M-0E2_OGZmL3vWZiVYrYjLd01Z8BkIKr4aBWtatYDVlvAgh5APmPcIGBckKZbVYGZ8yqecdCGzljrvnJwb2pM9Ui86MFU2la3WLEwOx1qpF2hB0bZTGjWNrz4UP-BiyRFuxqS4Y9-tYrLf-ZWLeiVcDyskEaAaTyIjFUIAtJes7a9mLkApEA6XiD1fz8mb1wJ2A33tLX6ABN8bRWm_97qsqpfbTLEEGHfr5dsbBS_I8nhomtzel3MTHNVun68KwMLHZaRYgugLQhALbbKAAcVTnF5gUcWwEahjV-KQw66ALNyXoPMDJ53xu1t6L8LtESKxtAyHD19_HW5EDfK5VcspxWDTu7-gN7JFWosYn7Ib7frygn_7JS1_d4BfMZzeXt-JnlioRu3VGCoRPL_r6SATT9-c-JeTysnHqTifg9gpbq_tGOSm6XtMaRcWQRurRYnLcj1UDYFlJy_xxNVm8KJWvbVui2EVPZs4Rfj7jW3vGi-wQqyGwYmkVwZFnEOqaKU9gWXld0-22vq4Mrrx5RfU-iCUx_yMJwhDj_U_nhZ02Lf73ARz56jFk-Vs73t6o9Xmbpg5PjIwX8zG_ROPR-fmKJzb6-IEKmqtGsJJgKWUgVANX3XVskPhwJdX3RXaQp0hjnDBG_0r6z5pqozVaHIZanSvrL96SDi9MRf6fJJbv6ttxrc3Jn5XlKEKbIumuygsyanHaHSLMeAeL3j9HLOrSgQk3KN8wUnxoZKrA4YNgF7H-ujQSB2-dB4AVDC19Ceo1ytmxv',
            signature: 'agJ1CC6pVbEh/wFqdiib6BlQVjI=', //获取后端生成的signature
          },
          timeout: 10000,
          success: (uploadFileRes) => {
            console.log(uploadFileRes.data);
          },
        });
      },
    });
  }
  //修改个性签名
  async function changeSignature() {
    try {
      const result = await request({
        url: '/user/update/signature',
        method: 'GET',
        data: { signature },
      });
      console.log(result);
      uni.showModal({
        title: '修改成功',
      });
    } catch (err) {
      uni.showModal({
        title: '修改失败，请检查网络',
      });
    }
  }
</script>

<template>
  <view class="header">
    <image
      :src="userStore.userInfo.backgroundImage"
      mode="scaleToFill"
      style="position: absolute; z-index: -100; width: 750rpx; height: 304rpx"
    />
    <uni-icons type="arrow-left" color="#aaa" size="28" class="icon-back" @tap="goBack" />
    <uni-icons type="more-filled" color="#aaa" size="28" class="icon-more" @click="showConfig" />
    <transition name="more">
      <view v-show="isShowConfig" class="more">
        <text @tap="changeSignature">个性签名</text>
        <text @tap="showChangeNickname">修改昵称</text>
        <text @tap="changeBackgoundImg">设置背景</text>
        <text @tap="changeAvatar">设置头像</text>
      </view>
    </transition>
  </view>
  <view class="id-card">
    <image :src="userStore.userInfo.avatar" mode="scaleToFill" class="avatar" />
    <view>
      <text style="font-size: 34rpx; font-weight: bold; color: #fff">科比</text>
      <br />
      <text style="font-size: 28rpx">@kobe</text>
    </view>
  </view>
  <view class="introduction">这是一段个人介绍</view>
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
  <uni-easyinput
    v-if="isShowChangeNickname"
    v-model="nickname"
    type="text"
    placeholder="请输入新昵称"
    trim
    class="input"
    maxlength="10"
    @confirm="changeNickname"
  />
  <uni-easyinput
    v-if="isShowChangeNickname"
    v-model="signature"
    type="text"
    placeholder="请输入个性签名"
    trim
    class="input"
    maxlength="30"
    @confirm="changeSignature"
  />
  <view v-show="isShow" class="mask" @click="hiddenAll"></view>
</template>
<style lang="scss" scoped>
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

    .more {
      padding: 18rpx 36rpx;
      width: 104rpx;
      font-size: 26rpx;
      border-radius: 20rpx;
      display: flex;
      flex-direction: column;
      position: absolute;
      z-index: 100;
      right: 1rpx;
      top: 66rpx;
      background-color: #fff;
      box-shadow: 0 0 4rpx $color-sf;

      text {
        margin: 10rpx 0;
      }
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

  .input {
    position: absolute;
    z-index: 100;
    top: 10vh;
  }
  .mask {
    width: 750rpx;
    height: 1334rpx;
    position: absolute;
    top: 0;
    z-index: 90;
  }

  .space {
    margin-top: 100rpx;
  }

  .more-enter-active {
    animation: bounce-in 0.5s;
  }

  .more-leave-active {
    transition: opacity 0.5s ease;
    animation: bounce-in 0.5s reverse;
  }

  .more-enter-from,
  .more-leave-to {
    opacity: 0;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }

    50% {
      transform: scale(1.25);
    }

    100% {
      transform: scale(1);
    }
  }
</style>
