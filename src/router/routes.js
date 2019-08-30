import Vue from 'vue'
import Router from 'vue-router'

// 主页
const Home = () => import('@/components/pages/Home')
// 登录页面
const Login = () => import('@/components/pages/Login')

Vue.use(Router)
let RouterObj = new Router({
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
})

RouterObj.beforeEach((to, from, next) => {
  next()
})

export default RouterObj
