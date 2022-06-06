import type { GroupChat } from '../api/user';
import { executeSql, selectSql } from './baseSql';

// 新建群聊表
export function createGroupChatTable(): void {
  plus.sqlite.executeSql({
    name: 'scotfeel',
    sql:
      'create table if not exists groupChat("groupId" VARCHAR(40),	"nickname" VARCHAR(40),	"avatar" VARCHAR(40) , "memberCount" INT(11),"spaceId" VARCHAR(40),' +
      '"spaceNickname" VARCHAR(40),"spaceAvatar" VARCHAR(40),"noticeFlag" INT(11),"isDismissed" INT(11),"belongToId" VARCHAR(40))',
    success: function () {
      console.log('群聊表初始化成功');
    },
    fail: function (e) {
      console.log('executeSql failed: ' + JSON.stringify(e));
    },
  });
}

// 初始化仓库，查找所有群聊
export async function selectAllGroupChat(belongToId: string): Promise<GroupChat[]> {
  return await selectSql(`
	select * from groupChat where belongToId = "${belongToId}"
			`);
}

// 插入数据
export function insertGroup(
  groupId: string,
  nickname: string,
  avatar: string,
  memberCount: number,
  spaceId: string,
  spaceNickname: string,
  spaceAvatar: string,
  noticeFlag: 1 | 0,
  isDismissed: 1 | 0,
  belongToId: string
): void {
  return executeSql(`
				insert into groupChat values ("${groupId}","${nickname}","${avatar}","${memberCount}","${spaceId}","${spaceNickname}","${spaceAvatar}","${noticeFlag}","${isDismissed}","${belongToId}")
			`);
}

// 删除记录
export function _delete(groupId: string, belongToId: string): void {
  return executeSql(`
				delete from groupChat where groupId = "${groupId}" and belongToId = "${belongToId}"
			`);
}

// 群聊基本信息
export async function selectInfo(groupId: string, belongToId: string): Promise<void> {
  return await selectSql(`
					select * from groupChat where groupId = "${groupId}" and belongToId = "${belongToId}" 
			`);
}
// 更新昵称1
export function updateNickname(nickname: string, groupId: string, belongToId: string): void {
  return executeSql(`
				update groupChat set nickname = "${nickname}" where groupId = "${groupId}" and belongToId = "${belongToId}"
			`);
}
// 更新成员数量1
export function updateMemberCount(memberCount: number, groupId: string, belongToId: string): void {
  return executeSql(`
				update groupChat set memberCount = "${memberCount}" where groupId = "${groupId}" and belongToId = "${belongToId}"
			`);
}
// 更新头像
export function updateAvatar(avatar: string, groupId: string, belongToId: string): void {
  return executeSql(`
				update groupChat set avatar = "${avatar}" where groupId = "${groupId}" and belongToId = "${belongToId}"
			`);
}
// 更新是否被解散
export function updateIsDismissed(isDismissed: 1 | 0, groupId: string, belongToId: string): void {
  return executeSql(`
				update groupChat set isDismissed = "${isDismissed}" where groupId = "${groupId}" and belongToId = "${belongToId}"
			`);
}
// 更新绑定的空间id
export function updateSpaceId(spaceId: string, groupId: string, belongToId: string): void {
  return executeSql(`
				update groupChat set spaceId = "${spaceId}" where groupId = "${groupId}" and belongToId = "${belongToId}"
			`);
}
// 更新绑定的空间头像
export function updateSpaceAvatar(spaceAvatar: string, groupId: string, belongToId: string): void {
  return executeSql(`
				update groupChat set spaceAvatar = "${spaceAvatar}" where groupId = "${groupId}" and belongToId = "${belongToId}"
			`);
}
// 更新双方绑定的空间昵称
export function updateSpaceNickname(
  spaceNickname: string,
  groupId: string,
  belongToId: string
): void {
  return executeSql(`
				update groupChat set spaceNickname = "${spaceNickname}" where groupId = "${groupId}" and belongToId = "${belongToId}"
			`);
}
// 更新是否免打扰字段
export function updateNoticeFlag(noticeFlag: string, groupId: string, belongToId: string): void {
  return executeSql(`
				update groupChat set noticeFlag = "${noticeFlag}" where groupId = "${groupId}" and belongToId = "${belongToId}"
			`);
}

// 删除群聊表
export function deleteGroupTable(): void {
  return executeSql(`
		delete from groupChat ;
	`);
}