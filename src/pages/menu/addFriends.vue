<script setup lang="ts">
function goFriendPerson() {
	plus.gallery.pick(console.log(1), console.log(2)            );
  // uni.navigateTo({ url: '/pages/main/personChat/friendPerson' });
}
</script>

<template>
  添加好友
  <uni-icons class="search" type="search" size="5vh" color="#aaa" @tap="goFriendPerson"></uni-icons>
</template>

<style lang="scss" scoped>
</style>
