<template>
  <div class="mb-4">
    <button v-b-modal.modal-CategoryCreate class="btn btn-primary">Kategori Baru</button>
    <b-modal
      header-bg-variant="primary"
      header-text-variant="white"
      id="modal-CategoryCreate"
      title="Kategori Baru"
    >
      <div class="form-group">
        <label>Nama Kategori</label>
        <input v-model="category.name" type="text" class="form-control bg-light" />
      </div>
      <div slot="modal-footer">
        <button @click="categoryCreate" class="btn btn-primary">Simpan</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'CategoryCreate',
  data () {
    return {
      category: {
        name: 'Uncategoriez'
      }
    }
  },
  methods: {
    categoryCreate () {
      const value = Object.assign({}, this.category)
      this.category.name = 'Uncategoriez'
      this.$emit('categoryCreate', value)
    }
  }
}
</script>

<style>

</style>
