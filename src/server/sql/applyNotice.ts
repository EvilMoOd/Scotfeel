import type { NoticeApply } from '../webSocketType';
import { executeSql, openDB, selectSql } from './baseSql';

// 新建申请通知表
export function createApplyNoticeTable(config = { name: 'scotfeel', path: '_doc/chat.db' }): void {
  if (!plus.sqlite.isOpenDatabase(config)) {
    // 2.如果没打开先打开
    openDB(config);
  }
  plus.sqlite.executeSql({
    name: 'scotfeel',
    sql:
      'create table if not exists applyNotice( "id" INTEGER PRIMARY KEY AUTOINCREMENT,"applyId" VARCHAR(40),"applicantId" VARCHAR(40),"content" VARCHAR(1000),"spaceApplicantType" INT(11),"spaceId" VARCHAR(40),' +
      '"applicantSpaceId" VARCHAR(40),"groupId" VARCHAR(40),"photo" VARCHAR(80),"studentFlag" INT(11),"studentNumber" VARCHAR(40),"graduateTime" BIGINT,"userAvatar" VARCHAR(80),' +
      '"userNickname" VARCHAR(80),"groupChatNickname" VARCHAR(80),"spaceNickname" VARCHAR(80),"applicantSpaceAvatar" VARCHAR(80),"applicantSpaceNickname" VARCHAR(80),"applyType" INT(11),' +
      '"status" INT(11),"updateTime" BIGINT,"belongToId" VARCHAR(40))',
    success() {
      console.log('申请通知表初始化成功');
    },
    fail(e) {
      console.log(`executeSql failed: ${JSON.stringify(e)}`);
    },
  });
}

// 插入数据
export function insertApplyNotice(
  applyId: string,
  applicantId: string,
  content: string,
  spaceApplicantType: number,
  spaceId: string,
  applicantSpaceId: string,
  groupId: string,
  photo: string,
  studentFlag: number,
  studentNumber: string,
  graduateTime: number,
  userAvatar: string,
  userNickname: string,
  groupChatNickname: string,
  spaceNickname: string,
  applicantSpaceAvatar: string,
  applicantSpaceNickname: string,
  applyType: number,
  status: number,
  updateTime: number,
  belongToId: string
): void {
  return executeSql(`
		insert into applyNotice values (null,"${applyId}","${applicantId}","${content}","${spaceApplicantType}","${spaceId}","${applicantSpaceId}","${groupId}","${photo}","${studentFlag}","${studentNumber}",
    "${graduateTime}","${userAvatar}","${userNickname}","${groupChatNickname}","${spaceNickname}","${applicantSpaceAvatar}","${applicantSpaceNickname}","${applyType}","${status}","${updateTime}","${belongToId}")
	`);
}

// 申请通知查询，lastId是上一次查询的最小的id
export async function selectApplyNotice(
  lastId: number,
  belongToId: string
): Promise<NoticeApply[]> {
  return selectSql(`
	select * from applyNotice 
		where belongToId = "${belongToId}" and id < "${lastId}"
	order by id desc
	limit 10 
`);
}

// 更新状态
export function updateStatus(id: number, status: number, belongToId: string): void {
  return executeSql(`
		update applyNotice set status = "${status}" where id = "${id}" and belongToId = "${belongToId}"
	`);
}
