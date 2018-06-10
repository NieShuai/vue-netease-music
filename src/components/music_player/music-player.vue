<template>
  <div
    class="music-player"
    :style="musicPlayerStyle">
    <div class="music-player__inner">
      <div class="music-player__header">
        <i
          class="iconfont icon-back music-player__back"
          @click="hideMusicPlayer"></i>
        <div class="music-player__header__content">
          <div class="music-player__header__content__title">
            {{ title }}
          </div>
          <div class="music-player__header__content__artist">
            {{ artist }}
          </div>
        </div>
      </div>
      <div class="music-player__content">
        <audio
          v-if="songId"
          id="player"
          ref="player"
          :src="`http://music.163.com/song/media/outer/url?id=${songId}.mp3`"
          hidden
          controls
          @canplaythrough="onCanPlayThrough"
          @timeupdate="timeUpdated"
          @ended="onEnded">
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
                  <img
                    :src="playerResouces.disk"
                    class="music-player__content__panel__mask__disk__container__disc-item">
                  <img
                    :src="coverUrl"
                    class="music-player__content__panel__mask__disk__container__cover-item">
                </div>
              </div>
            </div>
            <div class="music-player__content__panel__mask__buttons">
              <i class="iconfont icon-heart"></i>
              <i class="iconfont icon-download"></i>
              <i class="iconfont icon-comment"></i>
              <i class="iconfont icon-dot-v"></i>
            </div>
          </div>
          <div class="music-player__content__panel__lyric"></div>
        </div>
        <div class="music-player__content__controls">
          <div class="music-player__content__controls__progress">
            <div
              class="music-player__content__controls__progress__item
                music-player__content__controls__progress__time">
              {{ playProgress }}
            </div>
            <div
              class="music-player__content__controls__progress__item
                music-player__content__controls__progress__slider">
              <van-slider
                v-model="progress"
                :step="0.1"
                @touchstart.native="onTouchStart"
                @touchend.native="onTouchEnd"/>
              <van-loading
                v-if="playing && !songLoaded"
                type="spinner"
                class="music__loading"/>
            </div>
            <div
              class="music-player__content__controls__item
                music-player__content__controls__progress__time">
              {{ musicLength }}
            </div>
          </div>
          <div class="music-player__content__controls__buttons">
            <i
              class="music-player__content__controls__buttons__item iconfont"
              :class="playingTypeClass"
              @click="changeType"></i>
            <i
              class="iconfont icon-play-pre
                music-player__content__controls__buttons__item"
              @click="playPre"></i>
            <i
              class="music-player__content__controls__buttons__item
                music-player__content__controls__play iconfont"
              :class="playing ?
                'icon-music-pause' :
                'icon-music-play'"
              @click="playMusic"></i>
            <i
              class="iconfont icon-play-next
                music-player__content__controls__buttons__item"
              @click="playNext"></i>
            <i class="iconfont icon-list
              music-player__content__controls__buttons__item"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { getMusicDetail } from 'api/api';
import { formatTime } from 'util/help';

const playerResouces = {
  disk: require('../../assets/player/player_disc.png'),
  needle: require('../../assets/player/player_needle.png'),
};

export default {
  name: 'musicPlayer',
  componentName: 'musicPlayer',
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
      songLoaded: false,
      resetAnimation: false,
    };
  },
  computed: {
    ...mapGetters([
      'playingList',
      'musicIndex',
      'playingType',
    ]),
    playingTypeClass() {
      if (this.playingType === 1) {
        return 'icon-random';
      } else if (this.playingType === 2) {
        return 'icon-single-loop';
      }
      return 'icon-loop';
    },
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
      if (newVal && this.songLoaded) {
        this.runAnimation();
      } else {
        this.pauseAnimation();
      }
    },
    songLoaded(newVal) {
      if (newVal && this.playing) {
        this.runAnimation();
      }
    },
    musicIndex(newVal) {
      this.progress = 0;
      this._getMusicDetail(newVal);
      this.songLoaded = false;
      this.$nextTick(() => {
        this.playMusic();
      });
    },
    playingList(newVal) {
      this._getMusicDetail(this.musicIndex);
    },
  },
  methods: {
    ...mapActions([
      'setMusicIndex',
      'setPlayingType',
    ]),
    changeType() {
      let newType = this.playingType + 1;
      if (newType === 3) {
        newType = 0;
      }
      this.setPlayingType(newType);
    },
    _getMusicDetail(mIndex) {
      if (this.playingList.length > 0) {
        this.songId = this.playingList[mIndex].id;
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
    },
    onEnded() {
      this.playNext();
    },
    playNext() {
      this.resetAnimation = true;
      this.$refs.player.pause();
      this.playing = false;
      let newPlayingIndex = 0;
      if (this.playingType === 0) {
        newPlayingIndex = this.musicIndex + 1;
        if (newPlayingIndex > this.playingList.length - 1) {
          newPlayingIndex = 0;
        }
      }
      this.setMusicIndex(newPlayingIndex);
    },
    playPre() {
      this.resetAnimation = true;
      this.$refs.player.pause();
      this.playing = false;
      let newPlayingIndex = 0;
      if (this.playingType === 0) {
        newPlayingIndex = this.musicIndex - 1;
        if (newPlayingIndex < 0) {
          newPlayingIndex = this.playingList.length - 1;
        }
      }
      this.setMusicIndex(newPlayingIndex);
    },
    onCanPlayThrough() {
      this.songLoaded = true;
    },
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
    runAnimation() {
      const containerDom = document.querySelector('.music-player__content__panel__mask__disk__container');
      const animationDom = document.querySelector('.music-player__content__panel__mask__disk__container__animation');
      animationDom.classList.add('playing');
    },
    pauseAnimation() {
      const containerDom = document.querySelector('.music-player__content__panel__mask__disk__container');
      const animationDom = document.querySelector('.music-player__content__panel__mask__disk__container__animation');
      if (!this.resetAnimation) {
        const aTransform = getComputedStyle(animationDom).transform;
        const cTransform = getComputedStyle(containerDom).transform;
        containerDom.style.transform =
          cTransform === 'none' ? aTransform : aTransform.concat(' ', cTransform);
      } else {
        this.resetAnimation = false;
        containerDom.style.transform = 'none';
      }
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

