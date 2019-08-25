<template>
  <div v-if="shipping" class="row">
    <div v-if="myShipping" class="col-md-12">
      <div v-if="!isEdit" @click="onEdit">
        <div class="form-group">
          <label>Propinsi</label>
          <div class="text-primary">
            {{ myShipping.province }}
          </div>
        </div>
        <div class="form-group">
          <label>Kota</label>
          <div class="text-primary">
            {{ myShipping.city }}
          </div>
        </div>
        <div class="form-group">
          <label>Alamat</label>
          <div class="text-primary">
            {{ myShipping.address }}
          </div>
        </div>
        <div class="form-group">
          <label>Kode Wilayah</label>
          <div class="text-primary">
            {{ myShipping.postal_code }}
          </div>
        </div>
        <div class="form-group">
          <label>Nomer Resi</label>
          <div class="text-primary">
            {{ myShipping.tracking_number }}
          </div>
        </div>
        <div class="form-group">
          <label>Layanan Kurir</label>
          <div class="text-primary">
            {{ myShipping.courier_service }}
          </div>
        </div>
        <div class="form-group">
          <label>Biaya Kirim</label>
          <div class="text-primary">
            {{ myShipping.cost }}
          </div>
        </div>
      </div>
      <div v-if="isEdit">
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
            @click="onUpdate"
            class="btn btn-primary"
          >
            Simpan
          </button>
          <button
            class="btn btn-link text-muted"
            @click="onCancel"
          >
            Batalkan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShippingDetail',
  props: {
    shipping: Object
  },
  data () {
    return {
      myShipping: undefined,
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
      this.onCancel()
      this.$emit('onUpdate', this.myShipping)
    }
  },
  watch: {
    shipping (n, o) {
      this.myShipping = n
    }
  },
  mounted () {
    this.myShipping = this.shipping
  }
}
</script>

<style>

</style>
