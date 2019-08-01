<template>
  <KatelyBaseLayout>
    <div slot="content" class="row mb-4">
      <div class="col-md-12">
        <h1 class="display-4">Persediaan Produk</h1>
      </div>
    </div>
    <div slot="content" class="row mb-4">
      <div class="col-md-12">
        <PurchaseCreate @purchaseCreate="purchaseCreate" />
      </div>
    </div>
    <div slot="content" class="row mb-2">
      <div class="col-md-12">
        <PurchaseList
          @purchaseRetrieve="purchaseRetrieve"
          :propPurchases="purchases"
          :propPagination="pagination"
          @purchaseListSearch="purchaseListSearch"
        />
      </div>
    </div>
  </KatelyBaseLayout>
</template>

<script>
import KatelyBaseLayout from '@/commons/KatelyBaseLayout'
import MixinHttp from '@/mixins/MixinHttp'
import PurchaseList from '@/components/purchasing/PurchaseList'
import PurchaseCreate from '@/components/purchasing/PurchaseCreate'

export default {
  name: 'PurchasingMainManager',
  mixins: [
    MixinHttp
  ],
  components: {
    KatelyBaseLayout,
    PurchaseList,
    PurchaseCreate
  },
  data () {
    return {
      purchases: [],
      purchase: undefined,
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
    purchaseList () {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/purchases/`
      return this.axios.get(url)
        .then((response) => {
          this.purchases = response.data.results
          this.setPagination(response)
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    purchaseRetrieve (value) {
      this.purchase = value
      this.redirectCompose()
    },
    purchaseListSearch (query) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/purchases/`
      return this.axios.get(url, {params: query})
        .then((response) => {
          this.purchases = response.data.results
          this.setPagination(response)
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    purchaseCreate (value) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/purchases/`
      return this.axios.post(url, value)
        .then((response) => {
          this.purchase = response.data
          this.purchaseList()
          this.$router.push({
            name: 'PurchaseComposeManager',
            params: {
              id: this.purchase.id
            }
          })
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    redirectCompose () {
      this.$router.push({name: 'PurchaseComposeManager', params: {id: this.purchase.id}})
    }
  },
  mounted () {
    this.purchaseList()
  }
}
</script>

<style>

</style>
