import { request } from '../http';
export interface Location {
  lat: number;
  lon: number;
}

export interface SearchSpace {
  spaceId: string;
  nickname: string;
  avatar: string;
  backgroundImage: string;
  location: Location;
  introduction?: any;
  identify: number;
  recommendFlag: number;
  lastActiveTime: string;
  subscribedCount: number;
  memberCount: number;
}

//搜索空间
export const reqApplyNotice = (keyword: string, pageNum: number, lat: number, lon: number) =>
  request<SearchSpace[]>({
    url: `/notice/get/applications`,
    method: 'GET',
    data: { keyword, pageNum, lat, lon },
  });