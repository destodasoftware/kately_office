<template>
  <div v-if="product" class="row">
    <div v-if="myProduct" class="col-md-12">
      <div v-if="!isEdit" @click="onEdit">
        <div class="form-group">
          <label>SKU</label>
          <div class="text-primary">
            {{ myProduct.sku }}
          </div>
        </div>
        <div class="form-group">
          <label>Nama Produk</label>
          <div class="text-primary">
            {{ myProduct.name }}
          </div>
        </div>
        <div class="form-group">
          <label>Total Stok</label>
          <div v-if="myProduct.stock <= 0" class="text-primary">
            {{ myProduct.total_stock }} Produk
          </div>
          <div v-if="myProduct.stock > 0" class="text-primary">
            {{ myProduct.stock }} Produk
          </div>
        </div>
      </div>
      <div v-if="isEdit">
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
            @click="onUpdate"
            class="btn btn-primary"
          >
            Simpan
          </button>
          <button
            class="btn btn-link text-muted"
            @click="onCancel"
          >
            Batalkan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  props: {
    product: Object
  },
  data () {
    return {
      myProduct: undefined,
      isEdit: false
    }
  },
  methods: {
    onEdit () {
      this.isEdit = true
    },
    onCancel () {
      this.isEdit = false
    },
    onUpdate () {
      this.onCancel()
      this.$emit('onUpdate', this.myProduct)
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
