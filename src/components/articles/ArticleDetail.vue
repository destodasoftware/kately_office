<template>
  <div v-if="propArticle">
    <!-- Detail -->
    <div @click="edit" v-if="!article" class="card border-light bg-light click">
      <div class="card-body">
        <small class="text-muted">Info Artikel</small>
        <h4 class="card-title text-primary">{{ propArticle.name }}</h4>
        <p class="text-dark">{{ propArticle.description }}</p>
      </div>
    </div>
    <!-- Update -->
    <div v-if="article" class="card bg-light border-light">
      <div class="card-body">
        <small class="text-muted">Ubah Artikel</small>
        <div class="form-group">
          <input @keyup.13="articleUpdate" v-model="article.name" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <textarea class="form-control" v-model="article.description" cols="30" rows="10"></textarea>
        </div>
        <div class="form-group">
          <button @click="articleUpdate" class="btn btn-primary">Simpan Perubahan</button>
          <button @click="abort" class="btn btn-link">Batal</button>
          <button @click="articleDestroy" class="btn btn-light">Hapus</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BrandDetail',
  props: {
    propArticle: Object
  },
  data () {
    return {
      article: undefined
    }
  },
  methods: {
    edit () {
      this.article = Object.assign({}, this.propArticle)
    },
    abort () {
      this.article = undefined
    },
    articleUpdate () {
      const value = Object.assign({}, this.article)
      this.article = undefined
      this.$emit('articleUpdate', value)
    },
    articleDestroy () {
      const value = Object.assign({}, this.article)
      this.article = undefined
      this.$emit('articleDestroy', value)
    }
  },
  watch: {
    propArticle (n, o) {
      this.article = undefined
    }
  }
}
</script>

<style>
.click {
  cursor: pointer;
}
</style>
