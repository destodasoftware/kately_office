<template>
  <div v-if="propPayment">
    <div v-if="payment" class="card">
      <div class="card-body">
        <h5 class="card-title">Detil Pembayaran</h5>
        <div class="form-group">
          <label>Jumlah</label>
          <input v-model="payment.amount" disabled type="text" class="form-control bg-light">
        </div>
        <div class="form-group">
          <div class="form-check">
            <input v-model="payment.is_paid" class="form-check-input" type="checkbox" value="" id="defaultCheck1">
            <label class="form-check-label" for="defaultCheck1">
              Is Paid ?
            </label>
          </div>
        </div>
        <div class="form-group">
          <button @click="paymentUpdate" class="btn btn-primary">Simpan Perubahan</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentDetail',
  props: {
    propPayment: Object
  },
  data () {
    return {
      banks: [
        {
          name: 'Bank BCA',
          id: 'BCA'
        },
        {
          name: 'Bank Mandiri',
          id: 'MANDIRI'
        },
        {
          name: 'Bank BNI',
          id: 'BNI'
        },
        {
          name: 'Bank BTN',
          id: 'BTN'
        },
        {
          name: 'Bank BRI',
          id: 'BRI'
        },
        {
          name: 'Bank Cimb Niaga',
          id: 'Cimb Niaga'
        }
      ],
      payment: undefined
    }
  },
  methods: {
    paymentUpdate () {
      const value = Object.assign({}, this.payment)
      this.payment = undefined
      this.$emit('paymentUpdate', value)
    },
    paymentDestroy () {
      const value = Object.assign({}, this.payment)
      this.payment = undefined
      this.$emit('paymentDestroy', value)
    }
  },
  watch: {
    propPayment (n, o) {
      this.payment = n
    }
  }
}
</script>

<style>

</style>
