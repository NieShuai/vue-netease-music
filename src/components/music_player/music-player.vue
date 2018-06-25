<template>
  <div class="music-player" :style="musicPlayerStyle">
    <div class="music-player__inner">
      <div
        :class="{
          'music-player__header': 1,
          'music-player__header__border': !showLyric,
        }">
        <i class="icon-back music-player__back" @click="hideMusicPlayer"></i>
        <div class="music-player__header__content">
          <div class="music-player__header__content__title">
            {{ title }}
          </div>
          <div class="music-player__header__content__artist">
            {{ artist }}
          </div>
        </div>
        <i class="icon-share music-player__share" @click="hideMusicPlayer"></i>
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
          @ended="onEnded"
          @error="onError">
        </audio>
        <div class="music-player__content__panel">
          <div class="music-player__content__panel__mask" v-show="!showLyric">
            <img :src="playerResouces.needle"
              :class="{
                'music-player__content__panel__mask__needle': 1,
                'music-player__content__panel__mask__needle--playing': playing,
              }">
            <div class="music-player__content__panel__mask__disk" @click="lyricModel(true)">
              <div class="music-player__content__panel__mask__disk__container">
                <div class="music-player__content__panel__mask__disk__container__animation">
                  <img :src="playerResouces.disk"
                    class="music-player__content__panel__mask__disk__container__disc-item">
                  <img :src="coverUrl"
                    class="music-player__content__panel__mask__disk__container__cover-item">
                </div>
              </div>
            </div>
            <div class="music-player__content__panel__mask__buttons">
              <i class="icon-heart"></i>
              <i class="icon-download"></i>
              <i class="icon-comment"></i>
              <i class="icon-dot-v"></i>
            </div>
          </div>
          <div class="music-player__content__panel__lyric" v-show="showLyric">
            <div class="music-player__content__panel__lyric__volume">
              <i :class="volume === 0 ? 'icon-volume-off' : 'icon-volume-on'"></i>
              <van-slider
                class="music-player__content__panel__lyric__volume__slider"
                v-model="volume"
                :step="1"
                :max="100"/>
            </div>
            <div
              class="music-player__content__panel__lyric__txt"
              ref="lyricContainer"
              @click="lyricModel(false)">
              <ul class="music-player__content__panel__lyric__txt__ul" ref="lyricUl">
                <li
                  v-for="(item, index) in lyric"
                  :key="index"
                  class="music-player__content__panel__lyric__txt__item"
                  ref="lyricLine">
                  {{ item.txt }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="music-player__content__controls">
          <div class="music-player__content__controls__progress">
            <div class="music-player__content__controls__progress__item
              music-player__content__controls__progress__time">
              {{ playProgress }}
            </div>
            <div class="music-player__content__controls__progress__item
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
            <div class="music-player__content__controls__item
              music-player__content__controls__progress__time">
              {{ musicLength }}
            </div>
          </div>
          <div class="music-player__content__controls__buttons">
            <div class="music-player__content__controls__buttons__item">
              <i :class="playingTypeClass" @click="changeType(false)"></i>
            </div>
            <div class="music-player__content__controls__buttons__item">
              <i class="icon-play-pre" @click="playPre"></i>
            </div>
            <div class="music-player__content__controls__buttons__item">
              <i class="music-player__content__controls__play"
                :class="playing ?
                  'icon-music-pause' :
                  'icon-music-play'"
                @click="playMusic"></i>
            </div>
            <div class="music-player__content__controls__buttons__item">
              <i class="icon-play-next" @click="playNext"></i>
            </div>
            <div class="music-player__content__controls__buttons__item">
              <i class="icon-list" @click="showListModal"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model="listModalStatus" position="bottom" class="list__modal">
      <div class="list__modal__header">
        <i
          class="list__modal__header__play-type"
          :class="playingTypeClass"
          @click="changeType(true)"></i>
        <span class="list__modal__header__play-type__text">
          {{ typeText }}
        </span>
      </div>
      <div class="list__modal__content">
        <div class="list__modal__content__wrapper" ref="listWrapper">
          <ul class="list-content">
            <li
              v-for="(item, index) in playingList"
              :key="index"
              :class="{
                'list__modal__content__song': 1,
                'list__modal__content__song--playing': index === musicIndex,
              }"
              @click="playNew(index)">
              <i
                v-if="index === musicIndex"
                class="icon-volume-on list__modal__content__song__voice"></i>
              <span class="list__modal__content__song__name">{{ item.name }}</span>
              <span class="list__modal__content__song__artist"> - {{ item.ar[0].name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="list__modal__footer" @click="listModalStatus = false">关闭</div>
    </van-popup>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import { mapGetters, mapActions } from 'vuex';
import { getMusicDetail, getLyric } from 'api/api';
import { formatTime, getRandom, parseLyric } from 'util/help';

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
      listModalStatus: false,
      listModalScroll: null,
      showLyric: false,
      lyric: [],
      volume: 100,
      lyricScroll: null,
    };
  },
  computed: {
    ...mapGetters([
      'playingList',
      'musicIndex',
      'playingType',
      'songObj',
    ]),
    typeText() {
      if (this.playingType === 1) {
        return `随机播放(${this.playingList.length})`;
      } else if (this.playingType === 2) {
        return '单曲循环';
      }
      return `列表循环(${this.playingList.length})`;
    },
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
    musicIndex(newVal) {
      this.progress = 0;
      this.songLoaded = false;
      this.playing = false;
      this.lyric = [];
      this.getMusicDetails(newVal);
    },
    songObj: {
      immediate: true,
      handler(newVal) {
        this.songId = null;
        const {
          artist,
          coverUrl,
          songId,
          time,
          title,
        } = newVal;
        this.artist = artist;
        this.coverUrl = coverUrl;
        this.songId = songId;
        this.time = time;
        this.title = title;
        document.styleSheets[0].addRule(
          '.music-player__inner::before',
          `background-image: url(${coverUrl})`);
        if (songId) {
          getLyric(songId).then((res) => {
            const { data } = res;
            if (data.code === 200) {
              this.lyric = parseLyric(data.lrc.lyric);
            }
          });
        }
      },
    },
    listModalStatus(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.listModalScroll = new BScroll(this.$refs.listWrapper, {
            stopPropagation: true,
            click: true,
          });
        });
      } else {
        this.listModalScroll.destroy();
      }
    },
    volume(newVal) {
      this.$refs.player.volume = newVal / 100;
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
  },
  created() {
    this.$root.eventHub.$on('play-on-show', this.onPlayOnShow);
  },
  mounted() {
    this.$nextTick(() => {
      const containerHeight =
        document.querySelector('.music-player__content__panel__lyric__txt').clientHeight;
      this.lyricScroll = new BScroll(this.$refs.lyricContainer, {
        stopPropagation: true,
        click: true,
        startY: containerHeight / 2,
      });
    });
  },
  methods: {
    ...mapActions([
      'setMusicIndex',
      'setPlayingType',
      'setPlayingSong',
    ]),
    lyricModel(param) {
      this.showLyric = param;
    },
    showListModal() {
      this.listModalStatus = true;
    },
    changeType(disableToast = false) {
      let newType = this.playingType + 1;
      if (newType === 3) {
        newType = 0;
      }
      this.setPlayingType(newType);
      let msg = '';
      if (newType === 0) {
        msg = '列表循环';
      } else if (newType === 1) {
        msg = '随机播放';
      } else {
        msg = '单曲循环';
      }
      if (!disableToast) {
        this.$toast({
          message: msg,
          duration: 1000,
        });
      }
    },
    getMusicDetails(mIndex) {
      if (this.playingList.length > 0) {
        const playingObj = this.playingList[mIndex];
        const obj = {};
        obj.songId = playingObj.id;
        obj.coverUrl = playingObj.al.picUrl;
        obj.title = playingObj.name;
        obj.artist = playingObj.ar[0].name;
        obj.time = playingObj.dt;
        this.setPlayingSong(obj);
        this.$nextTick(() => {
          this.playMusic();
        });
      }
    },
    onEnded() {
      if (this.playingType === 2) {
        this.playProgress = '00:00';
        this.resetAnimation = true;
        const player = this.$refs.player;
        player.pause();
        this.playing = false;
        player.currentTime = 0;
        player.play();
        this.playing = true;
      } else {
        this.playNext();
      }
    },
    onError() {
      this.$toast('资源加载错误...');
      const player = this.$refs.player;
      player.pause();
      this.playing = false;
      setTimeout(() => {
        this.playNext();
      }, 3000);
    },
    onPlayOnShow() {
      this.playNew(this.musicIndex);
    },
    playNew(newIndex) {
      const player = this.$refs.player;
      this.playProgress = '00:00';
      this.resetAnimation = true;
      player.pause();
      this.playing = false;
      if (newIndex !== this.musicIndex) {
        this.setMusicIndex(newIndex);
      } else {
        player.currentTime = 0;
        player.play();
        this.playing = true;
      }
    },
    playNext() {
      this.playProgress = '00:00';
      this.resetAnimation = true;
      this.$refs.player.pause();
      this.playing = false;
      let newPlayingIndex = 0;
      if (this.playingType === 0 || this.playingType === 2) {
        newPlayingIndex = this.musicIndex + 1;
        if (newPlayingIndex > this.playingList.length - 1) {
          newPlayingIndex = 0;
        }
      } else {
        newPlayingIndex = getRandom(0, this.playingList.length - 1);
      }
      this.setMusicIndex(newPlayingIndex);
    },
    playPre() {
      this.playProgress = '00:00';
      this.resetAnimation = true;
      this.$refs.player.pause();
      this.playing = false;
      let newPlayingIndex = 0;
      if (this.playingType === 0 || this.playingType === 2) {
        newPlayingIndex = this.musicIndex - 1;
        if (newPlayingIndex < 0) {
          newPlayingIndex = this.playingList.length - 1;
        }
      } else {
        newPlayingIndex = getRandom(0, this.playingList.length - 1);
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
        this.progress = ((curTime * 1000) / this.time) * 100;
      }
      // 处理歌词
      const lineIndex = this.findCurLineIndex(curTime * 1000);
      if (this.$refs.lyricLine) {
        this.$refs.lyricLine.forEach((item, index) => {
          if (lineIndex === index) {
            item.classList.add('music-player__content__panel__lyric__txt__item--activing');
          } else {
            item.classList.remove('music-player__content__panel__lyric__txt__item--activing');
          }
        });
        const container = document.querySelector('.music-player__content__panel__lyric__txt');
        const containerHeight = container.clientHeight;
        const activingLyric =
          document.querySelector('.music-player__content__panel__lyric__txt__item--activing');
        if (activingLyric) {
          const top = activingLyric.offsetTop;
          this.lyricScroll.scrollTo(0, (containerHeight / 2) - top, 0);
        }
      }
    },
    findCurLineIndex(time) {
      for (let i = 0; i < this.lyric.length; i += 1) {
        if (time <= this.lyric[i].time) {
          let num = i - 1;
          if (num < 0) {
            num = 0;
          }
          return num;
        }
      }
      return this.lyric.length - 1;
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
      this.$root.eventHub.$emit('music-player-hidden');
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
