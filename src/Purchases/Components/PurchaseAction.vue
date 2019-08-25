<template>
  <b-dropdown v-if="purchase" variant="warning" id="dropdown-1" text="Action Pembelian" class="m-md-2">
    <b-dropdown-item
      v-if="!purchase.is_adjusment"
      @click="onActionUpStock"
    >
      Naikan Stok
    </b-dropdown-item>
    <b-dropdown-item
      v-if="purchase.is_adjusment"
    >
      Naikan Stok <span class="badge badge-danger">Stok Sudah Naik</span>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  name: 'PurchaseAction',
  props: {
    purchase: Object
  },
  methods: {
    onActionUpStock () {
      this.$emit('onActionUpStock')
    }
  }
}
</script>

<style>

</style>
