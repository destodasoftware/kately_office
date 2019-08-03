<template>
  <button @click="saleCreate" class="btn btn-primary">Penjualan Baru</button>
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
        status: 'open'
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
