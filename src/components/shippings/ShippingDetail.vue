<template>
  <div v-if="propShipping">
    <div v-if="shipping" class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">Alamat Pengiriman</h5>
        <div class="form-group">
          <label>Negara/Region</label>
          <input
            type="text"
            v-model="shipping.country"
            class="form-control bg-light"
            placeholder="Masukan negara / seperti 'Indonesia'"
          >
        </div>
        <div class="form-group">
          <label>Propinsi</label>
          <input
            type="text"
            v-model="shipping.province"
            class="form-control bg-light"
            placeholder="Masukan propinsi / seperti 'DKI Jakarta'"
          >
        </div>
        <div class="form-group">
          <label>Kota</label>
          <input
            type="text"
            v-model="shipping.city"
            class="form-control bg-light"
            placeholder="Masukan kota / seperti 'Jakarta Barat'"
          >
        </div>
        <div class="form-group">
          <label>Alamat</label>
          <textarea
            class="form-control bg-light"
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
            class="form-control bg-light"
            placeholder="Masukan postal code / seperti '11620'"
          >
        </div>
        <hr>
        <div class="form-group">
          <label>Nomer Resi</label>
          <input
            type="text"
            v-model="shipping.tracking_number"
            class="form-control bg-light"
            placeholder="Masukan nomer resi"
          >
        </div>
        <div class="form-group">
          <label>Layanan Pengiriman</label>
          <input
            type="text"
            v-model="shipping.courier_service"
            class="form-control bg-light"
            placeholder="Masukan layanan pengiriman"
          >
        </div>
        <div class="form-group">
          <label>Biaya Pengiriman</label>
          <input
            type="text"
            v-model="shipping.cost"
            class="form-control bg-light"
            placeholder="Masukan biaya pengiriman"
          >
        </div>
        <div class="form-group">
          <button @click="shippingUpdate" class="btn btn-primary">Simpan Perubahan</button>
          <button @click="shippingDestroy" class="btn btn-light">Hapus</button>
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
  mounted () {
    this.shipping = this.propShipping
  },
  watch: {
    propShipping (n, o) {
      this.shipping = n
    }
  }
}
</script>

<style>

</style>
