import { reqImgData } from '../server/api/user';
import { OBS_URL } from '../server/http';
import { createUUID } from '../server/utils/uuid';

export const uploadImage = async (fn: (imgUrl: string) => Promise<void>): Promise<void> => {
  uni.chooseImage({
    count: 1,
    crop: {
      width: 48,
      height: 48,
    },
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    success: async (chooseImageRes): Promise<void> => {
      const imgId = createUUID();
      const imgData = await reqImgData();
      const tempFilePaths = chooseImageRes.tempFilePaths;
      uni.uploadFile({
        url: OBS_URL,
        filePath: tempFilePaths[0],
        name: 'file',
        formData: {
          key: `user/${imgId}.jpeg`, // 地址和文件名,照片名字需以"user/"开头
          AccessKeyId: imgData.accessKeyId, // 获取ak
          'x-obs-acl': 'public-read', // 设置为公共读
          policy: imgData.policy,
          'content-type': 'image/jpeg', // 文件类型
          'x-obs-security-token': imgData.securitytoken,
          signature: imgData.signature, // 获取后端生成的signature
        },
        timeout: 10000,
        success: ({ data }: any) => {},
        fail: () =>
          uni.showModal({
            title: '更改失败',
          }),
      });
    },
  });
};
