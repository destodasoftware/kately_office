<template>
  <KatelyBaseLayout>
    <div slot="content" class="row mb-2">
      <div class="col-md-12">
        <h4>{{ product.name }} <small class="text-muted">{{ product.sku }}</small></h4>
      </div>
    </div>
    <div slot="content" class="row mb-2">
      <div class="col-md-12">
        <!-- <KatelyBackButton /> -->
      </div>
    </div>
    <div slot="content" class="row mb-4">
      <div class="col-md-8">
        <ProductDetail
          :propProduct="product"
          @productUpdate="productUpdate"
          @productDestroy="productDestroy"
        />
        <!-- Variant -->
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">Varian Produk</h5>
            <p class="card-text">
              Lengkapi produk Anda dengan membuat variasi dari produk saat ini.
              Untuk membuatnya tinggal klik tombol di bawah ini.
            </p>
            <button v-b-modal.modal-VariantCreate class="btn btn-outline-primary">Tambah Varian Produk</button>
            <VariantCreate @variantCreate="variantCreate"/>
          </div>
        </div>
        <VariantDetail
          :propVariant="variant"
          @variantUpdate="variantUpdate"
          @variantDestroy="variantDestroy"
          @variantCancel="variantCancel"
        />
        <VariantList
          :propPagination="paginationVariant"
          :propVariants="variants"
          @variantRetrieve="variantRetrieve"
          @variantListSearch="variantListSearch"
        />
      </div>
      <div class="col-md-4">
        <CategoryInfo style="cursor: pointer" v-b-modal.modal-2 v-if="product" :propCategoryId="product.category" />
        <b-modal hide-footer hide-header id="modal-2">
          <CategoryList
            :propCategories="categories"
            :propPagination="paginationCategory"
            @categoryRetrieve="categoryRetrieve"
            @categoryListSearch="categoryListSearch"
          />
        </b-modal>
        <BrandInfo style="cursor: pointer" v-b-modal.modal-1 v-if="product" :propBrandId="product.brand"></BrandInfo>
        <b-modal hide-footer hide-header id="modal-1">
          <BrandList
            :propBrands="brands"
            :propPagination="paginationBrand"
            @brandRetrieve="brandRetrieve"
            @brandListSearch="brandListSearch"
          />
        </b-modal>
      </div>
    </div>
  </KatelyBaseLayout>
</template>

<script>
import KatelyBaseLayout from '@/commons/KatelyBaseLayout'
import KatelyBackButton from '@/commons/KatelyBackButton'
import MixinHttp from '@/mixins/MixinHttp'
import ProductDetail from '@/components/products/ProductDetail'
import ProductCreate from '@/components/products/ProductCreate'
import VariantList from '@/components/products/variants/VariantList'
import VariantCreate from '@/components/products/variants/VariantCreate'
import VariantDetail from '@/components/products/variants/VariantDetail'
import ArticleInfo from '@/components/articles/ArticleInfo'
import ArticleList from '@/components/articles/ArticleList'
import CategoryInfo from '@/components/categories/CategoryInfo'
import CategoryList from '@/components/categories/CategoryList'
import BrandList from '@/components/brands/BrandList'
import BrandInfo from '@/components/brands/BrandInfo'

