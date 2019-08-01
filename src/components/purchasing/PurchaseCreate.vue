<template>
  <button @click="purchaseCreate" class="btn btn-primary no-print">
    Transaksi Baru
  </button>
</template>

<script>

export default {
  name: 'PurchaseCreate',
  data () {
    return {
      purchase: {
        purchase_number: undefined,
        supplier: 'My Supplier',
        note: ''
      }
    }
  },
  methods: {
    purchaseCreate () {
      const value = Object.assign({}, this.purchase)
      value.purchase_number = this.skuGen()
      this.$emit('purchaseCreate', value)
    },
    skuGen () {
      let random = Math.floor(Math.random() * 10000)
      let data = new Date()
      return `NPP-${data.getDate()}${data.getMonth()}${data.getFullYear()}${random}`
    }
  }
}
</script>

<style>

</style>
