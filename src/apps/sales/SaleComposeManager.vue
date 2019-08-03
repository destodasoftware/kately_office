<template>
  <KatelyBaseLayout>
    <div slot="content" class="row mb-4 no-print">
      <div class="col-md-12">
        <h4 v-if="sale">
          Penjualan {{ sale.sale_number }} / {{ sale.pic }}
        </h4>
      </div>
    </div>
    <div slot="content" class="row mb-4">
      <div class="col-md-8">
        <SaleDetail
          :propSale="sale"
          @saleUpdate="saleUpdate"
          @saleDestroy="saleDestroy"
        />
      </div>
      <div class="col-md-4">
        <CustomerInfo
          v-b-modal.modal-CustomerList
          v-if="sale"
          :propCustomerId="sale.customer"
        />
        <b-modal
          id="modal-CustomerList"
          scrollable
          hide-footer
          title="Pelanggan"
          size="lg"
        >
          <div class="row mb-4">
            <div class="col-md-12">
              <CustomerCreate @customerCreate="customerCreate" />
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-12">
              <CustomerList
                :propCustomers="customers"
                :propPagination="paginationCustomer"
                @customerRetrieve="customerRetrieve"
                @customerListSearch="customerListSearch"
              />
            </div>
          </div>
        </b-modal>
        <BrandInfo
          v-if="sale"
          v-b-modal.modal-BrandList
          :propBrandId="sale.brand"
        />
        <b-modal
          id="modal-BrandList"
          scrollable
          hide-footer
          title="Brand/Client"
          size="lg"
        >
          <div class="row mb-4">
            <div class="col-md-12">
              <!-- <CustomerCreate @customerCreate="customerCreate" /> -->
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-12">
              <BrandList
                :propBrands="brands"
                :propPagination="paginationBrand"
                @brandRetrieve="brandRetrieve"
                @brandListSearch="brandListSearch"
              />
            </div>
          </div>
        </b-modal>
      </div>
    </div>
    <div slot="content" class="row mb-4">
      <div class="col-md-12"></div>
    </div>
  </KatelyBaseLayout>
</template>

<script>
import KatelyBaseLayout from '@/commons/KatelyBaseLayout'
import KatelyBackButton from '@/commons/KatelyBackButton'
import MixinHttp from '@/mixins/MixinHttp'
import SaleDetail from '@/components/sales/SaleDetail'
import CustomerCreate from '@/components/customers/CustomerCreate'
import CustomerList from '@/components/customers/CustomerList'
import CustomerInfo from '@/components/customers/CustomerInfo'
import BrandInfo from '@/components/brands/BrandInfo'
import BrandList from '@/components/brands/BrandList'
import BrandCreate from '@/components/brands/BrandCreate'

export default {
  name: 'SaleComposeManager',
  mixins: [
    MixinHttp
  ],
  components: {
    KatelyBaseLayout,
    KatelyBackButton,
    SaleDetail,
    CustomerCreate,
    CustomerList,
    CustomerInfo,
    BrandInfo,
    BrandList
  },
  data () {
    return {
      sale: undefined,
      customer: undefined,
      customers: [],
      paginationCustomer: {
        next: undefined,
        previous: undefined,
        count: undefined
      },
      brands: [],
      paginationBrand: {
        next: undefined,
        previous: undefined,
        count: 0
      }
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
    saleUpdate (value) {
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
    saleDestroy (value) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/sales/${value.id}/`
      return this.axios.delete(url)
        .then((response) => {
          this.$router.push({
            name: 'SaleMainManager'
          })
        })
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    customerCreate (value) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/customers/`
      return this.axios.post(url, value)
        .then((response) => {
          this.customer = response.data
          this.customerList()
        })
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    customerList () {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/customers/`
      return this.axios.get(url)
        .then((response) => {
          this.customers = response.data.results
          this.paginationCustomer.next = response.data.next
          this.paginationCustomer.previous = response.data.previous
          this.paginationCustomer.count = response.data.count
        })
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    customerRetrieve (value) {
      this.customer = value
      this.sale.customer = value.id
      this.saleUpdate(this.sale)
    },
    customerListSearch (query) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/customers/`
      return this.axios.get(url, {params: query})
        .then((response) => {
          this.customers = response.data.results
          this.paginationCustomer.next = response.data.next
          this.paginationCustomer.previous = response.data.previous
          this.paginationCustomer.count = response.data.count
        })
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    brandRetrieve (value) {
      this.brand = value
      this.sale.brand = value.id
      this.saleUpdate(this.sale)
    },
    brandList () {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/brands/`
      return this.axios.get(url)
        .then((response) => {
          this.brands = response.data.results
          this.paginationBrand.next = response.data.next
          this.paginationBrand.previous = response.data.previous
          this.paginationBrand.count = response.data.count
        })
    },
    brandListSearch (query) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/brands/`
      return this.axios.get(url, {params: query})
        .then((response) => {
          this.brands = response.data.results
          this.paginationBrand.next = response.data.next
          this.paginationBrand.previous = response.data.previous
          this.paginationBrand.count = response.data.count
        })
    }
  },
  mounted () {
    this.saleRetrieve()
    this.customerList()
    this.brandList()
    // this.purchaseItemList()
  }
}
</script>

<style>

</style>
