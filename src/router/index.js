import Vue from 'vue'
import Router from 'vue-router'
import AboutMainManager from '@/apps/about/AboutMainManager'
import UserLoginManager from '@/apps/users/UserLoginManager'
import DashboardMainManager from '@/apps/dashboards/DashboardMainManager'
import CategoryMainManager from '@/apps/categories/CategoryMainManager'
import BrandMainManager from '@/apps/brands/BrandMainManager'
import ArticleMainManager from '@/apps/articles/ArticleMainManager'
import ArticleComposeManager from '@/apps/articles/ArticleComposeManager'
import ProductMainManager from '@/apps/products/ProductMainManager'
import ProductComposeManager from '@/apps/products/ProductComposeManager'
import ProductBulkManager from '@/apps/products/ProductBulkManager'
import PurchasingMainManager from '@/apps/purchasing/PurchasingMainManager'
import PurchaseComposeManager from '@/apps/purchasing/PurchaseComposeManager'
import SaleMainManager from '@/apps/sales/SaleMainManager'
import SaleComposeManager from '@/apps/sales/SaleComposeManager'
import ReportSaleManager from '@/apps/reportings/ReportSaleManager'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'UserLoginManager',
      component: UserLoginManager
    },
    {
      path: '/Credits',
      name: 'AboutMainManager',
      component: AboutMainManager,
      meta: {
        requiresAuth: true
      }
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
    },
    {
      path: '/ArticleMainManager',
      name: 'ArticleMainManager',
      component: ArticleMainManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/ArticleComposeManager/:id',
      name: 'ArticleComposeManager',
      component: ArticleComposeManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/ProductMainManager',
      name: 'ProductMainManager',
      component: ProductMainManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/ProductComposeManager/:id',
      name: 'ProductComposeManager',
      component: ProductComposeManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/ProductBulkManager',
      name: 'ProductBulkManager',
      component: ProductBulkManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/PurchasingMainManager',
      name: 'PurchasingMainManager',
      component: PurchasingMainManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/PurchaseComposeManager/:id',
      name: 'PurchaseComposeManager',
      component: PurchaseComposeManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/SaleMainManager',
      name: 'SaleMainManager',
      component: SaleMainManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/SaleComposeManager/:id',
      name: 'SaleComposeManager',
      component: SaleComposeManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/report/sale',
      name: 'ReportSaleManager',
      component: ReportSaleManager,
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
