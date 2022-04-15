<script setup lang="ts">
//顶部选项卡
import { ref } from "vue";

let active = ref(true);
let currentTab = ref(0);
function log() {
	active.value = !active.value;
}
function changeCurrent1() {
	currentTab.value = 0;
}
function changeCurrent2() {
	currentTab.value = 1;
}
</script>

<template>
	<view class="space">
		<text class="swiper-name" @tap="changeCurrent1">订阅空间</text>
		<text class="swiper-name" @tap="changeCurrent2">动态</text>
		<hr class="line" :class="[active ? 'left' : 'right']" />
		<swiper class="swiper" @change="log" :current="currentTab">
			<swiper-item>
				<scroll-view scroll-y>
					<view class="my-space">
						<slot name="s1"></slot>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<slot name="s2"></slot>
			</swiper-item>
		</swiper>
	</view>
</template>

<style lang="scss" scoped>
.space {
	.swiper-name {
		margin: 130rpx;
	}
	.line {
		height: 10rpx;
		width: 112rpx;
		margin-top: 20rpx;
		background-color: $color-sf;
	}
	.left {
		transition: transform 0.5s;
		transform: translate(135rpx);
	}
	.right {
		transition: transform 0.5s;
		transform: translate(495rpx);
	}
	.swiper {
		height: 600rpx;
		margin-top: 20rpx;
		.my-space {
			height: 400rpx;
			padding: 30rpx;
			display: flex;
			align-items: flex-start;
			flex-wrap: wrap;
		}
	}
}
</style>
