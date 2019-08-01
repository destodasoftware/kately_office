<template>
  <div v-if="propPurchase">
    <!-- Detail -->
    <!-- <div @click="edit" v-if="!purchase" class="card border-light bg-light click">
      <div class="card-body">
        <small class="text-muted">Info Penyediaan Produk</small>
        <h4 class="card-title text-primary">
          {{ propPurchase.purchase_number }}
        </h4>
        <p class="text-dark">
          <span class="badge badge-pill badge-primary">{{ propPurchase.pic }}</span>
          <span class="badge badge-pill badge-primary">Total: {{ propPurchase.total_stock }}</span>
          <span class="badge badge-pill badge-dark">{{ propPurchase.supplier }}</span>
          <span class="badge badge-pill badge-dark">{{ propPurchase.create }}</span>
        </p>
      </div>
    </div> -->
    <!-- Update -->
    <div v-if="purchase" class="card bg-light border-light">
      <div class="card-body">
        <small class="text-muted no-print">Ubah Penyediaan</small>
        <div class="form-group row">
          <label class="col-md-3">Nomer Transaksi</label>
          <div class="col-md-9">
            <p v-if="purchase.purchase_number" class="text-primary">{{ purchase.purchase_number }}</p>
            <p v-if="!purchase.purchase_number" class="text-primary">-</p>
          </div>
        </div>
        <div class="form-group row no-print">
          <label class="col-md-3">Supplier</label>
          <div class="col-md-9">
            <input v-debounce:500ms="purchaseUpdate" v-model="purchase.supplier" type="text" class="form-control" />
          </div>
        </div>
        <div class="form-group row no-print">
          <label class="col-md-3">Catatan</label>
          <div class="col-md-9">
            <input v-debounce:500ms="purchaseUpdate" v-model="purchase.note" type="text" class="form-control" />
          </div>
        </div>
        <div class="form-group row no-print">
          <label class="col-md-3">Stok Naik?</label>
          <div class="col-md-9">
            <p v-if="!purchase.is_adjusment" class="text-danger">Tertahan!</p>
            <p v-if="purchase.is_adjusment" class="text-success">Done!</p>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3">Total Stok</label>
          <div class="col-md-9">
            <p>{{ purchase.total_stock }}</p>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3">PIC</label>
          <div class="col-md-9">
            <p>{{ purchase.pic }}</p>
          </div>
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
