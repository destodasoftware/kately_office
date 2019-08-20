<template>
  <div v-if="product" class="row">
    <div v-if="myProduct" class="col-md-12">
      <div class="form-group">
        <p class="text-danger">
          Anda yakin ingin menghapus {{ myProduct.name }}?
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
  name: 'ProductDestroy',
  props: {
    product: Object
  },
  data () {
    return {
      myProduct: undefined
    }
  },
  methods: {
    onDestroy () {
      this.$emit('onDestroy', this.myProduct)
    }
  },
  watch: {
    product (n, o) {
      this.myProduct = n
    }
  },
  mounted () {
    this.myProduct = this.product
  }
}
</script>

<style>

</style>
