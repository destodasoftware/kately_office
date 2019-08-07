<template>
  <div v-if="propCategory">
    <!-- Update -->
    <div v-if="category" class="card">
      <div class="card-body">
        <h5 class="card-title">Detil Kategori</h5>
        <div class="form-group">
          <label>Nama Kategori</label>
          <input v-model="category.name" type="text" class="form-control bg-light" />
        </div>
        <div class="form-group">
          <button @click="categoryUpdate" class="btn btn-primary">Simpan Perubahan</button>
          <button @click="categoryDestroy" class="btn btn-light">Hapus</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryDetail',
  props: {
    propCategory: Object
  },
  data () {
    return {
      category: undefined
    }
  },
  methods: {
    edit () {
      this.category = Object.assign({}, this.propCategory)
    },
    abort () {
      this.category = undefined
    },
    categoryUpdate () {
      const value = Object.assign({}, this.category)
      this.category = undefined
      this.$emit('categoryUpdate', value)
    },
    categoryDestroy () {
      const value = Object.assign({}, this.category)
      this.category = undefined
      this.$emit('categoryDestroy', value)
    }
  },
  watch: {
    propCategory (n, o) {
      this.category = n
    }
  }
}
</script>

<style>

</style>
