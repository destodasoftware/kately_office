<template>
  <div class="mb-4">
    <div v-if="propPurchaseItem" class="card">
      <div v-if="purchaseItem" class="card-body">
        <h5 class="card-title">Detil Item Persediaan</h5>
        <div class="form-group">
          <label>SKU</label>
          <input v-model="purchaseItem.product_sku" type="text" class="form-control bg-light" disabled>
        </div>
        <div class="form-group">
          <label>Produk</label>
          <div class="text-primary">{{ purchaseItem.product_name }}</div>
        </div>
        <div class="form-group">
          <label>Jumlah Stok</label>
          <input v-model="purchaseItem.quantity" type="text" class="form-control bg-light">
        </div>
        <div class="form-group">
          <button @click="purchaseItemUpdate" class="btn btn-primary">Simpan Perubahan</button>
          <button @click="purchaseItemDestroy" class="btn btn-light">Hapus</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PurchaseItemDetail',
  props: {
    propPurchaseItem: Object
  },
  data () {
    return {
      purchaseItem: undefined
    }
  },
  methods: {
    purchaseItemUpdate () {
      this.$emit('purchaseItemUpdate', this.purchaseItem)
    },
    purchaseItemDestroy () {
      const value = Object.assign({}, this.purchaseItem)
      this.purchaseItem = undefined
      this.$emit('purchaseItemDestroy', value)
    }
  },
  watch: {
    propPurchaseItem (n, o) {
      this.purchaseItem = n
    }
  }
}
</script>

<style>

</style>
