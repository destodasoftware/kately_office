<template>
  <div class="card mb-3 bg-light">
    <div class="card-header">
      Tambah Kategori
    </div>
    <div class="card-body">
      <div class="form-group">
        <label>Nama Kategori</label>
        <input @keyup.13="categoryCreate" v-model="category.name" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <button @click="categoryCreate" class="btn btn-primary">
          Simpan
        </button>
      </div>
    </div>
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
