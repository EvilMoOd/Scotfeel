<script setup lang="ts">
import { ref, reactive } from "vue";
import { useStore } from "vuex";

const store = useStore();
//修改手机号地区类型
let type = ref(0);
let phoneTypes = reactive(["+86"]);
function changePhoneType(e) {
	type.value = e.detail.value;
}
//登录信息
let userPhone = ref("");
let userAuthCode = ref("");
let checked = ref(false);

//登录
async function login() {
	const phonePattern =
		/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
	if (!phonePattern.test(userPhone.value)) {
		uni.showModal({ title: "请输入正确手机号" });
	} else if (
		userAuthCode.value == "" ||
		userAuthCode.value != store.state.user.phoneCode
	) {
		uni.showModal({ title: "验证码错误" });
	} else if (checked.value != true) {
		uni.showModal({ title: "请同意相关协议" });
	} else {
		try {
			let phone = userPhone.value;
			let authCode = userAuthCode.value;
			await store.dispatch("userLogin", { phone, authCode });
			uni.redirectTo({ url: "/pages/main/home" });
		} catch (error) {
			uni.showModal({ title: "网络错误", content: "请检查网络" });
		}
	}
}
//获取验证码
let disabled = ref(false);
async function getPhoneCode() {
	const phonePattern =
		/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
	if (phonePattern.test(userPhone.value)) {
		try {
			await store.dispatch("userGetPhoneCode", userPhone.value);
			//设置发送成功后禁用时间为60s
			disabled.value = true;
			setTimeout(() => {
				disabled.value = false;
			}, 60000);
		} catch (error) {
			uni.showModal({ title: "网络错误", content: "请检查网络" });
		}
	} else {
		uni.showModal({ title: "错误", content: "手机号格式有误" });
	}
}
//同意协议
function changeChecked() {
	checked.value = true;
}
</script>
<template>
	<view class="header">
		<text class="title">Scotfeel</text>
	</view>
	<view class="main">
		<picker
			mode="selector"
			:range="phoneTypes"
			@change="changePhoneType"
			class="phone-types"
		>
			{{ phoneTypes[type] }}
		</picker>
		<input
			type="text"
			class="username"
			placeholder="请输入手机号"
			placeholder-class="placeholder"
			v-model="userPhone"
		/>
		<input
			type="text"
			class="code"
			placeholder="请输入验证码"
			placeholder-class="placeholder"
			v-model="userAuthCode"
		/>
		<!-- 获取验证码 -->
		<button
			hover-class="get-code-hover"
			plain
			class="get-code"
			:class="disabled ? 'code-color2' : 'code-color1'"
			:disabled="disabled"
			@tap="getPhoneCode"
		>
			<text class="code-text">获取验证码</text>
		</button>
	</view>
	<!-- 登录 -->
	<button class="sign-in" @tap="login">
		<uni-icons type="arrow-right" :size="30" color="white" />
	</button>
	<view class="footer">
		<radio
			class="agree"
			color="$color-sf"
			:checked="checked"
			@tap.once="changeChecked"
		/>
		<text>我已阅读并同意</text>
		<navigator url="/pages/" hover-class="navigator-hover">
			<text class="nav">Scotfeel用户协议</text>
		</navigator>
		和<navigator url="/pages/" hover-class="navigator-hover">
			<text class="nav">隐私协议</text>
		</navigator>
	</view>
</template>

<style lang="scss" scoped>
.header {
	@include header;
	display: flex;
	justify-content: center;
	.title {
		display: inline-block;
		margin-top: 84rpx;
		font-weight: bold;
		font-size: 46rpx;
		color: #fff;
	}
}
.main {
	padding: 32rpx;
	margin-top: 20rpx;
	display: flex;
	flex-wrap: wrap;
	.phone-types {
		margin-right: 32rpx;
		padding: 12rpx;
		border-bottom: solid 1px #d7d7d7;
		width: 76rpx;
	}
	.username {
		padding: 12rpx;
		border-bottom: solid 1px #d7d7d7;
		width: 514rpx;
	}
	.placeholder {
		color: #d7d7d7;
	}
	.code {
		margin-top: 40rpx;
		padding: 12rpx;
		border-bottom: solid 1px #d7d7d7;
		width: 424rpx;
	}
	.get-code {
		width: 200rpx;
		height: 60rpx;
		margin-top: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 46rpx;
		border-color: $color-sf;
		.code-text {
			font-size: 26rpx;
		}
	}
	.code-color1 {
		color: $color-sf;
	}
	.code-color2 {
		color: #aaa;
	}
	.get-code-hover {
		color: #aaa;
	}
}
.sign-in {
	width: 96rpx;
	height: 96rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	background-color: $color-sf;
	position: absolute;
	left: 600rpx;
	top: 1050rpx;
	@media screen and (min-height: 896px) {
		top: 1350rpx;
	}
}
.footer {
	font-size: 24rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	top: 800rpx;
	@media screen and (min-height: 896px) {
		top: 1100rpx;
	}
	.agree {
		transform: scale(0.7);
	}
	.nav {
		color: $color-sf;
	}
}
</style>
