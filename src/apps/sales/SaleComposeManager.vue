<template>
  <KatelyBaseLayout>
    <div slot="content" class="row mb-4 no-print">
      <div class="col-md-12">
        <h1 v-if="sale" class="display-4">
          Penjualan {{ sale.sale_number }} / {{ sale.pic }}
        </h1>
      </div>
    </div>
  </KatelyBaseLayout>
</template>

<script>
import KatelyBaseLayout from '@/commons/KatelyBaseLayout'
import KatelyBackButton from '@/commons/KatelyBackButton'
// import KatelyPrintButton from '@/commons/KatelyPrintButton'
import MixinHttp from '@/mixins/MixinHttp'
// import SaleDetail from '@/components/sales/SaleDetail'
// import SaleCreate from '@/components/sales/SaleCreate'

export default {
  name: 'SaleComposeManager',
  mixins: [
    MixinHttp
  ],
  components: {
    KatelyBaseLayout,
    KatelyBackButton
  },
  data () {
    return {
      sale: undefined
    }
  },
  methods: {
    saleRetrieve () {
      this.httpInit()
      const id = this.$route.params.id
      const url = `${process.env.ROOT_API}/office/sales/${id}/`
      return this.axios.get(url)
        .then((response) => {
          this.sale = response.data
        })
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    purchaseDestroy (value) {
      console.log('Not Implemented')
    },
    purchaseUpdate (value) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/sales/${value.id}/`
      return this.axios.put(url, value)
        .then((response) => {
          this.sale = response.data
        })
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    purchaseCreate (value) {
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
    }
  },
  mounted () {
    this.saleRetrieve()
    // this.purchaseItemList()
  }
}
</script>

<style>

</style>
