<template>
  <KatelyBaseLayout>
    <div slot="content" class="row mb-4 no-print">
      <div class="col-md-12">
        <h4 v-if="purchase">
          {{ purchase.supplier }} <small class="text-muted">{{ purchase.purchase_number }}</small>
        </h4>
      </div>
    </div>
    <div slot="content" class="row mb-4">
      <div class="col-md-12">
        <PurchaseStockUp
          v-if="purchase"
          @purchaseStockUp="purchaseStockUp"
          :propPurchase="purchase"
        />
        <KatelyPrintButton />
      </div>
    </div>
    <div slot="content" class="row mb-4">
      <div class="col-md-8">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">Keep Produk</h5>
            <p class="card-text">
              Pilih produk yang ingin dihitung dengan barcode.
            </p>
            <b-button variant="primary" v-b-modal="'modal-ProductList'">Pilih Produk</b-button>
          </div>
        </div>
        <PurchaseItemDetail
          :propPurchaseItem="purchaseItem"
          @purchaseItemUpdate="purchaseItemUpdate"
          @purchaseItemDestroy="purchaseItemDestroy"
        />
        <PurchaseItemList
          :propPurchaseItems="purchaseItems"
          :propPagination="pagination"
          @purchaseItemRetrieve="purchaseItemRetrieve"
        />
      </div>
      <div class="col-md-4">
        <PurchaseDetail
          :propPurchase="purchase"
          @purchaseUpdate="purchaseUpdate"
          @purchaseDestroy="purchaseDestroy"
        />
      </div>
    </div>
    <div slot="content" class="row mb-4">
      <b-modal
        id="modal-ProductList"
        header-bg-variant="primary"
        header-text-variant="white"
        title="Keep Produk"
      >
        <ProductList
          :propProducts="products"
          :propPagination="paginationProduct"
          @productRetrieve="productRetrieve"
          @productListSearch="productListSearch"
        />
      </b-modal>
    </div>
    <div slot="content" class="row mb-4">
      <div class="col-md-12">

      </div>
    </div>
  </KatelyBaseLayout>
</template>

<script>
import KatelyBaseLayout from '@/commons/KatelyBaseLayout'
import KatelyBackButton from '@/commons/KatelyBackButton'
import KatelyPrintButton from '@/commons/KatelyPrintButton'
import MixinHttp from '@/mixins/MixinHttp'
import PurchaseDetail from '@/components/purchasing/PurchaseDetail'
import PurchaseCreate from '@/components/purchasing/PurchaseCreate'
import PurchaseStockUp from '@/components/purchasing/PurchaseStockUp'
import PurchaseItemList from '@/components/purchaseitems/PurchaseItemList'
import PurchaseItemDetail from '@/components/purchaseitems/PurchaseItemDetail'
import ProductList from '@/components/products/ProductList'

