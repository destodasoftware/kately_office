<template>
  <KatelyBaseLayout>
    <div slot="content" class="row mb-4">
      <div class="col-md-12">
        <h4>Kelola Produk</h4>
      </div>
    </div>
    <div slot="content" class="row mb-4">
      <div class="col-md-12">
        <ProductCreate @productCreate="productCreate" />
        <button v-b-modal.modal-ProductCreate class="btn btn-primary">Produk Baru</button>
        <button @click="redirectBulk" class="btn btn-outline-primary">Import CSV</button>
      </div>
    </div>
    <div slot="content" class="row mb-2">
      <div class="col-md-12">
        <ProductList
          @productRetrieve="productRetrieve"
          :propProducts="products"
          :propPagination="pagination"
          @productListSearch="productListSearch"
        />
      </div>
    </div>
  </KatelyBaseLayout>
</template>

<script>
import KatelyBaseLayout from '@/commons/KatelyBaseLayout'
import MixinHttp from '@/mixins/MixinHttp'
import ProductList from '@/components/products/ProductList'
import ProductCreate from '@/components/products/ProductCreate'

export default {
  name: 'ArticleMainManager',
  mixins: [
    MixinHttp
  ],
  components: {
    KatelyBaseLayout,
    ProductList,
    ProductCreate
  },
  data () {
    return {
      products: [],
      product: undefined,
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
    productList () {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/products/`
      const query = {
        show_root: true
      }
      return this.axios.get(url, {params: query})
        .then((response) => {
          this.products = response.data.results
          this.setPagination(response)
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    productRetrieve (value) {
      this.product = value
      this.redirectCompose()
    },
    productListSearch (query) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/products/`
      return this.axios.get(url, {params: query})
        .then((response) => {
          this.products = response.data.results
          this.setPagination(response)
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    productCreate (value) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/products/`
      return this.axios.post(url, value)
        .then((response) => {
          this.product = response.data
          this.productList()
          this.$router.push({
            name: 'ProductComposeManager',
            params: {
              id: this.product.id
            }
          })
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    redirectCompose () {
      this.$router.push({name: 'ProductComposeManager', params: {id: this.product.id}})
    },
    redirectBulk () {
      this.$router.push({name: 'ProductBulkManager'})
    }
  },
  mounted () {
    this.productList()
  }
}
</script>

<style>

</style>
