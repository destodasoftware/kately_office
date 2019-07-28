<template>
  <div v-if="propBrand">
    <!-- Detail -->
    <div v-if="!brand" class="card bg-light">
      <div class="card-header">
        Info Brand
      </div>
      <div class="card-body">
        <span class="badge badge-info">
            {{ propBrand.name }}
        </span>
        <a @click="edit" href="javascript:void(0)" class="btn btn-link">Edit</a>
      </div>
    </div>
    <!-- Update -->
    <div v-if="brand" class="card bg-light">
      <div class="card-header">
        Info Brand
      </div>
      <div class="card-body">
        <div class="form-group">
          <label>Nama Brand</label>
          <input @keyup.13="brandUpdate" v-model="brand.name" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <button @click="brandUpdate" class="btn btn-primary">Simpan Perubahan</button>
          <button @click="abort" class="btn btn-link">Batal</button>
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
    edit () {
      this.brand = Object.assign({}, this.propBrand)
    },
    abort () {
      this.brand = undefined
    },
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
      this.brand = undefined
    }
  }
}
</script>

<style>

</style>
