<template>
  <KatelyBaseLayout>
    <div slot="content" class="row mb-4">
      <div class="col-md-12">
        <h1 class="display-4">Penjualan Produk</h1>
      </div>
    </div>
    <div slot="content" class="row mb-4">
      <div class="col-md-12">
        <SaleCreate @saleCreate="saleCreate" />
      </div>
    </div>
    <div slot="content" class="row mb-4">
      <div class="col-md-12">
        <SaleList
          @saleRetrieve="saleRetrieve"
          :propSales="sales"
          :propPagination="pagination"
          @saleListSearch="saleListSearch"
        />
      </div>
    </div>
  </KatelyBaseLayout>
</template>

<script>
import KatelyBaseLayout from '@/commons/KatelyBaseLayout'
import MixinHttp from '@/mixins/MixinHttp'
import SaleList from '@/components/sales/SaleList'
import SaleCreate from '@/components/sales/SaleCreate'

export default {
  name: 'SaleMainManager',
  mixins: [
    MixinHttp
  ],
  components: {
    KatelyBaseLayout,
    SaleList,
    SaleCreate
  },
  data () {
    return {
      sales: [],
      sale: undefined,
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
    saleList () {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/sales/`
      return this.axios.get(url)
        .then((response) => {
          this.sales = response.data.results
          this.setPagination(response)
        })
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    saleRetrieve (value) {
      this.sale = value
      this.$router.push({
        name: 'SaleComposeManager',
        params: {
          id: this.sale.id
        }
      })
    },
    saleListSearch (query) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/sales/`
      return this.axios.get(url, {params: query})
        .then((response) => {
          this.sales = response.data.results
          this.setPagination(response)
        })
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    saleCreate (value) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/sales/`
      return this.axios.post(url, value)
        .then((response) => {
          this.sale = response.data
          this.saleList()
          this.$router.push({
            name: 'SaleComposeManager',
            params: {
              id: this.sale.id
            }
          })
        })
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    redirectCompose () {
      console.log('ok')
      // this.$router.push({
      //   name: 'SaleComposeManager',
      //   params: {
      //     id: this.sale.id
      //   }
      // })
    }
  },
  mounted () {
    this.saleList()
  }
}
</script>

<style>

</style>
