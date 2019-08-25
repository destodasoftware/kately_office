<template>
  <div class="row">
    <div class="col-md-12">
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
  name: 'ShipmentCreate',
  data () {
    return {
      myShipment: {
        name: undefined
      }
    }
  },
  methods: {
    onCreate () {
      this.$emit('onCreate', this.myShipment)
    }
  }
}
</script>

<style>

</style>
