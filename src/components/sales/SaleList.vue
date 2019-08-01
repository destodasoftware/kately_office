<template>
  <div class="card bg-light bg-light">
    <div class="card-body" v-if="propSales.length > 0">
      <!-- Search -->
      <KatelySearch :propPlaceholder="'Cari Transaksi'" @search="saleListSearch" />
      <table class="table table-borderless table-striped">
        <thead>
          <tr>
            <th>Nomer Penjualan</th>
            <th>Tanggal</th>
            <th>Brand/Client</th>
            <th>Total</th>
            <th>Penanggung Jawab</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            style="cursor: pointer;"
            :class="{'table-info': b === sale}"
            v-for="b in propSales"
            :key="b.id"
            @click="saleRetrieve(b)"
          >
            <td>{{ b.sale_number }}</td>
            <td>{{ b.create }}</td>
            <td>{{ b.brand_name }}</td>
            <td>{{ b.total }}</td>
            <td>{{ b.pic }}</td>
            <td>{{ b.status }}</td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <KatelyPagination
        :propPagination="propPagination"
        @paginate="paginate"
      />
    </div>
    <div class="card" v-if="propSales.length <= 0">
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
  name: 'SaleList',
  components: {
    KatelyPagination,
    KatelySearch
  },
  props: {
    propSales: Array,
    propPagination: Object
  },
  data () {
    return {
      sale: undefined,
      query: {
        sale_number: '',
        page: ''
      }
    }
  },
  methods: {
    saleRetrieve (value) {
      this.sale = value
      this.$emit('saleRetrieve', value)
    },
    saleListSearch (query) {
      this.query.page = undefined
      this.query.sale_number = query
      this.$emit('saleListSearch', this.query)
    },
    reload () {
      this.query.sale_number = ''
      this.query.page = ''
      this.saleListSearch()
    },
    paginate (page) {
      this.query.page = page
      this.$emit('saleListSearch', this.query)
    }
  }
}
</script>
