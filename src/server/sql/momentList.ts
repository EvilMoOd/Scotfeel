import { executeSql, openDB, selectSql } from './baseSql';

// 执行SQL语句
export function createMemberTable(config = { name: 'scotfeel', path: '_doc/chat.db' }): void {
  if (!plus.sqlite.isOpenDatabase(config)) {
    // 2.如果没打开先打开
    openDB(config);
  }
  plus.sqlite.executeSql({
    name: 'scotfeel',
    sql: 'create table if not exists momentList( "id" INTEGER PRIMARY KEY AUTOINCREMENT,"friendId"	VARCHAR(40),"isRead" INT(11),"createTime" DATE,"belongToId" VARCHAR(40))',
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
  friendId: string,
  isRead: string,
  createTime: string,
  belongToId: string
): void {
  return executeSql(`
				insert into momentList values (null,"${friendId}","${isRead}","${createTime}","${belongToId}")
			`);
}

// lastId是上一次查询的最小的id
export async function momentListSelectSql(lastId: string, belongToId: string): Promise<void> {
  return selectSql(`
  select m.friendId,m.isRead,f.nickname,f.remarkName,f.avatar
    from momentList m
    left join friend f on (m.friendId = f.friendId and f.belongToId = "${belongToId}")
          where m.belongToId = "${belongToId}" and id < "${lastId}"
        order by m.id desc
        limit 10
			`);
}