export default {
  name: 'PurchaseComposeManager',
  mixins: [
    MixinHttp
  ],
  components: {
    KatelyBaseLayout,
    KatelyBackButton,
    KatelyPrintButton,
    PurchaseDetail,
    PurchaseCreate,
    PurchaseItemList,
    PurchaseItemDetail,
    PurchaseStockUp,
    ProductList
  },
  data () {
    return {
      purchase: undefined,
      products: [],
      product: undefined,
      paginationProduct: {
        next: undefined,
        previous: undefined,
        count: undefined
      },
      purchaseItem: undefined,
      purchaseItems: [],
      pagination: {
        next: undefined,
        previous: undefined,
        count: undefined
      }
    }
  },
  methods: {
    purchaseRetrieve () {
      this.httpInit()
      const id = this.$route.params.id
      const url = `${process.env.ROOT_API}/office/purchases/${id}/`
      return this.axios.get(url)
        .then((response) => {
          this.purchase = response.data
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    purchaseDestroy (value) {
      this.destroy('purchases', value.id, value)
        .then((response) => {
          this.$router.push({
            name: 'PurchasingMainManager'
          })
        })
    },
    purchaseUpdate (value) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/purchases/${value.id}/`
      return this.axios.put(url, value)
        .then((response) => {
          this.purchase = response.data
          this.purchaseItemList()
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
          this.purchaseRetrieve()
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    purchaseStockUp (value) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/purchases/${value.id}/adjustment/`
      return this.axios.put(url, value)
        .then((response) => {
          this.purchase = response.data
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
    purchaseItemCreate () {
      if (this.product && this.purchase) {
        if (this.purchase.is_adjusment) {
          return
        }
        this.httpInit()
        const url = `${process.env.ROOT_API}/office/purchaseitems/`
        const payload = {
          product: this.product.id,
          purchase: this.purchase.id,
          quantity: 0
        }
        return this.axios.post(url, payload)
          .then((response) => {
            this.purchaseItem = undefined
            this.purchaseItemList()
            this.purchaseRetrieve()
          })
          .catch(error => {
            this.$bvToast.toast(error.message, error.config.option)
          })
      }
    },
    purchaseItemList () {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/purchaseitems/`
      const query = {
        purchase: this.$route.params.id
      }
      return this.axios.get(url, {params: query})
        .then((response) => {
          this.purchaseItems = response.data.results
          this.pagination.next = response.data.next
          this.pagination.previous = response.data.previous
          this.pagination.count = response.data.count
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    purchaseItemRetrieve (value) {
      this.purchaseItem = value
    },
    purchaseItemUpdate (value) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/purchaseitems/${value.id}/`
      return this.axios.put(url, value)
        .then((response) => {
          this.purchaseItem = undefined
          this.purchaseItemList()
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    purchaseItemDestroy (value) {
      this.destroy('purchaseitems', value.id)
        .then((response) => {
          this.purchaseItem = undefined
          this.purchaseItemList()
        })
    },
    productList () {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/products/`
      return this.axios.get(url)
        .then((response) => {
          this.products = response.data.results
          this.paginationProduct.next = response.data.next
          this.paginationProduct.previous = response.data.previous
          this.paginationProduct.count = response.data.count
        })
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    productRetrieve (value) {
      this.product = value
      this.purchaseItemCreate()
    },
    productListSearch (query) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/products/`
      return this.axios.get(url, {params: query})
        .then((response) => {
          this.products = response.data.results
          this.paginationProduct.next = response.data.next
          this.paginationProduct.previous = response.data.previous
          this.paginationProduct.count = response.data.count
        })
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    onBarcodeScanned (barcode) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/products/`
      const query = {
        name: barcode
      }
      return this.axios.get(url, {params: query})
        .then((response) => {
          if (response.data.results.length === 1) {
            this.product = response.data.results[0]
            if (this.isAvailableProduct(this.product)) {
              let sounding = new Audio('./static/sound.wav')
              sounding.play()
              this.purchaseItemCreate()
            } else {
              new Audio('./static/warning.wav').play()
              this.$bvToast.toast(`Item ${this.product.name} tidak diizinkan!`, {
                title: `Peringatan!`,
                toaster: 'b-toaster-top-full',
                variant: 'warning',
                solid: true
              })
            }
          }
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    resetBarcode () {
      let barcode = this.$barcodeScanner.getPreviousCode()
      console.log(barcode)
    },
    isAvailableProduct (value) {
      return this.purchaseItems.some((purchaseItem) => {
        return purchaseItem.product === value.id
      })
    }
  },
  created () {
    this.$barcodeScanner.init(this.onBarcodeScanned)
  },
  destroyed () {
    this.$barcodeScanner.destroy()
  },
  mounted () {
    this.purchaseRetrieve()
    this.purchaseItemList()
    this.productList()
  }
  // watch: {
  //   purchase () {
  //     this.purchaseItemList()
  //   },
  //   purchaseItem () {
  //     this.purchaseItemList()
  //     this.purchaseRetrieve()
  //   }
  // }
}
</script>

<style>

</style>
