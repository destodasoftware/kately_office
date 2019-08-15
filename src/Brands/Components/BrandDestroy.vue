<template>
  <div v-if="brand" class="row">
    <div v-if="myBrand" class="col-md-12">
      <div class="form-group">
        <p class="text-danger">Anda yakin ingin menghapus {{ myBrand.name }}?</p>
      </div>
      <div class="form-group">
        <button @click="onDestroy" class="btn btn-danger">Ya, Hapus!</button>
        <slot name="action"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BrandDestroy',
  props: {
    brand: Object
  },
  data () {
    return {
      myBrand: undefined
    }
  },
  methods: {
    onDestroy () {
      this.$emit('onDestroy', this.myBrand)
    }
  },
  watch: {
    brand (n, o) {
      this.myBrand = n
    }
  },
  mounted () {
    this.myBrand = this.brand
  }
}
</script>
