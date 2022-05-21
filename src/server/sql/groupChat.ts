import { executeSql, selectSql } from './baseSql';

// 执行SQL语句
export async function createGroupChatTable() {
  plus.sqlite.executeSql({
    name: 'scotfeel',
    sql:
      'create table if not exists groupChat("groupId" VARCHAR(40),	"nickname" VARCHAR(40),	"avatar" VARCHAR(40) , "memberCount" INT(11),"spaceId" VARCHAR(40),' +
      '"spaceNickname" VARCHAR(40),"spaceAvatar" VARCHAR(40),"noticeFlag" INT(11),"isDismissed" INT(11),"belongToId" VARCHAR(40))',
    success: function () {
      console.log('executeSql success!');
    },
    fail: function (e) {
      console.log('executeSql failed: ' + JSON.stringify(e));
    },
  });
}
//插入数据
export async function insert(
  groupId: string,
  nickname: string,
  avatar: string,
  memberCount: number,
  spaceId: string,
  spaceNickname: string,
  spaceAvatar: string,
  noticeFlag: string,
  isDismissed: 1 | 0,
  belongToId: string
) {
  return await executeSql(`
				insert into groupChat values ("${groupId}","${nickname}","${avatar}","${memberCount}","${spaceId}","${spaceNickname}","${spaceAvatar}","${noticeFlag}","${isDismissed}","${belongToId}")
			`);
}

//删除记录
export async function _delete(groupId: string, belongToId: string) {
  return await executeSql(`
				delete from groupChat where groupId = "${groupId}" and belongToId = "${belongToId}"
			`);
}
//查找所有群聊
export async function selectAll(belongToId: string) {
  return await selectSql(`
	select groupId,nickname,avatar from groupChat where belongToId = "${belongToId}"
			`);
}
//群聊基本信息
export async function selectInfo(groupId: string, belongToId: string) {
  return await selectSql(`
					select * from groupChat where groupId = "${groupId}" and belongToId = "${belongToId}" 
			`);
}
//更新昵称
export async function updateNickname(nickname: string, groupId: string, belongToId: string) {
  return await executeSql(`
				update groupChat set nickname = "${nickname}" where groupId = "${groupId}" and belongToId = "${belongToId}"
			`);
}
//更新成员数量
export async function updateMemberCount(memberCount: number, groupId: string, belongToId: string) {
  return await executeSql(`
				update groupChat set memberCount = "${memberCount}" where groupId = "${groupId}" and belongToId = "${belongToId}"
			`);
}
//更新头像
export async function updateAvatar(avatar: string, groupId: string, belongToId: string) {
  return await executeSql(`
				update groupChat set avatar = "${avatar}" where groupId = "${groupId}" and belongToId = "${belongToId}"
			`);
}
//更新是否被解散
export async function updateIsDismissed(isDismissed: 1 | 0, groupId: string, belongToId: string) {
  return await executeSql(`
				update groupChat set isDismissed = "${isDismissed}" where groupId = "${groupId}" and belongToId = "${belongToId}"
			`);
}
//更新绑定的空间id
export async function updateSpaceId(spaceId: string, groupId: string, belongToId: string) {
  return await executeSql(`
				update groupChat set spaceId = "${spaceId}" where groupId = "${groupId}" and belongToId = "${belongToId}"
			`);
}
//更新绑定的空间头像
export async function updateSpaceAvatar(spaceAvatar: string, groupId: string, belongToId: string) {
  return await executeSql(`
				update groupChat set spaceAvatar = "${spaceAvatar}" where groupId = "${groupId}" and belongToId = "${belongToId}"
			`);
}
//更新双方绑定的空间昵称
export async function updateSpaceNickname(
  spaceNickname: string,
  groupId: string,
  belongToId: string
) {
  return await executeSql(`
				update groupChat set spaceNickname = "${spaceNickname}" where groupId = "${groupId}" and belongToId = "${belongToId}"
			`);
}
//更新是否免打扰字段
export async function updateNoticeFlag(noticeFlag: string, groupId: string, belongToId: string) {
  return await executeSql(`
				update groupChat set noticeFlag = "${noticeFlag}" where groupId = "${groupId}" and belongToId = "${belongToId}"
			`);
}
