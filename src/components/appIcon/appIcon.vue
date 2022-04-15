<script lang="ts" setup="setup">
  //直接用app-icon组件并传入icon属性即可
  const props = defineProps<{
    icon: string;
  }>();
</script>

<template>
  <span class="iconify" :data-icon="props.icon"></span>
</template>

<style lang="scss" scoped></style>
