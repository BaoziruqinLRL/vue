import Vue from 'vue'
import App from './App'
import router from './router/routes'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//自己写的样式
import './style/theme.css'
import './style/characters.css'

// 注册element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

router.beforeEach((to,from,next) => {
  if (to.meta.requireAuth){
    next({
      path: '/',
      query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
    })
  }else{
    next();
  }
});
