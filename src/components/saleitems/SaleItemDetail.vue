<template>
  <div v-if="propSaleItem">
    <div v-if="saleItem" class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">Detil Item Penjualan</h5>
        <div class="form-group">
          <label>Nama Produk</label>
          <div class="text-primary">{{ saleItem.product_name }}</div>
        </div>
        <div class="form-group">
          <label>Harga</label>
          <input v-model="saleItem.price" type="text" class="form-control bg-light">
        </div>
        <div class="form-group">
          <label>Jumlah</label>
          <input v-model="saleItem.quantity" type="text" class="form-control bg-light">
        </div>
        <div class="form-group">
          <button @click="saleItemUpdate" class="btn btn-primary">Simpan Perubahan</button>
          <button @click="saleItemDestroy" class="btn btn-light">Hapus</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SaleItemDetail',
  props: {
    propSaleItem: Object
  },
  data () {
    return {
      saleItem: undefined
    }
  },
  methods: {
    abort () {
      this.saleItem = undefined
    },
    saleItemUpdate () {
      const value = Object.assign({}, this.saleItem)
      this.$emit('saleItemUpdate', value)
    },
    saleItemDestroy () {
      const value = Object.assign({}, this.saleItem)
      this.saleItem = undefined
      this.$emit('saleItemDestroy', value)
    }
  },
  created () {
    this.saleItem = this.propSaleItem
  },
  watch: {
    propSaleItem (n, o) {
      this.saleItem = n
    }
  }
}
</script>

<style>

</style>
