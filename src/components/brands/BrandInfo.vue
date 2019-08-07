<template>
  <div class="mb-4">
    <div v-if="propBrandId" class="card">
      <div v-if="brand" class="card-body">
        <h5 class="card-text">Brand</h5>
        <p class="card-title">{{ brand.name }}</p>
      </div>
    </div>
    <div v-if="!propBrandId" class="card">
      <div class="card-body">
        <h5 class="card-text">Brand</h5>
        <p class="card-title">
          Sepertinya Anda belum memilihnya
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import MixinHttp from '@/mixins/MixinHttp'

export default {
  name: 'BrandInfo',
  mixins: [
    MixinHttp
  ],
  props: {
    propBrandId: Number
  },
  data () {
    return {
      brand: undefined
    }
  },
  methods: {
    brandRetrieve () {
      if (this.propBrandId) {
        this.httpInit()
        console.log(this.propBrandId)
        const url = `${process.env.ROOT_API}/office/brands/${this.propBrandId}/`
        this.axios.get(url)
          .then((response) => {
            this.brand = response.data
          })
          .catch((error) => {
            this.$bvToast.toast(error.message, error.config.option)
          })
      }
    }
  },
  mounted () {
    this.brandRetrieve()
  },
  watch: {
    propBrandId (n, o) {
      this.brandRetrieve()
    }
  }
}
</script>

<style>

</style>
