<template>
  <div class="music-list" :style="musicListStyle" ref="musicList">
    <div class="music-list__inner">
      <div class="music-list__header">
        <i class="icon-back music-list__header__back" @click="goBack"></i>
        <div class="music-list__header__title__container">
          <span class="music-list__header__title">{{ title }}</span>
        </div>
        <i
          class="icon-player-status music-list__header__music-player__trigger"
          @click="onShowMusicPlayer(false)"></i>
      </div>
      <loading
        v-if="showLoading"
        show-in-middle></loading>
      <div class="music-list__content" v-show="!showLoading" ref="musicListWrapper">
        <div class="music-list__content__wrapper">
          <div class="music-list__content__detail">
            <div class="music-list__content__detail__infor">
              <div class="music-list__content__detail__infor__img">
                <img :src="coverUrl">
              </div>
              <div class="music-list__content__detail__infor__describe">
                <div class="music-list__content__detail__infor__describe__name">
                  {{ listName }}
                </div>
                <div v-if="creator" class="music-list__content__detail__infor__describe__creator">
                  <div class="music-list__content__detail__infor__describe__creator__avatar">
                    <img :src="creator.avatarUrl" alt="">
                  </div>
                  <div
                    class="music-list__content__detail__infor__describe__creator__nickname"
                    @click="jumpToUserInfor(creator.userId)">
                    {{ creator.nickname }}
                  </div>
                  <div class="music-list__content__detail__infor__describe__creator__arrow">
                    <i class="icon-back"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="music-list__content__detail__buttons">
              <div class="music-list__content__detail__buttons__item">
                <i class="icon-comment-empty"></i>
                <span>评论</span>
              </div>
              <div class="music-list__content__detail__buttons__item">
                <i class="icon-share"></i>
                <span>分享</span>
              </div>
              <div class="music-list__content__detail__buttons__item">
                <i class="icon-download1"></i>
                <span>下载</span>
              </div>
              <div class="music-list__content__detail__buttons__item">
                <i class="icon-check"></i>
                <span>多选</span>
              </div>
            </div>
          </div>
          <div class="music-list__content__list">
            <div class="music-list__content__list__header">
              <i class="icon-music-play" @click="onPlayAll"></i>
              <div class="music-list__content__list__header__text">
                播放全部
              </div>
              <div class="music-list__content__list__header__content">
                (共{{ list.length }}首)
              </div>
            </div>
            <div class="music-list__content__list__items" ref="listItemsWrapper">
              <div class="music-list__content__list__wrapper">
                <music-list-item
                  v-for="(item, index) in list"
                  :key="index"
                  :indexing="index + 1"
                  :item-object="item"
                  :activing="songObj.songId === item.id"
                  @click.native="onItemClick(item, index)"></music-list-item>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import musicListItem from 'components/music_list_item/music-list-item';
