import { executeSql, selectSql } from './baseSql';

// 执行SQL语句
export async function createSubscribeTable() {
  plus.sqlite.executeSql({
    name: 'scotfeel',
    sql: 'create table if not exists subscribedSpace("spaceId" VARCHAR(40),	"nickname" VARCHAR(40),	"avatar" VARCHAR(40) , "role" INT(11),"belongToId" VARCHAR(40))',
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
  spaceId: string,
  nickname: string,
  avatar: string,
  role: number,
  belongToId: string
) {
  return await executeSql(`
				insert into subscribedSpace values ("${spaceId}","${nickname}","${avatar}","${role}","${belongToId}")
			`);
}

//删除记录
export async function _delete(spaceId: string, belongToId: string) {
  return await executeSql(`
				delete from subscribedSpace where spaceId = "${spaceId}" and belongToId = "${belongToId}"
			`);
}
//查找所有订阅空间
export async function selectAllSpaces(belongToId: string) {
  return await selectSql(`
	select spaceId,nickname,avatar,role from subscribedSpace where belongToId = "${belongToId}"
			`);
}
//查找一个订阅空间
export async function selectOneSpace(spaceId: string, belongToId: string) {
  return await selectSql(`
	select spaceId,nickname,avatar,role from subscribedSpace where spaceId = "${spaceId}" and belongToId = "${belongToId}"
			`);
}
//更新昵称
export async function updateNickname(nickname: string, spaceId: string, belongToId: string) {
  return await executeSql(`
				update subscribedSpace set nickname = "${nickname}" where spaceId = "${spaceId}" and belongToId = "${belongToId}"
			`);
}
//更新角色
export async function updateRole(role: number, spaceId: string, belongToId: string) {
  return await executeSql(`
				update subscribedSpace set role = "${role}" where spaceId = "${spaceId}" and belongToId = "${belongToId}"
			`);
}
//更新头像
export async function updateAvatar(avatar: string, spaceId: string, belongToId: string) {
  return await executeSql(`
				update subscribedSpace set avatar = "${avatar}" where spaceId = "${spaceId}" and belongToId = "${belongToId}"
			`);
}
