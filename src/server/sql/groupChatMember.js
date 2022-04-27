import baseSql from '@/common/sql/baseSql.js'

// 执行SQL语句
async function createTable(){
	plus.sqlite.executeSql({
		name: 'scotfeel',
		sql: 'create table if not exists groupChatMember("groupId" VARCHAR(40),	"memberId" VARCHAR(40),"nickname" VARCHAR(40) ,'+
		'"avatar" VARCHAR(40),"remarkName" VARCHAR(40),"role" INT(11),"isExited" INT(11),"belongToId" VARCHAR(40))',
		success: function(e){
			console.log('executeSql success!');
		},
		fail: function(e){
			console.log('executeSql failed: '+JSON.stringify(e));
		}
	});
}
//插入数据
async function insert(groupId,memberId,nickname,remarkName,avatar,role,isExited,belongToId){
	return await baseSql.executeSql(`
				insert into groupChatMember values ("${groupId}","${memberId}","${nickname}","${remarkName}","${avatar}","${role}","${isExited}","${belongToId}")
			`);	
}

//删除记录
async function _delete(groupId,memberId,belongToId){
	return await baseSql.executeSql(`
				delete from groupChatMember where groupId = "${groupId}" and memberId = "${memberId}" and belongToId = "${belongToId}"
			`);	
}
//查找所有群成员信息
async function selectAllMemberInfo(groupId,belongToId){
	return await baseSql.selectSql(`
	select g.memberId,g.nickname,g.avatar,g.remarkName,g.role,f.remarkName as friendRemarkName
		from groupChatMember g
		left join friend f on (g.memberId = f.friendId and f.belongToId = "${belongToId}")
		where g.groupId = "${groupId}" and g.isExited = 0 and g.belongToId = "${belongToId}"
		order by role asc	
			`);	
}
//查找一个群成员信息,不需要判断该成员是否已退出群聊,remarkName是这个用户在这个群里的备注
async function selectOneMemberInfo(groupId,memberId,belongToId){
	return await baseSql.selectSql(`
	select g.memberId,g.nickname,g.avatar,g.remarkName,g.role,f.remarkName as friendRemarkName
		from groupChatMember g
		left join friend f on (g.memberId = f.friendId and f.belongToId = "${belongToId}")
		where g.groupId = "${groupId}" and g.memberId = "${memberId}" and g.belongToId = "${belongToId}"
			`);	
}
//更新昵称
async function updateNickname(nickname,groupId,memberId,belongToId){
	return await baseSql.executeSql(`
				update groupChatMember set nickname = "${nickname}" where groupId = "${groupId}" and memberId = "${memberId}" and belongToId = "${belongToId}"
			`);	
}
//更新头像
async function updateAvatar(avatar,groupId,memberId,belongToId){
	return await baseSql.executeSql(`
				update groupChatMember set avatar = "${avatar}" where groupId = "${groupId}" and memberId = "${memberId}" and belongToId = "${belongToId}"
			`);	
}
//更新成员备注
async function updateRemarkName(remarkName,groupId,memberId,belongToId){
	return await baseSql.executeSql(`
				update groupChatMember set remarkName = "${remarkName}" where groupId = "${groupId}" and memberId = "${memberId}" and belongToId = "${belongToId}"
			`);	
}
//更新成员角色
async function updateRole(role,groupId,memberId,belongToId){
	return await baseSql.executeSql(`
				update groupChatMember set role = "${role}" where groupId = "${groupId}" and memberId = "${memberId}" and belongToId = "${belongToId}"
			`);	
}
//更新成员退出状态
async function updateIsExited(isExited,groupId,memberId,belongToId){
	return await baseSql.executeSql(`
				update groupChatMember set isExited = "${isExited}" where groupId = "${groupId}" and memberId = "${memberId}" and belongToId = "${belongToId}"
			`);	
}


export default {createTable,insert,selectAllMemberInfo,selectOneMemberInfo,_delete,updateNickname,
					updateAvatar,updateRemarkName,updateRole,updateIsExited};