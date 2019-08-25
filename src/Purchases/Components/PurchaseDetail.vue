<template>
  <div v-if="purchase" class="row">
    <div v-if="myPurchase" class="col-md-12">
      <div v-if="!isEdit" @click="onEdit">
        <div class="form-group">
          <label>Nomer Pembelian</label>
          <div class="text-primary">
            {{ myPurchase.purchase_number }}
          </div>
        </div>
        <div class="form-group">
          <label>Tanggal</label>
          <div class="text-primary">
            {{ myPurchase.purchase_date }}
          </div>
        </div>
        <div class="form-group">
          <label>Supplier</label>
          <div class="text-primary">
            {{ myPurchase.supplier }}
          </div>
        </div>
        <div class="form-group">
          <label>PIC</label>
          <div class="text-primary">
            {{ myPurchase.pic }}
          </div>
        </div>
      </div>
      <div v-if="isEdit">
        <div class="form-group">
          <label>Nomer Pembelian</label>
          <input
            type="text"
            class="form-control"
            disabled
            v-model="myPurchase.purchase_number"
          >
        </div>
        <div class="form-group">
          <label>Tanggal</label>
          <vue-datepicker
            v-model="myPurchase.purchase_date"
          />
        </div>
        <div class="form-group">
          <label>Supplier</label>
          <input
            type="text"
            class="form-control"
            v-model="myPurchase.supplier"
          >
        </div>
        <div class="form-group">
          <label>PIC</label>
          <input
            type="text"
            disabled
            class="form-control"
            v-model="myPurchase.pic"
          >
        </div>
        <div class="form-group">
          <button
            @click="onUpdate"
            class="btn btn-primary"
          >
            Simpan
          </button>
          <button
            class="btn btn-link text-muted"
            @click="onCancel"
          >
            Batalkan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PurchaseDetail',
  props: {
    purchase: Object
  },
  data () {
    return {
      myPurchase: undefined,
      isEdit: false
    }
  },
  methods: {
    onEdit () {
      this.isEdit = true
    },
    onCancel () {
      this.isEdit = false
    },
    onUpdate () {
      this.onCancel()
      let myDate = this.myPurchase.purchase_date
      this.myPurchase.purchase_date = `${myDate.getFullYear()}-${myDate.getMonth()}-${myDate.getDate()}`
      this.$emit('onUpdate', this.myPurchase)
    }
  },
  watch: {
    purchase (n, o) {
      this.myPurchase = n
    }
  },
  mounted () {
    this.myPurchase = this.purchase
  }
}
</script>

<style>

</style>
