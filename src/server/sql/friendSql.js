import baseSql from '@/common/sql/baseSql.js'

// 执行SQL语句
async function createTable(){
	plus.sqlite.executeSql({
		name: 'scotfeel',
		sql: 'create table if not exists friend("friendId" VARCHAR(40),	"nickname" VARCHAR(80),	"remarkName" VARCHAR(80),	"avatar" VARCHAR(40),	"spaceId" VARCHAR(40),'+
		'"isDeletedByFriend" INT(11),	"account" VARCHAR(40), "backgroundImage" VARCHAR(40),	"noticeFlag" INT(11) ,	"belongToId" VARCHAR(40))',	
		success: function(e){
			console.log('executeSql success!');
		},
		fail: function(e){
			console.log('executeSql failed: '+JSON.stringify(e));
		}
	});
}
//插入数据
async function insert(friendId,	nickname,	remarkName,	avatar,	spaceId,	isDeletedByFriend,	account,	backgroundImage,	noticeFlag , belongToId){
	return await baseSql.executeSql(`
				insert into friend values ("${friendId}","${nickname}","${remarkName}","${avatar}","${spaceId}","${isDeletedByFriend}","${account}","${backgroundImage}","${noticeFlag}","${belongToId}")
			`);	
}

//删除记录
async function _delete(friendId,belongToId){
	return await baseSql.executeSql(`
				delete from friend where friendId = "${friendId}" and belongToId = "${belongToId}"
			`);	
}
//通讯录
async function selectContacts(belongToId){
	return await baseSql.selectSql(`
			select friendId,nickname,remarkName,avatar from friend where belongToId = "${belongToId}"
			`);	
}

//朋友基本信息
async function selectInfo(friendId,belongToId){
	return await baseSql.selectSql(`
					select * from friend where friendId = "${friendId}" and belongToId = "${belongToId}" 
			`);	
}
//更新昵称
async function updateNickname(nickname,friendId,belongToId){
	return await baseSql.executeSql(`
				update friend set nickname = "${nickname}" where friendId = "${friendId}" and belongToId = "${belongToId}"
			`);	
}
//更新备注
async function updateRemarkName(remarkName,friendId,belongToId){
	return await baseSql.executeSql(`
				update friend set remarkName = "${remarkName}" where friendId = "${friendId}" and belongToId = "${belongToId}"
			`);	
}
//更新头像
async function updateAvatar(avatar,friendId,belongToId){
	return await baseSql.executeSql(`
				update friend set avatar = "${avatar}" where friendId = "${friendId}" and belongToId = "${belongToId}"
			`);	
}
//更新@id
async function updateAccount(account,friendId,belongToId){
	return await baseSql.executeSql(`
				update friend set account = "${account}" where friendId = "${friendId}" and belongToId = "${belongToId}"
			`);	
}
//更新背景照片
async function updateBackgroundImage(backgroundImage,friendId,belongToId){
	return await baseSql.executeSql(`
				update friend set backgroundImage = "${backgroundImage}" where friendId = "${friendId}" and belongToId = "${belongToId}"
			`);	
}
//更新双方绑定的空间id
async function updateSpaceId(spaceId,friendId,belongToId){
	return await baseSql.executeSql(`
				update friend set spaceId = "${spaceId}" where friendId = "${friendId}" and belongToId = "${belongToId}"
			`);	
}
//更新是否免打扰字段
async function updateNoticeFlag(noticeFlag,friendId,belongToId){
	return await baseSql.executeSql(`
				update friend set noticeFlag = "${noticeFlag}" where friendId = "${friendId}" and belongToId = "${belongToId}"
			`);	
}
//更新是否被朋友删除
async function updateIsDeletedByFriend(isDeletedByFriend,friendId,belongToId){
	return await baseSql.executeSql(`
				update friend set isDeletedByFriend = "${isDeletedByFriend}" where friendId = "${friendId}" and belongToId = "${belongToId}"
			`);	
}
export default {createTable,insert,selectContacts,selectInfo,_delete,updateNickname,
					updateRemarkName,updateAvatar,updateAccount,updateBackgroundImage,updateSpaceId,updateNoticeFlag,updateIsDeletedByFriend};