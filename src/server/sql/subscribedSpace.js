import baseSql from '@/common/sql/baseSql.js'

// 执行SQL语句
async function createTable(){
	plus.sqlite.executeSql({
		name: 'scotfeel',
		sql: 'create table if not exists subscribedSpace("spaceId" VARCHAR(40),	"nickname" VARCHAR(40),	"avatar" VARCHAR(40) , "role" INT(11),"belongToId" VARCHAR(40))',	
		success: function(e){
			console.log('executeSql success!');
		},
		fail: function(e){
			console.log('executeSql failed: '+JSON.stringify(e));
		}
	});
}
//插入数据
async function insert(spaceId, nickname,avatar,role,belongToId){
	return await baseSql.executeSql(`
				insert into subscribedSpace values ("${spaceId}","${nickname}","${avatar}","${role}","${belongToId}")
			`);	
}

//删除记录
async function _delete(spaceId,belongToId){
	return await baseSql.executeSql(`
				delete from subscribedSpace where spaceId = "${spaceId}" and belongToId = "${belongToId}"
			`);	
}
//查找所有订阅空间
async function selectAllSpaces(belongToId){
	return await baseSql.selectSql(`
	select spaceId,nickname,avatar,role from subscribedSpace where belongToId = "${belongToId}"
			`);	
}
//查找一个订阅空间
async function selectOneSpace(spaceId,belongToId){
	return await baseSql.selectSql(`
	select spaceId,nickname,avatar,role from subscribedSpace where spaceId = "${spaceId}" and belongToId = "${belongToId}"
			`);	
}
//更新昵称
async function updateNickname(nickname,spaceId,belongToId){
	return await baseSql.executeSql(`
				update subscribedSpace set nickname = "${nickname}" where spaceId = "${spaceId}" and belongToId = "${belongToId}"
			`);	
}
//更新角色
async function updateRole(role,spaceId,belongToId){
	return await baseSql.executeSql(`
				update subscribedSpace set role = "${role}" where spaceId = "${spaceId}" and belongToId = "${belongToId}"
			`);	
}
//更新头像
async function updateAvatar(avatar,spaceId,belongToId){
	return await baseSql.executeSql(`
				update subscribedSpace set avatar = "${avatar}" where spaceId = "${spaceId}" and belongToId = "${belongToId}"
			`);	
}
export default {createTable,insert,selectAllSpaces,selectOneSpace,_delete,updateNickname,
					updateAvatar,updateRole};