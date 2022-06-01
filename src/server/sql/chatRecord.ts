import { executeSql, openDB, selectSql } from './baseSql';

export interface ChatRecord {
  id?: number;
  sessionId: string;
  userId: string;
  content: string;
  contentType: number;
  belongToId: string;
  createTime: number;
}

// 新建或查询聊天记录表
export function createChatRecordTable(config = { name: 'scotfeel', path: '_doc/chat.db' }): void {
  if (!plus.sqlite.isOpenDatabase(config)) {
    // 2.如果没打开先打开
    openDB(config);
  }
  plus.sqlite.executeSql({
    name: 'scotfeel',
    sql: 'create table if not exists chatRecord( "id" INTEGER PRIMARY KEY AUTOINCREMENT,"sessionId"	VARCHAR(40),"userId" VARCHAR(40),"content" VARCHAR(2000),"contentType" INT(11),"createTime" DATE,"belongToId" VARCHAR(40))',
    success: function () {
      console.log('executeSql success!');
    },
    fail: function (e) {
      console.log('executeSql failed: ' + JSON.stringify(e));
    },
  });
}
// 插入数据
export function insertRecord(
  sessionId: string,
  userId: string,
  content: string,
  contentType: 0 | 1,
  createTime: number,
  belongToId: string
): void {
  return executeSql(`
		insert into chatRecord values (null,"${sessionId}","${userId}","${content}","${contentType}","${createTime}","${belongToId}")
	`);
}

// 单聊的聊天记录查询，lastId是上一次查询的最小的id
export async function selectSingleChat(
  lastId: number,
  sessionId: string,
  belongToId: string
): Promise<ChatRecord[]> {
  return await selectSql(`
	select id,userId,content,contentType,createTime from chatRecord 
		where sessionId = "${sessionId}" and belongToId = "${belongToId}" and id < "${lastId}"
	order by id desc
	limit 15
`);
}

// 群聊的聊天记录查询，lastId是上一次查询的最小的id
export async function selectGroupChat(
  lastId: string,
  sessionId: string,
  belongToId: string
): Promise<void> {
  return await selectSql(`
		select c.id,c.userId,c.content,c.contentType,c.createTime,g.avatar,g.nickname,g.remarkName as memberRemarkName,f.remarkName as friendRemarkName
			from chatRecord c
			left join groupChatMember g on (g.groupId = "${sessionId}" and g.belongToId = "${belongToId}" and g.memberId = c.userId)
				left join friend f on (c.userId = f.friendId and f.belongToId = "${belongToId}")
					where c.sessionId = "${sessionId}" and c.belongToId = "${belongToId}" and c.id < "${lastId}"
					order by c.id desc
					limit 15
	`);
}
