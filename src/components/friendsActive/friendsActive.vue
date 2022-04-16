<script setup lang="ts">
//朋友动态栏
import { ref } from "vue";

//前往朋友动态
function goFriendsActive() {
	uni.navigateTo({ url: "/pages/main/active" });
}
</script>

<template>
	<view class="friends-active">
		<view class="friend-active">
			<!-- 可能有bug这里 -->
			<scroll-view scroll-x="true">
				<view class="active" @tap="goFriendsActive"
					><image src="../../assets/images/head.png" class="head" /><view class="name"
						>小可莉</view
					></view
				>
				<view class="active"
					><image src="../../assets/images/head.png" class="head" /><view class="name"
						>可莉</view
					></view
				>
				<view class="active"
					><image src="../../assets/images/head.png" class="head" /><view class="name"
						>琴</view
					></view
				>
				<view class="active"
					><image src="../../assets/images/head.png" class="head" /><view class="name"
						>地卢克</view
					></view
				>
				<view class="active"
					><image src="../../assets/images/head.png" class="head" /><view class="name"
						>刻晴</view
					></view
				>
				<view class="active"
					><image src="../../assets/images/head.png" class="head" /><view class="name"
						>影</view
					></view
				>
				<view class="active"
					><image src="../../assets/images/head.png" class="head" /><view class="name"
						>小可莉</view
					></view
				>
				<view class="active"
					><image src="../../assets/images/head.png" class="head" /><view class="name"
						>小可莉</view
					></view
				>
				<view class="active"
					><image src="../../assets/images/head.png" class="head" /><view class="name"
						>小可莉</view
					></view
				><view class="active"
					><image src="../../assets/images/head.png" class="head" /><view class="name"
						>小可莉</view
					></view
				><view class="active"
					><image src="../../assets/images/head.png" class="head" /><view class="name"
						>小可莉</view
					></view
				>
			</scroll-view>
		</view>
		<view class="more-active" @tap="goFriendsActive">全部</view>
	</view>
</template>

<style lang="scss" scoped>
.friends-active {
	display: flex;
	height: 190rpx;
	border-bottom: solid 2rpx #f2f2f2;
	justify-content: center;
	.friend-active {
		overflow: hidden;
		white-space: nowrap;
		width: 600rpx;
		.active {
			display: inline-block;

			height: 100rpx;
			width: 100rpx;
			border-radius: 50%;
			margin-top: 28rpx;
			margin-right: 48rpx;
			background-image: linear-gradient(#aaf0d8, #2ed);
			padding: 6rpx;
			.head {
				height: 100%;
				width: 100%;
				border-radius: 50%;
			}
			.name {
				margin-top: 5rpx;
				font-size: 22rpx;
				text-align: center;
			}
		}
	}
	.more-active {
		display: inline-block;
		align-self: center;
		border-radius: 50%;
		margin-left: 28rpx;
		color: $color-sf;
	}
}
</style>
