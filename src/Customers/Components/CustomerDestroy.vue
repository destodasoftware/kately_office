<template>
  <div v-if="customer" class="row">
    <div v-if="myCustomer" class="col-md-12">
      <div class="form-group">
        <p class="text-danger">
          Anda yakin ingin menghapus {{ myCustomer.name }}?
        </p>
      </div>
      <div class="form-group">
        <button
          @click="onDestroy"
          class="btn btn-danger"
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
  name: 'CustomerDestroy',
  props: {
    customer: Object
  },
  data () {
    return {
      myCustomer: undefined
    }
  },
  methods: {
    onDestroy () {
      this.$emit('onDestroy', this.myCustomer)
    }
  },
  watch: {
    customer (n, o) {
      this.myCustomer = n
    }
  },
  mounted () {
    this.myCustomer = this.customer
  }
}
</script>

<style>

</style>
