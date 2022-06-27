<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import type { MomentInfo } from '../../server/api/moment';

  import day from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import 'dayjs/locale/zh-cn';
  import { useMomentStore } from '../../store/modules/momentStore';

  day.extend(relativeTime);
  day.locale('zh-cn');

  const props = defineProps<{
    moment: MomentInfo;
    index: number;
    changeLikeStatus: (index: number) => void;
    success: () => void;
    fail: () => void;
  }>();
  const pageIndex = ref(0);
  const changePage = (e: any) => {
    pageIndex.value = e.detail.current;
  };
  // 删除动态
  const momentStore = useMomentStore();
  const show = reactive({
    showDeleteMoment: false,
  });

  async function deleteMoment() {
    try {
      await momentStore.deleteMoment(props.moment._id, props.index);
      show.showDeleteMoment = false;
      props.success();
    } catch (err) {
      props.fail();
    }
  }
</script>

<template>
  <!-- 朋友动态卡片 -->
  <view class="post">
    <view class="user">
      <image :src="props.moment.posterInfo[0].avatar" class="avatar" />
      <text class="text">
        {{ props.moment.friendRemark[0] || props.moment.posterInfo[0].nickname }}
      </text>
      <uni-icons
        type="closeempty"
        color="#aaa"
        size="20"
        style="float: right"
        @tap="show.showDeleteMoment = true"
      />
    </view>
    <view>
      <text>{{ props.moment.content }}</text>
    </view>
    <view v-if="props.moment.photos.length > 0" class="image-container">
      <view class="pageindex">{{ pageIndex + 1 }}/{{ props.moment.photos.length }}</view>
      <swiper class="picture" @change="changePage">
        <swiper-item v-for="(photo, i) in props.moment.photos" :key="i">
          <image :src="photo" class="post-img" mode="aspectFill" />
        </swiper-item>
      </swiper>
    </view>

    <view class="post-state">
      <view>
        <uni-icons type="chat" size="3vh" color="#117986"></uni-icons>
        评论{{ props.moment.commentedCount }}
      </view>
      <view @tap="changeLikeStatus(props.index)">
        <uni-icons
          v-if="props.moment.likeStatus === 0"
          type="heart"
          size="3vh"
          color="#117986"
        ></uni-icons>
        <uni-icons v-else type="heart-filled" color="#117986" size="3vh" />
        点赞{{ props.moment.likedCount }}
      </view>
      <view class="time">{{ day().from(day(props.moment.createTime)) }}</view>
    </view>
  </view>
  <PopBottom :pop-show="show.showDeleteMoment">
    <view style="color: red; margin: 50rpx 0; text-align: center" @tap="deleteMoment">
      确定删除动态？（该操作不可逆）
    </view>
  </PopBottom>
</template>

<style lang="scss" scoped>
  .post {
    // height: 730rpx;
    width: 678rpx;
    padding: 60rpx 36rpx;
    border-radius: 15rpx;
    background-color: #fff;
    margin-bottom: 20rpx;
    font-size: 28rpx;

    .user {
      font-size: 28rpx;
      margin-bottom: 10rpx;

      .avatar {
        height: 66rpx;
        width: 66rpx;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 30rpx;
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
