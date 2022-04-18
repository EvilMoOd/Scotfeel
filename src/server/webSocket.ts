class webSocket {
	timer: null
	url: any
	socketTask: any
	reconnectFlag: boolean
	sendHeartTime: any
	closeConnTime: any
	constructor(arg: { url: any }) {
		this.timer = null
		this.url = arg.url
		this.socketTask = null
		this.reconnectFlag = true//是否需要重新连接，用户退出登录后不需要，应用进入后台后不需要
		this._connectSocket()
		this.sendHeartTime = null
		this.closeConnTime = null
	}
	// 连接socket
	_connectSocket() {
		console.log("连接connectSocket")
		//需带上token，验证用户合法性以及用户id和连接进行绑定
		this.socketTask = uni.connectSocket({
			url: this.url,
			complete: () => { }
		})
		// 监听接收信息
		this.socketTask.onMessage((data: any) => this._onMessage(data))
		// 监听连接成功
		this.socketTask.onOpen(() => this._onOpen())
		// 监听断开
		this.socketTask.onClose((e: any) => this._onClose(e))
		// 监听错误
		this.socketTask.onError(() => this._onError())
	}
	// 断线重连
	_reconnect() {
		console.log("进入reconnect准备重新连接")
		var that = this
		if (that.reconnectFlag) {
			setTimeout(function () {
				that._connectSocket();
			}, 3000);
		}
	}
	//手动触发关闭连接，不需要重连
	_close() {
		console.log('正在手动断开连接...')
		this.socketTask.close({
			success() {
				console.log('断开success')
			},
			fail() {
				console.log('断开fail')
			}
		})
		clearInterval(this.sendHeartTime);//关掉心跳任务
		clearTimeout(this.closeConnTime);//关掉定时任务
		this.reconnectFlag = false;//不需要重连
		this.socketTask = null
	}
	_logoutClose() {
		console.log('正在断开连接，用户退出登录...')
		this._close()
	}
	//5s发送一个心跳
	_sendHeart() {
		var that = this
		this.sendHeartTime = setInterval(function () {
			that._sendMessage('ping')
			console.log("客户端发送心跳ping")
		}, 5000);
	}

	//10秒后如未收到服务器的回复心跳则断开
	_closeConn() {
		console.log('开启检测服务器10秒内是否在线定时任务')
		var that = this
		this.closeConnTime = setTimeout(function () {
			that._close()
		}, 10000);
	}
	_sendMessage(message: string) {
		this.socketTask.send({
			data: message,
			success() {
				console.log('发送信息:' + message + '  success')
			},
			fail() {
				console.log('发送信息' + message + '  fail')
			}
		})
	}
	_onOpen() {
		// 用户上线
		console.log('websocket连接成功')
		//发送信息告诉服务器将离线消息发送过来
		this._sendMessage('isOpen')
		this._sendHeart();//连接服务端成功后开始发送心跳
		this._closeConn();//并打开心跳回复检测
	}

	// 监听关闭
	_onClose(e: any) {
		// 用户下线
		console.log('监听到连接关闭')
		console.log('关闭心跳任务')
		clearInterval(this.sendHeartTime);//关掉心跳任务
		console.log('关闭检测服务器10秒内是否在线定时任务')
		clearTimeout(this.closeConnTime);//定时任务
		this.socketTask = null
		console.log('socket连接已关闭')
		this._reconnect()
	}
	// 监听连接错误
	_onError() {
		// 用户下线
		console.log('监听到连接错误')
	}
	// 监听接收消息
	_onMessage(res: any) {
		console.log(res.data)
		let msg = res.data
		// let res = JSON.parse(data.data)
		switch (msg) {
			case 'pong':
				this._handlePong()
				break;
			case 'say':
				this._handleSay(res)
				break;
			case 'applyCount':
				this._handleApplyCount(res)
				break;
			case 'noticeCount':
				this._handleNoticeCount(res)
				break;
			case 'sessionList':
				this._handleSessionList(res)
				break;
			case 'friendListLetterSort':
				this._handleFriendListLetterSort(res)
				break;
			case 'groupListLetterSort':
				this._handleGroupListLetterSort(res)
				break;
			case 'applyList':
				this._handleApplyList(res)
				break;
			case 'commonList':
				this._handleCommonList(res)
				break;
			case 'likeList':
				this._handleLikeList(res)
				break;
			case 'subscribeList':
				this._handleSubscribeList(res)
				break;
			case 'subscribeSpaceList':
				this._handleSubscribeSpaceList(res)
				break;
			case 'momentList':
				this._handleMomentList(res)
				break;
			case 'kickOut':
				this._handleKickout(res);
				break;
		}
	}
	_handleSay(res: any) {
		throw new Error("Method not implemented.")
	}
	_handlePong() {
		clearTimeout(this.closeConnTime);//关掉旧的定时任务
		console.log('关闭检测服务器10秒内是否在线定时任务')
		this._closeConn();//又开启一个新的定时任务
		console.log('收到服务器心跳回复pong')
	}
	_handleApplyCount(res: any) {

	}
	_handleNoticeCount(res: any) {

	}
	_handleSessionList(res: any) {
		//判断是更新数据库还是增加记录到数据库完成之后
		//判断state.sessionList中是要更新数据还是增加数据，用户是可以删除会话列表的
	}
	_handleFriendListLetterSort(res: any) {

	}
	_handleGroupListLetterSort(res: any) {

	}
	_handleApplyList(res: any) {

	}
	_handleCommonList(res: any) {

	}
	_handleLikeList(res: any) {

	}
	_handleSubscribeList(res: any) {

	}
	_handleSubscribeSpaceList(res: any) {

	}
	_handleMomentList(res: any) {

	}
	_handleKickout(res: any) {

	}
}
export default webSocket