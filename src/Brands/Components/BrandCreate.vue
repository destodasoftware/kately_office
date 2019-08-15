<template>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <label>Nama Brand</label>
        <input v-model="myBrand.name" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <button @click="onCreate" class="btn btn-primary">Simpan</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BrandCreate',
  data () {
    return {
      myBrand: {
        id: undefined,
        name: ''
      }
    }
  },
  methods: {
    onCreate () {
      this.$emit('onCreate', this.myBrand)
    }
  }
}
</script>
