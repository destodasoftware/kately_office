<template>
  <div v-if="propCategories !== undefined" class="card bg-light">
    <div class="card-header">
      Daftar Kategori
    </div>
    <div class="card-body" v-if="propCategories.length > 0">
      <!-- Search -->
      <KatelySearch :propPlaceholder="'Cari Kategori'" @search="categoryListSearch" />
      <table class="table table-borderless table-hover">
        <thead>
          <tr class="bg-info text-white">
            <th>ID</th>
            <th>Nama Kategori</th>
          </tr>
        </thead>
        <tbody>
          <tr
            style="cursor: pointer;"
            :class="{'table-info': c === category}"
            v-for="c in propCategories"
            :key="c.id"
            @click="categoryRetrieve(c)"
          >
            <td>{{ c.id }}</td>
            <td>{{ c.name }}</td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <KatelyPagination
        :propPagination="propPagination"
        @paginate="paginate"
      />
    </div>
    <div class="card" v-if="propCategories.length <= 0">
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
  name: 'CategoryList',
  components: {
    KatelyPagination,
    KatelySearch
  },
  props: {
    propCategories: Array,
    propPagination: Object
  },
  data () {
    return {
      category: undefined,
      query: {
        name: '',
        page: ''
      }
    }
  },
  methods: {
    categoryRetrieve (value) {
      this.category = value
      this.$emit('categoryRetrieve', value)
    },
    categoryListSearch (query) {
      this.query.page = undefined
      this.query.name = query
      this.$emit('categoryListSearch', this.query)
    },
    reload () {
      this.query.name = ''
      this.query.page = ''
      this.categoryListSearch()
    },
    paginate (page) {
      this.query.page = page
      this.$emit('categoryListSearch', this.query)
    }
  }
}
</script>
