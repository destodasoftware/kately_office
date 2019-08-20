<template>
  <common-layout>
    <common-header>Kelola Produk</common-header>
    <!-- section 1 -->
    <div class="row mb-4">
      <div class="col-md-8">
        <button
          class="btn btn-primary"
          v-b-modal.modal-ProductCreate
        >
          Produk Baru
        </button>
        <router-link :to="{
            name: 'ProductComposeManager',
            params: {
              id: product.id
            }
          }"
          v-if="product"
          class="btn btn-outline-primary"
        >
          Informasi Produk
        </router-link>
      </div>
      <div class="col-md-4">
        <b-pagination
          class="float-right"
          v-model="queryProduct.page"
          :total-rows="paginationProduct.count"
          @change="onPaginateProduct"
          :per-page="20"
          aria-controls="my-table"
        >
        </b-pagination>
        <button
          class="btn btn-outline-primary float-right"
          v-b-modal.modal-ProductFilter
        >
          Filter
        </button>
      </div>
    </div>
    <!-- section 2 -->
    <div class="row mb-4">
      <div class="col-md-12">
        <div class="card">
          <product-list
            @onSelect="onSelectProduct"
            :products="products"
          >
          </product-list>
        </div>
        <b-modal
          hide-footer
          id="modal-ProductCreate"
          title="Buat Produk Baru"
          size="lg"
          ref="modal-ProductCreate"
          scrollable
        >
          <product-create
            @onCreate="onCreateProduct"
          >
          </product-create>
        </b-modal>
        <b-modal
          hide-footer
          id="modal-ProductFilter"
          title="Filter Produk"
          size="lg"
          ref="modal-ProductFilter"
          scrollable
        >
          <product-filter @onFilter="onFilterProduct">
            <brand-typeahead @onHit="onHitBrand"></brand-typeahead>
          </product-filter>
        </b-modal>
      </div>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from '@/Commons/CommonLayout'
import CommonHeader from '@/Commons/CommonHeader'
import MixinHttp from '@/mixins/MixinHttp'
import HelperError from '@/Helpers/HelperError'
import HelperText from '@/Helpers/HelperText'

import ProductService from '@/Products/ProductService'
import ProductList from '@/Products/Components/ProductList'
import ProductCreate from '@/Products/Components/ProductCreate'
import ProductFilter from '@/Products/Components/ProductFilter'

import BrandTypeahead from '@/Brands/Components/BrandTypeahead'

export default {
  name: 'ProductMainManager',
  components: {
    'common-layout': CommonLayout,
    'common-header': CommonHeader,
    'product-list': ProductList,
    'product-create': ProductCreate,
    'product-filter': ProductFilter,
    'brand-typeahead': BrandTypeahead
  },
  mixins: [
    MixinHttp,
    HelperError,
    HelperText,
    ProductService
  ],
  methods: {
    onSelectProduct (product) {
      this.retrieveProduct(product.id)
    },
    onCreateProduct (product) {
      this.product = product
      this.product.sku = this.generateSKU('PRD')
      this.createProduct()
        .then((response) => {
          this.listProduct()
          this.$refs['modal-ProductCreate'].hide()
        })
    },
    onPaginateProduct (page) {
      this.queryProduct.page = page
      this.listProduct()
    },
    onFilterProduct (query) {
      this.queryProduct.name = query.name
      this.queryProduct.sku = query.sku
      this.queryProduct.brand = query.brand
      this.listProduct()
    },
    onHitBrand (brand) {
      this.queryProduct.brand = brand.id
      this.listProduct()
    }
  },
  mounted () {
    this.httpInit()
    this.listProduct()
  }
}
</script>

<style>

</style>
