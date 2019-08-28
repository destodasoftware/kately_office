<template>
  <b-dropdown id="dropdown-1" text="Export" class="m-md-2">
    <b-dropdown-item @click="onExport">Export CSV</b-dropdown-item>
    <b-dropdown-item @click="onExportPakde">Export Pakde WMS</b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  name: 'SaleItemReport',
  methods: {
    onExport () {
      this.$emit('onExport')
    },
    onExportPakde () {
      this.$emit('onExportPakde')
    }
  }
}
</script>

<style>

</style>
