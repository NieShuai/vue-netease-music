<template>
  <div
    class="music-player"
    :style="musicPlayerStyle">
    <div class="music-player__inner">
      <div class="music-player__header">
        <i
          class="font-awesome-angle-left head-bar__back"
          @click="hideMusicPlayer"></i>
        {{ title }}{{ artist }}
      </div>
      <div class="music-player__content">
        <audio
          v-if="songId"
          id="player" 
          ref="player"
          :src="`http://music.163.com/song/media/outer/url?id=${songId}.mp3`"
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
  </div>
</template>

<script>
const playerResouces = {
  disk: require('../../assets/player/player_disc.png'),
  needle: require('../../assets/player/player_needle.png'),
};

import { mapGetters, mapActions } from 'vuex';
import { getMusicDetail } from 'api/api';

export default {
  name: 'musicPlayer',
  props: {},
  data() {
    return {
      playerResouces,
      playing: false,
      songId: null,
      coverUrl: '',
      title: '',
      artist: '',
    };
  },
  computed: {
    ...mapGetters([
      'playingList',
    ]),
    musicPlayerStyle() {
      return {
        backgroundImage: `url(${this.coverUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      };
    },
  },
  watch: {},
  mounted() {
    if (this.playingList.length > 0) {
      this.songId = this.playingList[0].id;
      getMusicDetail(this.songId).then((res) => {
        const { data } = res;
        if (data.code === 200) {
          const songObj = data.songs[0];
          this.coverUrl = songObj.al.picUrl;
          this.title = songObj.name;
          this.artist = songObj.ar[0].name;
        }
      });
    }
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
};
</script>

