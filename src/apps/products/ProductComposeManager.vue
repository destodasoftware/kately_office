<template>
  <KatelyBaseLayout>
    <div slot="content" class="row mb-4">
      <div class="col-md-12">
        <h1 v-if="product" class="display-4">
          {{ product.article_name }} {{ product.name }} {{ product.size }} {{ product.color }}
        </h1>
      </div>
    </div>
    <div slot="content" class="row mb-4">
      <div class="col-md-12">
        <ProductCreate @productCreate="productCreate" />
        <KatelyBackButton />
      </div>
    </div>
    <div slot="content" class="row mb-4">
      <div class="col-md-12">
        <ProductDetail
          :propProduct="product"
          @productUpdate="productUpdate"
          @productDestroy="productDestroy"
        />
        <ArticleInfo style="cursor: pointer" v-b-modal.modal-1 v-if="product" :propArticleId="product.article" />
        <b-modal hide-footer hide-header id="modal-1">
          <div class="row mb-2">
            <div class="col-md-12">
              <button class="btn btn-primary">Lorem</button>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-md-12">
              <ArticleList
                :propArticles="articles"
                :propPagination="paginationArticle"
                @articleRetrieve="articleRetrieve"
                @articleListSearch="articleListSearch"
              />
            </div>
          </div>
        </b-modal>
        <CategoryInfo style="cursor: pointer" v-b-modal.modal-2 v-if="product" :propCategoryId="product.category" />
        <b-modal hide-footer hide-header id="modal-2">
          <CategoryList
            :propCategories="categories"
            :propPagination="paginationCategory"
            @categoryRetrieve="categoryRetrieve"
            @categoryListSearch="categoryListSearch"
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
import ArticleInfo from '@/components/articles/ArticleInfo'
import ArticleList from '@/components/articles/ArticleList'
// import ArticleCreate from '@/components/articles/ArticleCreate'
import CategoryInfo from '@/components/categories/CategoryInfo'
import CategoryList from '@/components/categories/CategoryList'

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
    CategoryList
  },
  data () {
    return {
      product: undefined,
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
    }
  },
  mounted () {
    this.productRetrieve()
    this.articleList()
    this.categoryList()
  }
}
</script>

<style>

</style>