export default {
  name: 'ProductComposeManager',
  mixins: [
    MixinHttp
  ],
  components: {
    KatelyBaseLayout,
    KatelyBackButton,
    ProductDetail,
    ProductCreate,
    ArticleInfo,
    ArticleList,
    CategoryInfo,
    CategoryList,
    VariantCreate,
    VariantList,
    VariantDetail,
    BrandInfo,
    BrandList
  },
  data () {
    return {
      product: undefined,
      variant: undefined,
      variants: [],
      paginationVariant: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      articles: [],
      paginationArticle: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      categories: [],
      paginationCategory: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      brands: [],
      brand: undefined,
      paginationBrand: {
        next: undefined,
        previous: undefined,
        count: 0
      }
    }
  },
  methods: {
    productUpdate (value) {
      // todo: product undo
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/products/${value.id}/`
      return this.axios.put(url, value)
        .then((response) => {
          this.product = response.data
          this.variantList()
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    productDestroy (value) {
      console.log('Not Implemented Feature!')
    },
    productRetrieve () {
      this.httpInit()
      const id = this.$route.params.id
      const url = `${process.env.ROOT_API}/office/products/${id}/`
      return this.axios.get(url)
        .then((response) => {
          this.product = response.data
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    productCreate (value) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/products/`
      return this.axios.post(url, value)
        .then((response) => {
          this.product = response.data
          this.productList()
          this.$router.push({
            name: 'ProductComposeManager',
            params: {
              id: this.product.id
            }
          })
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    articleList () {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/articles/`
      return this.axios.get(url)
        .then((response) => {
          this.articles = response.data.results
          this.paginationArticle.next = response.data.next
          this.paginationArticle.previous = response.data.previous
          this.paginationArticle.count = response.data.count
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    articleListSearch (query) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/articles/`
      return this.axios.get(url, {params: query})
        .then((response) => {
          this.articles = response.data.results
          this.paginationArticle.next = response.data.next
          this.paginationArticle.previous = response.data.previous
          this.paginationArticle.count = response.data.count
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    articleRetrieve (value) {
      this.product.article = value.id
      this.productUpdate(this.product)
    },
    categoryList () {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/categories/`
      return this.axios.get(url)
        .then((response) => {
          this.categories = response.data.results
          this.paginationCategory.next = response.data.next
          this.paginationCategory.previous = response.data.previous
          this.paginationCategory.count = response.data.count
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    categoryListSearch (query) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/categories/`
      return this.axios.get(url, {params: query})
        .then((response) => {
          this.categories = response.data.results
          this.paginationCategory.next = response.data.next
          this.paginationCategory.previous = response.data.previous
          this.paginationCategory.count = response.data.count
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    categoryRetrieve (value) {
      this.product.category = value.id
      this.productUpdate(this.product)
    },
    brandList () {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/brands/`
      return this.axios.get(url)
        .then((response) => {
          this.brands = response.data.results
          this.paginationBrand.next = response.data.next
          this.paginationBrand.previous = response.data.previous
          this.paginationBrand.count = response.data.count
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    brandRetrieve (value) {
      this.product.brand = value.id
      this.productUpdate(this.product)
    },
    brandListSearch (query) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/brands/`
      return this.axios.get(url, {params: query})
        .then((response) => {
          this.brands = response.data.results
          this.pagination.next = response.data.next
          this.pagination.previous = response.data.previous
          this.pagination.count = response.data.count
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    variantCreate (value) {
      value.root = this.product.id
      value.price = this.product.price

      this.httpInit()
      const url = `${process.env.ROOT_API}/office/products/`
      return this.axios.post(url, value)
        .then((response) => {
          this.variant = response.data
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    variantList () {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/products/`
      const query = {
        root: this.product.id
      }
      return this.axios.get(url, {params: query})
        .then((response) => {
          this.variants = response.data.results
          this.paginationVariant.next = response.data.next
          this.paginationVariant.previous = response.data.previous
          this.paginationVariant.count = response.data.count
        })
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    variantListSearch (query) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/products/`
      query.root = this.product.id
      return this.axios.get(url, {params: query})
        .then((response) => {
          this.variants = response.data.results
          this.paginationVariant.next = response.data.next
          this.paginationVariant.previous = response.data.previous
          this.paginationVariant.count = response.data.count
        })
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    variantRetrieve (value) {
      this.variant = value
    },
    variantCancel (value) {
      this.variant = value
      this.variantList()
    },
    variantUpdate (value) {
      value.root = this.product.id
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/products/${value.id}/`
      return this.axios.put(url, value)
        .then((response) => {
          this.variant = response.data
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    variantDestroy (value) {
      value.root = this.product.id
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/products/${value.id}/`
      return this.axios.delete(url)
        .then((response) => {
          this.variant = undefined
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    }
  },
  mounted () {
    this.productRetrieve().then((response) => {
      this.variantList()
    })
    this.articleList()
    this.categoryList()
    this.brandList()
  }
}
</script>

<style>

</style>
