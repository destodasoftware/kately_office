<template>
  <div v-if="payment" class="row">
    <div v-if="myPayment" class="col-md-12">
      <div v-if="!isEdit" @click="onEdit">
        <div class="form-group">
          <label>Amount</label>
          <div class="text-primary">
            {{ myPayment.amount }}
          </div>
        </div>
        <div class="form-group">
          <label>Is Paid ?</label>
          <div class="text-primary">
            {{ myPayment.is_paid }}
          </div>
        </div>
      </div>
      <div v-if="isEdit">
        <div class="form-group">
          <label>Amount</label>
          <div class="text-primary">
            {{ myPayment.amount }}
          </div>
        </div>
        <div class="form-group">
          <label>Is Paid ?</label>
          <select class="form-control" v-model="myPayment.is_paid">
            <option :value="false">No Paid</option>
            <option :value="true">Paid</option>
          </select>
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
  name: 'PaymentDetail',
  props: {
    payment: Object
  },
  data () {
    return {
      myPayment: undefined,
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
      this.$emit('onUpdate', this.myPayment)
    }
  },
  watch: {
    payment (n, o) {
      this.myPayment = n
    }
  },
  mounted () {
    this.myPayment = this.payment
  }
}
</script>

<style>

</style>
