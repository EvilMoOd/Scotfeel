import { executeSql, selectSql } from './baseSql';

// 执行SQL语句
export function createSessionListTable(): void {
  plus.sqlite.executeSql({
    name: 'scotfeel',
    sql:
      'create table if not exists sessionList("sessionId" VARCHAR(40),	"chatorName" VARCHAR(40),	"chatorId" VARCHAR(40),"content" VARCHAR(2000) , "contentType" INT(11),' +
      '"type" INT(11),"unReadCount" INT(11),"updateTime" DATE,"belongToId" VARCHAR(40))',
    success: function () {
      console.log('executeSql success!');
    },
    fail: function (e) {
      console.log('executeSql failed: ' + JSON.stringify(e));
    },
  });
}

// 插入数据
export function insert(
  sessionId: string,
  chatorName: string,
  chatorId: string,
  content: string,
  contentType: string,
  unReadCount: number,
  type: number,
  updateTime: string,
  belongToId: string
): void {
  return executeSql(`
		insert into sessionList values ("${sessionId}","${chatorName}","${chatorId}","${content}","${contentType}","${unReadCount}","${type}","${updateTime}","${belongToId}")
	`);
}

// 查出会话列表
export async function selectAll(belongToId: string): Promise<void> {
  return await selectSql(`
  select s.*,g.nickname as groupChatNickname,g.avatar as groupChatAvatar,f.nickname as friendNickname,f.avatar as friendAvatar,f.remarkName as friendRemarkName
    from sessionList s
    left join groupChat g on (g.groupId = s.sessionId and g.belongToId = "${belongToId}")
    left join friend f on (s.sessionId = f.friendId and f.belongToId = "${belongToId}")
    where s.belongToId = "${belongToId}"
  `);
}

// 查出一个会话
export async function selectOneSession(sessionId: string, belongToId: string): Promise<void> {
  return await selectSql(`
			select *
					from sessionList
					where sessionId = "${sessionId}" and belongToId = "${belongToId}"
			`);
}

// 更新session
export function update(
  chatorName: string,
  chatorId: string,
  content: string,
  contentType: string,
  updateTime: string,
  sessionId: string,
  belongToId: string
): void {
  return executeSql(`
    update sessionList set chatorName = "${chatorName}",chatorId = "${chatorId}",content = "${content}",contentType = "${contentType}",updateTime = "${updateTime}"
    where sessionId = "${sessionId}" and belongToId = "${belongToId}"
  `);
}

// 未读数加一
export function updateIncUnReadCount(sessionId: string, belongToId: string): void {
  return executeSql(`
    update sessionList set unReadCount = unReadCount + 1 where sessionId = "${sessionId}" and belongToId = "${belongToId}"
  `);
}

// 未读数清零
export function updateClearUnReadCount(sessionId: string, belongToId: string): void {
  return executeSql(`
    update sessionList set unReadCount = 0 where sessionId = "${sessionId}" and belongToId = "${belongToId}"
  `);
}