import loading from 'components/loading/loading';
import { getListDetail } from 'api/api';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'musicList',
  data() {
    return {
      title: '歌单',
      coverUrl: '',
      listName: '',
      creator: null,
      list: [],
      showLoading: true,
      musicListScroll: null,
      listItemScroll: null,
    };
  },
  created() {
    this.$root.eventHub.$on('music-player-hidden', this.refreshScroll);
  },
  mounted() {
    const { id } = this.$route.params;
    getListDetail(id).then((response) => {
      const { data: listData } = response;
      if (listData.code === 200) {
        this.coverUrl = listData.playlist.coverImgUrl;
        this.listName = listData.playlist.name;
        this.creator = listData.playlist.creator;
        this.list = listData.playlist.tracks;
        document.styleSheets[0].addRule(
          '.music-list__inner::before',
          `background-image: url(${this.coverUrl})`);
        this.setHeight();
        this.showLoading = false;
        this.setScroll();
      }
    });
  },
  computed: {
    ...mapGetters([
      'songObj',
      'myList',
      'playingIndex',
    ]),
    musicListStyle() {
      return {
        backgroundImage: `url(${this.coverUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      };
    },
  },
  methods: {
    ...mapActions([
      'setPlayingList',
      'setPlayingIndex',
      'setMusicIndex',
      'setPlayingSong',
    ]),
    jumpToUserInfor(userId) {
      this.$router.push({
        name: 'infor',
        params: {
          id: userId,
        },
      });
    },
    setScroll() {
      this.$nextTick(() => {
        if (this.$refs.musicListWrapper && this.$refs.listItemsWrapper) {
          this.musicListScroll = new BScroll(this.$refs.musicListWrapper, {
            click: true,
            probeType: 3,
            bounce: {
              bottom: false,
            },
          });
          this.listItemScroll = new BScroll(this.$refs.listItemsWrapper, {
            click: true,
            probeType: 3,
            bounce: {
              top: false,
            },
          });
          this.listItemScroll.disable();
          this.musicListScroll.on('scroll', (e) => {
            if (e.y <= -100) {
              this.title = this.listName;
            } else {
              this.title = '歌单';
            }
            if (e.y <= -199) {
              this.musicListScroll.scrollTo(0, -200, 0);
              this.musicListScroll.stop();
              this.musicListScroll.disable();
              this.listItemScroll.enable();
              this.listItemScroll.refresh();
            }
          });
          this.listItemScroll.on('scroll', (e) => {
            if (e.y >= -1) {
              this.listItemScroll.scrollTo(0, 0, 0);
              this.listItemScroll.stop();
              this.listItemScroll.disable();
              this.musicListScroll.enable();
              this.musicListScroll.refresh();
            }
          });
        }
      });
    },
    refreshScroll() {
      if (this.musicListScroll && this.listItemScroll) {
        this.musicListScroll.destroy();
        this.listItemScroll.destroy();
        this.musicListScroll = null;
        this.listItemScroll = null;
      }
      this.setScroll();
    },
    onItemClick(item, index) {
      const listId = this.$route.params.id;
      let newPlayingIndex = 0;
      const listItem = this.myList.find((item, index) => {
        if (item.id === listId) {
          newPlayingIndex = index;
          return true;
        }
        return false;
      });
      const obj = {};
      obj.songId = item.id;
      obj.coverUrl = item.al.picUrl;
      obj.title = item.name;
      obj.artist = item.ar[0].name;
      obj.time = item.dt;
      if (newPlayingIndex !== this.playingIndex) {
        this.setPlayingList(this.list);
        this.setPlayingIndex(newPlayingIndex);
      }
      this.setPlayingSong(obj);
      this.setMusicIndex(index);
      this.onShowMusicPlayer(true);
    },
    onPlayAll() {
      if (this.list.length === 0) return;
      let newPlayingIndex = 0;
      const listId = this.$route.params.id;
      const listItem = this.myList.find((item, index) => {
        if (item.id === listId) {
          newPlayingIndex = index;
          return true;
        }
        return false;
      });
      if (newPlayingIndex !== this.playingIndex) {
        this.setPlayingList(this.list);
        this.setPlayingIndex(newPlayingIndex);
        const obj = {};
        obj.songId = this.list[0].id;
        obj.coverUrl = this.list[0].al.picUrl;
        obj.title = this.list[0].name;
        obj.artist = this.list[0].ar[0].name;
        obj.time = this.list[0].dt;
        this.setPlayingSong(obj);
        this.setMusicIndex(0);
      }
      this.onShowMusicPlayer(true);
    },
    goBack() {
      this.$router.go(-1);
      this.coverUrl = '';
      document.styleSheets[0].addRule(
        '.music-list__inner::before',
        'background-image: url()');
    },
    onShowMusicPlayer(restartMusic) {
      this.$root.eventHub.$emit('show-music-player');
      if (restartMusic) {
        this.$root.eventHub.$emit('play-on-show');
      }
    },
    setHeight() {
      /* eslint-disable */
      const wrapDom = document.querySelector('.music-list');
      const targetDom = document.querySelector('.music-list__content__list');
      if (wrapDom && targetDom) {
        targetDom.style.height = `${wrapDom.clientHeight - 50}px`;
      }
    },
  },
  components: {
    musicListItem,
    loading,
  },
};
</script>
