<template>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <label>Supplier</label>
        <input
          type="text"
          class="form-control"
          v-model="myPurchase.supplier"
        >
      </div>
      <div class="form-group">
        <label>Tanggal</label>
        <vue-datepicker
          v-model="myPurchase.purchase_date"
        />
      </div>
      <div class="form-group">
        <label>Catatan</label>
        <input
          type="text"
          class="form-control"
          v-model="myPurchase.note"
        >
      </div>
      <div class="form-group">
        <button
          @click="onCreate"
          class="btn btn-primary"
        >
          Simpan
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PurchaseCreate',
  data () {
    return {
      myPurchase: {
        purchase_number: '',
        purchase_date: Date.now(),
        supplier: '',
        user: undefined,
        note: '',
        is_adjusment: undefined
      }
    }
  },
  methods: {
    onCreate () {
      const myDate = this.myPurchase.purchase_date
      this.myPurchase.purchase_date = `${myDate.getFullYear()}-${myDate.getMonth()}-${myDate.getDate()}`
      this.$emit('onCreate', this.myPurchase)
    }
  }
}
</script>

<style>

</style>
