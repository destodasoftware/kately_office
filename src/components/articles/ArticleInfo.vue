<template>
  <div class="mb-4">
    <div v-if="propArticleId" class="card border-light bg-light">
      <div v-if="article" class="card-body">
        <small class="text-muted">Info Article</small>
        <h4 class="card-title text-primary">{{ article.name }}</h4>
        <p class="text-secondary">{{ article.description }}</p>
      </div>
    </div>
    <div v-if="!propArticleId" class="card border-light bg-light">
      <div class="card-body">
        <small class="text-muted">Info Article</small>
        <p class="">Ups, Tidak ada yang bisa ditampilkan!</p>
      </div>
    </div>
  </div>
</template>

<script>
import MixinHttp from '@/mixins/MixinHttp'

export default {
  name: 'ArticleInfo',
  mixins: [
    MixinHttp
  ],
  props: {
    propArticleId: Number
  },
  data () {
    return {
      article: undefined
    }
  },
  methods: {
    articleRetrieve () {
      if (this.propArticleId) {
        this.httpInit()
        const url = `${process.env.ROOT_API}/office/articles/${this.propArticleId}/`
        this.axios.get(url)
          .then((response) => {
            this.article = response.data
          })
          .catch((error) => {
            this.$bvToast.toast(error.message, error.config.option)
          })
      }
    }
  },
  mounted () {
    this.articleRetrieve()
  },
  watch: {
    propArticleId (n, o) {
      this.articleRetrieve()
    }
  }
}
</script>

<style>

</style>
