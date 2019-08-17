<template>
  <b-dropdown
    id="dropdown-CategoryReport"
    text="Export"
    class="m-md-2"
  >
    <b-dropdown-item
      @click="onExport"
    >
      Export CSV
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  name: 'CategoryReport',
  methods: {
    onExport () {
      this.$emit('onExport')
    }
  }
}
</script>

<style>

</style>
