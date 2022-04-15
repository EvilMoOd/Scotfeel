<script setup lang="ts">
import { ref } from "vue";

const isShow = ref(false);

function goBack() {
	uni.navigateBack({
		delta: 1,
	});
}
</script>

<template>
	<view class="header">
		<uni-icons
			type="arrow-left"
			color="#aaa"
			size="28"
			class="icon-back"
			@tap="goBack"
		/>
		<uni-icons
			type="more-filled"
			color="#aaa"
			size="28"
			class="icon-more"
			@click="isShow = true"
		/>
		<transition name="more">
			<view class="more" v-show="isShow">
				<text>个性签名</text>
				<text>修改昵称</text>
				<text>设置背景</text>
				<text>设置头像</text>
			</view>
		</transition>
	</view>
	<view class="id-card">
		<image src="@/assets/images/myhead.png" mode="scaleToFill" class="head" />
		<view>
			<text style="font-size: 34rpx; font-weight: bold; color: #fff">科比</text>
			<br />
			<text style="font-size: 28rpx">@kobe</text>
		</view>
	</view>
	<view class="introduction"> 这是一段个人介绍 </view>
	<topTab>
		<template v-slot:s1>
			<spaceCard img="/src/assets/head.png" />
		</template>
		<template v-slot:s2>
			<view>动态</view>
		</template>
	</topTab>
	<view class="mask" v-show="isShow" @click="isShow = false"> </view>
</template>
<style lang="scss" scoped>
.header {
	height: 304rpx;
	background-image: url("@/assets/images/img3.png");
	background-size: 800rpx;
	background-repeat: no-repeat;
	.icon-back {
		float: left;
		margin-left: 26rpx;
		margin-top: 66rpx;
	}
	.icon-more {
		float: right;
		margin-top: 66rpx;
		margin-right: 26rpx;
	}
	.more {
		padding: 18rpx 36rpx;
		width: 104rpx;
		font-size: 26rpx;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		position: absolute;
		z-index: 100;
		right: 1rpx;
		top: 66rpx;
		background-color: #fff;
		text {
			margin: 10rpx 0;
		}
	}
}
.id-card {
	position: relative;
	padding: 0 60rpx;
	top: -64rpx;
	display: flex;
	align-items: center;
	.head {
		border-radius: 50%;
		width: 128rpx;
		height: 128rpx;
		border: 3px solid #fff;
	}
}
.introduction {
	margin: -40rpx 96rpx;
	font-size: 22rpx;
	color: #555;
}
.mask {
	width: 750rpx;
	height: 1334rpx;
	position: absolute;
	top: 0;
	z-index: 90;
}
.space {
	margin-top: 100rpx;
}

.more-enter-active {
	animation: bounce-in 0.5s;
}
.more-leave-active {
	transition: opacity 0.5s ease;
	animation: bounce-in 0.5s reverse;
}

.more-enter-from,
.more-leave-to {
	opacity: 0;
}

@keyframes bounce-in {
	0% {
		transform: scale(0);
	}
	50% {
		transform: scale(1.25);
	}
	100% {
		transform: scale(1);
	}
}
</style>
