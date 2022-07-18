<!-- eslint-disable guard-for-in -->
<!-- eslint-disable no-restricted-syntax -->
<!-- eslint-disable no-await-in-loop -->
<script setup lang="ts">
  import { onLoad } from '@dcloudio/uni-app';
  import { reactive } from 'vue';
  import { reqCreateMoment } from '../../server/api/space';
  import { reqImgData } from '../../server/api/user';
  import { OBS_URL } from '../../server/http';
  import { useSubscribeSpaceStore } from '../../store/modules/spaceStore';

  let space: any;
  const spaceStore = useSubscribeSpaceStore();
  const moment = reactive({
    content: '',
    photos: [] as string[],
    isReposted: true,
    spaceId: '',
  });
  onLoad((params) => {
    moment.spaceId = params.spaceId as string;
    space = spaceStore.subscribeSpace.find((item) => moment.spaceId === item.spaceId);
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
            title: '图片上传失败，请检查网络',
          }),
      });
    }
    setTimeout(async function () {
      // body
      console.log(photos);
      try {
        // TODO 转发
        await reqCreateMoment({
          content: moment.content,
          posterType: 0,
          photos,
          isReposted: 0,
          spaceId: moment.spaceId,
        });
        console.log('成功');
        uni.navigateBack({ delta: 1 });
      } catch (err) {}
    }, 1000);
  }
  function back() {
    uni.navigateBack({ delta: 1 });
  }
</script>

<template>
  <view class="header">
    <uni-icons type="closeempty" color="#fff" size="24" @tap="back" />
    <text @tap="sendMoment">发送</text>
  </view>
  <view class="main">
    <Avatar :img-src="space?.avatar" :type="1" class="avatar" />
    <textarea
      id=""
      v-model="moment.content"
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

    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 30rpx;
    color: #fff;
  }

  .main {
    position: relative;
    padding: 70rpx;

    .avatar {
      position: absolute;
      top: -40rpx;
      left: calc(50vw - 24px);
    }
  }
</style>
