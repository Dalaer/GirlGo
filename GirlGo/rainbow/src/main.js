// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/style/reset.css'
import Axios from 'axios'
import Lazyload from 'vue-lazyload'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import '../node_modules/swiper/dist/css/swiper.min.css';
import store from './store'

Vue.use(Lazyload,{
	loading:require('@/assets/logo.jpg'),
	attempt:1
})
Vue.use(Mint);

Vue.prototype.$axios = Axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store,
  components: { App },
  template: '<App/>'
})
