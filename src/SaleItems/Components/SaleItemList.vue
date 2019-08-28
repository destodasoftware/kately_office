<template>
  <div class="row">
    <div class="col-md-12">
      <table class="table">
        <thead>
          <tr>
            <th>Nomer Penjualan</th>
            <th>Nama Produk</th>
            <th>Harga</th>
            <th>Jumlah</th>
            <th>Diskon</th>
            <th>Line Total</th>
          </tr>
        </thead>
        <tbody v-if="saleItems.length > 0">
          <tr
            :class="{'bg-primary text-light': saleItem.id === id}"
            @click="onSelect(saleItem)"
            v-for="saleItem in saleItems"
            :key="saleItem.id"
          >
            <td>{{ saleItem.sale_number }}</td>
            <td>{{ saleItem.product_name }}</td>
            <td>{{ saleItem.price }}</td>
            <td>{{ saleItem.quantity }}</td>
            <td>{{ saleItem.discount }}</td>
            <td>{{ saleItem.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SaleItemList',
  props: {
    saleItems: Array
  },
  data () {
    return {
      id: undefined
    }
  },
  methods: {
    onSelect (saleItem) {
      this.id = saleItem.id
      this.$emit('onSelect', saleItem)
    }
  }
}
</script>

<style>

</style>
