<template>
  <div v-if="purchaseItem" class="row">
    <div v-if="myPurchaseItem" class="col-md-12">
      <div class="form-group">
        <p class="text-danger">
          Anda yakin ingin menghapus {{ myPurchaseItem.product_name }}?
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
  name: 'PurchaseItemDestroy',
  props: {
    purchaseItem: Object
  },
  data () {
    return {
      myPurchaseItem: undefined
    }
  },
  methods: {
    onDestroy () {
      this.$emit('onDestroy', this.myPurchaseItem)
    }
  },
  watch: {
    purchaseItem (n, o) {
      this.myPurchaseItem = n
    }
  },
  mounted () {
    this.myPurchaseItem = this.purchaseItem
  }
}
</script>

<style>

</style>
