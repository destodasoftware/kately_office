<template>
  <div>
    <div v-if="propBrandId" class="card border-light bg-light">
      <div v-if="brand" class="card-body">
        <small class="text-muted">Info Brand</small>
        <h4 class="card-title text-primary">{{ brand.name }}</h4>
      </div>
    </div>
    <div v-if="!propBrandId" class="card border-light bg-light">
      <div class="card-body">
        <small class="text-muted">Info Brand</small>
        <p class="">Ups, Tidak ada yang bisa ditampilkan!</p>
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
