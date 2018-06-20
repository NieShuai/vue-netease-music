<template>
  <div class="music-list" ref="musicListWrapper">
    <div class="music-list__inner">
      <div class="music-list__header">
        <i class="icon-back music-list__header__back" @click="goBack"></i>
        <div class="music-list__header__title__container">
          <span class="music-list__header__title">{{ title }}</span>
        </div>
        <i
          class="icon-player-status music-list__header__music-player__trigger"
          @click="onShowMusicPlayer"></i>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
  name: 'musicList',
  data() {
    return {
      title: '歌单',
    };
  },
  mounted() {
    this.$nextTick(() => {
      const t = new BScroll(this.$refs.musicListWrapper);
    });
  },
  methods: {
    goBack() {
      console.log('aaaaaaaaaaa');
      this.$router.go(-1);
    },
    onShowMusicPlayer() {
      this.$emit('show-music-player');
    },
  },
};
</script>

<style lang="less">
  .music-list {
    height: calc(~"100% + 50px");
    width: 100%;
    background-color: skyblue;
    position: absolute;
    top: -50px;

    &__header {
      text-align: center;
      height: 50px;
      width: 100%;

      &__back {
        color: #fff;
        position: absolute;
        left: 0;
        line-height: 50px;
        font-size: 30px;
      }

      &__title {
        color: #fff;
        line-height: 50px;
        font-size: 20px;
      }

      &__music-player__trigger {
        display: block;
        position: absolute;
        right: 10px;
        top: 0;
        color: #fff;
        line-height: 50px;
        font-size: 30px;
      }
    }
  }
</style>

