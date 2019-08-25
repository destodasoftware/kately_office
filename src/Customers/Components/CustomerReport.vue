<template>
  <b-dropdown variant="outline-primary" class="m-md-2">
    <template slot="button-content">
      <font-awesome-icon icon="file-export"/> Export
    </template>
    <b-dropdown-item @click="onExport">
       Export CSV
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  name: 'CustomerReport',
  methods: {
    onExport () {
      this.$emit('onExport')
    }
  }
}
</script>

<style>

</style>
