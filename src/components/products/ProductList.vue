<template>
  <div>
    <div class="card">
      <div class="card-body" v-if="propProducts.length > 0">
        <!-- Search -->
        <KatelySearch :propPlaceholder="'Cari Produk'" @search="productListSearch" />
        <table class="table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Inventori</th>
              <th>Jenis</th>
              <th>Brand</th>
              <th>Harga</th>
            </tr>
          </thead>
          <tbody>
            <tr
              style="cursor: pointer;"
              :class="{'table-primary': b === product}"
              v-for="b in propProducts"
              :key="b.id"
              @click="productRetrieve(b)"
            >
              <td>
                {{ b.name }} <br>
                <small class="text-muted">{{ b.sku }}</small>
              </td>
              <td>
                {{ b.total_stock }}
                <span v-if="b.number_variation">dari {{ b.number_variation }} varian</span>
              </td>
              <td>{{ b.category_name }}</td>
              <td>{{ b.brand_name }}</td>
              <td>{{ b.price }}</td>
            </tr>
          </tbody>
        </table>
        <!-- Pagination -->
        <KatelyPagination
          :propPagination="propPagination"
          @paginate="paginate"
        />
      </div>
      <div class="card" v-if="propProducts.length <= 0">
        <div class="card-body">
          Tidak ada data yang ditampilkan! <a @click="reload" href="javascript:void(1)">Muat ulang</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KatelyPagination from '@/commons/KatelyPagination'
import KatelySearch from '@/commons/KatelySearch'

/* eslint-disable */
export default {
  name: 'ProductList',
  components: {
    KatelyPagination,
    KatelySearch
  },
  props: {
    propProducts: Array,
    propPagination: Object
  },
  data () {
    return {
      product: undefined,
      query: {
        name: '',
        page: ''
      }
    }
  },
  methods: {
    productRetrieve (value) {
      this.product = value
      this.$emit('productRetrieve', value)
    },
    productListSearch (query) {
      this.query.page = undefined
      this.query.name = query
      this.$emit('productListSearch', this.query)
    },
    reload () {
      this.query.name = ''
      this.query.page = ''
      this.productListSearch()
    },
    paginate (page) {
      this.query.page = page
      this.$emit('productListSearch', this.query)
    }
  }
}
</script>

<style>

</style>
