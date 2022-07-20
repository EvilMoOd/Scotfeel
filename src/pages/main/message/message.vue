<script setup lang="ts">
  import { ref } from 'vue';
  import day from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import { useNoticeStore } from '../../../store/modules/noticeStore';
  import 'dayjs/locale/zh-cn';

  day.extend(relativeTime);
  day.locale('zh-cn');
  const currentTab = ref(0);
  const tab = [
    {
      icon: 'chat',
      title: '互动',
    },
    {
      icon: 'star',
      title: '订阅',
    },
  ];
  const noticeStore = useNoticeStore();
</script>

<template>
  <view class="header">
    <Back />
    <view class="title">消息</view>
  </view>
  <view class="function">
    <view v-for="(item, index) in tab" :key="index">
      <uni-icons :type="item.icon" color="#117986" size="30" @tap="() => (currentTab = index)" />
      <view>{{ item.title }}</view>
    </view>
  </view>
  <swiper :current="currentTab" style="height: 1000rpx">
    <swiper-item>
      <scroll-view scroll-y style="height: 1000rpx">
        <view v-for="(item, index) in noticeStore.interactionList" :key="index">
          <!-- 点赞 -->
          <view v-if="item.noticeType === 1" class="apply-msg">
            <image :src="item.likerInfo?.[0].avatar" class="avatar" />
            <view class="apply">
              <view>
                <text class="nickname">{{ item.likerInfo?.[0].nickname }}</text>
              </view>
              <text class="content">点赞了</text>
              <image
                v-if="
                  item.userMomentInfo?.[0]?.photos.length !== 0 ||
                  item.userMomentInfo?.[0]?.photos.length !== 0
                "
                :src="
                  item.momentType === 0
                    ? item.userMomentInfo?.[0]?.photos?.[0]
                    : item.spaceMomentInfo?.[0]?.photos?.[0]
                "
                mode="aspectFill"
                class="moment-img"
              />
              <view v-else class="moment-text">
                {{ item.userMomentInfo?.[0].content || item.spaceMomentInfo?.[0].content }}
              </view>
              <text class="time">{{ day().from(day(item.createTime)) }}</text>
            </view>
          </view>
          <!-- 转发 -->
          <view v-else-if="item.noticeType === 2" class="apply-msg">
            <image :src="item.reposterInfo?.[0].avatar" class="avatar" />
            <view class="apply">
              <view>
                <text class="nickname">{{ item.reposterInfo?.[0].nickname }}</text>
              </view>
              <text class="content">转发了</text>
              <image
                v-if="
                  item.userMomentInfo?.[0]?.photos.length !== 0 ||
                  item.userMomentInfo?.[0]?.photos.length !== 0
                "
                :src="item.spaceMomentInfo?.[0].photos?.[0]"
                mode="aspectFill"
                class="moment-img"
              />
              <view v-else class="moment-text">
                {{ item.userMomentInfo?.[0].content || item.spaceMomentInfo?.[0].content }}
              </view>
              <text class="time">{{ day().from(day(item.createTime)) }}</text>
            </view>
          </view>
          <!-- 评论 -->
          <view v-else-if="item.noticeType === 3" class="apply-msg">
            <image :src="item.commenterInfo?.[0].avatar" class="avatar" />
            <view class="apply">
              <view>
                <text class="nickname">{{ item.commenterInfo?.[0].nickname }}</text>
              </view>
              <text class="content">{{ item.content }}</text>
              <image
                v-if="
                  item.userMomentInfo?.[0]?.photos.length !== 0 ||
                  item.userMomentInfo?.[0]?.photos.length !== 0
                "
                :src="
                  item.momentType === 0
                    ? item.userMomentInfo?.[0]?.photos?.[0]
                    : item.spaceMomentInfo?.[0]?.photos?.[0]
                "
                mode="aspectFill"
                class="moment-img"
              />
              <view v-else class="moment-text">
                {{ item.userMomentInfo?.[0].content || item.spaceMomentInfo?.[0].content }}
              </view>
              <text class="time">{{ day().from(day(item.createTime)) }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </swiper-item>
    <swiper-item>
      <scroll-view scroll-y style="height: 1000rpx">
        <view v-for="(item, index) in noticeStore.subscribeList" :key="index">
          <view class="apply-msg">
            <image :src="item.avatar" class="avatar" />
            <view class="apply" style="display: flex; align-items: center">
              <view>
                <text class="nickname">
                  {{ item.nickname }}
                  <text style="color: #117986">订阅了</text>
                  {{ item.spaceNickname }}
                </text>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </swiper-item>
  </swiper>
</template>

<style lang="scss" scoped>
  .header {
    @include header;

    display: flex;
    justify-content: center;
    color: #fff;
    font-weight: bold;
    font-size: 36rpx;

    .back {
      position: absolute;
      top: 80rpx;
      left: 10rpx;
    }

    .title {
      margin-top: 80rpx;
    }
  }

  .function {
    display: flex;
    justify-content: space-between;
    padding: 50rpx 180rpx 30rpx;
    font-size: 20rpx;
    text-align: center;
  }

  .apply-msg {
    display: flex;

    .avatar {
      width: 96rpx;
      height: 96rpx;
      margin: 32rpx;
      border-radius: 50%;
    }

    .apply {
      width: 550rpx;
      padding: 32rpx 0;
      border-bottom: solid 2rpx #f2f2f2;

      .nickname {
        font-size: 28rpx;
      }

      .content {
        color: #aaa;
        font-size: 22rpx;
      }

      .time {
        float: right;
        margin-top: 10rpx;
        margin-right: 10rpx;
        color: #aaa;
        font-size: 24rpx;
      }

      .moment-img {
        float: right;
        width: 100rpx;
        height: 100rpx;
        margin-top: -20px;
      }

      .moment-text {
        float: right;
        width: 100rpx;
        height: 80rpx;
        margin-top: -20px;
        overflow: hidden;
        font-size: 28rpx;
      }
    }
  }
</style>
