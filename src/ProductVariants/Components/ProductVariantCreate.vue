<template>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <label>Warna</label>
        <input
          type="text"
          class="form-control"
          v-model="myProductVariant.color"
        >
      </div>
      <div class="form-group">
        <label>Ukuruan</label>
        <input
          type="text"
          class="form-control"
          v-model="myProductVariant.size"
        >
      </div>
      <div class="form-group">
        <label>Stok</label>
        <input
          type="text"
          class="form-control"
          v-model="myProductVariant.stock"
        >
      </div>
      <div class="form-group">
        <label>Harga</label>
        <input
          type="text"
          class="form-control"
          v-model="myProductVariant.price"
        >
      </div>
      <div class="form-group">
        <button
          @click="onCreate"
          class="btn btn-primary"
        >
          Simpan
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductVariantCreate',
  data () {
    return {
      myProductVariant: {
        sku: undefined,
        category: undefined,
        brand: undefined,
        root: undefined,
        name: undefined,
        size: undefined,
        color: undefined,
        price: undefined,
        cost: undefined,
        stock: undefined
      }
    }
  },
  methods: {
    onCreate () {
      this.$emit('onCreate', this.myProductVariant)
    }
  }
}
</script>

<style>

</style>
