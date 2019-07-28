import Vue from 'vue'
import Router from 'vue-router'
import UserLoginManager from '@/apps/users/UserLoginManager'
import DashboardMainManager from '@/apps/dashboards/DashboardMainManager'
import CategoryMainManager from '@/apps/categories/CategoryMainManager'
import BrandMainManager from '@/apps/brands/BrandMainManager'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'UserLoginManager',
      component: UserLoginManager
    },
    {
      path: '/DashboardMainManager',
      name: 'DashboardMainManager',
      component: DashboardMainManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/CategoryMainManager',
      name: 'CategoryMainManager',
      component: CategoryMainManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/BrandMainManager',
      name: 'BrandMainManager',
      component: BrandMainManager,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
      // next({
      //     path: '/',
      //     params: { nextUrl: to.fullPath }
      // })
      next({path: '/'})
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
