<template>
  <span>
    <b-button v-b-modal.modal-ShippingCreate variant="primary">
      Pengiriman Baru
    </b-button>
    <b-modal
      id="modal-ShippingCreate"
      size="lg"
      scrollable
      title="Pengiriman Baru"
      @ok="shippingCreate"
    >
      <div class="form-row">
        <div class="form-group col-md-6">
          <label>Negara/Region</label>
          <input v-model="shipping.country" type="text" class="form-control">
        </div>
        <div class="form-group col-md-6">
          <label>Propinsi</label>
          <input v-model="shipping.province" type="text" class="form-control">
        </div>
        <div class="form-group col-md-6">
          <label>City</label>
          <input v-model="shipping.city" type="text" class="form-control">
        </div>
        <div class="form-group col-md-6">
          <label>Postal Code</label>
          <input v-model="shipping.postal_code" type="text" class="form-control">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-12">
          <label>Alamat Lengkap</label>
          <textarea class="form-control" v-model="shipping.address" cols="30" rows="10"></textarea>
        </div>
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
