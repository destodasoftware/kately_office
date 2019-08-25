<template>
  <div class="row">
    <div class="col-md-12">
      <table class="table">
        <thead>
          <tr>
            <th>Nomer Persediaan</th>
            <th>Tanggal</th>
            <th>Supplier</th>
            <th>PIC</th>
            <th>Total Stok</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody v-if="purchases.length > 0">
          <tr
            :class="{'bg-primary text-light': purchase.id === id}"
            @click="onSelect(purchase)"
            v-for="purchase in purchases"
            :key="purchase.id"
          >
            <td>{{ purchase.purchase_number }}</td>
            <td>{{ purchase.create }}</td>
            <td>{{ purchase.supplier }}</td>
            <td>{{ purchase.pic }}</td>
            <td>{{ purchase.total_stock }}</td>
            <td v-if="purchase.is_adjusment" class="text-success">Sudah Naik</td>
            <td v-if="!purchase.is_adjusment" class="text-danger">Belum Naik</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PurchaseList',
  props: {
    purchases: Array
  },
  data () {
    return {
      id: undefined
    }
  },
  methods: {
    onSelect (purchase) {
      this.id = purchase.id
      this.$emit('onSelect', purchase)
    }
  }
}
</script>

<style>

</style>
