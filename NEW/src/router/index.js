import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login/Login'
import Home from '../components/Home'
import NotFound from '../components/404.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        component: function (resolve) {
            require(['../components/Login/Login.vue'], resolve)
        },
        name: '登录',
        hidden: true
    },
    {
        path: '*',
        component: function (resolve) {
            require(['../components/404.vue'], resolve)
        },
        name: '',
        hidden: true
    },
    {
        path: '/home',
        component: Home,
        name: '首页',
        children: [
            { 
                path: '/home', 
                component: function (resolve) {
                    require(['../components/Index/index.vue'], resolve)
                },
                meta: { requiresAuth: true }
            }
        ]
    },
    {
        path: '/',
        name: '个人中心',
        component: Home,
        children: [
            { 
                path: '/setting/account', 
                component: function (resolve) {
                    require(['../components/Setting/account.vue'], resolve)
                },
                name: '账户设置', 
                meta: { requiresAuth: true }
            }
        ]
    },
    {
        path: '/',
        name: '供需管理',
        component: Home,
        children: [
            { 
                path: '/skill/skill', 
                component: function (resolve) {
                    require(['../components/Skill/skill.vue'], resolve)
                },
                name: '技能管理', 
                meta: { requiresAuth: true }
            }
        ]
    },
    {
        path: '/',
        name: '用户中心',
        component: Home,
        children: [
            { 
                path: '/user/user', 
                component: function (resolve) {
                    require(['../components/user/user.vue'], resolve)
                },
                name: '用户管理', 
                meta: { requiresAuth: true }
            }
        ]
    },
    {
        path: '/',
        name: '财务管理',
        component: Home,
        children: [
            { 
                path: '/finance/finance', 
                component: function (resolve) {
                    require(['../components/Finance/finance.vue'], resolve)
                },
                name: '管理财务', 
                meta: { requiresAuth: true }
            }
        ]
    },
    {
        path: '/',
        name: 'APP管理',
        component: Home,
        children: [
            { 
                path: '/app/push', 
                component: function (resolve) {
                    require(['../components/APP/push.vue'], resolve)
                },
                name: '推送管理', 
                meta: { requiresAuth: true }
            },
            { 
                path: '/app/ad', 
                component: function (resolve) {
                    require(['../components/APP/ad.vue'], resolve)
                },
                name: '广告页管理', 
                meta: { requiresAuth: true }
            },
            { 
                path: '/app/banner', 
                component: function (resolve) {
                    require(['../components/APP/banner.vue'], resolve)
                },
                name: 'banner管理', 
                meta: { requiresAuth: true }
            }
        ]
    }
  ]
})
