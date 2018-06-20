<template>
  <div class="music-list" :style="musicListStyle">
    <loading
      v-if="showLoading"
      show-in-middle></loading>
    <div class="music-list__inner" v-else>
      <div class="music-list__header">
        <i class="icon-back music-list__header__back" @click="goBack"></i>
        <div class="music-list__header__title__container">
          <span class="music-list__header__title">{{ title }}</span>
        </div>
        <i
          class="icon-player-status music-list__header__music-player__trigger"
          @click="onShowMusicPlayer"></i>
      </div>
      <div class="music-list__content" ref="musicListWrapper">
        <div class="music-list__content__wrapper">
          <!-- <div class="music-list__content__search">
            <input type="text">
          </div> -->
          <div class="music-list__content__detail">
            <div class="music-list__content__detail__infor">
              <div class="music-list__content__detail__infor__img">
                <img :src="coverUrl">
              </div>
              <div class="music-list__content__detail__infor__describe"></div>
            </div>
            <div class="music-list__content__detail__buttons"></div>
          </div>
          <div class="music-list__content__list">
            <div class="music-list__content__list__header">
              <i class="icon-music-play"></i>
              <div class="music-list__content__list__header__text">
                播放全部
              </div>
              <div class="music-list__content__list__header__content">
                (共{{ list.length }}首)
              </div>
            </div>
            <div class="music-list__content__list__wrapper" ref="listItemsWrapper">
              <music-list-item
                v-for="(item, index) in list"
                :key="index"
                :indexing="index + 1"
                :item-object="item"></music-list-item>
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
    };
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
        this.showLoading = false;
        this.$nextTick(() => {
          const a = new BScroll(this.$refs.musicListWrapper);
          // const b = new BScroll(this.$refs.listItemsWrapper);
        });
      }
    });
  },
  computed: {
    musicListStyle() {
      return {
        backgroundImage: `url(${this.coverUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      };
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onShowMusicPlayer() {
      this.$emit('show-music-player');
    },
  },
  components: {
    musicListItem,
    loading,
  },
};
</script>
