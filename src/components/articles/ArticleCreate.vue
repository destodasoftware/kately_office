<template>
  <button @click="articleCreate" class="btn btn-primary">
    Artikel Baru
  </button>
</template>

<script>

export default {
  name: 'CategoryCreate',
  data () {
    return {
      article: {
        name: 'My Article',
        description: 'No description',
        brand: undefined
      }
    }
  },
  methods: {
    articleCreate () {
      const value = Object.assign({}, this.article)
      this.article.name = 'My Article'
      this.$emit('articleCreate', value)
    }
  }
}
</script>

<style>

</style>
