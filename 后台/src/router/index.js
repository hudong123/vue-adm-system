import Vue from 'vue'
import Router from 'vue-router'
import Content from '../components/Content/content'
import Announce from '../components/Announce/announce';
import finance from '../components/Detail/finance';
import statistics from '../components/Detail/statistics';
import balance from '../components/Manage/balance'
import customer from '../components/Manage/customer'
import order from '../components/Manage/order'
import people from '../components/Manage/people'
import service from '../components/Manage/service'
import comment from '../components/Manage/comment'
import invoice from '../components/Manage/invoice'
import account from '../components/Setting/account'
import busy from '../components/Setting/busy'
import shop from '../components/Setting/shop'
import Talk from '../components/Talk/Talk'
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
        path: '/talk',
        component: Home,
        name: '在线客服',
        children: [
            { 
                path: '/talk', 
                component: function (resolve) {
                    require(['../components/Talk/Talk.vue'], resolve)
                },
                meta: { requiresAuth: true }
            }
        ]
    },
    {
        path: '/',
        name: '商户管理',
        component: Home,
        children: [
            { 
                path: '/manage/customer',
                component: function (resolve) {
                    require(['../components/Manage/customer.vue'], resolve)
                },
                name: '客户管理',
                meta: { requiresAuth: true }
            },
            { 
                path: '/manage/people',
                component: function (resolve) {
                    require(['../components/Manage/people.vue'], resolve)
                }, 
                name: '人员管理', 
                meta: { requiresAuth: true }
            },
            { 
                path: '/manage/service', 
                component: function (resolve) {
                    require(['../components/Manage/service.vue'], resolve)
                }, 
                name: '服务管理', 
                meta: { requiresAuth: true }
            },
            { 
                path: '/manage/invoice', 
                component: function (resolve) {
                    require(['../components/Manage/invoice.vue'], resolve)
                }, 
                name: '账单管理', 
                meta: { requiresAuth: true }
            },
            { 
                path: '/manage/order',
                component: function (resolve) {
                    require(['../components/Manage/order.vue'], resolve)
                }, 
                name: '订单管理', 
                meta: { requiresAuth: true }
            },
            { 
                path: '/manage/balance', 
                component: function (resolve) {
                    require(['../components/Manage/balance.vue'], resolve)
                },
                name: '优惠管理', 
                meta: { requiresAuth: true }
            },
            { 
                path: '/manage/comment', 
                component: function (resolve) {
                    require(['../components/Manage/comment.vue'], resolve)
                },
                name: '评论管理', 
                meta: { requiresAuth: true }
            }
        ]
    },
    {
        path: '/',
        name: '商户设置',
        component: Home,
        children: [
            { 
                path: '/setting/account', 
                component: function (resolve) {
                    require(['../components/Setting/account.vue'], resolve)
                },
                name: '账户设置', 
                meta: { requiresAuth: true }
            },
            { 
                path: '/setting/busy', 
                component: function (resolve) {
                    require(['../components/Setting/busy.vue'], resolve)
                },
                name: '忙时设置', 
                meta: { requiresAuth: true }
            },
            { 
                path: '/setting/shop', 
                component: function (resolve) {
                    require(['../components/Setting/shop.vue'], resolve)
                },
                name: '店铺设置', 
                meta: { requiresAuth: true }
            }
        ]
    },
    {
        path: '/',
        name: '商户明细',
        component: Home,
        children: [
            { 
                path: '/detail/finance', 
                component: function (resolve) {
                    require(['../components/Detail/finance.vue'], resolve)
                },
                name: '财务明细', 
                meta: { requiresAuth: true }
            },
            { 
                path: '/detail/statistics', 
                component: function (resolve) {
                    require(['../components/Detail/statistics.vue'], resolve)
                }, 
                name: '数据统计', 
                meta: { requiresAuth: true }
            }
        ]
    },
    {
        path: '/announce',
        component: Home,
        name: '商户公告',
        children: [
            { 
                path: '/announce', 
                component: function (resolve) {
                    require(['../components/Announce/announce.vue'], resolve)
                },
                meta: { requiresAuth: true }
            }
        ]
    }
  ]
})
