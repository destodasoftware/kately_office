<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>Nomer Penjualan</th>
          <th>Tanggal</th>
          <th>Pembeli</th>
          <th>Brand</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in saleReports" :key="item.id">
          <td>{{ item.sale_number }}</td>
          <td>{{ item.create }}</td>
          <td v-if="item.customer">{{ item.customer.name }}</td>
          <td v-if="!item.customer">-</td>
          <td v-if="item.brand">{{ item.brand.name }}</td>
          <td v-if="!item.brand">{{ "-" }}</td>
          <td>{{ item.total }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'SaleReportList',
  props: {
    saleReports: Array
  },
  methods: {
    onSelect (value) {
      this.$emit('onSelect', value)
    }
  }
}
</script>
