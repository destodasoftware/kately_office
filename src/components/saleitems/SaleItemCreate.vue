
<template>
<div class="card">
  <div class="card-body">
    <button @click="saleCreate" class="btn btn-primary">Penjualan Baru</button>
  </div>

</div>

</template>

<script>
export default {
  name: 'SaleCreate',
  data () {
    return {
      saleItem: {
        product: undefined,
        sale: undefined,
        price: 0,
        quantity: 1
      }
    }
  },
  methods: {
    saleItemCreate () {
      const value = Object.assign({}, this.saleItem)
      this.$emit('saleItemCreate', value)
    }
  }
}
</script>
