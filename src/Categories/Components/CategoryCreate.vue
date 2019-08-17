<template>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <label>Nama Kategori</label>
        <input v-model="myCategory.name" type="text" class="form-control">
      </div>
      <div class="form-group">
        <button
          class="btn btn-primary"
          @click="onCreate"
        >
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
      myCategory: {
        name: ''
      }
    }
  },
  methods: {
    onCreate () {
      this.$emit('onCreate', this.myCategory)
    }
  }
}
</script>

<style>

</style>
