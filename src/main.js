import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/sass/main.sass';
import md5 from 'js-md5';
import VueGtag from "vue-gtag"
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import VueLazyload from 'vue-lazyload'
import VueMeta from 'vue-meta';

Vue.use(VueMeta);
Vue.use(VueLazyload)
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(VueGtag, {
  config: { id: "G-test" }
});

Vue.config.productionTip = false;
Vue.use(ElementUI);
global.md5 = md5

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
