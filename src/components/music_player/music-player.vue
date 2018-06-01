<template>
  <div class="music-player">
    <div class="music-player__header">
      <i
        class="font-awesome-angle-left head-bar__back"
        @click="hideMusicPlayer"></i>
    </div>
    <div class="music-player__content">
      <audio
        id="player" 
        ref="player"
        src="../../../static/audios/买辣椒也用券 - 起风了（Cover 高橋優）.mp3"
        hidden
        controls>
      </audio>
      <div class="music-player__content__panel">
        <div class="music-player__content__panel__mask">
          <img
            :src="playerResouces.needle"
            :class="{
              'music-player__content__panel__mask__needle': 1,
              'music-player__content__panel__mask__needle--playing': playing
            }">
          <div class="music-player__content__panel__mask__disk">
            <div class="music-player__content__panel__mask__disk__container">
              <img :src="playerResouces.disk">
            </div>
          </div>
          <div class="music-player__content__panel__mask__buttons">
            <i class="font-awesome-heart-o"></i>
            <i class="font-awesome-download"></i>
            <i class="font-awesome-commenting-o"></i>
            <i class="font-awesome-ellipsis-v"></i>
          </div>
        </div>
        <div class="music-player__content__panel__lyric"></div>
      </div>
      <div class="music-player__content__controls">
        <div class="music-player__content__controls__progress">
          <van-progress
            pivot-text=""
            color="red"
            :percentage="10"/>
        </div>
        <div class="music-player__content__controls__buttons">
          <i
            class="music-player__content__controls__play"
            :class="playing ? 'font-awesome-pause-circle-o' : 'font-awesome-play-circle-o'"
            @click="playMusic"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const playerResouces = {
  disk: require('../../assets/player/player_disc.png'),
  needle: require('../../assets/player/player_needle.png'),
};

export default {
  name: 'musicPlayer',
  props: {},
  data() {
    return {
      playerResouces,
      playing: false,
    };
  },
  methods: {
    hideMusicPlayer() {
      this.$emit('hide-music-player');
    },
    playMusic() {
      if (this.$refs.player) {
        const player = this.$refs.player;
        if (player.paused) { 
          player.play();
          this.playing = true;
        } else {
          player.pause();
          this.playing = false;
        }
      }
    },
  },
}
</script>

