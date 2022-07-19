<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import day from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import type { MomentInfo } from '../../server/api/moment';
  import 'dayjs/locale/zh-cn';
  import { useMomentStore } from '../../store/modules/momentStore';
  import PopBottom from '../PopBottom/PopBottom.vue';

  day.extend(relativeTime);
  day.locale('zh-cn');

  const props = defineProps<{
    moment: MomentInfo;
    index: number;
    changeLikeStatus: (index: number) => void;
    showComment: (index: number) => void;
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
      // eslint-disable-next-line no-underscore-dangle
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
        {{
          props.moment.friendRemark[0] === null
            ? props.moment.friendRemark[0]
            : props.moment.posterInfo[0].nickname
        }}
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
      <view @tap="showComment(props.index)">
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
    <view style="margin: 50rpx 0; color: red; text-align: center" @tap="deleteMoment">
      确定删除动态？（该操作不可逆）
    </view>
  </PopBottom>
</template>

<style lang="scss" scoped>
  .post {
    // height: 730rpx;
    width: 678rpx;
    margin-bottom: 20rpx;
    padding: 60rpx 36rpx;
    font-size: 28rpx;
    background-color: #fff;
    border-radius: 15rpx;

    .user {
      margin-bottom: 10rpx;
      font-size: 28rpx;

      .avatar {
        width: 66rpx;
        height: 66rpx;
        margin-right: 30rpx;
        vertical-align: middle;
        border-radius: 50%;
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
