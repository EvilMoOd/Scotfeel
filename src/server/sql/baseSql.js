async function selectSql(sql,config={}){
	//console.log('selectSql');
	return new Promise(( async callback=>{
		let defaultConfig = {
			"name" : "scotfeel",
			"path" : '_doc/chat.db'
		};
		config = {...defaultConfig,...config}
		//1.判断是否打开数据库
		if(!plus.sqlite.isOpenDatabase(config)){
		//2.如果没打开先打开
			let {code,msg} = await openDB(config);
			if(!code){
				return [0,msg]
			}
		}
		//执行数据库查询
		plus.sqlite.selectSql({
			name: config.name,
			sql,
			success: function(data){
				callback({code:1,data,msg:'selectSql success'})
			},
			fail: function(e){
				callback({code:0,data:[],msg:'selectSql failed: '+JSON.stringify(e)})
			}
		});
	}))
}

async function executeSql(sql,config={}){	//执行executeSql
	//console.log('executeSql');
	return new Promise(( async callback=>{
		let defaultConfig = {
			"name" : "scotfeel",
			"path" : '_doc/chat.db'
		};
		config = {...defaultConfig,...config}
		//1.判断是否打开数据库
		if(!plus.sqlite.isOpenDatabase(config)){
		//2.如果没打开先打开
			let {code,msg} = await openDB(config);
			if(!code){
				return [0,msg]
			}
		}
		plus.sqlite.executeSql({
			name: config.name,
			sql: sql,
			success: function(e){
				callback({code:1,msg:e})
			},
			fail: function(e){
				callback({code:0,msg:'executeSql failed: '+JSON.stringify(e)})
			}
		});
	}))
}

// 打开数据库
async function openDB(config){
	return new Promise((callback)=>{
		plus.sqlite.openDatabase({
			...config,
			success: function(e){
				callback({code:1,msg:'openDatabase success!'})
			},
			fail: function(e){
				callback({code:0,msg:'openDatabase failed: '+JSON.stringify(e)})
			}
		});
	})
}

// 关闭数据库
async function closeDB(){
	plus.sqlite.closeDatabase({
		name: 'scotfeel',
		success: function(e){
			console.log('closeDatabase success!');
		},
		fail: function(e){
			console.log('closeDatabase failed: '+JSON.stringify(e));
		}
	});
}

export default {selectSql,executeSql,openDB,closeDB};