export const MOCK_URL = 'http://127.0.0.1:4523/mock/613601';
export const DEV_URL = 'http://124.71.7.65:80/test/portal';
export const MASTER_URL = '';
export const OBS_URL = 'http://obs.scotfeel.com';

export const OK_CODE = 200;
export const ERROR_CODE = 500;
export const QUERRY_ERROR_CODE = 404;
export const NO_TOKEN = 401;
export const NO_PERMISSION = 403;

//请求参数
export interface HTTPConfig {
  url: string;
  method: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
  data?: { [key: string]: unknown }; //GET方法默认json转string，以params默认发送，post则不变
  type?: 'application/json' | 'application/x-www-form-urlencoded';
}
//响应参数
export interface BasicResponse<T> {
  code: number;
  data: T;
  message: string;
}
//uni.request响应参数
export interface HTTPResponse {
  statusCode: number;
  cookies: string[];
  data: BasicResponse<any>;
  header: any;
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
    uni.request({
      url: MOCK_URL + config.url, //默认地址
      data: config.data || {},
      header: {
        Authorization: user.token,
        'content-type': config.type || 'application/json',
      },
      method: config.method,
      timeout: 20000,
      dataType: 'json',
      responseType: 'text',
      sslVerify: true,
      withCredentials: false,
      firstIpv4: false,
      success(response) {
        const { code, message, data } = response.data as AnyObject;
        if (code === OK_CODE) {
          resolve(data);
        } else if (code === ERROR_CODE) {
          reject(message);
        } else if (code === NO_TOKEN) {
          reject(message);
          uni.redirectTo({ url: '/pages/login' });
        } else if (code === NO_PERMISSION) {
          reject(message);
          uni.navigateBack({});
        } else if (code === QUERRY_ERROR_CODE) {
          reject(message);
        }
      },
      fail(err) {
        reject(err);
      },
      complete() {
        uni.hideLoading();
      },
    });
  });
};
