import { defineStore } from 'pinia';
import {
  reqChangeNickname,
  reqChangeSignal,
  reqUserLogin,
  reqUserLogout,
} from '../../server/api/user';
import { OBS_URL } from '../../server/http';

export interface UserInfo {
  mainId: string; //用户mainId
  nickname: string; //用户昵称
  account: string; //用户@id
  phone: string; //用户手机号
  avatar: string | string[]; //用户头像
  backgroundImage: string | string[]; //用户背景照片
  qrcode: string; //用户二维码
  signature: string; //用户个性签名
  spaceId: string; //首页左滑默认进入空间ID
}
export interface Login {
  userInfo: UserInfo;
  token: string; //令牌
}
//从本地仓库捞数据
const user: Login = uni.getStorageSync('user');

export const useUserStore = defineStore('user', {
  state: (): Login => ({
    userInfo: user.userInfo,
    token: user.token,
  }),
  actions: {
    //登录
    async userLogin(phone: string, authCode: string) {
      let { userInfo, token } = await reqUserLogin(phone, authCode);
      uni.setStorageSync('user', { userInfo, token });
      this.userInfo = userInfo;
      this.token = token;
      console.log(userInfo);
      console.log(token);
    },
    //退出登录
    async userLogout() {
      await reqUserLogout();
      uni.removeStorageSync('user');
    },
    //修改昵称
    async changeNickname(nickname: string) {
      try {
        const result = await reqChangeNickname(nickname);
        console.log(result);
        uni.showModal({
          title: '修改成功',
        });
      } catch (err) {
        uni.showModal({
          title: '修改失败，请检查网络',
        });
      }
    },
    //修改头像
    changeAvatar() {
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
              this.userInfo.avatar = tempFilePaths;
              console.log(uploadFileRes.data);
            },
            fail: () =>
              uni.showModal({
                title: '更改失败',
              }),
          });
        },
      });
    },
    //修改背景
    changeBackgoundImg() {
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
              this.userInfo.backgroundImage = tempFilePaths;
              console.log(uploadFileRes.data);
            },
            fail: () =>
              uni.showModal({
                title: '更改失败',
              }),
          });
        },
      });
    },
    //修改个性签名
    async changeSignature(signature: string) {
      try {
        const result = await reqChangeSignal(signature);
        console.log(result);
        uni.showModal({
          title: '修改成功',
        });
      } catch (err) {
        uni.showModal({
          title: '修改失败，请检查网络',
        });
      }
    },
  },
});