import { executeSql, selectSql } from './baseSql';

// 新建或查询朋友表
export function createFriendTable(): void {
  plus.sqlite.executeSql({
    name: 'scotfeel',
    sql:
      'create table if not exists friend("friendId" VARCHAR(40),	"nickname" VARCHAR(80),	"remarkName" VARCHAR(80),	"avatar" VARCHAR(40),	"spaceId" VARCHAR(40),' +
      '"isDeletedByFriend" INT(11),	"account" VARCHAR(40), "backgroundImage" VARCHAR(40),	"noticeFlag" INT(11) ,	"belongToId" VARCHAR(40))',
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
  friendId: string,
  nickname: string,
  remarkName: string,
  avatar: string,
  spaceId: string,
  isDeletedByFriend: number,
  account: string,
  backgroundImage: string,
  signature: string,
  noticeFlag: number,
  belongToId: string
): void {
  return executeSql(`
		insert into friend values ("${friendId}","${nickname}","${remarkName}","${avatar}","${spaceId}","${isDeletedByFriend}","${account}","${backgroundImage}","${signature}","${noticeFlag}","${belongToId}")
	`);
}

// 删除记录
export function _delete(friendId: string, belongToId: string): void {
  return executeSql(`
		delete from friend where friendId = "${friendId}" and belongToId = "${belongToId}"
	`);
}
// 通讯录
export async function selectContacts(belongToId: string): Promise<void> {
  return await selectSql(`
	select friendId,nickname,remarkName,avatar from friend where belongToId = "${belongToId}"
	`);
}

// 朋友基本信息
export async function selectInfo(friendId: string, belongToId: string): Promise<void> {
  return await selectSql(`
			select * from friend where friendId = "${friendId}" and belongToId = "${belongToId}" 
	`);
}
// 更新昵称
export function updateNickname(nickname: string, friendId: string, belongToId: string): void {
  return executeSql(`
		update friend set nickname = "${nickname}" where friendId = "${friendId}" and belongToId = "${belongToId}"
	`);
}
// 更新备注
export function updateRemarkName(remarkName: string, friendId: string, belongToId: string): void {
  return executeSql(`
		update friend set remarkName = "${remarkName}" where friendId = "${friendId}" and belongToId = "${belongToId}"
	`);
}
// 更新头像
export function updateAvatar(avatar: string, friendId: string, belongToId: string): void {
  return executeSql(`
		update friend set avatar = "${avatar}" where friendId = "${friendId}" and belongToId = "${belongToId}"
	`);
}
// 更新@id
export function updateAccount(account: string, friendId: string, belongToId: string): void {
  return executeSql(`
	update friend set account = "${account}" where friendId = "${friendId}" and belongToId = "${belongToId}"
`);
}
// 更新背景照片
export function updateBackgroundImage(
  backgroundImage: string,
  friendId: string,
  belongToId: string
): void {
  return executeSql(`
		update friend set backgroundImage = "${backgroundImage}" where friendId = "${friendId}" and belongToId = "${belongToId}"
	`);
}
// 更新个性签名
export function updateSignature(signature: string, friendId: string, belongToId: string): void {
  return executeSql(`
		update friend set signature = "${signature}" where friendId = "${friendId}" and belongToId = "${belongToId}"
	`);
}
// 更新双方绑定的空间id
export function updateSpaceId(spaceId: string, friendId: string, belongToId: string): void {
  return executeSql(`
		update friend set spaceId = "${spaceId}" where friendId = "${friendId}" and belongToId = "${belongToId}"
	`);
}
// 更新是否免打扰字段
export function updateNoticeFlag(noticeFlag: number, friendId: string, belongToId: string): void {
  return executeSql(`
		update friend set noticeFlag = "${noticeFlag}" where friendId = "${friendId}" and belongToId = "${belongToId}"
	`);
}
// 更新是否被朋友删除
export function updateIsDeletedByFriend(
  isDeletedByFriend: 0 | 1,
  friendId: string,
  belongToId: string
): void {
  return executeSql(`
		update friend set isDeletedByFriend = "${isDeletedByFriend}" where friendId = "${friendId}" and belongToId = "${belongToId}"
	`);
}
