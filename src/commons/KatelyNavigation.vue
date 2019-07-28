<template>
  <div>
    <b-navbar toggleable="sm" type="dark" variant="primary">
      <b-navbar-brand :to="{name: 'DashboardMainManager'}">
        <KatelyLoadingInterceptor /> Kately Office
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
          <b-dropdown-item href="#">Artikel</b-dropdown-item>
          <b-dropdown-item href="#">Produk</b-dropdown-item>
          <b-dropdown-item href="#">Pelanggan</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="Transaksi" right>
          <b-dropdown-item href="#">Penjualan</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="Laporan" right>
          <b-dropdown-item href="#">Penjualan</b-dropdown-item>
          <b-dropdown-item href="#">Omzet</b-dropdown-item>
          <b-dropdown-item href="#">Stok Produk</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import KatelyLoadingInterceptor from '@/commons/KatelyLoadingInterceptor'
export default {
  components: {
    KatelyLoadingInterceptor
  }
}
</script>

<style>

</style>
