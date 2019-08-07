<template>
  <div class="card mb-4">
    <div class="card-body" v-if="propSaleItems.length > 0">
      <h4 class="card-title text-success">Item Pembelian</h4>
      <!-- Search -->
      <KatelySearch :propPlaceholder="'Cari Item'" @search="saleItemListSearch" />
      <table class="table table-borderless">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Harga</th>
            <th>Jumlah</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr
            style="cursor: pointer;"
            :class="{'table-info': b === saleItem}"
            v-for="b in propSaleItems"
            :key="b.id"
            @click="saleItemRetrieve(b)"
          >
            <td>
              {{ b.product_name }} <br>
              <small class="text-muted">{{ b.product_stock }} stok tersedia</small>
            </td>
            <td>{{ b.price }}</td>
            <td>{{ b.quantity }}</td>
            <td>{{ b.quantity * b.price }}</td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <KatelyPagination :propPagination="propPagination" @paginate="paginate"/>
    </div>
    <div class="card" v-if="propSaleItems.length <= 0">
      <div class="card-body">
        Tidak ada data yang ditampilkan! <a @click="reload" href="javascript:void(1)">Muat ulang</a>
      </div>
    </div>
  </div>
</template>

<script>
import KatelyPagination from '@/commons/KatelyPagination'
import KatelySearch from '@/commons/KatelySearch'

export default {
  name: 'SaleItemList',
  components: {
    KatelyPagination,
    KatelySearch
  },
  props: {
    propSaleItems: Array,
    propPagination: Object
  },
  data () {
    return {
      ayam: undefined,
      saleItem: undefined,
      query: {
        name: '',
        page: ''
      }
    }
  },
  methods: {
    saleItemRetrieve (value) {
      this.saleItem = value
      this.$emit('saleItemRetrieve', value)
    },
    saleItemListSearch (query) {
      this.query.page = undefined
      this.query.name = query
      this.$emit('saleItemListSearch', this.query)
    },
    reload () {
      this.query.name = ''
      this.query.page = ''
      this.saleItemListSearch()
    },
    paginate (page) {
      this.query.page = page
      this.$emit('saleItemListSearch', this.query)
    }
  },
  watch: {
    ayam (n, o) {
      console.log(n)
    }
  }
}
</script>

<style>

</style>
