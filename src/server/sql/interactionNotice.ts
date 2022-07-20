import { executeSql, openDB, selectSql } from './baseSql';

// 新建互动通知表
export function createInteractionNoticeTable(config = { name: 'scotfeel', path: '_doc/chat.db' }): void {
  if (!plus.sqlite.isOpenDatabase(config)) {
    // 2.如果没打开先打开
    openDB(config);
  }  
  plus.sqlite.executeSql({
    name: 'scotfeel',
    sql:
      'create table if not exists interactionNotice( "id" INTEGER PRIMARY KEY AUTOINCREMENT,"momentId" BIGINT,"momentType" INT(11),"spaceId" VARCHAR(40),"likerId" VARCHAR(40),"likerNickname" VARCHAR(40),' +
      '"likerAvatar" VARCHAR(80),"likerFriendRemrkName" VARCHAR(40),"spaceLikerRemarkName" VARCHAR(40),"content" VARCHAR(1000),"secondCommentIndex" VARCHAR(40),"commentedUserId" VARCHAR(40),"commentedUserNickname" VARCHAR(40),"commentedUserAvatar" VARCHAR(80),'+
      '"commentedUserFriendRemarkName" VARCHAR(80),"spaceCommentedUserRemarkName" VARCHAR(80),"commenterId" VARCHAR(80),"commenterNickname" VARCHAR(80),"commenterAvatar" VARCHAR(80),"commenterFriendRemarkName" VARCHAR(80),"spaceCommenterRemarkName" VARCHAR(80),"commentType" INT(11),'+
      '"reposterId" VARCHAR(80),"reposterNickname" VARCHAR(80),"reposterAvatar" VARCHAR(80),"reposterFriendRemarkName" VARCHAR(80),"spaceUserRemarkName" VARCHAR(80),"userMomentContent" VARCHAR(2000),"userMomentPhoto" VARCHAR(80),"spaceMomentContent" VARCHAR(2000),'+
      '"spaceMomentPhoto" VARCHAR(80),"noticeType" INT(11),"createTime" BIGINT,"belongToId" VARCHAR(40))',
    success() {
      console.log('互动通知表初始化成功');
    },
    fail(e) {
      console.log(`executeSql failed: ${JSON.stringify(e)}`);
    },
  });
}

// 插入数据
export function insertInteractionNotice(
  momentId: number,
  momentType: string,
  spaceId: string,
  likerId: string,
  likerNickname: string,
  likerAvatar: string,
  likerFriendRemrkName: string,
  spaceLikerRemarkName: string,
  content: string,
  secondCommentIndex: string,
  commentedUserId: string,
  commentedUserNickname: string,
  commentedUserAvatar: string,
  commentedUserFriendRemarkName: string,
  spaceCommentedUserRemarkName: string,
  commenterId: string,
  commenterNickname: string,
  commenterAvatar: string,
  commenterFriendRemarkName: string,
  spaceCommenterRemarkName: string,
  commentType: number,
  reposterId: string,
  reposterNickname: string,
  reposterAvatar: string,
  reposterFriendRemarkName: string,
  spaceUserRemarkName: string,
  userMomentContent: string,
  userMomentPhoto: string,
  spaceMomentContent: string,
  spaceMomentPhoto: string,
  noticeType: number,
  createTime: number,
  belongToId: string
): void {
  return executeSql(`
		insert into interactionNotice values (null,"${momentId}","${momentType}","${spaceId}","${likerId}","${likerNickname}","${likerAvatar}","${likerFriendRemrkName}","${spaceLikerRemarkName}","${content}","${secondCommentIndex}","${commentedUserId}",
    "${commentedUserNickname}","${commentedUserAvatar}","${commentedUserFriendRemarkName}","${spaceCommentedUserRemarkName}","${commenterId}","${commenterNickname}","${commenterAvatar}","${commenterFriendRemarkName}","${spaceCommenterRemarkName}","${commentType}","${reposterId}",
    "${reposterNickname}","${reposterAvatar}","${reposterFriendRemarkName}","${spaceUserRemarkName}","${userMomentContent}","${userMomentPhoto}","${spaceMomentContent}","${spaceMomentPhoto}","${noticeType}","${createTime}","${belongToId}")
	`);
}

// 互动通知查询，lastId是上一次查询的最小的id
export async function selectInteractionNotice(
  lastId: number,
  belongToId: string
): Promise<null> { //TODO 接口不知道放哪，没写，暂时用null替代
  return selectSql(`
	select * from interactionNotice 
		where belongToId = "${belongToId}" and id < "${lastId}"
	order by id desc
	limit 10 
`);
}
