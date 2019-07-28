<template>
  <div class="card mb-4 bg-light">
    <div class="card-header">Tambah Brand</div>
    <div class="card-body">
      <div class="form-group">
        <label>Nama Brand</label>
        <input
          @keyup.13="brandCreate"
          v-model="brand.name"
          type="text"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <button @click="brandCreate" class="btn btn-primary">Simpan</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BrandCreate',
  data () {
    return {
      brand: {
        name: 'My Brand'
      }
    }
  },
  methods: {
    brandCreate () {
      const value = Object.assign({}, this.brand)
      this.brand.name = 'My Brand'
      this.$emit('brandCreate', value)
    }
  }
}
</script>

<style>

</style>
