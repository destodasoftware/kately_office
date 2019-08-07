<template>
  <div v-if="propPurchase">
    <!-- Update -->
    <div v-if="purchase" class="card">
      <div class="card-body">
        <h5 class="card-title">Persediaan</h5>
        <div class="form-group">
          <label>Nomer Transaksi</label>
          <input v-model="purchase.purchase_number" type="text" class="form-control bg-light" disabled>
        </div>
        <div class="form-group">
          <label>Status Stok ?</label>
          <div>
            <span class="font-weight-bold">{{ purchase.total_stock }}</span> stok
            <span v-if="!purchase.is_adjusment" class="text-danger">tertahan.</span>
            <span v-if="purchase.is_adjusment" class="text-primary">masuk.</span>
            Penanggung jawab <span class="font-weight-bold">{{ purchase.pic }}</span>
          </div>
        </div>
        <div class="form-group">
          <label>Supplier</label>
          <input v-model="purchase.supplier" type="text" class="form-control bg-light">
        </div>
        <div class="form-group">
          <label>Catatan</label>
          <textarea v-model="purchase.note" rows="4" cols="30" class="form-control bg-light"></textarea>
        </div>
        <div class="form-group">
          <button class="btn btn-primary" @click="purchaseUpdate">Simpan Perubahan</button>
          <button class="btn btn-light" @click="purchaseDestroy">Hapus</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PurchaseDetail',
  props: {
    propPurchase: Object
  },
  data () {
    return {
      purchase: undefined
    }
  },
  methods: {
    edit () {
      this.purchase = Object.assign({}, this.propPurchase)
    },
    abort () {
      this.purchase = undefined
    },
    purchaseUpdate () {
      const value = Object.assign({}, this.purchase)
      this.$emit('purchaseUpdate', value)
    },
    purchaseDestroy () {
      const value = Object.assign({}, this.purchase)
      this.purchase = undefined
      this.$emit('purchaseDestroy', value)
    }
  },
  watch: {
    purchaseDestroy (n, o) {
      this.purchase = undefined
    },
    propPurchase (n, o) {
      this.purchase = this.propPurchase
    }
  }
}
</script>

<style>

</style>
