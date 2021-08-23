import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    name: 'Order',
    meta: {
      title: '網路點餐'
    },
    component: () => import('../views/Order.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 修改每頁頁籤標題
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }else{
    document.title = '如常 朝午食'
  }
  next();
})

export default router
