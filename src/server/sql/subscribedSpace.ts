import { executeSql, openDB, selectSql } from './baseSql';

// 执行SQL语句
export function createSubscribeTable(config = { name: 'scotfeel', path: '_doc/chat.db' }): void {
  if (!plus.sqlite.isOpenDatabase(config)) {
    // 2.如果没打开先打开
    openDB(config);
  }
  plus.sqlite.executeSql({
    name: 'scotfeel',
    sql: 'create table if not exists subscribedSpace("spaceId" VARCHAR(40),	"nickname" VARCHAR(40),	"avatar" VARCHAR(40) , "role" INT(11),"belongToId" VARCHAR(40))',
    success() {
      console.log('executeSql success!');
    },
    fail(e) {
      console.log(`executeSql failed: ${JSON.stringify(e)}`);
    },
  });
}
// 插入数据
export function insert(
  spaceId: string,
  nickname: string,
  avatar: string,
  role: number,
  belongToId: string
): void {
  return executeSql(`
				insert into subscribedSpace values ("${spaceId}","${nickname}","${avatar}","${role}","${belongToId}")
			`);
}

// 删除记录
export function deleteSpace(spaceId: string, belongToId: string): void {
  return executeSql(`
				delete from subscribedSpace where spaceId = "${spaceId}" and belongToId = "${belongToId}"
			`);
}
// 查找所有订阅空间
export async function selectAllSpaces(belongToId: string): Promise<void> {
  return selectSql(`
	select spaceId,nickname,avatar,role from subscribedSpace where belongToId = "${belongToId}"
			`);
}
// 查找一个订阅空间
export async function selectOneSpace(spaceId: string, belongToId: string): Promise<void> {
  return selectSql(`
	select spaceId,nickname,avatar,role from subscribedSpace where spaceId = "${spaceId}" and belongToId = "${belongToId}"
			`);
}
// 更新昵称
export function updateNickname(nickname: string, spaceId: string, belongToId: string): void {
  return executeSql(`
				update subscribedSpace set nickname = "${nickname}" where spaceId = "${spaceId}" and belongToId = "${belongToId}"
			`);
}
// 更新角色
export function updateRole(role: number, spaceId: string, belongToId: string): void {
  return executeSql(`
				update subscribedSpace set role = "${role}" where spaceId = "${spaceId}" and belongToId = "${belongToId}"
			`);
}
// 更新头像
export function updateAvatar(avatar: string, spaceId: string, belongToId: string): void {
  return executeSql(`
				update subscribedSpace set avatar = "${avatar}" where spaceId = "${spaceId}" and belongToId = "${belongToId}"
			`);
}
