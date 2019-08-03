<template>
  <div class="card bd-light border-light">
    <div class="card-body" v-if="propCustomers.length > 0">
      <!-- Search -->
      <kately-search
        :propPlaceholder="'Cari Pelanggan'"
        @search="customerListSearch"
      />
      <table class="table table-borderless">
        <thead>
          <tr>
            <th>Kode Pelanggan</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Nomer Telepon</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="b in propCustomers"
            :key="b.id"
            style="cursor: pointer"
            :class="{'table-info': b === customer }"
            @click="customerRetrieve(b)"
          >
            <td>{{ b.customer_number }}</td>
            <td>{{ b.name }}</td>
            <td>{{ b.email }}</td>
            <td>{{ b.phone }}</td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <KatelyPagination
        :propPagination="propPagination"
        @paginate="paginate"
      />
    </div>
    <div class="card" v-if="propCustomers.length <= 0">
      <div class="card-body">
        Tidak ada data yang ditampilkan!
        <a @click="reload" href="javascript:void(0)">
          Muat Ulang
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import KatelyPagination from '@/commons/KatelyPagination'
import KatelySearch from '@/commons/KatelySearch'

export default {
  name: 'CustomerList',
  components: {
    KatelyPagination,
    KatelySearch
  },
  props: {
    propCustomers: Array,
    propPagination: Object
  },
  data () {
    return {
      customer: undefined,
      query: {
        name: '',
        page: ''
      }
    }
  },
  methods: {
    customerRetrieve (value) {
      this.customer = value
      this.$emit('customerRetrieve', value)
    },
    customerListSearch (query) {
      this.query.page = undefined
      this.query.name = query
      this.$emit('customerListSearch', this.query)
    },
    reload () {
      this.query.name = ''
      this.query.page = ''
      this.customerListSearch()
    },
    paginate (page) {
      this.query.page = page
      this.$emit('customerListSearch', this.query)
    }
  }
}
</script>

<style>

</style>
