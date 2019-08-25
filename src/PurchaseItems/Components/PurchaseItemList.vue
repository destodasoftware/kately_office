<template>
  <div class="row">
    <div class="col-md-12">
      <table class="table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Nama Produk</th>
            <th>Stok</th>
          </tr>
        </thead>
        <tbody v-if="purchaseItems.length > 0">
          <tr
            :class="{'bg-primary text-light': purchaseItem.id === id}"
            @click="onSelect(purchaseItem)"
            v-for="purchaseItem in purchaseItems"
            :key="purchaseItem.id"
          >
            <td>{{ purchaseItem.product_sku }}</td>
            <td>{{ purchaseItem.product_name }}</td>
            <td>{{ purchaseItem.quantity }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PurchaseItemList',
  props: {
    purchaseItems: Array
  },
  data () {
    return {
      id: undefined
    }
  },
  methods: {
    onSelect (purchaseItem) {
      this.id = purchaseItem.id
      this.$emit('onSelect', purchaseItem)
    }
  }
}
</script>

<style>

</style>
