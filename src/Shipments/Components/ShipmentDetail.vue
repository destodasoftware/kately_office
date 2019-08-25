<template>
  <div v-if="shipment" class="row">
    <div v-if="myShipment" class="col-md-12">
      <div v-if="!isEdit" @click="onEdit">
        <div class="form-group">
          <label>Nama</label>
          <div class="text-primary">
            {{ myShipment.name }}
          </div>
        </div>
      </div>
      <div v-if="isEdit">
        <div class="form-group">
          <label>Nama</label>
          <input
            type="text"
            class="form-control"
            v-model="myShipment.name"
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
  name: 'ShipmentDetail',
  props: {
    shipment: Object
  },
  data () {
    return {
      myShipment: undefined,
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
      this.$emit('onUpdate', this.myShipment)
    }
  },
  watch: {
    shipment (n, o) {
      this.myShipment = n
    }
  },
  mounted () {
    this.myShipment = this.shipment
  }
}
</script>

<style>

</style>
