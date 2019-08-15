<template>
  <div class="">
    <b-navbar toggleable="sm" type="dark" variant="primary">
      <b-navbar-brand class="text-white" :to="{name: 'DashboardMainManager'}">
        <common-interceptor />
          Kately
          <span class="badge badge-pill badge-light text-primary">
            Sistem Ritel
          </span>
      </b-navbar-brand>
      <b-navbar-nav>
        <!-- Navbar dropdowns -->
        <b-nav-item-dropdown text="Master" right>
          <b-dropdown-item
            :to="{name: 'CategoryMainManager'}"
          >
            Kategori
          </b-dropdown-item>
          <b-dropdown-item
            :to="{name: 'BrandMainManager'}"
          >
            Brand
          </b-dropdown-item>
          <b-dropdown-item
            :to="{name: 'ProductMainManager'}"
          >
            Produk
          </b-dropdown-item>
          <!-- <b-dropdown-item href="#">Pelanggan</b-dropdown-item> -->
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="Transaksi" right>
          <b-dropdown-item
            :to="{name: 'PurchasingMainManager'}"
          >
            Persediaan
          </b-dropdown-item>
          <b-dropdown-item
            :to="{name: 'SaleMainManager'}"
          >
            Penjualan
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="Laporan" right>
          <b-dropdown-item :to="{name: 'ReportSaleManager'}">
            Laporan Penjualan <span class="badge bagde-pill badge-warning">On Progress</span>
          </b-dropdown-item>
          <b-dropdown-item href="#">
            Laporan Pelanggan <span class="badge bagde-pill badge-warning">On Progress</span>
          </b-dropdown-item>
          <b-dropdown-item href="#">
            Omzet <span class="badge bagde-pill badge-warning">On Progress</span>
          </b-dropdown-item>
          <b-dropdown-item href="#">
            Stok Minimum <span class="badge bagde-pill badge-warning">On Progress</span>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" >
        <b-nav-item :to="{name: 'AboutMainManager'}" right>Copyright & Credits</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import CommonInterceptor from '@/Commons/CommonInterceptor'

export default {
  components: {
    'common-interceptor': CommonInterceptor
  }
}
</script>

<style>

</style>
