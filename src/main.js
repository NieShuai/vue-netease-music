// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import store from 'store';
import App from './App';
import router from './router';

import './styles/index.less';

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(Vant);

axios.defaults.baseURL = 'http://184.170.218.177:3000';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
});
