import baseSql from './baseSql.js'
async function selectSql(fromId){
	return await sql.selectSql(`
				select timestamp,text,fromId,count(fromId) as num
				from msg
				WHERE isRead = 0
				GROUP BY "${fromId}"
			`);	
}
module.exports = {selectSql};