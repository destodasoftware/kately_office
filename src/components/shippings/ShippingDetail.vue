<template>
  <div v-if="propShipping">
    <div v-if="article" class="card bg-light border-light">
      <div class="card-body">
        <small class="text-muted">Ubah Pengiriman</small>
        <div class="form-group">
          <label>Negara/Region</label>
          <input
            type="text"
            v-model="shipping.country"
            class="form-control"
            placeholder="Masukan negara / seperti 'Indonesia'"
          >
        </div>
        <div class="form-group">
          <label>Propinsi</label>
          <input
            type="text"
            v-model="shipping.province"
            class="form-control"
            placeholder="Masukan propinsi / seperti 'DKI Jakarta'"
          >
        </div>
        <div class="form-group">
          <label>Kota</label>
          <input
            type="text"
            v-model="shipping.province"
            class="form-control"
            placeholder="Masukan kota / seperti 'Jakarta Barat'"
          >
        </div>
        <div class="form-group">
          <label>Alamat</label>
          <textarea
            class="form-control"
            cols="30"
            rows="10"
            v-model="shipping.address"
            placeholder="Masukan kota / seperti 'Jl. Kartika No. 56 RT/RW'"
          >
          </textarea>
        </div>
        <div class="form-group">
          <label>Postal Code</label>
          <input
            type="text"
            v-model="shipping.postal_code"
            class="form-control"
            placeholder="Masukan postal code / seperti '11620'"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShippingDetail',
  props: {
    propShipping: Object
  },
  data () {
    return {
      shipping: undefined
    }
  },
  methods: {
    shippingUpdate () {
      const value = Object.assign({}, this.shipping)
      this.shipping = undefined
      this.$emit('shippingUpdate', value)
    },
    shippingDestroy () {
      const value = Object.assign({}, this.shipping)
      this.shipping = undefined
      this.$emit('shippingDestroy', value)
    }
  },
  watch: {
    propShipping (newValue, value) {
      this.shipping = newValue
    }
  }
}
</script>

<style>

</style>
