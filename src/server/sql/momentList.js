import baseSql from '@/common/sql/baseSql.js'

// 执行SQL语句
async function createTable(){
	plus.sqlite.executeSql({
		name: 'scotfeel',
		sql: 'create table if not exists momentList( "id" INTEGER PRIMARY KEY AUTOINCREMENT,"friendId"	VARCHAR(40),"isRead" INT(11),"createTime" DATE,"belongToId" VARCHAR(40))',		
		success: function(e){
			console.log('executeSql success!');
		},
		fail: function(e){
			console.log('executeSql failed: '+JSON.stringify(e));
		}
	});
}
//插入数据
async function insert(friendId , isRead ,createTime,belongToId){
	return await baseSql.executeSql(`
				insert into momentList values (null,"${friendId}","${isRead}","${createTime}","${belongToId}")
			`);	
}

//lastId是上一次查询的最小的id
async function selectSql(lastId,belongToId){
	return await baseSql.selectSql(`
				select m.friendId,m.isRead,f.nickname,f.remarkName,f.avatar
					from momentList m
					left join friend f on (m.friendId = f.friendId and f.belongToId = "${belongToId}")
				       where m.belongToId = "${belongToId}" and id < "${lastId}"
					   order by m.id desc
					   limit 10
			`);	
}
export default {createTable,insert,selectSql};