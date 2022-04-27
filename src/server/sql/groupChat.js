import baseSql from '@/common/sql/baseSql.js'

// 执行SQL语句
async function createTable(){
	plus.sqlite.executeSql({
		name: 'scotfeel',
		sql: 'create table if not exists groupChat("groupId" VARCHAR(40),	"nickname" VARCHAR(40),	"avatar" VARCHAR(40) , "memberCount" INT(11),"spaceId" VARCHAR(40),'+
		'"spaceNickname" VARCHAR(40),"spaceAvatar" VARCHAR(40),"noticeFlag" INT(11),"isDismissed" INT(11),"belongToId" VARCHAR(40))',	
		success: function(e){
			console.log('executeSql success!');
		},
		fail: function(e){
			console.log('executeSql failed: '+JSON.stringify(e));
		}
	});
}
//插入数据
async function insert(groupId , nickname,avatar,memberCount,spaceId,spaceNickname,spaceAvatar,noticeFlag,isDismissed,belongToId){
	return await baseSql.executeSql(`
				insert into groupChat values ("${groupId}","${nickname}","${avatar}","${memberCount}","${spaceId}","${spaceNickname}","${spaceAvatar}","${noticeFlag}","${isDismissed}","${belongToId}")
			`);	
}

//删除记录
async function _delete(groupId,belongToId){
	return await baseSql.executeSql(`
				delete from groupChat where groupId = "${groupId}" and belongToId = "${belongToId}"
			`);	
}
//查找所有群聊
async function selectAll(belongToId){
	return await baseSql.selectSql(`
	select groupId,nickname,avatar from groupChat where belongToId = "${belongToId}"
			`);	
}
//群聊基本信息
async function selectInfo(groupId,belongToId){
	return await baseSql.selectSql(`
					select * from groupChat where groupId = "${groupId}" and belongToId = "${belongToId}" 
			`);	
}
//更新昵称
async function updateNickname(nickname,groupId,belongToId){
	return await baseSql.executeSql(`
				update groupChat set nickname = "${nickname}" where groupId = "${groupId}" and belongToId = "${belongToId}"
			`);	
}
//更新成员数量
async function updateMemberCount(memberCount,groupId,belongToId){
	return await baseSql.executeSql(`
				update groupChat set memberCount = "${memberCount}" where groupId = "${groupId}" and belongToId = "${belongToId}"
			`);	
}
//更新头像
async function updateAvatar(avatar,groupId,belongToId){
	return await baseSql.executeSql(`
				update groupChat set avatar = "${avatar}" where groupId = "${groupId}" and belongToId = "${belongToId}"
			`);	
}
//更新是否被解散
async function updateIsDismissed(isDismissed,groupId,belongToId){
	return await baseSql.executeSql(`
				update groupChat set isDismissed = "${isDismissed}" where groupId = "${groupId}" and belongToId = "${belongToId}"
			`);	
}
//更新绑定的空间id
async function updateSpaceId(spaceId,groupId,belongToId){
	return await baseSql.executeSql(`
				update groupChat set spaceId = "${spaceId}" where groupId = "${groupId}" and belongToId = "${belongToId}"
			`);	
}
//更新绑定的空间头像
async function updateSpaceAvatar(spaceAvatar,groupId,belongToId){
	return await baseSql.executeSql(`
				update groupChat set spaceAvatar = "${spaceAvatar}" where groupId = "${groupId}" and belongToId = "${belongToId}"
			`);	
}
//更新双方绑定的空间昵称
async function updateSpaceNickname(spaceNickname,groupId,belongToId){
	return await baseSql.executeSql(`
				update groupChat set spaceNickname = "${spaceNickname}" where groupId = "${groupId}" and belongToId = "${belongToId}"
			`);	
}
//更新是否免打扰字段
async function updateNoticeFlag(noticeFlag,groupId,belongToId){
	return await baseSql.executeSql(`
				update groupChat set noticeFlag = "${noticeFlag}" where groupId = "${groupId}" and belongToId = "${belongToId}"
			`);	
}
export default {createTable,insert,selectAll,selectInfo,_delete,updateNickname,
					updateAvatar,updateMemberCount,updateSpaceId,updateSpaceNickname,updateSpaceAvatar,updateNoticeFlag,updateIsDismissed};