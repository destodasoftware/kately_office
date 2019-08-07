<template>
  <div>
    <b-modal
      header-bg-variant="primary"
      header-text-variant="white"
      id="modal-SaleCreate"
      title="Penjualan Baru"
    >
      <div class="form-group">
        <label>Tanggal Penjualan</label>
        <input type="date" class="form-control" v-model="sale.sale_date">
      </div>
      <div slot="modal-footer">
        <button class="btn btn-primary" @click="saleCreate">Simpan</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'SaleCreate',
  data () {
    return {
      sale: {
        sale_number: '',
        user: undefined,
        total: 0,
        brand: undefined,
        status: 'open',
        sale_date: ''
      }
    }
  },
  methods: {
    saleCreate () {
      const value = Object.assign({}, this.sale)
      value.sale_number = this.skuGen()
      this.$emit('saleCreate', value)
    },
    skuGen () {
      let random = Math.floor(Math.random() * 10000)
      let data = new Date()
      return `ORD-${data.getDate()}${data.getMonth()}${data.getFullYear()}${random}`
    }
  }
}
</script>
