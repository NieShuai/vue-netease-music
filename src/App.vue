<template>
  <div id="app" v-cloak>
    <div class="content">
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import appFooter from 'views/app_footer/app-footer';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    appFooter,
  },
  computed: {
    ...mapGetters([
      'uid',
    ]),
  },
  methods: {
    ...mapActions([
      'setMyList',
    ]),
  },
  mounted() {
    this.setMyList(this.uid);
  },
};
</script>

<style lang="less">
html, body, #app {
  height: 100%;
}

.content{
  height: calc(~"100% - 50px");
  overflow: hidden;
  position: relative;
}
</style>
