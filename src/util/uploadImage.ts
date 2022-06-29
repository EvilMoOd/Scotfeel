import type { ImgData } from '../server/api/user';

interface UploadFileSuccessCallbackResult {
  /**
   * 开发者服务器返回的数据
   */
  data: string;
  /**
   * 开发者服务器返回的 HTTP 状态码
   */
  statusCode: number;
}

export const uploadImage = (
  imgData: ImgData,
  success: (result: UploadFileSuccessCallbackResult) => void,
  count = 1,
  crop?: { width: number; height: number }
): void => {
  uni.chooseImage({
    count,
    crop,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    success: async (chooseImageRes) => {
      console.log(imgData);
      const { tempFilePaths } = chooseImageRes;
      uni.uploadFile({
        url: 'https://scotfeel.image.obs.cn-south-1.myhuaweicloud.com',
        filePath: tempFilePaths[0],
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
        success,
        fail: () =>
          uni.showModal({
            title: '更改失败',
          }),
      });
    },
  });
};
