<template>
  <div v-if="shipping" class="row">
    <div v-if="myShipping" class="col-md-12">
      <div class="form-group">
        <p class="text-danger">
          Anda yakin ingin menghapus {{ myShipping.name }}?
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
  name: 'ShippingDestroy',
  props: {
    shipping: Object
  },
  data () {
    return {
      myShipping: undefined
    }
  },
  methods: {
    onDestroy () {
      this.$emit('onDestroy', this.myShipping)
    }
  },
  watch: {
    shipping (n, o) {
      this.myShipping = n
    }
  },
  mounted () {
    this.myShipping = this.shipping
  }
}
</script>

<style>

</style>
