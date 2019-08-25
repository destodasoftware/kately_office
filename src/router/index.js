import Vue from 'vue'
import Router from 'vue-router'
import AboutMainManager from '@/apps/about/AboutMainManager'
import UserLoginManager from '@/apps/users/UserLoginManager'
import DashboardMainManager from '@/apps/dashboards/DashboardMainManager'
// import CategoryMainManager from '@/apps/categories/CategoryMainManager'
// import BrandMainManager from '@/apps/brands/BrandMainManager'
import BrandMainManager from '@/Brands/Apps/BrandMainManager'
import ArticleMainManager from '@/apps/articles/ArticleMainManager'
import ArticleComposeManager from '@/apps/articles/ArticleComposeManager'
import ProductBulkManager from '@/apps/products/ProductBulkManager'
// import PurchasingMainManager from '@/apps/purchasing/PurchasingMainManager'
// import PurchaseComposeManager from '@/apps/purchasing/PurchaseComposeManager'
// import SaleMainManager from '@/apps/sales/SaleMainManager'
// import SaleComposeManager from '@/apps/sales/SaleComposeManager'
import SaleReportMainManager from '@/SaleReports/Apps/SaleReportMainManager'
import CustomerMainManager from '@/Customers/Apps/CustomerMainManager'
import CategoryMainManager from '@/Categories/Apps/CategoryMainManager'
import ProductMainManager from '@/Products/Apps/ProductMainManager'
import ProductComposeManager from '@/Products/Apps/ProductComposeManager'
import PurchaseMainManager from '@/Purchases/Apps/PurchaseMainManager'
import PurchaseComposeManager from '@/Purchases/Apps/PurchaseComposeManager'
import SaleMainManager from '@/Sales/Apps/SaleMainManager'
import SaleComposeManager from '@/Sales/Apps/SaleComposeManager'

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
      path: '/PurchaseMainManager',
      name: 'PurchaseMainManager',
      component: PurchaseMainManager,
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
      path: '/PurchaseMainManager',
      name: 'PurchaseMainManager',
      component: PurchaseMainManager,
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
      path: '/SaleReportMainManager',
      name: 'SaleReportMainManager',
      component: SaleReportMainManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/CustomerMainManager',
      name: 'CustomerMainManager',
      component: CustomerMainManager,
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
