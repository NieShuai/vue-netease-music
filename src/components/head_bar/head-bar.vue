<template>
  <div class="head-bar">
    <i
      v-if="showBack"
      class="font-awesome-angle-left head-bar__back"
      @click="back"></i>
    <span class="head-bar__title">{{ title }}</span>
    <i
      class="font-awesome-align-left head-bar__music-player__trigger"
      @click="onShowMusicPlayer"></i>
    <van-popup
      class="music-player__pop"
      v-model="musicPlayerStatus"
      position="right">
      <music-player
        @hide-music-player="onHideMusicPlayer"></music-player>
    </van-popup>
  </div>
</template>

<script>
import musicPlayer from 'components/music_player/music-player';

export default {
  name: 'headBar',
  props: {
    title: String,
    showBack: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      musicPlayerStatus: false,
    };
  },
  mounted() {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    onShowMusicPlayer() {
      this.musicPlayerStatus = true;
    },
    onHideMusicPlayer() {
      this.musicPlayerStatus = false;
    },
  },
  components: {
    musicPlayer,
  },
}
</script>

