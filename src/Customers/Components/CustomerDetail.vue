<template>
<div v-if="customer" class="row">
  <div v-if="myCustomer" class="col-md-12">
    <div v-if="!isEdit" @click="onEdit">
      <div class="form-group">
        <label>Nama Pelanggan</label>
        <div class="text-primary">{{ myCustomer.name }}</div>
      </div>
      <div class="form-group">
        <label>Nomer Telepon</label>
        <div class="text-primary">{{ myCustomer.phone }}</div>
      </div>
      <div class="form-group">
        <label>Email</label>
        <div class="text-primary">{{ myCustomer.email }}</div>
      </div>
    </div>
    <div v-if="isEdit">
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
        <button @click="onUpdate" class="btn btn-primary">Simpan</button>
        <button @click="onCancel" class="btn btn-link text-muted">Batalkan</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'CustomerDetail',
  props: {
    customer: Object
  },
  data () {
    return {
      myCustomer: undefined,
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
      this.$emit('onUpdate', this.myCustomer)
    }
  },
  watch: {
    customer (n, o) {
      this.myCustomer = n
    }
  },
  mounted () {
    this.myCustomer = this.customer
  }
}
</script>

<style>

</style>
