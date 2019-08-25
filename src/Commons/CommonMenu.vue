<template>
  <div class="mb-4 mt-4">
    <h6 class="text-primary">
      <font-awesome-icon icon="book"/> Master
    </h6>
    <ul class="list-unstyled">
      <li>
        <router-link
          class="text-secondary"
          :to="{name: 'CategoryMainManager'}"
        >
          <strong><font-awesome-icon icon="folder"/> Kategori</strong>
        </router-link>
      </li>
      <li>
        <router-link
          :to="{name: 'BrandMainManager'}"
          class="text-secondary"
        >
          <strong><font-awesome-icon icon="folder"/> Brand</strong>
        </router-link>
      </li>
      <li>
        <router-link
          :to="{name: 'CustomerMainManager'}"
          class="text-secondary"
        >
          <strong><font-awesome-icon icon="folder"/> Pelanggan</strong>
        </router-link>
      </li>
      <li>
        <router-link
          :to="{name: 'ProductMainManager'}"
          class="text-secondary"
        >
          <strong><font-awesome-icon icon="folder"/> Produk</strong>
        </router-link>
      </li>
    </ul>
    <h6 class="text-primary">
      <font-awesome-icon icon="book"/> Transaksi
    </h6>
    <ul class="list-unstyled">
      <li>
        <router-link
          :to="{name: 'PurchaseMainManager'}"
          class="text-secondary"
        >
          <strong><font-awesome-icon icon="folder"/> Pembelian</strong>
        </router-link>
      </li>
      <li>
        <router-link
          :to="{name: 'SaleMainManager'}"
          class="text-secondary"
        >
          <strong><font-awesome-icon icon="folder"/> Penjualan</strong>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CommonMenu'
}
</script>

<style>

</style>
