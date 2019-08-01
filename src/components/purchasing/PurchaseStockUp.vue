<template>
  <button @click="purchaseStockUp" v-if="!propPurchase.is_adjusment" class="btn btn-outline-primary no-print">Naikan Stok</button>
</template>

<script>
export default {
  name: 'PurchaseStockUp',
  props: {
    propPurchase: Object
  },
  methods: {
    purchaseStockUp () {
      this.$emit('purchaseStockUp', this.propPurchase)
    }
  }
}
</script>

<style>

</style>
