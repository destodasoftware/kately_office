<template>
  <div v-if="shipment" class="row">
    <div v-if="myShipment" class="col-md-12">
      <div class="form-group">
        <p class="text-danger">
          Anda yakin ingin menghapus {{ myShipment.name }}?
        </p>
      </div>
      <div class="form-group">
        <button
          class="btn btn-danger"
          @click="onDestroy"
        >
          Ya, Hapus!
        </button>
        <slot name="action"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShipmentDestroy',
  props: {
    shipment: Object
  },
  data () {
    return {
      myShipment: undefined
    }
  },
  methods: {
    onDestroy () {
      this.$emit('onDestroy', this.myShipment)
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
