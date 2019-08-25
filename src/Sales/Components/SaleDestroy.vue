<template>
  <div v-if="sale" class="row">
    <div v-if="mySale" class="col-md-12">
      <div class="form-group">
        <p class="text-danger">
          Anda yakin ingin menghapus {{ mySale.sale_number }}?
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
  name: 'SaleDestroy',
  props: {
    sale: Object
  },
  data () {
    return {
      mySale: undefined
    }
  },
  methods: {
    onDestroy () {
      this.$emit('onDestroy', this.mySale)
    }
  },
  watch: {
    sale (n, o) {
      this.mySale = n
    }
  },
  mounted () {
    this.mySale = this.sale
  }
}
</script>

<style>

</style>
