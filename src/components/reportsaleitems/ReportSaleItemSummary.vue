<template>
  <div v-if="propSummary" class="card mb-4">
    <div class="card-body">
      <h4 class="card-title text-success">Ringkasan Penjualan</h4>
      <table class="table table-borderless">
        <tbody>
          <tr>
            <th>Gross</th>
            <td>Rp. {{ propSummary.gross }}</td>
          </tr>
          <tr>
            <th>Net</th>
            <td>Rp. {{ propSummary.net }}</td>
          </tr>
          <tr>
            <th>Jumlah Produk Terjual</th>
            <td>{{ propSummary.total_quantity }} pcs dari {{ propSummary.total_product }} produk</td>
          </tr>
          <tr>
            <th>Harga Rerata</th>
            <td>Rp. {{ propSummary.price_average }}</td>
          </tr>
          <tr>
            <th>Jumlah Pelanggan</th>
            <td>{{ propSummary.total_customer }} Orang</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportSaleItemSummary',
  props: {
    propSummary: Object
  }
}
</script>

<style>

</style>
