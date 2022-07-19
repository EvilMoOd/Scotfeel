<!-- eslint-disable @typescript-eslint/no-unused-expressions -->
<script setup lang="ts">
  import { onLoad } from '@dcloudio/uni-app';
  import { reactive, ref } from 'vue';
  import { useMomentStore, noMore } from '../../../store/modules/momentStore';
  import ActiveCard from '../../../components/ActiveCard/ActiveCard.vue';
  import MomentList from '../../../components/MomentList/MomentList.vue';
  import Home from '../../../components/Home/Home.vue';
  import PopMessage from '../../../components/PopMessage/PopMessage.vue';
  import type { Comment as CommentType } from '../../../server/api/moment';
  import { reqAddComment } from '../../../server/api/moment';
  import Comment from '../../../components/Comment/Comment.vue';
  import Mask from '../../../components/Mask/Mask.vue';

  const message = ref('');
  const success = ref<any>(null);
  const fail = ref<any>(null);
  const momentStore = useMomentStore();
  onLoad((params) => {
    momentStore.init(params);
    console.log(momentStore.momentInfo);
  });
  // 点赞
  async function changeLikeStatus(index: number) {
    momentStore.momentInfo[index].likeStatus === 1
      ? momentStore.cancelLike(index)
      : momentStore.like(index);
  }
  const show = reactive({
    comment: false,
    mask: false,
  });
  function hiddenAll() {
    show.comment = true;
    show.mask = true;
  }
  const momentId = ref<number>();
  const commentInfo = reactive<CommentType[]>([]);
  const commentInput = ref('');
  async function sendComment(e: string) {
    await reqAddComment({
      content: e,
      momentId: momentId.value as number,
      commentType: 0,
    });
  }
  async function showComment(index: number) {
    show.comment = true;
    show.mask = true;
    // TODO offset
    commentInfo.length = 0;
    commentInfo.push(...momentStore.momentInfo[index].comments);
  }
  // 前往发布动态页
  function goSendMoment() {
    uni.navigateTo({ url: '/pages/main/moment/createMoment' });
  }
  // 加载新动态
  const loading = ref('more');
  async function getNewMoment() {
    loading.value = 'loading';
    await momentStore.getNewMoment();
    noMore.on('noMore', (e: any) => {
      loading.value = e;
    });
  }

  // 动态删除
  function successDelete() {
    message.value = '动态已删除';
    success.value.popUp();
  }
  function failDelete() {
    message.value = '删除失败';
    fail.value.popUp();
  }
</script>

<template>
  <view class="header">
    <Home />
    <text class="title">朋友动态</text>
    <uni-icons type="camera" color="#fff" size="30" class="send-moment" @tap="goSendMoment" />
  </view>
  <MomentList style="background-color: #f2f2f2" />
  <scroll-view scroll-y class="main" lower-threshold="0" @scrolltolower="getNewMoment">
    <view class="posts">
      <ActiveCard
        v-for="(item, index) in momentStore.momentInfo"
        :key="item._id"
        :moment="item"
        :index="index"
        :change-like-status="changeLikeStatus"
        :show-comment="showComment"
        :success="successDelete"
        :fail="failDelete"
      />
      <uni-load-more icon-type="circle" :status="loading" />
    </view>
    <view></view>
  </scroll-view>
  <PopBottom :pop-show="show.comment">
    <Comment
      v-for="(item, index) in commentInfo"
      :key="index"
      :one-comment="item"
      :moment-id="(momentId as number)"
    />
    <textarea
      v-model="commentInput"
      placeholder="评论一下~"
      class="input-msg"
      auto-height
      auto-blur
      maxlength="-1"
      confirm-type="send"
      confirm-hold
      @confirm="sendComment"
    />
  </PopBottom>
  <PopMessage ref="success" success>{{ message }}</PopMessage>
  <PopMessage ref="fail">{{ message }}</PopMessage>
  <Mask :show="show.mask" :hidden="hiddenAll" />
</template>

<style lang="scss" scoped>
  .header {
    @include header;

    text-align: center;

    .title {
      display: inline-block;
      margin-top: 70rpx;
      color: #fff;
      font-weight: bold;
      font-size: 38rpx;
    }

    .send-moment {
      position: absolute;
      top: 58rpx;
      left: 668rpx;
    }
  }

  .main {
    height: 980rpx;
    background-color: #f2f2f2;
  }

  .input-msg {
    width: 620rpx;

    // height: 76rpx;
    max-height: 25vh;
    padding: 20rpx;
    text-indent: 20rpx;
    background-color: #fff;
    border-radius: 50rpx;
  }

  .mask {
    filter: blur(3px);
  }
</style>
