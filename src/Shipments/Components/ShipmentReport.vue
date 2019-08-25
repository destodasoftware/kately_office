<template>
  <b-dropdown id="dropdown-1" text="Export" class="m-md-2">
    <b-dropdown-item @click="onExport">Export CSV</b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  name: 'ShipmentReport',
  methods: {
    onExport () {
      this.$emit('onExport')
    }
  }
}
</script>

<style>

</style>
