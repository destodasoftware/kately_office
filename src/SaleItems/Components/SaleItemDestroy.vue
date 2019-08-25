<template>
  <div v-if="saleItem" class="row">
    <div v-if="mySaleItem" class="col-md-12">
      <div class="form-group">
        <p class="text-danger">
          Anda yakin ingin menghapus {{ mySaleItem.name }}?
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
  name: 'SaleItemDestroy',
  props: {
    saleItem: Object
  },
  data () {
    return {
      mySaleItem: undefined
    }
  },
  methods: {
    onDestroy () {
      this.$emit('onDestroy', this.mySaleItem)
    }
  },
  watch: {
    saleItem (n, o) {
      this.mySaleItem = n
    }
  },
  mounted () {
    this.mySaleItem = this.saleItem
  }
}
</script>

<style>

</style>
