<script setup lang="ts">
  import { reactive } from 'vue';
  import { reqCreateMoment } from '../../../server/api/moment';
  import { reqImgData } from '../../../server/api/user';
  import { OBS_URL } from '../../../server/http';

  const moment = reactive({
    content: '',
    interactFlag: 1 as 0 | 1,
    photos: [] as string[],
    isReposted: true,
  });

  function chooseImg({ tempFilePaths }: { tempFilePaths: string[] }) {
    moment.photos.push(...tempFilePaths);
  }

  async function sendMoment() {
    const photos = [] as string[];
    for (const i in moment.photos) {
      const imgData = await reqImgData();
      uni.uploadFile({
        url: ' https://scotfeel.image.obs.cn-south-1.myhuaweicloud.com',
        filePath: moment.photos[i],
        name: 'file',
        formData: {
          key: `${imgData.imageId}.jpeg`, // 地址和文件名,照片名字需以"user/"开头
          AccessKeyId: imgData.accessKeyId, // 获取ak
          'x-obs-acl': 'public-read', // 设置为公共读
          policy: imgData.policy,
          'content-type': 'image/jpeg', // 文件类型
          'x-obs-security-token': imgData.securitytoken,
          signature: imgData.signature, // 获取后端生成的signature
        },
        timeout: 10000,
        success: async () => {
          const imgUrl = `${OBS_URL}/${imgData.imageId}.jpeg`;
          photos.push(imgUrl);
        },
        fail: () =>
          uni.showModal({
            title: '发送失败，请检查网络',
          }),
      });
    }
    setTimeout(async function () {
      // body
      console.log(photos);
      // TODO 转发
      await reqCreateMoment({
        content: moment.content,
        interactFlag: moment.interactFlag,
        photos,
        isReposted: 0,
      });
      console.log('成功');
      uni.navigateBack({ delta: 1 });
    }, 1000);
  }
</script>

<template>
  <view class="header">
    <uni-icons type="closeempty" color="#fff" size="24" />
    <text @tap="sendMoment">发送</text>
  </view>
  <view class="main">
    <Avatar
      img-src="https://cdn.pixabay.com/photo/2016/12/23/12/40/night-1927265_960_720.jpg"
      :type="1"
      class="avatar"
    />
    <textarea
      id=""
      name=""
      cols="50"
      rows="10"
      placeholder="想分享点什么？"
      :maxlength="-1"
    ></textarea>
    <uni-file-picker limit="9" title="记录生活" @select="chooseImg"></uni-file-picker>
  </view>
</template>

<style lang="scss" scoped>
  .header {
    @include header;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 30rpx;
    box-sizing: border-box;
  }
  .main {
    position: relative;
    padding: 70rpx;
    .avatar {
      position: absolute;
      left: calc(50vw - 24px);
      top: -40rpx;
    }
  }
</style>
