import type { SessionListInfo } from '../../store/modules/sessionListStore';
import { executeSql, selectSql } from './baseSql';

// 新建会话表
export function createSessionListTable(): void {
  plus.sqlite.executeSql({
    name: 'scotfeel',
    sql:
      'create table if not exists sessionList("sessionId" VARCHAR(40),	"chatorName" VARCHAR(40),	"chatorId" VARCHAR(40),"content" VARCHAR(2000) , "contentType" INT(11),' +
      '"type" INT(11),"unReadCount" INT(11),"updateTime" BIGINT(13),"belongToId" VARCHAR(40))',
    success: function () {
      console.log('会话表新建成功');
    },
    fail: function (e) {
      console.log('executeSql failed: ' + JSON.stringify(e));
    },
  });
}

// 插入数据
export function insertSession(
  sessionId: string,
  chatorName: string,
  chatorId: string,
  content: string,
  contentType: number,
  unReadCount: number,
  type: number,
  updateTime: number,
  belongToId: string
): void {
  return executeSql(`
		insert into sessionList values ("${sessionId}","${chatorName}","${chatorId}","${content}","${contentType}","${type}","${unReadCount}","${updateTime}","${belongToId}")
	`);
}

// 查出会话列表
export async function selectAllSession(belongToId: string): Promise<SessionListInfo[]> {
  return await selectSql(`
  select s.*,g.nickname as groupChatNickname,g.avatar as groupChatAvatar,f.nickname as nickname,f.avatar as avatar,f.remarkName as remarkName
    from sessionList s
    left join groupChat g on (g.groupId = s.sessionId and g.belongToId = "${belongToId}")
    left join friend f on (s.sessionId = f.friendId and f.belongToId = "${belongToId}")
    where s.belongToId = "${belongToId}"
    order by  s.updateTime desc
  `);
}

// 查出一个会话
export async function selectOneSession(
  sessionId: string,
  belongToId: string
): Promise<SessionListInfo> {
  return await selectSql(`
			select *
					from sessionList
					where sessionId = "${sessionId}" and belongToId = "${belongToId}"
			`);
}

// 更新session
export function updateSession(
  chatorName: string,
  chatorId: string,
  content: string,
  contentType: number,
  updateTime: number,
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

// 清空会话表
export function deleteSessionTable(): void {
  return executeSql(`
		delete from sessionList ;
	`);
}

// 查询所有记录
export async function selectAllSession2(): Promise<SessionListInfo[]> {
  return await selectSql(`
			select * from sessionList
	`);
}
