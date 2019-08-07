<template>
  <div class="card">
    <div class="card-body" v-if="propPurchaseItems.length > 0">
      <h5 class="card-title">Daftar Item Masuk</h5>
      <!-- Search -->
      <KatelySearch :propPlaceholder="'Cari Item'" @search="purchaseItemListSearch" />
      <table class="table">
        <thead>
          <tr>
            <th class="no-print">ID</th>
            <th>SKU</th>
            <th>Brand/Client</th>
            <th>Produk</th>
            <th>Jumlah</th>
          </tr>
        </thead>
        <tbody>
          <tr
            style="cursor: pointer;"
            :class="{'table-primary': b === purchaseItem}"
            v-for="b in propPurchaseItems"
            :key="b.id"
            @click="purchaseItemRetrieve(b)"
          >
            <td class="no-print">{{ b.id }}</td>
            <td>{{ b.product_sku }}</td>
            <td>{{ b.brand }}</td>
            <td>{{ b.product_name }}</td>
            <td>{{ b.quantity }}</td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <KatelyPagination
        :propPagination="propPagination"
        @paginate="paginate"
      />
    </div>
    <div class="card" v-if="propPurchaseItems.length <= 0">
      <div class="card-body">
        Tidak ada data yang ditampilkan! <a @click="reload" href="javascript:void(1)">Muat ulang</a>
      </div>
    </div>
  </div>
</template>

<script>
import KatelyPagination from '@/commons/KatelyPagination'
import KatelySearch from '@/commons/KatelySearch'

/* eslint-disable */
export default {
  name: 'PurchaseItemList',
  components: {
    KatelyPagination,
    KatelySearch
  },
  props: {
    propPurchaseItems: Array,
    propPagination: Object
  },
  data () {
    return {
      purchaseItem: undefined,
      query: {
        name: '',
        page: ''
      }
    }
  },
  methods: {
    purchaseItemRetrieve (value) {
      this.purchaseItem = value
      this.$emit('purchaseItemRetrieve', value)
    },
    purchaseItemListSearch (query) {
      this.query.page = undefined
      this.query.name = query
      this.$emit('purchaseItemListSearch', this.query)
    },
    reload () {
      this.query.name = ''
      this.query.page = ''
      this.purchaseItemListSearch()
    },
    paginate (page) {
      this.query.page = page
      this.$emit('purchaseItemListSearch', this.query)
    }
  }
}
</script>

<style>

</style>
