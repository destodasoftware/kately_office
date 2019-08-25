<template>
  <div v-if="payment" class="row">
    <div v-if="myPayment" class="col-md-12">
      <div class="form-group">
        <p class="text-danger">
          Anda yakin ingin menghapus {{ myPayment.name }}?
        </p>
      </div>
      <div class="form-group">
        <button
          class="btn btn-danger"
          @click="onDestroy"
        >
          Ya, Hapus!
        </button>
        <slot name="action"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentDestroy',
  props: {
    payment: Object
  },
  data () {
    return {
      myPayment: undefined
    }
  },
  methods: {
    onDestroy () {
      this.$emit('onDestroy', this.myPayment)
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
