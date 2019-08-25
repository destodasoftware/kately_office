<template>
  <common-layout>
    <common-header
      v-if="purchase"
    >
      {{ purchase.purchase_number }}
    </common-header>
    <!-- section 1 -->
    <div v-if="purchase" class="row mb-4">
      <div class="col-md-12">
        <purchase-action
          :purchase="purchase"
          @onActionUpStock="onActionUpStock"
        />
        <button
          v-if="!purchase.brand"
          class="btn btn-outline-primary"
          v-b-modal.modal-BrandList
        >
          Pilih Brand
        </button>
        <button
          v-if="purchase.brand"
          class="btn btn-outline-primary"
          v-b-modal.modal-BrandList
        >
          Brand {{ purchase.brand_name }}
        </button>
      </div>
    </div>
    <!-- section 2 -->
    <div v-if="purchase" class="row mb-4">
      <div class="col-md-12">
        <div class="card mb-4">
          <div class="card-body">
            <purchase-detail
              :purchase="purchase"
              @onUpdate="onUpdatePurchase"
            >
            </purchase-detail>
          </div>
        </div>
        <div class="mb-4">
          <button
            v-b-modal.modal-ProductList
            class="btn btn-outline-primary"
          >
            Pilih Produk
          </button>
          <button
            v-if="purchaseItem"
            v-b-modal.modal-PurchaseItemDetail
            class="btn btn-outline-primary"
          >
            Informasi Item
          </button>
          <button
            v-if="purchaseItem"
            v-b-modal.modal-PurchaseItemDestroy
            class="btn btn-outline-dark"
          >
            Hapus Item
          </button>
        </div>
        <div class="card mb-4">
          <purchase-item-list
            :purchaseItems="purchaseItems"
            @onSelect="onSelectPurchaseItem"
          >
          </purchase-item-list>
        </div>
      </div>
    </div>
    <!-- modal -->
    <b-modal
      hide-footer
      id="modal-ProductList"
      title="Pilih Produk"
      size="lg"
      ref="modal-ProductList"
      scrollabe
    >
      <div class="row mb-4">
        <div class="col-md-6">
          <button
            v-b-modal.modal-ProductFilter
            class="btn btn-outline-primary"
          >
            Filter
          </button>
        </div>
        <div class="col-md-6">
          <b-pagination
            class="float-right"
            v-model="queryProduct.page"
            :total-rows="paginationProduct.count"
            @change="onPaginateProduct"
            :per-page="20"
            aria-controls="my-table"
          >
          </b-pagination>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-md-12">
          <product-list
            @onSelect="onSelectProduct"
            :products="products"
          >
          </product-list>
        </div>
      </div>
    </b-modal>
    <!-- modal-product-filter -->
    <b-modal
      hide-footer
      id="modal-ProductFilter"
      title="Filter Produk"
      size="lg"
      ref="modal-ProductFilter"
      scrollabe
    >
      <product-filter @onFilter="onFilterProduct"/>
    </b-modal>
    <!-- ./modal-product-filter -->
    <!-- modal-brand-list -->
    <b-modal
      hide-footer
      id="modal-BrandList"
      title="Pilih Brand"
      size="lg"
      ref="modal-BrandList"
      scrollabe
    >
      <div class="row mb-4">
        <div class="col-md-6">
          <button
            v-b-modal.modal-BrandFilter
            class="btn btn-outline-primary"
          >
            Filter
          </button>
        </div>
        <div class="col-md-6">
          <b-pagination
            class="float-right"
            v-model="queryBrand.page"
            :total-rows="paginationBrand.count"
            @change="onPaginateBrand"
            :per-page="20"
            aria-controls="my-table"
          >
          </b-pagination>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-md-12">
          <brand-list :brands="brands" @onSelect="onSelectBrand"/>
        </div>
      </div>
    </b-modal>
    <!-- ./modal-brand-list -->
    <!-- modal-brand-filter -->
    <b-modal
      hide-footer
      id="modal-BrandFilter"
      title="Filter Brand"
      size="lg"
      ref="modal-BrandFilter"
      scrollabe
    >
      <brand-filter @onFilter="onFilterBrand" />
    </b-modal>
    <!-- ./modal-brand-filter -->
    <b-modal
      v-if="product"
      hide-footer
      id="modal-ProductVariantList"
      title="Pilih Produk Variant"
      size="lg"
      ref="modal-ProductVariantList"
      scrollabe
    >
      <product-variant-list
        @onSelect="onSelectProductVariant"
        :productVariants="productVariants"
      >
      </product-variant-list>
    </b-modal>
    <b-modal
      v-if="purchaseItem"
      hide-footer
      id="modal-PurchaseItemDetail"
      title="Informasi Item"
      size="lg"
      ref="modal-PurchaseItemDetail"
      scrollabe
    >
      <purchase-item-detail
        @onUpdate="onUpdatePurchaseItem"
        :purchaseItem="purchaseItem"
      >
      </purchase-item-detail>
    </b-modal>
    <b-modal
      v-if="purchaseItem"
      hide-footer
      id="modal-PurchaseItemDestroy"
      title="Informasi Item"
      size="lg"
      ref="modal-PurchaseItemDestroy"
      scrollabe
    >
      <purchase-item-destroy
        @onDestroy="onDestroyPurchaseItem"
        :purchaseItem="purchaseItem"
      >
      </purchase-item-destroy>
    </b-modal>
  </common-layout>
