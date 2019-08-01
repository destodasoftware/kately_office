<template>
  <button @click="productCreate" class="btn btn-primary">
    Produk Baru
  </button>
</template>

<script>

export default {
  name: 'ProductCreate',
  data () {
    return {
      product: {
        article: undefined,
        category: undefined,
        sku: undefined,
        name: 'Awesome Product',
        cost: 0,
        price: 0,
        stock: 1,
        minimum_stock: 1,
        color: undefined,
        size: undefined
      }
    }
  },
  methods: {
    productCreate () {
      const value = Object.assign({}, this.product)
      value.sku = this.skuGen()
      this.$emit('productCreate', value)
    },
    skuGen () {
      let random = Math.floor(Math.random() * 1000)
      let data = new Date()
      return `PRD-${data.getDate()}${data.getMonth()}${data.getFullYear()}${random}`
    }
  }
}
</script>

<style>

</style>
