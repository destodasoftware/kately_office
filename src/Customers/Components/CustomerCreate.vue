<template>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <label>Nama Pelanggan</label>
        <input type="text" class="form-control bg-light" v-model="myCustomer.name" />
      </div>
      <div class="form-group">
        <label>Nomer Telepon</label>
        <input type="text" class="form-control bg-light" v-model="myCustomer.phone">
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" class="form-control bg-light" v-model="myCustomer.email">
      </div>
      <div class="form-group">
        <label>Regional/Negara</label>
        <input type="text" class="form-control bg-light" v-model="myCustomer.country">
      </div>
      <div class="form-group">
        <label>Propinsi</label>
        <input type="text" class="form-control bg-light" v-model="myCustomer.province">
      </div>
      <div class="form-group">
        <label>Kota</label>
        <input type="text" class="form-control bg-light" v-model="myCustomer.city">
      </div>
      <div class="form-group">
        <label>Kode Wilayah/Postal Code</label>
        <input type="text" class="form-control bg-light" v-model="myCustomer.zip_code">
      </div>
      <div class="form-group">
        <label>Alamat</label>
        <textarea class="form-control bg-light" v-model="myCustomer.address" cols="30" rows="10"></textarea>
      </div>
      <div class="form-group">
        <button @click="onCreate" class="btn btn-primary">Simpan</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerCreate',
  data () {
    return {
      myCustomer: {
        customer_number: undefined,
        name: '',
        phone: '',
        email: '',
        country: '',
        province: '',
        city: '',
        zip_code: '',
        address: ''
      }
    }
  },
  methods: {
    onCreate () {
      this.$emit('onCreate', this.myCustomer)
    }
  }
}
</script>

<style>

</style>
