import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 登录页面
const login = r => require.ensure([], () => r(require('@/components/pages/login')), 'login');
// 主页
const home = r => require.ensure([], () => r(require('@/components/pages/home')), 'home');

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: {
      requireAuth: true
    }
  }
]

export default new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production'
});

