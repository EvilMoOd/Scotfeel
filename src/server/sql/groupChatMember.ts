import type { GroupMember } from '../api/user';
import { executeSql, selectSql } from './baseSql';

// 创建群成员表
export function createGroupMemberTable(): void {
  plus.sqlite.executeSql({
    name: 'scotfeel',
    sql:
      'create table if not exists groupChatMember("groupId" VARCHAR(40),	"memberId" VARCHAR(40),"nickname" VARCHAR(40) ,' +
      '"avatar" VARCHAR(40),"remarkName" VARCHAR(40),"role" INT(11),"isExited" INT(11),"belongToId" VARCHAR(40))',
    success: function () {
      console.log('群成员表初始化成功');
    },
    fail: function (e) {
      console.log('executeSql failed: ' + JSON.stringify(e));
    },
  });
}
export interface RootObject {
  groupId: string;
  nickname: string;
  avatar: string;
  memberCount: string;
  spaceId: string;
  belongToId: string;
  isDismissed: number;
  spaceNickname: string;
  spaceAvatar: string;
  noticeFlag: number;
}
// 插入数据
export function insertGroupMember(
  groupId: string,
  memberId: string,
  nickname: string,
  remarkName: string,
  avatar: string,
  role: 0 | 1 | 2,
  isExited: 0 | 1,
  belongToId: string
): void {
  return executeSql(`
				insert into groupChatMember values ("${groupId}","${memberId}","${nickname}","${remarkName}","${avatar}","${role}","${isExited}","${belongToId}")
			`);
}

// 删除记录
export function _delete(groupId: string, memberId: string, belongToId: string): void {
  return executeSql(`
				delete from groupChatMember where groupId = "${groupId}" and memberId = "${memberId}" and belongToId = "${belongToId}"
			`);
}
// 查找所有群成员信息
export async function selectAllMemberInfo(
  groupId: string,
  belongToId: string
): Promise<GroupMember[]> {
  return await selectSql(`
	select g.memberId,g.nickname,g.avatar,g.remarkName,g.role,f.remarkName as friendRemarkName
		from groupChatMember g
		left join friend f on (g.memberId = f.friendId and f.belongToId = "${belongToId}")
		where g.groupId = "${groupId}" and g.isExited = 0 and g.belongToId = "${belongToId}"
		order by role asc	
			`);
}
// 查找一个群成员信息,不需要判断该成员是否已退出群聊,remarkName是这个用户在这个群里的备注
export async function selectOneMemberInfo(
  groupId: string,
  memberId: string,
  belongToId: string
): Promise<GroupMember> {
  return await selectSql(`
	select g.memberId,g.nickname,g.avatar,g.remarkName,g.role,f.remarkName as friendRemarkName
		from groupChatMember g
		left join friend f on (g.memberId = f.friendId and f.belongToId = "${belongToId}")
		where g.groupId = "${groupId}" and g.memberId = "${memberId}" and g.belongToId = "${belongToId}"
			`);
}
// 更新昵称
export function updateNickname(
  nickname: string,
  groupId: string,
  memberId: string,
  belongToId: string
): void {
  return executeSql(`
				update groupChatMember set nickname = "${nickname}" where groupId = "${groupId}" and memberId = "${memberId}" and belongToId = "${belongToId}"
			`);
}
// 更新头像
export function updateAvatar(
  avatar: string,
  groupId: string,
  memberId: string,
  belongToId: string
): void {
  return executeSql(`
				update groupChatMember set avatar = "${avatar}" where groupId = "${groupId}" and memberId = "${memberId}" and belongToId = "${belongToId}"
			`);
}
// 更新成员备注
export function updateRemarkName(
  remarkName: string,
  groupId: string,
  memberId: string,
  belongToId: string
): void {
  return executeSql(`
				update groupChatMember set remarkName = "${remarkName}" where groupId = "${groupId}" and memberId = "${memberId}" and belongToId = "${belongToId}"
			`);
}
// 更新成员角色
export function updateRole(
  role: string,
  groupId: string,
  memberId: string,
  belongToId: string
): void {
  return executeSql(`
				update groupChatMember set role = "${role}" where groupId = "${groupId}" and memberId = "${memberId}" and belongToId = "${belongToId}"
			`);
}
// 更新成员退出状态
export function updateIsExited(
  isExited: string,
  groupId: string,
  memberId: string,
  belongToId: string
): void {
  return executeSql(`
				update groupChatMember set isExited = "${isExited}" where groupId = "${groupId}" and memberId = "${memberId}" and belongToId = "${belongToId}"
			`);
}
