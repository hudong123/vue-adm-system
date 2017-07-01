import Vue from 'vue'
import Router from 'vue-router'
import ArticleList from '../components/Content/ArticleList';
import Article from '../components/Content/Article';
import User from '../components/User/User'
import TableList from '../components/TableList/TableList'
import Register from '../components/Register/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ArticleList',
      component: ArticleList
    },
    {
      path: '/article/:id',
      name: 'article',
      component: Article
    },
    {
      path: '/user/:ids',
      name: 'user',
      component: User
    },
    {
      path: '/tablelist/:page',
      name: 'tablelist',
      component: TableList
    },
    {
      path: '/Register',
      name: 'register',
      component: Register
    }
  ]
})

