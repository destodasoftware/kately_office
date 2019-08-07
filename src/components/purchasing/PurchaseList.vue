<template>
  <div class="card">
    <div class="card-body" v-if="propPurchases.length > 0">
      <!-- Search -->
      <KatelySearch :propPlaceholder="'Cari Transaksi'" @search="purchaseListSearch" />
      <table class="table">
        <thead>
          <tr>
            <th>Nomer Persediaan</th>
            <th>Tanggal</th>
            <th>Vendor</th>
            <th>PIC</th>
            <th>Total Stok</th>
            <th>Stok Naik?</th>
          </tr>
        </thead>
        <tbody>
          <tr
            style="cursor: pointer;"
            :class="{'table-primary': b === purchase}"
            v-for="b in propPurchases"
            :key="b.id"
            @click="purchaseRetrieve(b)"
          >
            <td>{{ b.purchase_number }}</td>
            <td>{{ b.create }}</td>
            <td>{{ b.supplier }}</td>
            <td>{{ b.pic }}</td>
            <td>{{ b.total_stock }}</td>
            <td
              v-if="b.is_adjusment"
              class="text-success"
            >
              Done!
            </td>
            <td
              v-if="!b.is_adjusment"
              class="text-danger"
            >
              Tertahan!
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <KatelyPagination
        :propPagination="propPagination"
        @paginate="paginate"
      />
    </div>
    <div class="card" v-if="propPurchases.length <= 0">
      <div class="card-body">
        Tidak ada data yang ditampilkan!
        <a @click="reload" href="javascript:void(1)">Muat ulang</a>
      </div>
    </div>
  </div>
</template>

<script>
import KatelyPagination from '@/commons/KatelyPagination'
import KatelySearch from '@/commons/KatelySearch'

/* eslint-disable */
export default {
  name: 'PurchaseList',
  components: {
    KatelyPagination,
    KatelySearch
  },
  props: {
    propPurchases: Array,
    propPagination: Object
  },
  data () {
    return {
      purchase: undefined,
      query: {
        purchase_number: '',
        page: ''
      }
    }
  },
  methods: {
    purchaseRetrieve (value) {
      this.purchase = value
      this.$emit('purchaseRetrieve', value)
    },
    purchaseListSearch (query) {
      this.query.page = undefined
      this.query.name = query
      this.$emit('purchaseListSearch', this.query)
    },
    reload () {
      this.query.purchase_number = ''
      this.query.page = ''
      this.purchaseListSearch()
    },
    paginate (page) {
      this.query.page = page
      this.$emit('purchaseListSearch', this.query)
    }
  }
}
</script>

<style>

</style>
