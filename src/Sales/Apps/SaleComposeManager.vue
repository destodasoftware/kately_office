<template>
  <common-layout>
    <common-header v-if="sale">{{ sale.sale_number }}</common-header>
    <div class="row mb-4">
      <div class="col-md-12">
        <button v-if="sale" class="btn btn-outline-primary" v-b-modal.modal-CustomerList>
          Pelanggan {{ sale.customer_name }}
        </button>
        <button v-if="sale" v-b-modal.modal-BrandList class="btn btn-outline-primary">
          Brand {{ sale.brand_name }}
        </button>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <sale-detail :sale="sale" @onUpdate="onUpdateSale" />
          </div>
        </div>
      </div>
    </div>
    <common-header>Item</common-header>
    <div class="row mb-4">
      <div class="col-md-12">
        <button v-b-modal.modal-ProductList class="btn btn-outline-primary">
          Pilih Produk
        </button>
        <button v-if="saleItem" v-b-modal.modal-SaleItemDetail class="btn btn-outline-primary">
          Informasi Item
        </button>
        <button v-if="saleItem" v-b-modal.modal-SaleItemDestroy class="btn btn-outline-dark">
          Hapus Item
        </button>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-12">
        <div class="card">
          <sale-item-list :saleItems="saleItems" @onSelect="onSelectSaleItem" />
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-6">
        <common-header>Pembayaran</common-header>
        <div class="card">
          <div class="card-body">
            <payment-detail :payment="payment" @onUpdate="onUpdatePayment" />
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <common-header>Alamat Pengiriman</common-header>
        <div class="card">
          <div class="card-body">
            <shipping-create v-if="!sale.shipping" @onCreate="onCreateShipping" />
            <shipping-detail v-if="sale.shipping" :shipping="shipping" @onUpdate="onUpdateShipping" />
          </div>
        </div>
      </div>
    </div>
    <b-modal hide-footer id="modal-CustomerList" title="Pilih Pelanggan" size="lg" ref="modal-CustomerList" scrollable>
      <div class="row mb-4">
        <div class="col-md-12">
          <button v-b-modal.modal-CustomerCreate class="btn btn-primary">
            Pelanggan Baru
          </button>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Filter</h5>
              <customer-filter @onFilter="onFilterCustomer" />
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-md-12">
          <div class="card">
            <customer-list :customers="customers" @onSelect="onSelectCustomer" />
          </div>
        </div>
      </div>
    </b-modal>
    <b-modal hide-footer id="modal-CustomerCreate" title="Pelanggan Baru" size="lg" ref="modal-CustomerCreate" scrollabe>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <customer-create @onCreate="onCreateCustomer" />
            </div>
          </div>
        </div>
      </div>
    </b-modal>
    <b-modal hide-footer id="modal-BrandList" title="Pilih Brand" size="lg" ref="modal-BrandList" scrollabe>
      <div class="row mb-4">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <brand-filter @onFilter="onFilterBrand" />
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-md-12">
          <div class="card">
            <brand-list :brands="brands" @onSelect="onSelectBrand"/>
          </div>
        </div>
      </div>
    </b-modal>
    <b-modal hide-footer id="modal-ProductList" title="Pilih Produk" size="lg" ref="modal-ProductList" scrollabe>
      <div class="row mb-4">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Filter</h5>
              <product-filter @onFilter="onFilterProduct" />
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-md-12">
          <div class="card">
            <product-list
              :products="products"
              @onSelect="onSelectProduct"
            />
          </div>
        </div>
      </div>
    </b-modal>
    <b-modal
      hide-footer
      id="modal-ProductVariantList"
      title="Pilih Produk"
      size="lg"
      ref="modal-ProductVariantList"
      scrollabe
    >
      <div class="row mb-4">
        <div class="col-md-12">
          <div class="card">
            <product-variant-list
              :productVariants="productVariants"
              @onSelect="onSelectProductVariant"
            />
          </div>
        </div>
      </div>
    </b-modal>
    <!-- ./modal product variant list -->
    <!-- modal sale item detail -->
    <b-modal
      v-if="saleItem"
      hide-footer
      id="modal-SaleItemDetail"
      title="Informasi Item"
      size="lg"
      ref="modal-SaleItemDetail"
      scrollabe
    >
      <div class="row mb-4">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <sale-item-detail
                :saleItem="saleItem"
                @onUpdate="onUpdateSaleItem"
              />
            </div>
          </div>
        </div>
      </div>
    </b-modal>
    <!-- ./modal sale item detail -->
    <!-- modal sale item destroy -->
    <b-modal
      v-if="saleItem"
      hide-footer
      id="modal-SaleItemDestroy"
      title="Hapus Item"
      size="lg"
      ref="modal-SaleItemDestroy"
      scrollabe
    >
      <div class="row mb-4">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <sale-item-destroy
                :saleItem="saleItem"
                @onDestroy="onDestroySaleItem"
              />
            </div>
          </div>
        </div>
      </div>
    </b-modal>
    <!-- ./modal sale item destroy -->
  </common-layout>
