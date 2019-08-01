<template>
  <div v-if="propProduct" class="mb-4">
    <!-- Detail -->
    <div @click="edit" v-if="!product" class="card border-light bg-light click">
      <div class="card-body">
        <small class="text-muted">Info Produk</small>
        <h4 class="card-title text-primary">
          {{ propProduct.article_name }} {{ propProduct.name }} {{ propProduct.color }} {{ propProduct.size }}
        </h4>
        <p class="text-dark">
          Rp. {{ propProduct.price }}
          <span class="badge badge-pill badge-primary">{{propProduct.brand_name}}</span>
        </p>
      </div>
    </div>
    <!-- Update -->
    <div v-if="product" class="card bg-light border-light">
      <div class="card-body">
        <small class="text-muted">Ubah Produk</small>
        <div class="form-group row">
          <label class="col-md-3">Nomer SKU</label>
          <div class="col-md-9">
            <p v-if="product.sku" class="text-primary">{{ product.sku }}</p>
            <p v-if="!product.sku" class="text-primary">-</p>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3">Nama Produk</label>
          <div class="col-md-9">
            <input v-model="product.name" type="text" class="form-control" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3">COGS</label>
          <div class="col-md-9">
            <input v-model="product.cost" type="text" class="form-control" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3">Harga Jual</label>
          <div class="col-md-9">
            <input v-model="product.price" type="text" class="form-control" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3">Stok Saat Ini</label>
          <div class="col-md-9">
            <input v-model="product.stock" type="text" class="form-control" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3">Stok Minimum</label>
          <div class="col-md-9">
            <input v-model="product.minimum_stock" type="text" class="form-control" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3">Warna</label>
          <div class="col-md-9">
            <input v-model="product.color" type="text" class="form-control" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3">Ukuran</label>
          <div class="col-md-9">
            <input v-model="product.size" type="text" class="form-control" />
          </div>
        </div>
        <div class="form-group">
          <button @click="productUpdate" class="btn btn-primary">Simpan Perubahan</button>
          <button @click="abort" class="btn btn-link">Batal</button>
          <button @click="productDestroy" class="btn btn-light">Hapus</button>
        </div>
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
  watch: {
    productDestroy (n, o) {
      this.product = undefined
    }
  }
}
</script>

<style>

</style>
