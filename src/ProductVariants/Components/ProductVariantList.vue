<template>
  <div class="row">
    <div class="col-md-12">
      <table class="table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Warna</th>
            <th>Ukuran</th>
            <th>Harga</th>
            <th>Stok</th>
          </tr>
        </thead>
        <tbody v-if="productVariants.length > 0">
          <tr
            :class="{'bg-primary text-light': productVariant.id === id}"
            @click="onSelect(productVariant)"
            v-for="productVariant in productVariants"
            :key="productVariant.id"
          >
            <td>{{ productVariant.sku }}</td>
            <td>{{ productVariant.color }}</td>
            <td>{{ productVariant.size }}</td>
            <td>{{ productVariant.price }}</td>
            <td>{{ productVariant.stock }}</td>
          </tr>
        </tbody>
        <tbody v-if="productVariants.length <= 0">
          <tr>
            <td colspan="4">No Data!</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductVariantList',
  props: {
    productVariants: Array
  },
  data () {
    return {
      id: undefined
    }
  },
  methods: {
    onSelect (productVariant) {
      this.id = productVariant.id
      this.$emit('onSelect', productVariant)
    }
  }
}
</script>

<style>

</style>