</template>

<script>
import CommonLayout from '@/Commons/CommonLayout'
import CommonHeader from '@/Commons/CommonHeader'
import MixinHttp from '@/mixins/MixinHttp'

import PurchaseService from '@/Purchases/PurchaseService'
import PurchaseDetail from '@/Purchases/Components/PurchaseDetail'
import PurchaseAction from '@/Purchases/Components/PurchaseAction'

import PurchaseItemService from '@/PurchaseItems/PurchaseItemService'
import PurchaseItemList from '@/PurchaseItems/Components/PurchaseItemList'
import PurchaseItemDetail from '@/PurchaseItems/Components/PurchaseItemDetail'
import PurchaseItemDestroy from '@/PurchaseItems/Components/PurchaseItemDestroy'

import ProductService from '@/Products/ProductService'
import ProductList from '@/Products/Components/ProductList'
import ProductFilter from '@/Products/Components/ProductFilter'

import ProductVariantService from '@/ProductVariants/ProductVariantService'
import ProductVariantList from '@/ProductVariants/Components/ProductVariantList'

import BrandService from '@/Brands/BrandService'
import BrandList from '@/Brands/Components/BrandList'
import BrandFilter from '@/Brands/Components/BrandFilter'

export default {
  name: 'PurchaseComposeManager',
  components: {
    'common-layout': CommonLayout,
    'common-header': CommonHeader,
    'purchase-detail': PurchaseDetail,
    'purchase-action': PurchaseAction,
    'product-list': ProductList,
    'product-filter': ProductFilter,
    'product-variant-list': ProductVariantList,
    'purchase-item-list': PurchaseItemList,
    'purchase-item-detail': PurchaseItemDetail,
    'purchase-item-destroy': PurchaseItemDestroy,
    'brand-list': BrandList,
    'brand-filter': BrandFilter
  },
  mixins: [
    MixinHttp,
    PurchaseService,
    ProductService,
    ProductVariantService,
    PurchaseItemService,
    BrandService
  ],
  methods: {
    onUpdatePurchase (purchase) {
      this.updatePurchase(purchase.id)
    },
    onActionUpStock () {
      this.adjustmentPurchase(this.$route.params.id)
        .then((response) => {
          this.retrievePurchase(this.$route.params.id)
        })
    },
    onSelectProduct (product) {
      this.retrieveProduct(product.id)
        .then((response) => {
          if (product.number_variation > 0) {
            this.queryProductVariant.root = product.id
            this.listProductVariant()
              .then((response) => {
                this.$refs['modal-ProductVariantList'].show()
              })
          } else {
            this.$refs['modal-ProductList'].hide()
            this.purchaseItem = {
              purchase: this.purchase.id,
              product: product.id,
              quantity: 1
            }
            this.createPurchaseItem()
              .then((response) => {
                this.listPurchaseItem()
              })
          }
        })
    },
    onPaginateProduct (page) {
      this.queryProduct.page = page
      this.listProduct()
    },
    onFilterProduct (query) {
      this.queryProduct.name = query.name
      this.listProduct()
      this.$refs['modal-ProductFilter'].hide()
    },
    onSelectProductVariant (productVariant) {
      this.retrieveProduct(productVariant.id)
        .then((response) => {
          this.purchaseItem = {
            purchase: this.purchase.id,
            product: productVariant.id,
            quantity: 1
          }
          this.createPurchaseItem()
            .then((response) => {
              this.listPurchaseItem()
            })
        })
      this.$refs['modal-ProductList'].hide()
      this.$refs['modal-ProductVariantList'].hide()
    },
    onSelectPurchaseItem (purchaseItem) {
      this.retrievePurchaseItem(purchaseItem.id)
    },
    onUpdatePurchaseItem (purchaseItem) {
      this.purchaseItem = purchaseItem
      this.updatePurchaseItem(purchaseItem.id)
        .then((response) => {
          this.listPurchaseItem()
          this.$refs['modal-PurchaseItemDetail'].hide()
        })
    },
    onDestroyPurchaseItem (purchaseItem) {
      this.destroyPurchaseItem(purchaseItem.id)
        .then((response) => {
          this.listPurchaseItem()
          this.$refs['modal-PurchaseItemDestroy'].hide()
        })
    },
    onSelectBrand (brand) {
      this.retrieveBrand(brand.id)
        .then((response) => {
          this.purchase.brand = brand.id
          this.updatePurchase(this.purchase.id)
            .then((response) => {
              this.retrievePurchase(this.purchase.id)
            })
          this.$refs['modal-BrandList'].hide()
        })
    },
    onPaginateBrand (page) {
      this.queryBrand.page = page
      this.listBrand()
    },
    onFilterBrand (query) {
      this.queryBrand.name = query.name
      this.listBrand()
      this.$refs['modal-BrandFilter'].hide()
    }
  },
  mounted () {
    this.httpInit()
    this.queryProduct.show_root = true
    this.queryPurchaseItem.purchase = this.$route.params.id
    this.axios.all([
      this.retrievePurchase(this.$route.params.id),
      this.listProduct(),
      this.listPurchaseItem(),
      this.listBrand()
    ])
  }
}
</script>

<style>

</style>
