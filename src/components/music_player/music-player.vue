<template>
  <div
    class="music-player"
    :style="musicPlayerStyle">
    <div class="music-player__inner">
      <div class="music-player__header">
        <i
          class="font-awesome-angle-left music-player__back"
          @click="hideMusicPlayer"></i>
        <div class="music-player__header__content">
          <div class="music-player__header__content__title">{{ title }}</div>
          <div class="music-player__header__content__artist">{{ artist }}</div>
        </div>
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
                'music-player__content__panel__mask__needle--playing': playing,
              }">
            <div class="music-player__content__panel__mask__disk">
              <div class="music-player__content__panel__mask__disk__container">
                <div class="music-player__content__panel__mask__disk__container__animation">
                  <img :src="playerResouces.disk" class="music-player__content__panel__mask__disk__container__disc-item">
                  <img :src="coverUrl" class="music-player__content__panel__mask__disk__container__cover-item">
                </div>
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
            <div
              class="music-player__content__controls__progress__item
                music-player__content__controls__progress__time">{{ playProgress }}</div>
            <div
              class="music-player__content__controls__progress__item
                music-player__content__controls__progress__slider">
              <van-slider
                v-model="progress"
                :step="0.1"
                @touchstart.native="onTouchStart"
                @touchend.native="onTouchEnd"/>
            </div>
            <div
              class="music-player__content__controls__item
                music-player__content__controls__progress__time">{{ musicLength }}</div>
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
import { formatTime } from 'util/help';

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
      progress: 0,
      time: 0,
      playProgress: '00:00',
      isChangingProgress: false,
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
    musicLength() {
      return formatTime(this.time / 1000);
    },
  },
  watch: {
    coverUrl(newVal) {
      document.styleSheets[0].addRule(
        '.music-player__inner::before',
        `background-image: url(${newVal})`);
      // document.styleSheets[0].insertRule('.red::before { color: green }', 0);
    },
    playing(newVal) {
      if (newVal) {
        this.runAnimation();
      } else {
        this.pauseAnimation();
      }
    },
  },
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
          this.time = songObj.dt;
        }
      });
    }
    this.$nextTick(() => {
      this.$refs.player.ontimeupdate = this.timeUpdated;
    });
  },
  methods: {
    timeUpdated() {
      const curTime = this.$refs.player.currentTime;
      this.playProgress = formatTime(curTime);
      if (!this.isChangingProgress) {
        this.progress = (curTime * 1000) / this.time * 100;
      }
    },
    onTouchStart() {
      this.isChangingProgress = true;
    },
    onTouchEnd() {
      const player = this.$refs.player;
      const isPaused = player.paused;
      player.pause();
      this.playing = false;
      player.currentTime = (this.progress * this.time) / 100 / 1000;
      if (!isPaused) {
        player.play();
        this.playing = true;
      }
      this.isChangingProgress = false;
    },
    runAnimation(){
      const containerDom = document.querySelector('.music-player__content__panel__mask__disk__container');
      const animationDom = document.querySelector('.music-player__content__panel__mask__disk__container__animation');
      animationDom.classList.add('playing');
    },
    pauseAnimation(){
      const containerDom = document.querySelector('.music-player__content__panel__mask__disk__container');
      const animationDom = document.querySelector('.music-player__content__panel__mask__disk__container__animation');
      const aTransform = getComputedStyle(animationDom).transform;
      const cTransform = getComputedStyle(containerDom).transform;
      containerDom.style.transform =
        cTransform === 'none' ? aTransform : aTransform.concat(' ', cTransform);
      animationDom.classList.remove('playing');
    },
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

