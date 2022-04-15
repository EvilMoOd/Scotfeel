<script setup lang="ts">
import { ref } from "vue";

let msg = ref("");

function goGroupIntroduction() {
	uni.navigateTo({ url: "/pages/main/groupChat/groupChatIntro" });
}
</script>

<template>
	<view class="header">
		<back />
		<view class="user" @tap="goGroupIntroduction"
			><image src="@/assets/images/img2.jpg" class="head" /><text
				class="nickname"
				>某某群聊</text
			></view
		>
		<uni-icons
			class="more"
			type="more-filled"
			size="5vh"
			color="#fff"
		></uni-icons>
	</view>
	<scroll-view scroll-y class="main">
		<view class="chat-friend">
			长隆明天一起去长隆明天一起去长隆长隆明天一起去长隆明天一起去长隆
		</view>
		<view class="chat-me"> 珠海？ </view>
		<view class="msg">
			<input v-model="msg" class="input-msg" />
		</view>
	</scroll-view>
</template>

<style lang="scss" scoped>
.header {
	@include header;
	display: flex;
	align-items: end;
	.back {
		margin: 30rpx 20rpx;
	}
	.user {
		margin: 20rpx 0;
		.head {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			vertical-align: middle;
			margin-right: 32rpx;
		}
		.nickname {
			font-size: 36rpx;
			color: #fff;
		}
	}
	.more {
		margin: 30rpx;
		margin-left: auto;
	}
}
.main {
	height: 88vh;
	background-color: #f6f6f6;
	font-size: 26rpx;
	.chat-friend {
		background-color: #fff;
		max-width: 60vw;
		border-radius: 0 60rpx 60rpx 60rpx;
		padding: 16rpx 32rpx;
		margin-left: 30rpx;
	}
	.chat-me {
		float: right;
		background-color: #d5fad3;
		max-width: 60vw;
		border-radius: 60rpx 0 60rpx 60rpx;
		padding: 16rpx 32rpx;
		margin-right: 30rpx;
	}
	.msg {
		position: fixed;
		bottom: 5vh;
		left: 4vw;

		.input-msg {
			height: 76rpx;
			width: 620rpx;
			background-color: #fff;
			border-radius: 50rpx;
			text-indent: 20rpx;
		}
	}
}
</style>
