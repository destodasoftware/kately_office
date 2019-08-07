<template>
  <div>
    <b-modal
      id="modal-PurchaseCreate"
      header-bg-variant="primary"
      header-text-variant="white"
      title="Persediaan Baru"
    >
      <div class="form-group">
        <label>Vendor / Supplier</label>
        <input v-model="purchase.supplier" type="text" class="form-control bg-light">
      </div>
      <div class="form-group">
        <label>Catatan</label>
        <textarea v-model="purchase.note" class="form-control bg-light" cols="30" rows="10"></textarea>
      </div>
      <div slot="modal-footer">
        <button @click="purchaseCreate" class="btn btn-primary">Simpan</button>
      </div>
    </b-modal>
  </div>
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
