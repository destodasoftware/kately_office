<template>
  <KatelyBaseLayout>
    <div slot="content" class="row mb-4">
      <div class="col-md-12">
        <h1 v-if="article" class="display-4">{{ article.name }}</h1>
      </div>
    </div>
    <div slot="content" class="row mb-4">
      <div class="col-md-12">
        <ArticleCreate @articleCreate="articleCreate" />
        <KatelyBackButton />
      </div>
    </div>
    <div slot="content" class="row mb-4">
      <div class="col-md-8">
        <ArticleDetail
          :propArticle="article"
          @articleUpdate="articleUpdate"
        />
      </div>
      <div class="col-md-4">
        <BrandInfo style="cursor: pointer" v-b-modal.modal-1 v-if="article" :propBrandId="article.brand"></BrandInfo>
        <b-modal hide-footer hide-header id="modal-1">
          <BrandList
            :propBrands="brands"
            :propPagination="pagination"
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
import ArticleDetail from '@/components/articles/ArticleDetail'
import ArticleCreate from '@/components/articles/ArticleCreate'
import BrandList from '@/components/brands/BrandList'
import BrandInfo from '@/components/brands/BrandInfo'

export default {
  name: 'ArticleMainManager',
  mixins: [
    MixinHttp
  ],
  components: {
    KatelyBaseLayout,
    KatelyBackButton,
    ArticleDetail,
    ArticleCreate,
    BrandList,
    BrandInfo
  },
  data () {
    return {
      article: undefined,
      brands: [],
      brand: undefined,
      pagination: {
        next: undefined,
        previous: undefined,
        count: undefined
      }
    }
  },
  methods: {
    articleUpdate (value) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/articles/${value.id}/`
      return this.axios.put(url, value)
        .then((response) => {
          this.article = response.data
          this.articleRetrieve()
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    articleRetrieve () {
      this.httpInit()
      const id = this.$route.params.id
      const url = `${process.env.ROOT_API}/office/articles/${id}/`
      return this.axios.get(url)
        .then((response) => {
          this.article = response.data
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    brandList () {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/brands/`
      return this.axios.get(url)
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
    brandRetrieve (value) {
      this.article.brand = value.id
      this.articleUpdate(this.article)
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
    articleCreate (value) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/articles/`
      return this.axios.post(url, value)
        .then((response) => {
          this.article = response.data
          this.articleList()
          this.$router.push({
            name: 'ArticleComposeManager',
            params: {
              id: this.article.id
            }
          })
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    }
  },
  mounted () {
    this.articleRetrieve()
    this.brandList()
  }
}
</script>

<style>

</style>
