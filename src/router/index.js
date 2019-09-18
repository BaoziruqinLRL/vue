import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 登录页面
const login = r => require.ensure([], () => r(require('@/components/pages/login')), 'login');
// 主页
const home = r => require.ensure([], () => r(require('@/components/pages/home')), 'home');
// 导航主页
const memberNavigation = r => require.ensure([], () => r(require('@/components/pages/memberNavigation')), 'memberNavigation')
// 导航主页首页展示
const memberBase = r => require.ensure([], () => r(require('@/components/pages/memberBaseShow')),'memberBase');

const Routers = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      meta: {
        requireAuth: false,
        requireMember: false
      }
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        requireAuth: true,
        requireMember: false
      }
    },
    {
      path: '/member-navigation',
      name: 'memberNavigation',
      component: memberNavigation,
      meta: {
        requireAuth: true,
        requireMember: true
      },
      children: [
        {
          path: '',
          name: 'memberBase',
          component: memberBase,
          meta: {
            requireAuth: true,
            requireMember: true
          }
        },
        {
          path: '/zero',
          name: 'zero',
          component: memberBase,
          meta: {
            requireAuth: true,
            requireMember: true
          }
        },
        {
          path: '/one-one',
          name: 'oneOne',
          component: memberBase,
          meta: {
            requireAuth: true,
            requireMember: true
          }
        },
        {
          path: '/one-two',
          name: 'oneTwo',
          component: memberBase,
          meta: {
            requireAuth: true,
            requireMember: true
          }
        },
        {
          path: '/one-three',
          name: 'oneThree',
          component: memberBase,
          meta: {
            requireAuth: true,
            requireMember: true
          }
        }
      ]
    }
  ],
  strict: process.env.NODE_ENV !== 'production'
});

Routers.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (localStorage.getItem("username")) {  // 通过vuex state获取当前的token是否存在
      if (to.meta.requireMember) {
        // 判断路由是否需要成员登陆权限
        if (localStorage.getItem("memberId")) {
          next();
        } else {
          next({
            name: 'home'
          })
        }
      } else {
        next();
      }
    }else{
      next({
        name: 'login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next();
  }
});

export default Routers;

