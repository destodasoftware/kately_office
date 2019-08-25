<template>
  <div v-if="purchase" class="row">
    <div v-if="myPurchase" class="col-md-12">
      <div class="form-group">
        <p class="text-danger">
          Anda yakin ingin menghapus {{ myPurchase.purchase_number }}?
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
  name: 'PurchaseDestroy',
  props: {
    purchase: Object
  },
  data () {
    return {
      myPurchase: undefined
    }
  },
  methods: {
    onDestroy () {
      this.$emit('onDestroy', this.myPurchase)
    }
  },
  watch: {
    purchase (n, o) {
      this.myPurchase = n
    }
  },
  mounted () {
    this.myPurchase = this.purchase
  }
}
</script>

<style>

</style>
