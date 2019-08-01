<template>
  <div>
    <div v-if="!propPurchaseItem" class="card bg-light border-light no-print">
      <div class="card-body text-dark">
        Pilih item untuk mengedit! jika item belum tersedia, tambahkan item terlebih dahulu
        dengan scanner barcode atau cara manual.
      </div>
    </div>
    <div v-if="propPurchaseItem" class="card bg-light border-light">
      <div class="card-body">
        <small class="text-muted">Ubah Item Persediaan</small>
        <div class="form-group row">
          <label class="col-md-3">Produk SKU</label>
          <div class="col-md-9">
            <span v-if="purchaseItem.product_sku" class="text-primary">
              {{ purchaseItem.product_sku }}
            </span>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3">Produk</label>
          <div class="col-md-9">
            <span v-if="purchaseItem.product_name" class="text-primary">
              {{ purchaseItem.product_article }} {{ purchaseItem.product_name }}
            </span>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3">Jumlah Stok</label>
          <div class="col-md-9">
            <input v-debounce:500ms="purchaseItemUpdate" v-model="purchaseItem.quantity" type="text" class="form-control" />
          </div>
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
    edit () {
      this.purchaseItem = Object.assign({}, this.propPurchaseItem)
    },
    abort () {
      this.purchaseItem = undefined
    },
    purchaseItemUpdate () {
      const value = Object.assign({}, this.purchaseItem)
      this.$emit('purchaseItemUpdate', value)
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
