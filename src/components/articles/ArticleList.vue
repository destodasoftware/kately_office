<template>
  <div class="card bg-light bg-light">
    <div class="card-body" v-if="propArticles.length > 0">
      <!-- Search -->
      <KatelySearch :propPlaceholder="'Cari Artikel'" @search="articleListSearch" />
      <table class="table table-borderless table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Artikel</th>
            <th>Nama Brand</th>
          </tr>
        </thead>
        <tbody>
          <tr
            style="cursor: pointer;"
            :class="{'table-info': b === article}"
            v-for="b in propArticles"
            :key="b.id"
            @click="articleRetrieve(b)"
          >
            <td>{{ b.id }}</td>
            <td>{{ b.name }}</td>
            <td>{{ b.brand_name }}</td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <KatelyPagination
        :propPagination="propPagination"
        @paginate="paginate"
      />
    </div>
    <div class="card" v-if="propArticles.length <= 0">
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
  name: 'ArticleList',
  components: {
    KatelyPagination,
    KatelySearch
  },
  props: {
    propArticles: Array,
    propPagination: Object
  },
  data () {
    return {
      article: undefined,
      query: {
        name: '',
        page: ''
      }
    }
  },
  methods: {
    articleRetrieve (value) {
      this.article = value
      this.$emit('articleRetrieve', value)
    },
    articleListSearch (query) {
      this.query.page = undefined
      this.query.name = query
      this.$emit('articleListSearch', this.query)
    },
    reload () {
      this.query.name = ''
      this.query.page = ''
      this.articleListSearch()
    },
    paginate (page) {
      this.query.page = page
      this.$emit('articleListSearch', this.query)
    }
  }
}
</script>

<style>

</style>
