<template>
  <div class="mb-4">
    <div class="card">
      <div class="card-body" v-if="propBrands.length > 0">
        <h5 class="card-title">Daftar Brand</h5>
        <!-- Search -->
        <KatelySearch class="mt-2" :propPlaceholder="'Cari Brand'" @search="brandListSearch" />
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Brand</th>
            </tr>
          </thead>
          <tbody>
            <tr
              style="cursor: pointer;"
              :class="{'table-primary': b === brand}"
              v-for="b in propBrands"
              :key="b.id"
              @click="brandRetrieve(b)"
            >
              <td>{{ b.id }}</td>
              <td>{{ b.name }}</td>
            </tr>
          </tbody>
        </table>
        <!-- Pagination -->
        <KatelyPagination
          :propPagination="propPagination"
          @paginate="paginate"
        />
      </div>
      <div class="card" v-if="propBrands.length <= 0">
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
  name: 'BrandList',
  components: {
    KatelyPagination,
    KatelySearch
  },
  props: {
    propBrands: Array,
    propPagination: Object
  },
  data () {
    return {
      brand: undefined,
      query: {
        name: '',
        page: ''
      }
    }
  },
  methods: {
    brandRetrieve (value) {
      this.brand = value
      this.$emit('brandRetrieve', value)
    },
    brandListSearch (query) {
      this.query.page = undefined
      this.query.name = query
      this.$emit('brandListSearch', this.query)
    },
    reload () {
      this.query.name = ''
      this.query.page = ''
      this.brandListSearch()
    },
    paginate (page) {
      this.query.page = page
      this.$emit('brandListSearch', this.query)
    }
  }
}
</script>

<style>

</style>
