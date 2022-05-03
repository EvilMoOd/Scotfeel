import { request } from '../http';

export const reqAddFriend = (friendId: string, nickname: string, avatar: string) =>
  request<BasicResponse<null>>({
    url: `/groupChat/create/group`,
    method: 'POST',
    data: { friendId, nickname, avatar },
  });