</template>

<script>
import CommonLayout from '@/Commons/CommonLayout'
import CommonHeader from '@/Commons/CommonHeader'
import MixinHttp from '@/mixins/MixinHttp'
import HelperError from '@/Helpers/HelperError'

import SaleService from '@/Sales/SaleService'
import SaleDetail from '@/Sales/Components/SaleDetail'

import CustomerService from '@/Customers/CustomerService'
import CustomerList from '@/Customers/Components/CustomerList'
import CustomerCreate from '@/Customers/Components/CustomerCreate'
import CustomerFilter from '@/Customers/Components/CustomerFilter'

import BrandService from '@/Brands/BrandService'
import BrandList from '@/Brands/Components/BrandList'
import BrandFilter from '@/Brands/Components/BrandFilter'

import ProductService from '@/Products/ProductService'
import ProductList from '@/Products/Components/ProductList'
import ProductFilter from '@/Products/Components/ProductFilter'

import ProductVariantService from '@/ProductVariants/ProductVariantService'
import ProductVariantList from '@/ProductVariants/Components/ProductVariantList'

import SaleItemService from '@/SaleItems/SaleItemService'
import SaleItemList from '@/SaleItems/Components/SaleItemList'
import SaleItemDetail from '@/SaleItems/Components/SaleItemDetail'
import SaleItemDestroy from '@/SaleItems/Components/SaleItemDestroy'

import PaymentService from '@/Payments/PaymentService'
import PaymentDetail from '@/Payments/Components/PaymentDetail'

import ShippingService from '@/Shippings/ShippingService'
import ShippingCreate from '@/Shippings/Components/ShippingCreate'
import ShippingDetail from '@/Shippings/Components/ShippingDetail'

