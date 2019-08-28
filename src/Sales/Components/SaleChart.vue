<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Penjualan Brand</h5>
    </div>
    <table class="table">
      <tbody>
        <tr v-for="seri in this.chartSale.series" :key="seri.name">
          <th>{{ seri.name }}</th>
          <td>Rp. {{ seri.data }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import MixinHttp from '@/mixins/MixinHttp'

import SaleService from '@/Sales/SaleService'
import SaleChart from '@/Sales/Components/SaleChart'

export default {
  name: 'SaleChart',
  components: {
    'sale-chart': SaleChart
  },
  mixins: [
    MixinHttp,
    SaleService
  ],
  data () {
    return {
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: []
        }
      },
      series: [{
        name: 'Series 1',
        data: []
      }]
    }
  },
  mounted () {
    this.httpInit()
    this.apexchartSale()
  }
}
</script>

<style>

</style>
