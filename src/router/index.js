import Vue from 'vue'
import VueRouter from 'vue-router'
import { getUser } from '../utils/storage'
const Pictures = () => import('@/views/pictures')
const Page404 = () => import('@/views/page404')
const AddArticle = () => import('@/views/articles/add.vue')
const EditArticle = () => import('@/views/articles/edit.vue')
const Comment = () => import('@/views/comment/index.vue')
const Fans = () => import('@/views/fans/index.vue')
const Settings = () => import('@/views/settings/index.vue')
const Articles = () => import('@/views/articles')
const Home = () => import('@/views/home')
const Layout = () => import('@/views/layout')
const Login = () => import('@/views/login')

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
      { path: 'comment', component: Comment },
      { path: 'fans', component: Fans },
      { path: 'settings', component: Settings },
      { path: 'pictures', component: Pictures },
      { path: '/add-article', component: AddArticle },
      { path: '/edit-article/:id', component: EditArticle }
    ]
  },

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
