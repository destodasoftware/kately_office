<template>
  <common-layout>
    <common-header v-if="product">
      {{ product.name }}
    </common-header>
    <!-- section 1 -->
    <div class="row mb-4">
      <div class="col-md-8">
        <button
          class="btn btn-outline-dark"
          v-b-modal.modal-ProductDestroy
        >
          Hapus Produk
        </button>
      </div>
    </div>
    <!-- section 2 -->
    <div class="row mb-4">
      <div class="col-md-8">
        <div class="card mb-4">
          <div class="card-body">
            <product-detail
              :product="product"
              @onUpdate="onUpdateProduct"
            />
          </div>
        </div>
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">Variasi Produk</h5>
            <div class="row mb-4">
              <div class="col-md-12">
                <button
                  class="btn btn-primary"
                  v-b-modal.modal-ProductVariantCreate
                >
                  Variasi Produk Baru
                </button>
                <button
                  class="btn btn-outline-primary"
                  v-if="productVariant"
                  v-b-modal.modal-ProductVariantDetail
                >
                  Informasi Variasi Produk
                </button>
                <button
                  class="btn btn-outline-dark"
                  v-if="productVariant"
                  v-b-modal.modal-ProductVariantDestroy
                >
                  Hapus Variasi Produk
                </button>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col-md-12">
                <product-variant-list
                  :productVariants="productVariants"
                  @onSelect="onSelectProductVariant"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="product" class="col-md-4">
        <div
          v-if="!product.category_name"
          class="card mb-4"
          v-b-modal.modal-CategoryList
        >
          <div class="card-body">
            Pilih Kategori
          </div>
        </div>
        <div
          v-if="product.category_name"
          class="card mb-4"
          v-b-modal.modal-CategoryList
        >
          <div class="card-body">
            <h5 class="card-title">Kategori</h5>
            <p class="card-text">
              {{ product.category_name }}
            </p>
          </div>
        </div>

        <div
          v-if="!product.brand_name"
          class="card mb-4"
          v-b-modal.modal-BrandList
        >
          <div class="card-body">
            Pilih Brand
          </div>
        </div>
        <div
          v-if="product.brand_name"
          class="card mb-4"
          v-b-modal.modal-BrandList
        >
          <div class="card-body">
            <h5 class="card-title">Brand</h5>
            <p class="card-text">
              {{ product.brand_name }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- modal -->
    <b-modal
      hide-footer
      id="modal-ProductDestroy"
      title="Hapus Produk"
      size="lg"
      ref="modal-ProductDestroy"
      scrollable
    >
      <product-destroy
        :product="product"
        @onDestroy="onDestroyProduct"
      />
    </b-modal>
    <b-modal
      hide-footer
      id="modal-CategoryList"
      title="Pilih Kategori"
      size="lg"
      ref="modal-CategoryList"
      scrollable
    >
      <div class="row mb-4">
        <div class="col-md-8">
          <button
            class="btn btn-primary"
            v-b-modal.modal-CategoryCreate
          >
            Kategori Baru
          </button>
        </div>
        <div class="col-md-4">
          <b-pagination
            class="float-right"
            v-model="queryCategory.page"
            :total-rows="paginationCategory.count"
            @change="onPaginateCategory"
            :per-page="20"
            aria-controls="my-table"
          >
          </b-pagination>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Filter Kategori</h5>
              <category-filter
                @onFilter="onFilterCategory"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-md-12">
          <div class="card">
            <category-list
              :categories="categories"
              @onSelect="onSelectCategory"
            />
          </div>
        </div>
      </div>
    </b-modal>
    <b-modal
      hide-footer
      id="modal-BrandList"
      title="Pilih Brand"
      size="lg"
      ref="modal-BrandList"
      scrollable
    >
      <div class="row mb-4">
        <div class="col-md-12">
          <div class="card">
            <brand-list
              :brands="brands"
              @onSelect="onSelectBrand"
            />
          </div>
        </div>
      </div>
    </b-modal>
    <b-modal
      hide-footer
      id="modal-CategoryCreate"
      title="Buat Kategori Baru"
      size="lg"
      ref="modal-CategoryCreate"
      scrollable
    >
      <category-create
        @onCreate="onCreateCategory"
      />
    </b-modal>
    <b-modal
      v-if="product"
      hide-footer
      id="modal-ProductVariantCreate"
      title="Buat Variasi Baru"
      size="lg"
      ref="modal-ProductVariantCreate"
      scrollable
    >
      <product-variant-create
        v-if="product.brand_name && product.category_name"
        @onCreate="onCreateProductVariant"
      />
    </b-modal>
    <b-modal
      hide-footer
      id="modal-ProductVariantDetail"
      title="Informasi Variasi Produk"
      size="lg"
      ref="modal-ProductVariantDetail"
      scrollable
    >
      <product-variant-detail
        :productVariant="productVariant"
        @onUpdate="onUpdateProductVariant"
      />
    </b-modal>
    <b-modal
      hide-footer
      id="modal-ProductVariantDestroy"
      title="Hapus Variasi Produk"
      size="lg"
      ref="modal-ProductVariantDestroy"
      scrollable
    >
      <product-variant-destroy
        :productVariant="productVariant"
        @onDestroy="onDestroyProductVariant"
      />
    </b-modal>
  </common-layout>
</template>

<script>
import CommonLayout from '@/Commons/CommonLayout'
import CommonHeader from '@/Commons/CommonHeader'
import MixinHttp from '@/mixins/MixinHttp'
import HelperText from '@/Helpers/HelperText'

import ProductService from '@/Products/ProductService'
import ProductDetail from '@/Products/Components/ProductDetail'
import ProductDestroy from '@/Products/Components/ProductDestroy'

import CategoryService from '@/Categories/CategoryService'
import CategoryList from '@/Categories/Components/CategoryList'
import CategoryFilter from '@/Categories/Components/CategoryFilter'
import CategoryCreate from '@/Categories/Components/CategoryCreate'

import BrandService from '@/Brands/BrandService'
import BrandList from '@/Brands/Components/BrandList'
import BrandFilter from '@/Brands/Components/BrandFilter'
import BrandCreate from '@/Brands/Components/BrandCreate'

import ProductVariantService from '@/ProductVariants/ProductVariantService'
import ProductVariantList from '@/ProductVariants/Components/ProductVariantList'
import ProductVariantCreate from '@/ProductVariants/Components/ProductVariantCreate'
import ProductVariantDetail from '@/ProductVariants/Components/ProductVariantDetail'
import ProductVariantDestroy from '@/ProductVariants/Components/ProductVariantDestroy'

export default {
  name: 'ProductComposeManager',
  components: {
    'common-layout': CommonLayout,
    'common-header': CommonHeader,
    'product-detail': ProductDetail,
    'product-destroy': ProductDestroy,
    'category-list': CategoryList,
    'category-filter': CategoryFilter,
    'category-create': CategoryCreate,
    'brand-list': BrandList,
    'brand-filter': BrandFilter,
    'brand-create': BrandCreate,
    'product-variant-list': ProductVariantList,
    'product-variant-create': ProductVariantCreate,
    'product-variant-detail': ProductVariantDetail,
    'product-variant-destroy': ProductVariantDestroy
  },
  mixins: [
    MixinHttp,
    HelperText,
    ProductService,
    CategoryService,
    BrandService,
    ProductVariantService
  ],
  methods: {
    onUpdateProduct (product) {
      this.updateProduct(product.id)
    },
    onDestroyProduct (product) {
      this.destroyProduct(product.id)
        .then((response) => {
          this.$router.push({
            name: 'ProductMainManager'
          })
        })
    },
    onSelectCategory (category) {
      this.product.category = category.id
      this.updateProduct(this.product.id)
      this.$refs['modal-CategoryList'].hide()
    },
    onFilterCategory (query) {
      this.queryCategory.name = query.name
      this.listCategory()
    },
    onCreateCategory (category) {
      this.category = category
      this.createCategory()
        .then((response) => {
          this.listCategory()
          this.$refs['modal-CategoryCreate'].hide()
        })
    },
    onPaginateCategory (page) {
      this.queryCategory.page = page
      this.listCategory()
    },
    onSelectBrand (brand) {
      this.retrieveBrand(brand.id)
        .then((response) => {
          this.product.brand = brand.id
          this.updateProduct(this.product.id)
            .then((response) => {
              this.$refs['modal-BrandList'].hide()
              this.retrieveProduct()
              this.listProductVariant()
            })
        })
    },
    onSelectProductVariant (productVariant) {
      this.retrieveProductVariant(productVariant.id)
    },
    onCreateProductVariant (productVariant) {
      productVariant.sku = this.generateSKU('PRD')
      productVariant.category = this.product.category
      productVariant.brand = this.product.brand
      productVariant.root = this.product.id
      productVariant.cost = this.product.cost
      productVariant.name = `${this.product.name}`

      if (productVariant.color) {
        productVariant.name += ` ${productVariant.color}`
      }

      if (productVariant.size) {
        productVariant.name += ` ${productVariant.size}`
      }

      if (!productVariant.price) {
        productVariant.price = this.product.price
      }

      this.productVariant = productVariant
      this.createProductVariant()
        .then((response) => {
          this.$refs['modal-ProductVariantCreate'].hide()
          this.listProductVariant()
        })
    },
    onUpdateProductVariant (productVariant) {
      productVariant.name = `${this.product.name}`

      if (productVariant.color) {
        productVariant.name += ` ${productVariant.color}`
      }

      if (productVariant.size) {
        productVariant.name += ` ${productVariant.size}`
      }

      this.productVariant = productVariant
      this.updateProductVariant(productVariant.id)
        .then((response) => {
          this.$refs['modal-ProductVariantDetail'].hide()
          this.listProductVariant()
        })
    },
    onDestroyProductVariant (productVariant) {
      this.destroyProductVariant(productVariant.id)
        .then((response) => {
          this.$refs['modal-ProductVariantDestroy'].hide()
          this.listProductVariant()
          this.retrieveProduct(this.product.id)
        })
    }
  },
  mounted () {
    this.httpInit()
    const id = this.$route.params.id
    this.queryProductVariant.root = id
    this.axios.all([
      this.retrieveProduct(id),
      this.listCategory(),
      this.listProductVariant(),
      this.listBrand()
    ])
  }
}
</script>

<style>

</style>
