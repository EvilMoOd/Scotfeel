import { executeSql, openDB, selectSql } from './baseSql';

// 新建订阅通知表
export function createSubscribeNoticeTable(config = { name: 'scotfeel', path: '_doc/chat.db' }): void {
  if (!plus.sqlite.isOpenDatabase(config)) {
    // 2.如果没打开先打开
    openDB(config);
  }  
  plus.sqlite.executeSql({
    name: 'scotfeel',
    sql:
      'create table if not exists subscribeNotice( "id" INTEGER PRIMARY KEY AUTOINCREMENT,"userId" VARCHAR(40),"nickname" VARCHAR(40),"avatar" VARCHAR(80),"spaceId" VARCHAR(40),"spaceNickname" VARCHAR(40),' +
      '"spaceAvatar" VARCHAR(80),"createTime" BIGNIT,"belongToId" VARCHAR(80))',
    success() {
      console.log('订阅通知表初始化成功');
    },
    fail(e) {
      console.log(`executeSql failed: ${JSON.stringify(e)}`);
    },
  });
}

// 插入数据
export function insertSubscribeNotice(
    userId: string,
    nickname: string,
    avatar: string,
    spaceId: string,
    spaceNickname: string,
    spaceAvatar: string,
    createTime: number,
    belongToId: string
): void {
  return executeSql(`
		insert into subscribeNotice values (null,"${userId}","${nickname}","${avatar}","${spaceId}","${spaceNickname}","${spaceAvatar}","${createTime}","${belongToId}")
	`);
}

// 订阅通知查询，lastId是上一次查询的最小的id
export async function selectSubscribeNotice(
  lastId: number,
  belongToId: string
): Promise<null> { //TODO 接口不知道放哪，没写，暂时用null替代
  return selectSql(`
	select * from subscribeNotice 
		where belongToId = "${belongToId}" and id < "${lastId}"
	order by id desc
	limit 10 
`);
}
