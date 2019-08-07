<template>
  <div v-if="propProduct" class="mb-4">
    <div v-if="product" class="card">
      <div class="card-body">
        <h5 class="card-title">Detil Produk</h5>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>Nomer SKU</label>
            <input
              v-model="product.sku"
              disabled
              type="text"
              class="form-control bg-light"
            >
            <small class="text-secondary">
              <i>* Nomer SKU digenerate dari sistem.</i>
            </small>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-12">
            <label>Nama Produk</label>
            <input
              v-model="product.name"
              type="text"
              class="form-control bg-light"
            >
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>Harga Beli / COGS</label>
            <input
              v-model="product.cost"
              type="text"
              class="form-control bg-light"
            >
          </div>
          <div class="form-group col-md-6">
            <label>Harga Jual</label>
            <input
              v-model="product.price"
              type="text"
              class="form-control bg-light"
            >
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>Stok Minimum</label>
            <input
              v-model="product.stock_minimum"
              type="text"
              class="form-control bg-light"
            >
          </div>
          <div class="form-group col-md-6">
            <label>Stok</label>
            <input
              v-model="product.stock"
              type="text"
              class="form-control bg-light"
            >
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>Ukuran</label>
            <input
              v-model="product.size"
              type="text"
              class="form-control bg-light"
            >
          </div>
          <div class="form-group col-md-6">
            <label>Warna</label>
            <input
              v-model="product.color"
              type="text"
              class="form-control bg-light"
            >
          </div>
        </div>

        <button @click="productUpdate" class="btn btn-primary">Simpan Perubahan</button>
        <button @click="productDestroy" class="btn btn-light">Hapus</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  props: {
    propProduct: Object
  },
  data () {
    return {
      product: undefined
    }
  },
  methods: {
    edit () {
      this.product = Object.assign({}, this.propProduct)
    },
    abort () {
      this.product = undefined
    },
    productUpdate () {
      const value = Object.assign({}, this.product)
      this.product = undefined
      this.$emit('productUpdate', value)
    },
    productDestroy () {
      const value = Object.assign({}, this.product)
      this.product = undefined
      this.$emit('productDestroy', value)
    }
  },
  mounted () {
    this.product = this.propProduct
  },
  watch: {
    propProduct (n, o) {
      this.product = this.propProduct
    }
  }
}
</script>

<style>

</style>
