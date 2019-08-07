<template>
  <span>
    <b-modal
      id="modal-ShippingCreate"
      size="lg"
      scrollable
      header-bg-variant="primary"
      header-text-variant="light"
      title="Pengiriman Baru"
    >
      <div class="form-group">
        <label>Negara/Region</label>
        <input v-model="shipping.country" type="text" class="form-control bg-light">
      </div>
      <div class="form-group">
        <label>Propinsi</label>
        <input v-model="shipping.province" type="text" class="form-control bg-light">
      </div>
      <div class="form-group">
        <label>City</label>
        <input v-model="shipping.city" type="text" class="form-control bg-light">
      </div>
      <div class="form-group">
        <label>Postal Code</label>
        <input v-model="shipping.postal_code" type="text" class="form-control bg-light">
      </div>
      <div class="form-group">
        <label>Alamat Lengkap</label>
        <textarea class="form-control bg-light" v-model="shipping.address" cols="30" rows="10"></textarea>
      </div>
      <div slot="modal-footer">
        <button class="btn btn-primary" @click="shippingCreate">Simpan</button>
      </div>
    </b-modal>
  </span>
</template>

<script>
export default {
  name: 'ShippingCreate',
  data () {
    return {
      shipping: {
        sale: undefined,
        country: 'Indonesia',
        province: '',
        city: '',
        address: '',
        postal_code: ''
      }
    }
  },
  methods: {
    shippingCreate () {
      const value = Object.assign({}, this.shipping)
      this.$emit('shippingCreate', value)
    }
  }
}
</script>

<style>

</style>
