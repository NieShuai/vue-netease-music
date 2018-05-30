import Vue from 'vue';
import Vuex from 'vuex';
import uid from 'store/modules/uid';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    uid,
  },
  strict: process.env.NODE_ENV !== 'production',
});

if (module.hot) {
  module.hot.accept([
    'store/modules/uid',
  ], () => {
    store.hotUpdate({
      modules: {
        uid: require('store/modules/uid').default,
      },
    });
  });
}

export default store;
