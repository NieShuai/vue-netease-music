<template>
  <div class="head-bar">
    <i
      v-if="showBack"
      class="icon-back head-bar__back"
      @click="back"></i>
    <div class="head-bar__title__container">
      <span class="head-bar__title">{{ title }}</span>
    </div>
    <i
      class="icon-player-status head-bar__music-player__trigger"
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
    activeTab: Number,
  },
  data() {
    return {
      musicPlayerStatus: false,
      showTitle: true,
    };
  },
  computed: {},
  created() {
    this.$root.eventHub.$on('show-music-player', this.onShowMusicPlayer);
  },
  watch: {
    $route(to, from) {
      this.onHideMusicPlayer();
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
      this.$emit('route-back');
    },
    onShowMusicPlayer() {
      this.musicPlayerStatus = true;
      this.$emit('music-player-status', true);
    },
    onHideMusicPlayer() {
      this.musicPlayerStatus = false;
      this.$emit('music-player-status', false);
    },
  },
  components: {
    musicPlayer,
  },
};
</script>

