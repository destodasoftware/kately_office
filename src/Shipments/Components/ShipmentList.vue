<template>
  <div class="row">
    <div class="col-md-12">
      <table class="table">
        <thead>
          <tr>
            <th>Nama</th>
          </tr>
        </thead>
        <tbody v-if="shipments.length > 0">
          <tr
            :class="{'bg-primary text-light': shipment.id === id}"
            @click="onSelect(shipment)"
            v-for="shipment in shipments"
            :key="shipment.id"
          >
            <td>{{ shipment.id }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShipmentList',
  props: {
    shipments: Array
  },
  data () {
    return {
      id: undefined
    }
  },
  methods: {
    onSelect (shipment) {
      this.id = shipment.id
      this.$emit('onSelect', shipment)
    }
  }
}
</script>

<style>

</style>
