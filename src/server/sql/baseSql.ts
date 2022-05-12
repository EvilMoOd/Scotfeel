//查
export async function selectSql(
  sql: string,
  config = {
    name: 'scotfeel',
    path: '_doc/chat.db',
  }
) {
  //console.log('selectSql');
  return new Promise((resolve, reject) => {
    //1.判断是否打开数据库
    if (!plus.sqlite.isOpenDatabase(config)) {
      //2.如果没打开先打开
      openDB();
    }
    //执行数据库查询
    plus.sqlite.selectSql({
      name: config.name,
      sql,
      success: function (data) {
        resolve({ code: 1, data, msg: 'selectSql success' });
      },
      fail: function (e) {
        reject({ code: 0, data: [], msg: 'selectSql failed: ' + JSON.stringify(e) });
      },
    });
  });
}
//增删改
export async function executeSql(
  sql: string | string[],
  config = { name: 'scotfeel', path: '_doc/chat.db' }
) {
  //执行executeSql
  //console.log('executeSql');
  return new Promise((resolve, reject) => {
    //1.判断是否打开数据库
    if (!plus.sqlite.isOpenDatabase(config)) {
      //2.如果没打开先打开
      openDB();
    }
    plus.sqlite.executeSql({
      name: config.name,
      sql,
      success: function (e) {
        resolve({ code: 1, msg: e });
      },
      fail: function (e) {
        reject({ code: 0, msg: 'executeSql failed: ' + JSON.stringify(e) });
      },
    });
  });
}

// 打开数据库
export function openDB(config = {}) {
  return new Promise((resolve, reject) => {
    plus.sqlite.openDatabase({
      ...config,
      success: function () {
        console.log('数据库打开');
      },
      fail: function (e) {
        console.log('数据库打开失败+');
        reject(JSON.stringify(e));
      },
    });
  });
}

// 关闭数据库
export function closeDB() {
  plus.sqlite.closeDatabase({
    name: 'scotfeel',
    success: function () {
      console.log('closeDatabase success!');
    },
    fail: function (e) {
      console.log('closeDatabase failed: ' + JSON.stringify(e));
    },
  });
}
