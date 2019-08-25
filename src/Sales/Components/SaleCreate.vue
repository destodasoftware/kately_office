<template>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <label>Tanggal Penjualan</label>
        <vue-datepicker v-model="mySale.sale_date" />
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
  name: 'SaleCreate',
  data () {
    return {
      mySale: {
        sale_number: undefined,
        user: undefined,
        customer: undefined,
        status: undefined,
        brand: undefined,
        sale_date: new Date()
      }
    }
  },
  methods: {
    onCreate () {
      this.$emit('onCreate', this.mySale)
    }
  }
}
</script>

<style>

</style>
