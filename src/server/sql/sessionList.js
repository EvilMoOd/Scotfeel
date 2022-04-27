import baseSql from '@/common/sql/baseSql.js'

// 执行SQL语句
async function createTable(){
	plus.sqlite.executeSql({
		name: 'scotfeel',
		sql: 'create table if not exists sessionList("sessionId" VARCHAR(40),	"chatorName" VARCHAR(40),	"chatorId" VARCHAR(40),"content" VARCHAR(2000) , "contentType" INT(11),'+
		'"type" INT(11),"unReadCount" INT(11),"updateTime" DATE,"belongToId" VARCHAR(40))',
		success: function(e){
			console.log('executeSql success!');
		},
		fail: function(e){
			console.log('executeSql failed: '+JSON.stringify(e));
		}
	});
}
//插入数据
async function insert(sessionId , chatorName , chatorId,content	, contentType , unReadCount , type, updateTime , belongToId){
	return await baseSql.executeSql(`
				insert into sessionList values ("${sessionId}","${chatorName}","${chatorId}","${content}","${contentType}","${unReadCount}","${type}","${updateTime}","${belongToId}")
			`);	
}

//查出会话列表
async function selectAll(belongToId){
	return await baseSql.selectSql(`
				select s.*,g.nickname as groupChatNickname,g.avatar as groupChatAvatar,f.nickname as friendNickname,f.avatar as friendAvatar,f.remarkName as friendRemarkName
					from sessionList s
					left join groupChat g on (g.groupId = s.sessionId and g.belongToId = "${belongToId}")
				    left join friend f on (s.sessionId = f.friendId and f.belongToId = "${belongToId}")
					   where s.belongToId = "${belongToId}"
			`);	
}

//查出一个会话
async function selectOneSession(sessionId,belongToId){
	return await baseSql.selectSql(`
			select *
					from sessionList
					where sessionId = "${sessionId}" and belongToId = "${belongToId}"
			`);	
}

//更新session
async function update(chatorName,chatorId,content,contentType,updateTime,sessionId,belongToId){
	return await baseSql.executeSql(`
				update sessionList set chatorName = "${chatorName}",chatorId = "${chatorId}",content = "${content}",contentType = "${contentType}",updateTime = "${updateTime}"
				     where sessionId = "${sessionId}" and belongToId = "${belongToId}"
			`);	
}

//未读数加一
async function updateIncUnReadCount(sessionId,belongToId){
	return await baseSql.executeSql(`
				update sessionList set unReadCount = unReadCount + 1 where sessionId = "${sessionId}" and belongToId = "${belongToId}"
			`);	
}

//未读数清零
async function updateClearUnReadCount(sessionId,belongToId){
	return await baseSql.executeSql(`
				update sessionList set unReadCount = 0 where sessionId = "${sessionId}" and belongToId = "${belongToId}"
			`);	
}
export default {createTable,insert,selectAll,selectOneSession,update,updateIncUnReadCount,updateClearUnReadCount};