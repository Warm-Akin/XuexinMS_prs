// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import vuex from 'vuex';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import store from './store/store';
import 'element-ui/lib/theme-chalk/index.css';
import VueCropper from 'vue-cropper';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueCropper);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  vuex,
  components: { App },
  template: '<App/>'
});
