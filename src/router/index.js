import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import { getUser } from '../utils/storage'
import Home from '@/views/home'
import Articles from '@/views/articles'
import Pictures from '@/views/pictures'
import Page404 from '@/views/page404'
import AddArticle from '@/views/articles/add.vue'
import EditArticle from '@/views/articles/edit.vue'

Vue.use(VueRouter)

const routes = [
  // 登录页
  { path: '/login', component: Login },
  // 后台管理页面
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', component: Home },
      { path: 'articles', component: Articles },
      { path: 'pictures', component: Pictures }
    ]
  },
  { path: '/add-article', component: AddArticle },
  { path: '/edit-article/:id', component: EditArticle },
  // 404页面
  {
    path: '*',
    component: Page404
  }
]

const router = new VueRouter({
  routes
})

// 登录拦截
router.beforeEach((to, from, next) => {
  const userInfo = getUser()
  if (to.path === '/login' || userInfo.token) {
    next()
  } else {
    next('/login')
  }
})

export default router
