<template>
  <div>
    <button v-b-modal.modal-BrandCreate class="btn btn-primary">Brand Baru</button>
    <b-modal
      id="modal-BrandCreate"
      header-bg-variant="primary"
      header-text-variant="white"
      title="Brand Baru"
    >
      <div class="form-group">
        <label>Nama Brand</label>
        <input
          v-model="brand.name"
          type="text"
          class="form-control"
        />
      </div>
      <div slot="modal-footer">
        <button @click="brandCreate" class="btn btn-primary">Simpan</button>
      </div>
    </b-modal>
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
