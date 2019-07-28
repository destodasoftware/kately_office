<template>
  <KatelyBaseLayout>
    <div slot="content" class="row mt-2">
      <div class="col-md-12">
        <p class="h4 text-primary">Kelola Kategori</p>
      </div>
    </div>
    <div slot="content" class="row mt-2">
      <div class="col-md-3 mb-4">
        <CategoryCreate @categoryCreate="categoryCreate"/>
        <CategoryDetail
          @categoryUpdate="categoryUpdate"
          :propCategory="category"
        />
      </div>
      <div class="col-md-9">
        <CategoryList
          @categoryRetrieve="categoryRetrieve"
          :propCategories="categories"
          :propPagination="pagination"
          @categoryListSearch="categoryListSearch"
        />
      </div>
    </div>
  </KatelyBaseLayout>
</template>

<script>
import KatelyBaseLayout from '@/commons/KatelyBaseLayout'
import MixinHttp from '@/mixins/MixinHttp'
import CategoryList from '@/components/categories/CategoryList'
import CategoryDetail from '@/components/categories/CategoryDetail'
import CategoryCreate from '@/components/categories/CategoryCreate'

export default {
  name: 'CategoryMainManager',
  mixins: [
    MixinHttp
  ],
  components: {
    KatelyBaseLayout,
    CategoryList,
    CategoryDetail,
    CategoryCreate
  },
  data () {
    return {
      categories: [],
      pagination: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      category: undefined
    }
  },
  methods: {
    setPagination (response) {
      this.pagination.next = response.data.next
      this.pagination.previous = response.data.previous
      this.pagination.count = response.data.count
    },
    categoryList () {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/categories/`
      return this.axios.get(url)
        .then((response) => {
          this.categories = response.data.results
          this.setPagination(response)
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    categoryRetrieve (value) {
      this.category = value
    },
    categoryUpdate (value) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/categories/${value.id}/`
      return this.axios.put(url, value)
        .then((response) => {
          this.category = response.data
          this.categoryList()
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    categoryCreate (value) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/categories/`
      return this.axios.post(url, value)
        .then((response) => {
          this.category = response.data
          this.categoryList()
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    categoryListSearch (query) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/categories/`
      return this.axios.get(url, {params: query})
        .then((response) => {
          this.categories = response.data.results
          this.setPagination(response)
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    }
  },
  mounted () {
    this.categoryList()
  }
}
</script>

<style>

</style>
