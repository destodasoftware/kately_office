<template>
  <div v-if="productVariant" class="row">
    <div v-if="myProductVariant" class="col-md-12">
      <div class="form-group">
        <p class="text-danger">
          Anda yakin ingin menghapus {{ myProductVariant.name }}?
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
  name: 'ProductVariantDestroy',
  props: {
    productVariant: Object
  },
  data () {
    return {
      myProductVariant: undefined
    }
  },
  methods: {
    onDestroy () {
      this.$emit('onDestroy', this.myProductVariant)
    }
  },
  watch: {
    productVariant (n, o) {
      this.myProductVariant = n
    }
  },
  mounted () {
    this.myProductVariant = this.productVariant
  }
}
</script>

<style>

</style>
