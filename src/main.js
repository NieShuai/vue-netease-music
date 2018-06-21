// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import store from 'store';
import App from './App';
import router from './router';

import './styles/index.less';

Vue.config.productionTip = false;

Vue.use(Vant);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    eventHub: new Vue(),
  },
  store,
  router,
  components: { App },
  template: '<App/>',
});
