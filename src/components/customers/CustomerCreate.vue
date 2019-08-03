<template>
  <span>
    <b-button
      v-b-modal.modal-1
      variant="primary"
    >
      Pelanggan Baru
    </b-button>
    <b-modal
      id="modal-1"
      size="lg"
      scrollable
      title="Pelanggan Baru"
      @ok="customerCreate"
    >
      <div class="row mb-2">
        <div class="col-md-6">
          <div class="form-group">
            <label>Nama Pelanggan</label>
            <input v-model="customer.name" type="text" class="form-control" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label>Email</label>
            <input v-model="customer.email" type="email" class="form-control" />
          </div>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-12">
          <div class="form-group">
            <label>Nomer Telepon</label>
            <input v-model="customer.phone" type="text" class="form-control" />
          </div>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-12">
          <h5>Informasi Dasar</h5>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-6">
          <div class="form-group">
            <label>Regional/Negara</label>
            <input v-model="customer.country" type="text" class="form-control" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label>Kota</label>
            <input v-model="customer.city" type="text" class="form-control" />
          </div>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-6">
          <div class="form-group">
            <label>Propinsi</label>
            <input v-model="customer.province" type="text" class="form-control" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label>Zip Code</label>
            <input v-model="customer.zip_code" type="text" class="form-control" />
          </div>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-12">
          <div class="form-group">
            <label>Alamat</label>
            <textarea
              class="form-control"
              cols="30"
              rows="10"
              v-model="customer.address"
            ></textarea>
          </div>
        </div>
      </div>
    </b-modal>
  </span>
</template>

<script>
export default {
  name: 'CustomerCreate',
  data () {
    return {
      customer: {
        user: undefined,
        customer_number: '',
        name: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        province: '',
        zip_code: '',
        address: ''
      }
    }
  },
  methods: {
    customerCreate () {
      const value = Object.assign({}, this.customer)
      value.customer_number = this.skuGen()
      this.$emit('customerCreate', value)
    },
    skuGen () {
      let random = Math.floor(Math.random() * 10000)
      let data = new Date()
      return `CST-${data.getDate()}${data.getMonth()}${data.getFullYear()}${random}`
    }
  }
}
</script>

<style>

</style>
