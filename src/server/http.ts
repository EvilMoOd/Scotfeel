//请求参数
export interface HTTPConfig {
  url: string;
  method: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
  data?: { [key: string]: unknown }; //GET方法默认json转string，以params默认发送，post则不变
}

//传入地址，方法，参数
export const request = <T>(config: HTTPConfig): Promise<T> => {
  //请求拦截权限
  //TODO 这一部分后期要删掉，改成在请求头里验证token 16-23
  const user = uni.getStorageSync('user');
  uni.showLoading({
    title: '加载中',
  });
  // if (!user) {
  //   uni.redirectTo({ url: '/pages/login' });
  // }
  //响应拦截请求
  return new Promise<T>((resolve, reject) => {
    uni
      .request({
        url: 'http://127.0.0.1:4523/mock/613601' + config.url, //默认地址
        data: config.data || {},
        header: {
          token: user.token,
        },
        method: config.method,
        timeout: 20000,
        dataType: 'json',
        responseType: 'text',
        sslVerify: true,
        withCredentials: false,
        firstIpv4: false,
      })
      .then((res: { data: T | PromiseLike<T> }) => {
        resolve(res.data);
      })
      .catch((err: any) => {
        reject(err);
      })
      .finally(() => {
        uni.hideLoading();
      });
  });
};
