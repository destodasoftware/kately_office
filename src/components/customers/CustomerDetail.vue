<template>
  <div v-if="propCustomer" class="mb-4">
    <!-- Update -->
    <div v-if="customer" class="card bg-light border-light">
      <div class="card-body">
        <small class="text-muted">Ubah Pelanggan</small>
        <div class="form-group row">
          <label class="col-md-3">Nomer Pelanggan</label>
          <div class="col-md-9">
            <span class="text-primary">{{ customer.customer_number }}</span>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3">Nama Pelanggan</label>
          <div class="col-md-9">
            <input v-model="customer.name" type="text" class="form-control">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3">Email Pelanggan</label>
          <div class="col-md-9">
            <input v-model="customer.email" type="text" class="form-control">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3">Negara</label>
          <div class="col-md-9">
            <input v-model="customer.country" type="text" class="form-control">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3">Kota</label>
          <div class="col-md-9">
            <input v-model="customer.city" type="text" class="form-control">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3">Propinsi</label>
          <div class="col-md-9">
            <input v-model="customer.province" type="text" class="form-control">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3">Zip Code</label>
          <div class="col-md-9">
            <input v-model="customer.zip_code" type="text" class="form-control">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3">Alamat</label>
          <div class="col-md-9">
            <input v-model="customer.address" type="text" class="form-control">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerDetail',
  props: {
    propCustomer: Object
  },
  data () {
    return {
      customer: undefined
    }
  },
  methods: {
    abort () {
      this.customer = undefined
    },
    customerUpdate () {
      const value = Object.assign({}, this.customer)
      this.customer = undefined
      this.$emit('customerUpdate', value)
    },
    customerDestroy () {
      const value = Object.assign({}, this.customer)
      this.customer = undefined
      this.$emit('customerDestroy', value)
    }
  },
  watch: {
    propCustomer (n, o) {
      this.customer = n
    }
  }
}
</script>

<style>

</style>
