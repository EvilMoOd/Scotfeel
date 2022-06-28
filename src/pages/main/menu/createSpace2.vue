<script setup lang="ts">
  import { onLoad } from '@dcloudio/uni-app';
  import { reactive, ref } from 'vue';
  import { reqSetSpace } from '../../../server/api/space';
  import { reqImgData } from '../../../server/api/user';
  import { OBS_URL } from '../../../server/http';

  const spaceInfo = reactive({
    spaceName: '',
    userId: [] as string[],
    spaceAvatar: '',
    longitude: -1,
    latitude: -1,
  });
  onLoad((params) => {
    spaceInfo.userId = params.userId?.split(',') as string[];
    uni.getLocation({
      type: 'wgs84',
      success: ({ longitude, latitude }) => {
        spaceInfo.longitude = longitude;
        spaceInfo.latitude = latitude;
      },
    });
  });

  function chooseImg({ tempFilePaths }: { tempFilePaths: string[] }) {
    spaceInfo.spaceAvatar = tempFilePaths[0];
  }

  // 确定
  const success = ref(null);
  const fail = ref(null);
  async function done() {
    const imgData = await reqImgData();
    uni.uploadFile({
      url: ' https://scotfeel.image.obs.cn-south-1.myhuaweicloud.com',
      filePath: spaceInfo.spaceAvatar,
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
        spaceInfo.spaceAvatar = imgUrl;
        try {
          console.log(spaceInfo);
          await reqSetSpace(spaceInfo);
          success.value.popUp();
          console.log('创建成功');
        } catch (err) {
          fail.value.popUp();
        }
      },
      fail: () =>
        uni.showModal({
          title: '图片上传失败，请检查网络',
        }),
    });
  }
</script>

<template>
  <view class="header">
    <Back />
    <view class="title">创建群聊</view>
    <uni-icons class="next" type="checkmarkempty" size="5vh" color="#fff" @tap="done"></uni-icons>
  </view>
  <view class="main">
    <uni-easyinput v-model="spaceInfo.spaceName" type="text" placeholder="请输入空间名称" />
    <uni-file-picker limit="1" title="空间头像" @select="chooseImg"></uni-file-picker>
  </view>
  <PopMessage ref="success" success>空间创建成功</PopMessage>
  <PopMessage ref="fail">空间创建失败</PopMessage>
</template>

<style lang="scss" scoped>
  .header {
    height: 160rpx;
    background-color: $color-sf;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .next {
      margin: 20rpx;
    }

    .title {
      display: inline-block;
      margin-bottom: 24rpx;
      font-weight: bold;
      font-size: 38rpx;
      color: #fff;
    }
  }
</style>
