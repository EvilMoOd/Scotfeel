<script setup lang="ts">
  // 返回
  function goBack() {
    uni.navigateBack({
      delta: 1,
    });
  }
</script>

<template>
  <!-- 返回 -->
  <uni-icons class="back" type="left" size="5vh" color="#fff" @tap="goBack"></uni-icons>
</template>
