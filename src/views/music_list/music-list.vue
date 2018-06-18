<template>
  <div class="music-list" ref="wrapper">
    <div>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
      aaaaa<br>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
  name: 'musicList',
  mounted() {
    this.$nextTick(() => {
      const t = new BScroll(this.$refs.wrapper);
    });
  },
};
</script>

<style lang="less">
  .music-list {
    // height: calc(~"100% + 50px");
    height: 100%;
    width: 100%;
    background-color: skyblue;
    // position: absolute;
    // top: -50px;
  }
</style>

