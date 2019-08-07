<template>
  <KatelyBaseLayout>
    <div slot="content" class="row mt-2">
      <div class="col-md-12">
        <h4>Kelola Brand</h4>
      </div>
    </div>
    <div slot="content" class="row mt-2">
      <div class="col-md-3 mb-4">
        <BrandCreate @brandCreate="brandCreate"/>
        <BrandDetail
          @brandUpdate="brandUpdate"
          :propBrand="brand"
        />
      </div>
      <div class="col-md-9">
        <BrandList
          @brandRetrieve="brandRetrieve"
          :propBrands="brands"
          :propPagination="pagination"
          @brandListSearch="brandListSearch"
        />
      </div>
    </div>
  </KatelyBaseLayout>
</template>

<script>
import KatelyBaseLayout from '@/commons/KatelyBaseLayout'
import MixinHttp from '@/mixins/MixinHttp'
import BrandList from '@/components/brands/BrandList'
import BrandDetail from '@/components/brands/BrandDetail'
import BrandCreate from '@/components/brands/BrandCreate'

export default {
  name: 'BrandMainManager',
  mixins: [
    MixinHttp
  ],
  components: {
    KatelyBaseLayout,
    BrandList,
    BrandDetail,
    BrandCreate
  },
  data () {
    return {
      brands: [],
      brand: undefined,
      pagination: {
        next: undefined,
        previous: undefined,
        count: 0
      }
    }
  },
  methods: {
    setPagination (response) {
      this.pagination.next = response.data.next
      this.pagination.previous = response.data.previous
      this.pagination.count = response.data.count
    },
    brandList () {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/brands/`
      return this.axios.get(url)
        .then((response) => {
          this.brands = response.data.results
          this.setPagination(response)
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    brandRetrieve (value) {
      this.brand = value
    },
    brandListSearch (query) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/brands/`
      return this.axios.get(url, {params: query})
        .then((response) => {
          this.brands = response.data.results
          this.setPagination(response)
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    brandCreate (value) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/brands/`
      return this.axios.post(url, value)
        .then((response) => {
          this.brand = response.data
          this.brandList()
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    brandUpdate (value) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/brands/${value.id}/`
      return this.axios.put(url, value)
        .then((response) => {
          this.brand = response.data
          this.brandList()
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    }
  },
  mounted () {
    this.brandList()
  }
}
</script>

<style>

</style>
