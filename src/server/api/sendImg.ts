import { request } from '../http';

//获取上传照片所需要的表单数据
export interface ApplyNotice {
  accessKeyId: string;
  securitytoken: string;
  signature: string;
  policy: string;
}
export const reqApplyNotice = () =>
  request<ApplyNotice>({
    url: `/notice/get/applications`,
    method: 'GET',
  });
