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
    spaceMoment: SpaceMoment;
    changeLikeStatus: (index: number) => void;
    showComment: () => void;
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
        <text v-if="spaceMoment.posterUserRemarkName[0]" class="username">
          {{ spaceMoment.posterUserRemarkName[0].remarkName }}
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
        <uni-icons type="chat" size="3vh" color="#117986" @tap="showComment(index)" />
        {{ spaceMoment.commentedCount }}评论
      </view>
      <view @tap="changeLikeStatus(index)">
        <uni-icons v-if="spaceMoment.likeStatus === 0" type="heart" size="3vh" color="#117986" />
        <uni-icons v-else type="heart-filled" color="#117986" size="3vh" />
        {{ spaceMoment.likedCount }}点赞
      </view>
      <view>
        <uni-icons type="redo" color="#117986" size="3vh" />
        {{ spaceMoment.repostedCount }}转发
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  .post {
    width: 678rpx;
    height: 730rpx;
    margin-bottom: 20rpx;
    padding: 60rpx 36rpx;
    font-size: 28rpx;
    background-color: #fff;
    border-radius: 15rpx;

    .user {
      display: flex;
      margin-bottom: 10rpx;
      font-size: 28rpx;

      .avatar {
        width: 66rpx;
        height: 66rpx;
        margin-right: 30rpx;
        vertical-align: middle;
        border-radius: 50%;
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
        color: #fff;
        line-height: 46rpx;
        text-align: center;
        background-color: #666060;
        border-radius: 30rpx;
        opacity: 0.5;
      }

      .picture {
        height: 566rpx;
        object-fit: cover;

        .post-img {
          width: 100%;
          height: 100%;
          margin: 2rpx;
          margin-top: 20rpx;
          border-radius: 10rpx;
        }
      }
    }

    .post-state {
      display: flex;
      justify-content: space-between;
      height: 1.5em;
      margin-top: 20rpx;
      line-height: 1.5em;
    }
  }
</style>
