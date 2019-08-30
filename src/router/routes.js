import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/Login.vue'
import Home from '../components/home/Home.vue'

Vue.use(Router)

export default new Router({
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
})
