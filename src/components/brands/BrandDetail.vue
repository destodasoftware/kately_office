<template>
  <div v-if="propBrand" class="mb-4">
    <!-- Update -->
    <div v-if="brand" class="card">
      <div class="card-body">
        <h5 class="card-title">Detail Brand</h5>
        <div class="form-group">
          <label>Nama Brand</label>
          <input v-model="brand.name" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <button @click="brandUpdate" class="btn btn-primary">Simpan Perubahan</button>
          <button @click="brandDestroy" class="btn btn-light">Hapus</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BrandDetail',
  props: {
    propBrand: Object
  },
  data () {
    return {
      brand: undefined
    }
  },
  methods: {
    brandUpdate () {
      const value = Object.assign({}, this.brand)
      this.brand = undefined
      this.$emit('brandUpdate', value)
    },
    brandDestroy () {
      const value = Object.assign({}, this.brand)
      this.brand = undefined
      this.$emit('brandDestroy', value)
    }
  },
  watch: {
    propBrand (n, o) {
      this.brand = n
    }
  }
}
</script>

<style>

</style>
