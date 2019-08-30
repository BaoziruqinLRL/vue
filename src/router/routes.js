import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/Login.vue'
import Home from '../components/home/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'HomePage',
      component: Home,
      meta: {
        requireAuth: true
      }
    }
  ]
});

export default router;

router.beforeEach((to,from,next) => {
  if (to.meta.requireAuth){
    if (sessionStorage.getItem("login success") != null){
      next();
    }else {
      next({
        name: 'Login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }else{
    next();
  }
});
