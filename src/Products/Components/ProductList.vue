<template>
  <div class="row">
    <div class="col-md-12">
      <table class="table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Nama Produk</th>
            <th>Harga</th>
            <th>Stok</th>
          </tr>
        </thead>
        <tbody v-if="products.length > 0">
          <tr
            :class="{'bg-primary text-light': product.id === id}"
            @click="onSelect(product)"
            v-for="product in products"
            :key="product.id"
          >
            <td>{{ product.sku }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.stock }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  props: {
    products: Array
  },
  data () {
    return {
      id: undefined
    }
  },
  methods: {
    onSelect (product) {
      this.id = product.id
      this.$emit('onSelect', product)
    }
  }
}
</script>

<style>

</style>
