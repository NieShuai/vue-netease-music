<template>
  <div class="user-infor" :style="userInforStyle">
    <div class="user-infor__header">
      <i class="icon-back user-infor__header__back" @click="goBack"></i>
      <div class="user-infor__header__title__container">
        <span class="user-infor__header__title">{{ title }}</span>
      </div>
      <i
        class="icon-player-status user-infor__header__music-player__trigger"
        @click="onShowMusicPlayer"></i>
    </div>
    <loading
      v-if="showLoading"
      show-in-middle></loading>
    <div class="user-infor__content" v-show="!showLoading" ref="userInforWrapper">
      <div class="user-infor__content__wrapper">
        <div class="user-infor__content__infor">
          a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>
          a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>
          a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>
          a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>
          a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>
          a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>
        </div>
        <div class="user-infor__content__tabs">
          a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>
          a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>
          a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>
          a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>
          a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>
          a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>a<br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import loading from 'components/loading/loading';
import { getUserDetail } from 'api/api';

export default {
  name: 'userInfor',
  data() {
    return {
      userId: null,
      showLoading: true,
      title: '',
      avatar: '',
      background: '',
      nickName: 'nickName',
      level: 0,
      eventCount: 0,
      followsCount: 0,
      followedsCount: 0,
      userInforScroll: null,
    };
  },
  mounted() {
    this.userId = this.$route.params.id;
    this.showLoading = true;
    getUserDetail(this.userId).then((res) => {
      const { data } = res;
      if (data.code === 200) {
        const { profile, level } = data;
        this.background = profile.backgroundUrl;
        this.avatar = profile.avatarUrl;
        this.nickName = profile.nickname;
        this.level = level;
        this.eventCount = profile.eventCount;
        this.followsCount = profile.follows;
        this.followedsCount = profile.followeds;
        this.showLoading = false;
        this.setHeight();
        this.$nextTick(() => {
          if (this.$refs.userInforWrapper) {
            this.userInforScroll = new BScroll(this.$refs.userInforWrapper, {
              click: true,
              probeType: 3,
              bounce: {
                bottom: false,
              },
            });
          }
        });
      }
    });
  },
  computed: {
    userInforStyle() {
      return {
        backgroundImage: `url(${this.background})`,
      };
    },
  },
  methods: {
    setHeight() {
      /* eslint-disable */
      const wrapDom = document.querySelector('.user-infor');
      const targetDom = document.querySelector('.user-infor__content__tabs');
      if (wrapDom && targetDom) {
        targetDom.style.height = `${wrapDom.clientHeight - 50}px`;
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    onShowMusicPlayer() {
      this.$root.eventHub.$emit('show-music-player');
    },
  },
  components: {
    loading,
  },
};
</script>
