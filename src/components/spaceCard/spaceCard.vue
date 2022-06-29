<script setup lang="ts">
  import { ref } from 'vue';
  import day from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import 'dayjs/locale/zh-cn';
  import type { SpaceMoment } from '../../server/api/space';

  day.extend(relativeTime);
  day.locale('zh-cn');
  defineProps<{
    index: number;
    changeLikeStatus: (index: number) => void;
    spaceMoment: SpaceMoment;
  }>();

  const pageIndex = ref(0);
  const changePage = (e: any) => {
    pageIndex.value = e.detail.current;
  };
</script>

<template>
  <!-- 朋友动态卡片 -->
  <view class="post">
    <view v-if="spaceMoment.posterUserInfo.length > 0" class="user">
      <image :src="spaceMoment.posterUserInfo[0].avatar" class="avatar" />
      <view>
        <text v-if="spaceMoment.posterUserRemarkName" class="username">
          {{ spaceMoment.posterUserRemarkName[0] }}
        </text>
        <text v-else class="username">
          {{ spaceMoment.posterUserInfo[0].nickname }}
        </text>
        <br />
        <text class="time">{{ day().from(day(spaceMoment.createTime)) }}</text>
      </view>
    </view>
    <view v-if="spaceMoment.posterSpaceInfo.length > 0" class="user">
      <image :src="spaceMoment.posterSpaceInfo[0].avatar" class="avatar" />
      <view>
        <text class="username">
          {{ spaceMoment.posterSpaceInfo[0].nickname }}
        </text>
        <br />
        <text class="time">{{ day().from(day(spaceMoment.createTime)) }}</text>
      </view>
    </view>
    <view>
      <text>{{ spaceMoment.content }}</text>
    </view>
    <view class="image-container">
      <view class="pageindex">{{ pageIndex + 1 }}/{{ spaceMoment.photos.length }}</view>
      <swiper class="picture" @change="changePage">
        <swiper-item v-for="(item, j) in spaceMoment.photos" :key="j">
          <image :src="item" class="post-img" />
        </swiper-item>
      </swiper>
    </view>

    <view class="post-state">
      <view>
        <uni-icons type="chat" size="3vh" color="#117986" />
        {{ spaceMoment.commentedCount }}
      </view>
      <view @tap="changeLikeStatus(index)">
        <uni-icons v-if="spaceMoment.likeStatus === 0" type="heart" size="3vh" color="#117986" />
        <uni-icons v-else type="heart-filled" color="#117986" size="3vh" />
        {{ spaceMoment.likedCount }}
      </view>
      <view>
        <uni-icons type="redo" color="#117986" size="3vh" />
        {{ spaceMoment.repostedCount }}
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  .post {
    height: 730rpx;
    width: 678rpx;
    padding: 60rpx 36rpx;
    border-radius: 15rpx;
    background-color: #fff;
    margin-bottom: 20rpx;
    font-size: 28rpx;

    .user {
      display: flex;
      font-size: 28rpx;
      margin-bottom: 10rpx;

      .avatar {
        height: 66rpx;
        width: 66rpx;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 30rpx;
      }
      view {
        align-self: center;
        line-height: 30rpx;
        .time {
          color: #aaa;
          font-size: 10rpx;
        }
      }
    }

    .image-container {
      position: relative;
      .pageindex {
        position: absolute;
        top: 500rpx;
        right: 20rpx;
        z-index: 10;
        width: 82rpx;
        height: 46rpx;
        background-color: #666060;
        text-align: center;
        line-height: 46rpx;
        border-radius: 30rpx;
        color: #fff;
        opacity: 0.5;
      }
      .picture {
        height: 566rpx;
        object-fit: cover;
        .post-img {
          height: 100%;
          width: 100%;
          border-radius: 10rpx;
          margin: 2rpx;
          margin-top: 20rpx;
        }
      }
    }

    .post-state {
      display: flex;
      justify-content: space-between;
      margin-top: 20rpx;
      line-height: 1.5em;
      height: 1.5em;
    }
  }
</style>
