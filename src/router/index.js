import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import test from '@/test.vue'
import sky_takeaway from '@/views/sky_takeaway.vue'
import ulogin from '@/views/user/ulogin.vue'
import controller from '@/views/admin/controller.vue'
import detial from '@/views/admin/detial.vue'
import setting from '@/views/admin/setting.vue'
import { useTokenStore } from '@/stores/token'
import menu from '@/views/user/menu.vue'
import cart from '@/views/user/cart.vue'
// 路由配置
const routes = [
  {
    path: '/',
    redirect:'/sky_takeaway',
    component: sky_takeaway,
    meta: { requireAuth: false }
  },
  {
    path: '/sky_takeaway',
    component: sky_takeaway,
    meta: { requireAuth: false }
  },
  {
    path: '/test',
    component: test,
    meta: { requireAuth: false }
  },
  {
    path: '/ulogin',
    component: ulogin,
    meta: { requireAuth: false }
  },
  {
    path: '/controller',
    component: controller,
    redirect: '/controller/detial',
    meta: { requireAuth: true },
    children: [
      { path: 'detial', component: detial },
      { path: 'setting', component: setting }
    ]
  },
  {
    path: '/menu',
    component: menu,
    meta: { requireAuth: false }
  },
  {
    path: '/cart',
    component: cart,
    meta: { requireAuth: true }
  }


]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const tokenStore = useTokenStore()
  const isAuthenticated = Boolean(tokenStore.token) // 检查是否有认证标记，例如在 localStorage 中的 token

  if (to.matched.some(record => record.meta.requireAuth) && !isAuthenticated) {
    next({
      path: '/ulogin',
      query: { redirect: to.fullPath } // 在登录后可以重定向回之前试图访问的页面
    })
    ElMessage.error({ message: '无权限，请登录', duration: 1500 });


  } else {
    next() // 继续导航
  }
})

export default router
