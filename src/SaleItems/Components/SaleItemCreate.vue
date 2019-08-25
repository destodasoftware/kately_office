<template>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <label>Nama</label>
        <input
          type="text"
          class="form-control"
          v-model="mySaleItem.name"
        >
      </div>
      <div class="form-group">
        <button
          @click="onCreate"
          class="btn btn-primary"
        >
          Simpan
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SaleItemCreate',
  data () {
    return {
      mySaleItem: {
        name: undefined
      }
    }
  },
  methods: {
    onCreate () {
      this.$emit('onCreate', this.mySaleItem)
    }
  }
}
</script>

<style>

</style>
