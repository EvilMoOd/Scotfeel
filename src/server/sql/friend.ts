import { executeSql, selectSql } from './baseSql';

// 执行SQL语句
export async function createFriendTable() {
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
//插入数据
export async function insert(
  friendId: string,
  nickname: string,
  remarkName: string,
  avatar: string,
  spaceId: string,
  isDeletedByFriend: number,
  account: string,
  backgroundImage: string,
  noticeFlag: number,
  belongToId: string
) {
  return await executeSql(`
		insert into friend values ("${friendId}","${nickname}","${remarkName}","${avatar}","${spaceId}","${isDeletedByFriend}","${account}","${backgroundImage}","${noticeFlag}","${belongToId}")
	`);
}

//删除记录
export async function _delete(friendId: string, belongToId: string) {
  return await executeSql(`
		delete from friend where friendId = "${friendId}" and belongToId = "${belongToId}"
	`);
}
//通讯录
export async function selectContacts(belongToId: string) {
  return await selectSql(`
	select friendId,nickname,remarkName,avatar from friend where belongToId = "${belongToId}"
	`);
}

//朋友基本信息
export async function selectInfo(friendId: string, belongToId: string) {
  return await selectSql(`
			select * from friend where friendId = "${friendId}" and belongToId = "${belongToId}" 
	`);
}
//更新昵称
export async function updateNickname(nickname: string, friendId: string, belongToId: string) {
  return await executeSql(`
		update friend set nickname = "${nickname}" where friendId = "${friendId}" and belongToId = "${belongToId}"
	`);
}
//更新备注
export async function updateRemarkName(remarkName: string, friendId: string, belongToId: string) {
  return await executeSql(`
		update friend set remarkName = "${remarkName}" where friendId = "${friendId}" and belongToId = "${belongToId}"
	`);
}
//更新头像
export async function updateAvatar(avatar: string, friendId: string, belongToId: string) {
  return await executeSql(`
		update friend set avatar = "${avatar}" where friendId = "${friendId}" and belongToId = "${belongToId}"
	`);
}
//更新@id
export async function updateAccount(account: string, friendId: string, belongToId: string) {
  return await executeSql(`
	update friend set account = "${account}" where friendId = "${friendId}" and belongToId = "${belongToId}"
`);
}
//更新背景照片
export async function updateBackgroundImage(
  backgroundImage: string,
  friendId: string,
  belongToId: string
) {
  return await executeSql(`
		update friend set backgroundImage = "${backgroundImage}" where friendId = "${friendId}" and belongToId = "${belongToId}"
	`);
}
//更新双方绑定的空间id
export async function updateSpaceId(spaceId: string, friendId: string, belongToId: string) {
  return await executeSql(`
		update friend set spaceId = "${spaceId}" where friendId = "${friendId}" and belongToId = "${belongToId}"
	`);
}
//更新是否免打扰字段
export async function updateNoticeFlag(noticeFlag: number, friendId: string, belongToId: string) {
  return await executeSql(`
		update friend set noticeFlag = "${noticeFlag}" where friendId = "${friendId}" and belongToId = "${belongToId}"
	`);
}
//更新是否被朋友删除
export async function updateIsDeletedByFriend(
  isDeletedByFriend: number,
  friendId: string,
  belongToId: string
) {
  return await executeSql(`
		update friend set isDeletedByFriend = "${isDeletedByFriend}" where friendId = "${friendId}" and belongToId = "${belongToId}"
	`);
}
