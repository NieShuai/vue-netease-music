<template>
  <div id="app" class="app" v-cloak>
    <div class="app__header">
      <head-bar
        :active-tab="activeTab"
        :title="title"
        :show-back="showBack"
        @music-player-status="onMusicPlayerStatus"
        @route-back="onRouteBack"></head-bar>
    </div>
    <div class="app__content" :class="appStatusClasses">
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <div class="app__footer" :class="appStatusClasses">
      <app-footer @tab-change="onTabChange"></app-footer>
    </div>
  </div>
</template>

<script>
import headBar from 'components/head_bar/head-bar';
import appFooter from 'views/app_footer/app-footer';
import { mapGetters, mapActions } from 'vuex';
import emitter from 'util/emitter';

export default {
  name: 'App',
  mixins: [emitter],
  components: {
    appFooter,
    headBar,
  },
  data() {
    return {
      musicPlayerStatus: false,
      title: '',
      activeTab: 0,
      titleStatus: true,
      showBack: false,
    };
  },
  computed: {
    ...mapGetters([
      'uid',
    ]),
    appStatusClasses() {
      return {
        'app__content--hidden': this.musicPlayerStatus,
        'app__content--show': !this.musicPlayerStatus,
      };
    },
  },
  watch: {
    $route(to, from) {
      const noTitle = ['discovery', 'videos', 'friends', 'infor'];
      const withTitle = ['mine', 'accounts', 'events', 'follows', 'followeds', 'profile', 'list'];
      if (noTitle.indexOf(to.name) !== -1) {
        this.titleStatus = false;
        this.showBack = false;
        this.title = '';
      } else if (withTitle.indexOf(to.name) !== -1) {
        this.titleStatus = true;
        const index = withTitle.indexOf(to.name);
        switch (index) {
          case 0:
            this.title = '我的音乐';
            this.showBack = false;
            break;
          case 1:
            this.title = '帐号';
            this.showBack = false;
            break;
          case 2:
            this.title = '动态';
            this.showBack = true;
            break;
          case 3:
            this.title = '关注';
            this.showBack = true;
            break;
          case 4:
            this.title = '粉丝';
            this.showBack = true;
            break;
          case 5:
            this.title = '我的资料';
            this.showBack = true;
            break;
          case 6:
            this.title = '歌单';
            this.showBack = true;
            break;
          default:
            this.title = '';
            this.showBack = false;
            break;
        }
      }
    },
  },
  methods: {
    ...mapActions([
      'setMyList',
    ]),
    onRouteBack() {
      this.broadcast('appFooter', 'route-back');
    },
    onMusicPlayerStatus(param) {
      this.musicPlayerStatus = param;
    },
    onTabChange(param) {
      this.activeTab = param;
    },
  },
  mounted() {
    document.body.addEventListener('touchstart', () => {});
    this.setMyList(this.uid);
  },
};
</script>
