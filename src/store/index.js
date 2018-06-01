import Vue from 'vue';
import Vuex from 'vuex';
import uid from 'store/modules/uid';
import music from 'store/modules/music';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    uid,
    music,
  },
  strict: process.env.NODE_ENV !== 'production',
});

if (module.hot) {
  module.hot.accept([
    'store/modules/uid',
    'store/modules/music',
  ], () => {
    store.hotUpdate({
      modules: {
        uid: require('store/modules/uid').default,
        music: require('store/modules/music').default,
      },
    });
  });
}

export default store;
