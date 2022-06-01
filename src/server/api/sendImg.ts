import { request } from '../http';

// 获取上传照片所需要的表单数据
export interface ApplyNotice {
  accessKeyId: string;
  securitytoken: string;
  signature: string;
  policy: string;
}
export const reqApplyNotice = async (): Promise<ApplyNotice> =>
  await request<ApplyNotice>({
    url: `/OBS/get/formData`,
    method: 'GET',
  });
