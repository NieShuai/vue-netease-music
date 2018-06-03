<template>
  <div
    :class="{
      'loading': 1,
      'loading--center': showInMiddle,
    }">
    <van-loading type="spinner" size="40px"/>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    showInMiddle: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
