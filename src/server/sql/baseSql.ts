// 查
export async function selectSql(
  sql: string,
  config = {
    name: 'scotfeel',
    path: '_doc/chat.db',
  }
): Promise<any> {
  return await new Promise((resolve, reject) => {
    // 1.判断是否打开数据库
    if (!plus.sqlite.isOpenDatabase(config)) {
      // 2.如果没打开先打开
      openDB();
    }
    // 执行数据库查询
    plus.sqlite.selectSql({
      name: config.name,
      sql,
      success(data) {
        resolve(data);
      },
      fail(e) {
        reject(e);
      },
    });
  });
}
// 增删改
export function executeSql(
  sql: string | string[],
  config = { name: 'scotfeel', path: '_doc/chat.db' }
): void {
  // 执行executeSql
  // console.log('executeSql');
  // 1.判断是否打开数据库
  if (!plus.sqlite.isOpenDatabase(config)) {
    // 2.如果没打开先打开
    openDB();
  }
  plus.sqlite.executeSql({
    name: config.name,
    sql,
    success: function () {
      console.log('操作成功');
    },
    fail: function (e) {
      console.log(e);
    },
  });
}

// 打开数据库
export function openDB(
  config = {
    name: 'scotfeel',
    path: '_doc/chat.db',
  }
): void {
  plus.sqlite.openDatabase({
    ...config,
    success: function () {
      console.log('数据库打开');
    },
    fail: function (e) {
      console.log('openDatabase failed: ' + JSON.stringify(e));
    },
  });
}

// 关闭数据库
export function closeDB(): void {
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
