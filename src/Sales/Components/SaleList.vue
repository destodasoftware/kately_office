<template>
  <div class="row">
    <div class="col-md-12">
      <table class="table">
        <thead>
          <tr>
            <th>Nomer Penjualan</th>
            <th>Tanggal</th>
            <th>Brand</th>
            <th>Total</th>
            <th>PIC</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody v-if="sales.length > 0">
          <tr
            :class="{'bg-primary text-light': sale.id === id}"
            @click="onSelect(sale)"
            v-for="sale in sales"
            :key="sale.id"
          >
            <td>{{ sale.sale_number }}</td>
            <td>{{ sale.sale_date }}</td>
            <td>{{ sale.brand_name }}</td>
            <td>{{ sale.total }}</td>
            <td>{{ sale.pic }}</td>
            <td>{{ sale.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SaleList',
  props: {
    sales: Array
  },
  data () {
    return {
      id: undefined
    }
  },
  methods: {
    onSelect (sale) {
      this.id = sale.id
      this.$emit('onSelect', sale)
    }
  }
}
</script>

<style>

</style>
