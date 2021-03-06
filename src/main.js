import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import axios from 'axios'
import Scroller from '@/components/Scroller'
import Loading from '@/components/Loading'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.component('Scroller', Scroller);
Vue.component('Loading', Loading);

Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.filter('setWH', (url, argv) => {
  return url.replace(/w\.h/, argv);
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
