<script setup lang="ts">
  import day from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import 'dayjs/locale/zh-cn';
  import { reactive, ref } from 'vue';
  import type { Comments } from '../../server/api/space';
  import { reqGetSecondLevelComment } from '../../server/api/space';

  day.extend(relativeTime);
  day.locale('zh-cn');

  const props = defineProps<{
    oneComment: Comments;
    momentId: number;
    spaceId: string;
  }>();

  const towComment = reactive<Comments[]>([
    {
      spaceMemberFlag: 1,
      content:
        'adipisicingipsumelitnisicillumsssssssaaaaaaadadadadadadssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
      commentedUserInfo: [
        {
          _id: '0d94b112969e4c0abfbd94464795a9a2',
          nickname: 'sdfs',
          avatar: 'https://p.qqan.com/up/2021-2/16137992359659254.jpg',
        },
      ],
      commentedUserRemarkName: [],
      commenterInfo: [
        {
          _id: '0d94b112969e4c0abfbd94464795a9a2',
          nickname: 'sdfs',
          avatar: 'https://p.qqan.com/up/2021-2/16137992359659254.jpg',
        },
      ],
      commenterRemarkName: [
        {
          remarkName: undefined,
        },
      ],
      secondCommentIndex:
        'adipisicingipsumelitnisicillumsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
      createTime: 1653908215942,
    },
  ]);

  const loading = ref('more');
  async function loadMore() {
    loading.value = 'loading';
    // TODO offset
    await reqGetSecondLevelComment(
      props.momentId,
      props.spaceId,
      0,
      props.oneComment.secondCommentIndex
    );
    loading.value = 'more';
  }
</script>

<template>
  <view class="person-place">
    <Avatar :img-src="oneComment.commenterInfo[0].avatar" class="avatar" :type="1" />
    <view class="person-msg">
      <view class="name">{{ oneComment.commenterInfo[0].nickname }}</view>
      <view class="time">{{ day().from(day(oneComment.createTime)) }}</view>
    </view>
  </view>
  <view class="content">{{ oneComment.content }}</view>
  <view class="sub-content-wrap">
    <view v-for="(item, index) in towComment" :key="index" class="sub-content-container">
      <view class="person-place">
        <Avatar :img-src="item.commenterInfo[0].avatar" class="avatar" :type="1" />
        <view class="person-msg">
          <view class="name">{{ item.commenterInfo[0].nickname }}</view>
          <view class="time">{{ day().from(day(item.createTime)) }}</view>
        </view>
      </view>
      <view class="sub-content">{{ item.content }}</view>
    </view>
    <uni-load-more
      :status="loading"
      :content-text="{ contentdown: '展开更多评论' }"
      class="load"
      @click-load-more="loadMore"
    ></uni-load-more>
  </view>
</template>

<style lang="scss" scoped>
  .person-place {
    display: flex;
    padding-top: 40rpx;

    .avatar {
      margin: 0 30rpx 0 24rpx;
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
    }

    .person-msg {
      color: #fff;
      font-size: 28rpx;
      width: 36.5vw;
      .name {
        color: #40c4a8;
        font-size: 28rpx;
      }

      .time {
        color: #cecaca;
        font-size: 18rpx;
      }
    }

    .icon-erweima {
      margin-top: 12rpx;
      font-size: 40rpx;
      height: 40rpx;
    }
  }
  .content {
    width: 55vw;
    margin-left: 20vw;
    font-size: 28rpx;
    word-break: break-all;
  }
  .sub-content-wrap {
    margin: 40rpx 0;
    padding-left: 20vw;
    .sub-content-container {
      padding: 40rpx 0;
      border-left: 3px #e9e9e9 solid;
      animation: 0.5s one-in;

      .sub-content {
        font-size: 28rpx;
        padding-left: 18vw;
        word-break: break-all;
      }
      .load {
        color: #9b989a;
        font-size: 28rpx;
      }
    }
  }

  @keyframes one-in {
    from {
      padding-top: 80rpx;
      opacity: 0;
    }
    to {
      padding-top: 40rpx;
      opacity: 1;
    }
  }
</style>