export default {
  name: 'SaleComposeManager',
  components: {
    'common-layout': CommonLayout,
    'common-header': CommonHeader,
    'sale-detail': SaleDetail,
    'customer-list': CustomerList,
    'customer-create': CustomerCreate,
    'customer-filter': CustomerFilter,
    'brand-list': BrandList,
    'brand-filter': BrandFilter,
    'product-list': ProductList,
    'product-filter': ProductFilter,
    'product-variant-list': ProductVariantList,
    'sale-item-list': SaleItemList,
    'sale-item-detail': SaleItemDetail,
    'sale-item-destroy': SaleItemDestroy,
    'payment-detail': PaymentDetail,
    'shipping-create': ShippingCreate,
    'shipping-detail': ShippingDetail
  },
  mixins: [
    MixinHttp,
    HelperError,
    SaleService,
    CustomerService,
    BrandService,
    ProductService,
    ProductVariantService,
    SaleItemService,
    PaymentService,
    ShippingService
  ],
  methods: {
    onUpdateSale (sale) {
      this.sale = sale
      this.updateSale(sale.id)
    },
    onSelectCustomer (customer) {
      this.retrieveCustomer(customer.id)
        .then((response) => {
          this.sale.customer = customer.id
          this.updateSale(this.sale.id)
            .then((response) => {
              this.retrieveSale(this.sale.id)
              this.$refs['modal-CustomerList'].hide()
            })
        })
    },
    onCreateCustomer (customer) {
      this.customer = customer
      this.createCustomer()
        .then((response) => {
          this.sale.customer = customer.id
          this.updateSale(this.sale.id)
          this.listCustomer()
          this.$refs['modal-CustomerCreate'].hide()
        })
    },
    onFilterCustomer (query) {
      this.queryCustomer.customer_number = query.customer_number
      this.queryCustomer.name = query.name
      this.listCustomer()
        .then((response) => {
          this.$refs['modal-CustomerList'].hide()
        })
    },
    onSelectBrand (brand) {
      this.retrieveBrand(brand.id)
        .then((response) => {
          this.sale.brand = brand.id
          this.updateSale(this.sale.id)
            .then((response) => {
              this.retrieveSale(this.sale.id)
              this.$refs['modal-BrandList'].hide()
            })
        })
    },
    onFilterBrand (query) {
      this.queryBrand.name = query.name
      this.listBrand()
    },
    onSelectProduct (product) {
      if (product.number_variation > 0) {
        this.queryProductVariant.root = product.id
        this.listProductVariant()
          .then((response) => {
            this.$refs['modal-ProductVariantList'].show()
          })
      } else {
        this.retrieveProduct(product.id)
          .then((response) => {
            this.saleItem = {
              sale: this.sale.id,
              product: product.id,
              price: product.price,
              quantity: 1
            }
            this.createSaleItem()
              .then((response) => {
                this.listSaleItem()
                this.$refs['modal-ProductList'].hide()
              })
          })
      }
    },
    onSelectProductVariant (productVariant) {
      this.saleItem = {
        sale: this.sale.id,
        product: productVariant.id,
        price: productVariant.price,
        quantity: 1
      }
      this.createSaleItem()
        .then((response) => {
          this.listSaleItem()
          this.$refs['modal-ProductVariantList'].hide()
          this.$refs['modal-ProductList'].hide()
        })
    },
    onFilterProduct (query) {
      console.log(query)
      this.queryProduct.sku = query.sku
      this.queryProduct.name = query.name
      this.listProduct()
    },
    onSelectSaleItem (saleItem) {
      this.retrieveSaleItem(saleItem.id)
    },
    onUpdateSaleItem (saleItem) {
      this.saleItem = saleItem
      this.updateSaleItem(saleItem.id)
        .then((response) => {
          this.listSaleItem()
          this.retrieveSale(this.sale.id)
          this.$refs['modal-SaleItemDetail'].hide()
        })
    },
    onDestroySaleItem (saleItem) {
      this.$refs['modal-SaleItemDestroy'].hide()
      this.destroySaleItem(saleItem.id)
        .then((response) => {
          this.listSaleItem()
          this.retrieveSale(this.sale.id)
        })
    },
    onCreateShipping (shipping) {
      shipping.sale = this.sale.id
      this.shipping = shipping
      this.createShipping()
        .then((response) => {
          this.retrieveSale(this.sale.id)
        })
    },
    onUpdateShipping (shipping) {
      this.shipping = shipping
      this.updateShipping(shipping.id)
        .then((response) => {
          this.retrieveSale(this.sale.id)
        })
    },
    onUpdatePayment (payment) {
      this.payment = payment
      this.updatePayment(payment.id)
    }
  },
  mounted () {
    this.httpInit()
    this.retrieveSale(this.$route.params.id)
      .then((response) => {
        if (this.sale.shipping) {
          this.retrieveShipping(this.sale.shipping)
        }
        if (this.sale.payment) {
          this.retrievePayment(this.sale.payment)
        }
      })
    this.listCustomer()
    this.listBrand()
    this.listProduct()
    this.querySaleItem.sale = this.$route.params.id
    this.listSaleItem()
  }
}
</script>

<style>

</style>
