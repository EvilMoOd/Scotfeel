import type { MomentList } from '../webSocketType';
import { executeSql, openDB, selectSql } from './baseSql';


// 新建动态列表
export function createMomentListTable(
  config = { name: 'scotfeel', path: '_doc/chat.db' }
): void {
  if (!plus.sqlite.isOpenDatabase(config)) {
    // 2.如果没打开先打开
    openDB(config);
  }
  plus.sqlite.executeSql({
    name: 'scotfeel',
    sql:
      'create table if not exists momentList("friendId" VARCHAR(40),"momentId" BIGINT,"noticeCount" INT(11),"createTime" BIGINT , belongToId" VARCHAR(80))',
    success() {
      console.log('动态列表初始化成功');
    },
    fail(e) {
      console.log(`executeSql failed: ${JSON.stringify(e)}`);
    },
  });
}

// 插入数据,注：只需要插入个人动态区的动态，空间动态区的动态可以不用管
export function insertMomentList(
  friendId: string,
  momentId: number,
  noticeCount: number,
  createTime: number,
  belongToId: string
): void {
  return executeSql(`
		insert into momentList values ("${friendId}","${momentId}","${noticeCount}","${createTime}","${belongToId}")
	`);
}

export async function selectMomentList(
  offset: number,
  belongToId: string
): Promise<MomentList[]> {
  return selectSql(`
  select m.friendId,m.noticeCount,m.momentId,f.nickname,f.remarkName,f.avatar
  from momentList m
  left join friend f on (m.friendId = f.friendId and f.belongToId = "${belongToId}")
       where m.belongToId = "${belongToId}"
     order by m.noticeCount , m.createTime desc
     limit 10 offset "${offset}"
`);
}
// noticeCount数+1
export function updateIncNoticeCount(momentId: number, belongToId: string): void {
  return executeSql(`
		update momentList set noticeCount = noticeCount + 1 where momentId = "${momentId}" and belongToId = "${belongToId}"
	`);
}

// noticeCount数清零
export function updateClearNoticeCount(momentId: number, belongToId: string): void {
  return executeSql(`
		update momentList set noticeCount = 0 where momentId = "${momentId}" and belongToId = "${belongToId}"
	`);
}













// 执行SQL语句
async function createTable(){
	plus.sqlite.executeSql({
		name: 'scotfeel',
		sql: 'create table if not exists momentList( "id" INTEGER PRIMARY KEY AUTOINCREMENT,"friendId"	VARCHAR(40),"isRead" INT(11),"createTime" DATE,"belongToId" VARCHAR(40))',		
		success: function(e){
			console.log('executeSql success!');
		},
		fail: function(e){
			console.log('executeSql failed: '+JSON.stringify(e));
		}
	});
}
//插入数据
async function insert(friendId , isRead ,createTime,belongToId){
	return await baseSql.executeSql(`
				insert into momentList values (null,"${friendId}","${isRead}","${createTime}","${belongToId}")
			`);	
}

// lastId是上一次查询的最小的id
// async function selectSql(lastId,belongToId){
// 	return await baseSql.selectSql(`
// 				select m.friendId,m.isRead,f.nickname,f.remarkName,f.avatar
// 					from momentList m
// 					left join friend f on (m.friendId = f.friendId and f.belongToId = "${belongToId}")
// 				       where m.belongToId = "${belongToId}" and id < "${lastId}"
// 					   order by m.id desc
// 					   limit 10
// 			`);	
// }
export default {createTable,insert,selectSql};