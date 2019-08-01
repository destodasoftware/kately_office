<template>
  <KatelyBaseLayout>
    <div slot="content" class="row mb-4">
      <div class="col-md-12">
        <h1 class="display-4">Artikel</h1>
      </div>
    </div>
    <div slot="content" class="row mb-4">
      <div class="col-md-12">
        <ArticleCreate @articleCreate="articleCreate" />
      </div>
    </div>
    <div slot="content" class="row mb-2">
      <div class="col-md-12">
        <ArticleList
          @articleRetrieve="articleRetrieve"
          :propArticles="articles"
          :propPagination="pagination"
          @articleListSearch="articleListSearch"
        />
      </div>
    </div>
  </KatelyBaseLayout>
</template>

<script>
import KatelyBaseLayout from '@/commons/KatelyBaseLayout'
import MixinHttp from '@/mixins/MixinHttp'
import ArticleList from '@/components/articles/ArticleList'
import ArticleCreate from '@/components/articles/ArticleCreate'
import ArticleInfo from '@/components/articles/ArticleInfo'
import BrandInfo from '@/components/brands/BrandInfo'

export default {
  name: 'ArticleMainManager',
  mixins: [
    MixinHttp
  ],
  components: {
    KatelyBaseLayout,
    ArticleList,
    ArticleCreate,
    BrandInfo,
    ArticleInfo
  },
  data () {
    return {
      articles: [],
      article: undefined,
      pagination: {
        next: undefined,
        previous: undefined,
        count: 0
      }
    }
  },
  methods: {
    setPagination (response) {
      this.pagination.next = response.data.next
      this.pagination.previous = response.data.previous
      this.pagination.count = response.data.count
    },
    articleList () {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/articles/`
      return this.axios.get(url)
        .then((response) => {
          this.articles = response.data.results
          this.setPagination(response)
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    articleRetrieve (value) {
      this.article = value
      this.redirectCompose()
    },
    articleListSearch (query) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/articles/`
      return this.axios.get(url, {params: query})
        .then((response) => {
          this.articles = response.data.results
          this.setPagination(response)
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
    },
    redirectCompose () {
      this.$router.push({name: 'ArticleComposeManager', params: {id: this.article.id}})
    },
    clear () {
      this.article = undefined
    }
  },
  mounted () {
    this.articleList()
  }
}
</script>

<style>

</style>
