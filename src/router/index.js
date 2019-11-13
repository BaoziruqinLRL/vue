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
// 个人中心
const memberInfo = r => require.ensure([], () => r(require('@/components/pages/memberInfo')),'memberInfo');
// 邮件定制
const emailSetting = r => require.ensure([], () => r(require('@/components/pages/emailSetting')),'emailSetting');
// 食谱页
const foodMenu = r => require.ensure([], () => r(require('@/components/pages/foodMenu')),'foodMenu');
// 视频列表页
const videoList = r => require.ensure([], () => r(require('@/components/pages/videoList')),'videoList');
// 3D测试页
const threeTest = r => require.ensure([], () => r(require('@/components/pages/threePractise')), 'threeTest');
// 3D测试页
const threeMap = r => require.ensure([], () => r(require('@/components/pages/threeMap')), 'threeMap');
// jkshow
const jkShow = r => require.ensure([],() => r(require('@/components/pages/jkShow')), 'jkShow');

const Routers = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      meta: {
        requireAuth: false,
        requireMember: false,
        pageName: "登录页"
      }
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        requireAuth: true,
        requireMember: false,
        pageName: "主页"
      }
    },
    {
      path: '/member-navigation',
      name: 'memberNavigation',
      component: memberNavigation,
      meta: {
        requireAuth: true,
        requireMember: true,
        pageName: "首页导航栏"
      },
      children: [
        {
          path: '',
          name: 'memberBase',
          component: memberBase,
          meta: {
            requireAuth: true,
            requireMember: true,
            pageName: "首页"
          }
        },
        {
          path: '/video-list',
          name: 'videoList',
          component: videoList,
          meta: {
            requireAuth: true,
            requireMember: true,
            pageName: "视频列表页"
          }
        },
        {
          path: '/food-menu',
          name: 'foodMenu',
          component: foodMenu,
          meta: {
            requireAuth: true,
            requireMember: true,
            pageName: "食谱页"
          }
        },
        {
          path: '/one-one',
          name: 'oneOne',
          component: memberBase,
          meta: {
            requireAuth: true,
            requireMember: true,
            pageName: "1-1页"
          }
        },
        {
          path: '/one-two',
          name: 'oneTwo',
          component: memberBase,
          meta: {
            requireAuth: true,
            requireMember: true,
            pageName: "1-2页"
          }
        },
        {
          path: '/one-three',
          name: 'oneThree',
          component: memberBase,
          meta: {
            requireAuth: true,
            requireMember: true,
            pageName: "1-3页"
          }
        },
        {
          path: '/two-one',
          name: 'twoOne',
          component: jkShow,
          meta: {
            requireAuth: true,
            requireMember: true,
            pageName: "2-1页"
          }
        },
        {
          path: '/two-two',
          name: 'twoTwo',
          component: threeTest,
          meta: {
            requireAuth: true,
            requireMember: true,
            pageName: "2-2页"
          }
        },
        {
          path: '/member-info',
          name: 'memberInfo',
          component: threeMap,
          meta: {
            requireAuth: true,
            requireMember: true,
            pageName: "个人中心"
          }
        },
        {
          path: '/email-setting',
          name: 'emailSetting',
          component: emailSetting,
          meta: {
            requireAuth: true,
            requireMember: true,
            pageName: "邮件定制"
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

