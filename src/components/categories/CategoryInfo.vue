<template>
  <div class="mb-4">
    <div v-if="propCategoryId" class="card">
      <div v-if="category" class="card-body">
        <h5 class="card-text">Kategori</h5>
        <p class="card-title">{{ category.name }}</p>
      </div>
    </div>
    <div v-if="!propCategoryId" class="card">
      <div class="card-body">
        <h5 class="card-text">Kategori</h5>
        <p class="card-title">Anda belum memilih kategori</p>
      </div>
    </div>
  </div>
</template>

<script>
import MixinHttp from '@/mixins/MixinHttp'

export default {
  name: 'CategoryInfo',
  mixins: [
    MixinHttp
  ],
  props: {
    propCategoryId: Number
  },
  data () {
    return {
      category: undefined
    }
  },
  methods: {
    categoryRetrieve () {
      if (this.propCategoryId) {
        this.httpInit()
        const url = `${process.env.ROOT_API}/office/categories/${this.propCategoryId}/`
        this.axios.get(url)
          .then((response) => {
            this.category = response.data
          })
          .catch((error) => {
            this.$bvToast.toast(error.message, error.config.option)
          })
      }
    }
  },
  mounted () {
    this.categoryRetrieve()
  },
  watch: {
    propCategoryId (n, o) {
      this.categoryRetrieve()
    }
  }
}
</script>

<style>

</style>
