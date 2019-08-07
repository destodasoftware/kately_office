<template>
  <div>
    <b-modal
      id="modal-ProductCreate"
      header-bg-variant="primary"
      header-text-variant="light"
      title="Produk Baru"
    >
      <div class="form-group">
        <label>Nama Produk</label>
        <input v-model="product.name" type="text" class="form-control bg-light">
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label>Harga Beli / COGS</label>
          <input v-model="product.cost" type="text" class="form-control bg-light">
        </div>
        <div class="form-group col-md-6">
          <label>Harga Jual</label>
          <input v-model="product.price" type="text" class="form-control bg-light" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col">
          <label>Stok</label>
          <input v-model="product.stock" type="text" class="form-control bg-light" />
        </div>
        <div class="form-group col">
          <label>Stok Minimum</label>
          <input v-model="product.minimum_stock" type="text" class="form-control bg-light" />
        </div>
      </div>
      <div class="form-group">
        <label>Warna</label>
        <input v-model="product.color" type="text" class="form-control bg-light" />
      </div>
      <div class="form-group">
        <label>Ukuran</label>
        <input v-model="product.size" type="text" class="form-control bg-light" />
      </div>
      <template slot="modal-footer">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button variant="primary" @click="productCreate">
          Simpan
        </b-button>
    </template>
    </b-modal>
  </div>
</template>

<script>

export default {
  name: 'ProductCreate',
  data () {
    return {
      product: {
        article: undefined,
        category: undefined,
        sku: undefined,
        name: 'Awesome Product',
        cost: 0,
        price: 0,
        stock: 1,
        minimum_stock: 1,
        color: undefined,
        size: undefined
      }
    }
  },
  methods: {
    productCreate () {
      const value = Object.assign({}, this.product)
      value.sku = this.skuGen()
      this.$emit('productCreate', value)
    },
    skuGen () {
      let random = Math.floor(Math.random() * 1000)
      let data = new Date()
      return `PRD-${data.getDate()}${data.getMonth()}${data.getFullYear()}${random}`
    }
  }
}
</script>

<style>

</style>
