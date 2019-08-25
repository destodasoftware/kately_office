<template>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <label>Propinsi</label>
        <input
          type="text"
          class="form-control"
          v-model="myShipping.province"
        >
      </div>
      <div class="form-group">
        <label>Kota</label>
        <input
          type="text"
          class="form-control"
          v-model="myShipping.city"
        >
      </div>
      <div class="form-group">
        <label>Alamat</label>
        <textarea
          class="form-control"
          v-model="myShipping.address"
          cols="30"
          rows="10"
        >
        </textarea>
      </div>
      <div class="form-group">
        <label>Kode Wilayah</label>
        <input
          type="text"
          class="form-control"
          v-model="myShipping.postal_code"
        >
      </div>
      <div class="form-group">
        <label>Nomer Resi</label>
        <input
          type="text"
          class="form-control"
          v-model="myShipping.tracking_number"
        >
      </div>
      <div class="form-group">
        <label>Layanan Kurir</label>
        <input
          type="text"
          class="form-control"
          v-model="myShipping.courier_service"
        >
      </div>
      <div class="form-group">
        <label>Biaya Kirim</label>
        <input
          type="text"
          class="form-control"
          v-model="myShipping.cost"
        >
      </div>
      <div class="form-group">
        <button
          @click="onCreate"
          class="btn btn-primary"
        >
          Simpan
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShippingCreate',
  data () {
    return {
      myShipping: {
        sale: undefined,
        country: 'Indonesia',
        province: '',
        city: '',
        address: '',
        postal_code: '',
        tracking_number: '',
        courier_service: '',
        cost: 0
      }
    }
  },
  methods: {
    onCreate () {
      this.$emit('onCreate', this.myShipping)
    }
  }
}
</script>

<style>

</style>
