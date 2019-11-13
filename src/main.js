import Vue from 'vue'
import App from './App'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from "./router";
import VueParticles from 'vue-particles'
import MintUI  from  'mint-ui';
import 'mint-ui/lib/style.css';
import { IndexList, IndexSection } from 'mint-ui';

Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);

Vue.use(VueParticles)
// 注册element-ui
Vue.use(ElementUI);
// 注册mini-ui
Vue.use(MintUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
