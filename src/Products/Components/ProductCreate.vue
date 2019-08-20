<template>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <label>Nama Produk</label>
        <input
          type="text"
          class="form-control"
          v-model="myProduct.name"
        >
      </div>
      <div class="form-group">
        <label>Harga Awal (COGS)</label>
        <input
          type="text"
          class="form-control"
          v-model="myProduct.cost"
        >
      </div>
      <div class="form-group">
        <label>Harga Jual</label>
        <input
          type="text"
          class="form-control"
          v-model="myProduct.price"
        >
      </div>
      <div class="form-group">
        <label>Stok</label>
        <input
          type="text"
          class="form-control"
          v-model="myProduct.stock"
        >
      </div>
      <div class="form-group">
        <label>Minimum Stok</label>
        <input
          type="text"
          class="form-control"
          v-model="myProduct.minimum_stock"
        >
      </div>
      <div class="form-group">
        <label>Warna</label>
        <input
          type="text"
          class="form-control"
          v-model="myProduct.color"
        >
      </div>
      <div class="form-group">
        <label>Ukuran</label>
        <input
          type="text"
          class="form-control"
          v-model="myProduct.size"
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
  name: 'ProductCreate',
  data () {
    return {
      myProduct: {
        sku: undefined,
        name: undefined,
        cost: undefined,
        price: undefined,
        stock: 0,
        minimum_stock: 1,
        color: '',
        size: ''
      }
    }
  },
  methods: {
    onCreate () {
      this.$emit('onCreate', this.myProduct)
    }
  }
}
</script>

<style>

</style>
