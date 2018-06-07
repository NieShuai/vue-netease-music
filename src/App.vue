<template>
  <div id="app" class="app" v-cloak>
    <div class="app__header">
      <head-bar title="标题" show-back @music-player-status="onMusicPlayerStatus"></head-bar>
    </div>
    <div class="app__content" :class="appStatusClasses">
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <app-footer :class="appStatusClasses"></app-footer>
  </div>
</template>

<script>
import headBar from 'components/head_bar/head-bar';
import appFooter from 'views/app_footer/app-footer';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    appFooter,
    headBar,
  },
  data() {
    return {
      musicPlayerStatus: false,
    };
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
    },
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
  methods: {
    ...mapActions([
      'setMyList',
    ]),
    onMusicPlayerStatus(param) {
      this.musicPlayerStatus = param;
    },
  },
  mounted() {
    this.setMyList(this.uid);
  },
};
</script>
