<template>
  <div v-if="propCategory">
    <!-- Detail -->
    <div v-if="!category" class="card bg-light">
      <div class="card-header">
        Info Kategori
      </div>
      <div class="card-body">
        <span class="badge badge-info">
            {{ propCategory.name }}
        </span>
        <a @click="edit" href="javascript:void(0)" class="btn btn-link">Edit</a>
      </div>
    </div>
    <!-- Update -->
    <div v-if="category" class="card bg-light">
      <div class="card-header">
        Info Kategori
      </div>
      <div class="card-body">
        <div class="form-group">
          <label>Nama Kategori</label>
          <input @keyup.13="categoryUpdate" v-model="category.name" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <button @click="categoryUpdate" class="btn btn-primary">Simpan Perubahan</button>
          <button @click="abort" class="btn btn-link">Batal</button>
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
      this.category = undefined
    }
  }
}
</script>

<style>

</style>
