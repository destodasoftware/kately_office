<template>
  <KatelyBaseLayout>
    <div v-if="sale" slot="content" class="row mb-4 no-print">
      <div class="col-md-12">
        <h4>Kelola Penjualan <small class="text-muted">{{ sale.sale_number }}</small></h4>
      </div>
    </div>
    <div v-if="sale" slot="content" class="row mb-4">
      <div class="col-md-12">
        <button v-b-modal.modal-SaleItemList class="btn btn-primary">
          Pilih Produk
        </button>
      </div>
    </div>
    <div v-if="sale" slot="content" class="row mb-4">
      <!-- left -->
      <div class="col-md-8">
        <SaleItemDetail
          :propSaleItem="saleItem"
          @saleItemUpdate="saleItemUpdate"
          @saleItemDestroy="saleItemDestroy"
        />
        <SaleItemList
          :propSaleItems="saleItems"
          :propPagination="paginationSaleItem"
          @saleItemRetrieve="saleItemRetrieve"
          @saleItemDestroy="saleItemDestroy"
          @saleItemListSearch="saleItemListSearch"
        />
        <b-modal
          id="modal-SaleItemList"
          size="lg"
          header-bg-variant="primary"
          header-text-variant="white"
          hide-footer
          scrollable
          title="Pilih Produk"
        >
          <ProductList
            :propPagination="paginationProduct"
            :propProducts="products"
            @productRetrieve="productRetrieve"
            @productListSearch="productListSearch"
          />
        </b-modal>
      </div>
      <!-- right -->
      <div class="col-md-4">
        <SaleDetail
          :propSale="sale"
          @saleUpdate="saleUpdate"
          @saleDestroy="saleDestroy"
        />
        <CustomerInfo
          v-b-modal.modal-CustomerList
          v-if="sale"
          :propCustomerId="sale.customer"
        />
        <b-modal
          id="modal-CustomerList"
          scrollable
          header-bg-variant="primary"
          header-text-variant="light"
          hide-footer
          title="Pilih Pelanggan"
          size="lg"
        >
          <div class="row mb-4">
            <div class="col-md-12">
              <button v-b-modal.modal-CustomerCreate class="btn btn-primary">Pelanggan Baru</button>
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
        <div v-if="!sale.shipping" class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">Alamat Pengiriman</h5>
            <p class="card-text">
              Tambahkan alamat pengiriman dengan mengklik tombol di bawah.
            </p>
            <button v-b-modal.modal-ShippingCreate class="btn btn-primary">Tambahkan Alamat</button>
            <shippingCreate @shippingCreate="shippingCreate" />
          </div>
        </div>
        <ShippingDetail
          v-if="sale.shipping"
          :propShipping="shipping"
          @shippingUpdate="shippingUpdate"
          @shippingDestroy="shippingDestroy"
        />
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
    <div v-if="sale" slot="content" class="row mb-4">
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
import ShippingCreate from '@/components/shippings/ShippingCreate'
import ShippingDetail from '@/components/shippings/ShippingDetail'
import ProductList from '@/components/products/ProductList'
import SaleItemList from '@/components/saleitems/SaleItemList'
import SaleItemDetail from '@/components/saleitems/SaleItemDetail'

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
    BrandList,
    ShippingCreate,
    ShippingDetail,
    ProductList,
    SaleItemList,
    SaleItemDetail
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
      },
      shipping: undefined,
      products: [],
      paginationProduct: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      product: undefined,
      saleItems: [],
      paginationSaleItem: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      saleItem: undefined
    }
  },
  methods: {
    saleRetrieve () {
      // This method invoke without dependency of
      // component models.
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
    shippingRetrieve () {
      // This method invoke without dependency of
      // component models.
      if (!this.sale) { return }
      if (!this.sale.shipping) { return }
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/shippings/${this.sale.shipping}/`
      return this.axios.get(url)
        .then((response) => {
          this.shipping = response.data
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
      // Update shipping automatically when shipping is exist
      const payload = {
        id: this.sale.shipping,
        country: value.country,
        sale: this.sale.id,
        province: value.province,
        city: value.city,
        address: value.address,
        postal_code: value.zip_code
      }
      if (this.sale.shipping) {
        this.shippingUpdate(payload)
      } else {
        this.shippingCreate(payload)
      }
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
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
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
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    shippingCreate (value) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/shippings/`
      value.sale = this.$route.params.id
      return this.axios.post(url, value)
        .then((response) => {
          this.shipping = response.data
          this.saleRetrieve()
        })
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    shippingUpdate (value) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/shippings/${value.id}/`
      return this.axios.put(url, value)
        .then((response) => {
          this.shipping = response.data
          this.saleRetrieve()
        })
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    shippingDestroy (value) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/shippings/${value.id}/`
      return this.axios.delete(url, value)
        .then((response) => {
          this.shipping = undefined
          this.saleRetrieve()
        })
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    productList () {
      return this.list('products', {only_root: true})
        .then((response) => {
          this.products = response.data.results
          this.paginationProduct.next = response.data.next
          this.paginationProduct.previous = response.data.previous
          this.paginationProduct.count = response.data.count
        })
    },
    productRetrieve (value) {
      this.product = value
      if (!value.number_variation) {
        this.create('saleitems', {
          product: value.id,
          sale: this.sale.id,
          price: value.price,
          quantity: 1
        })
          .then((response) => {
            this.saleItemList()
            this.saleItem = response.data
          })
      }
    },
    productListSearch (query) {
      this.list('products', query)
        .then((response) => {
          this.products = response.data.results
          this.paginationProduct.next = response.data.next
          this.paginationProduct.previous = response.data.previous
          this.paginationProduct.count = response.data.count
        })
    },
    saleItemList () {
      const query = {
        sale: this.sale.id
      }
      return this.list('saleitems', query)
        .then((response) => {
          this.saleItems = response.data.results
          this.paginationSaleItem.next = response.data.next
          this.paginationSaleItem.previous = response.data.previous
          this.paginationSaleItem.count = response.data.count
        })
    },
    saleItemListSearch (query) {
      query.sale = this.sale.id
      return this.list('saleitems', query)
        .then((response) => {
          this.saleItems = response.data.results
          this.paginationSaleItem.next = response.data.next
          this.paginationSaleItem.previous = response.data.previous
          this.paginationSaleItem.count = response.data.count
        })
    },
    saleItemRetrieve (value) {
      this.saleItem = value
    },
    saleItemUpdate (value) {
      this.update('saleitems', value.id, value)
        .then((response) => {
          this.saleItem = response.data
          this.saleItemList()
        })
    },
    saleItemDestroy (value) {
      this.destroy('saleitems', value.id)
        .then((response) => {
          this.saleItemList()
        })
    }
  },
  created () {
    this.saleRetrieve().then(() => {
      this.shippingRetrieve()
      this.saleItemList()
    })
    this.customerList()
    this.brandList()
    this.productList()
  }
}
</script>

<style>

</style>
