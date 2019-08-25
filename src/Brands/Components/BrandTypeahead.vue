<template>
  <div class="form-group">
    <label>Brand</label>
    <vue-bootstrap-typeahead
      v-model="name"
      :data="brands"
      :serializer="item => item.name"
      @hit="onHit"
      placeholder="Cari Brand"
    />
  </div>
</template>

<script>
import MixinHttp from '@/mixins/MixinHttp'
import BrandService from '@/Brands/BrandService'

export default {
  name: 'BrandTypeahead',
  mixins: [
    MixinHttp,
    BrandService
  ],
  data () {
    return {
      name: ''
    }
  },
  methods: {
    onHit (brand) {
      this.$emit('onHit', brand)
    }
  },
  watch: {
    name (n, o) {
      this.queryBrand.name = n
      this.listBrand()
    }
  }
}
</script>

<style>

</style>
