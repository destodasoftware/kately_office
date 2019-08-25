<template>
  <common-layout>
    <common-header>
      <font-awesome-icon icon="folder-open"/> Penjualan
    </common-header>
    <div class="row mb-4">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <button class="btn btn-primary" v-b-modal.modal-SaleCreate>
              <font-awesome-icon icon="plus-circle"/> Penjualan Baru
            </button>
            <button v-b-modal.modal-SaleFilter class="btn btn-outline-primary">
              <font-awesome-icon icon="filter"/> Filter
            </button>
            <button v-if="!brand" v-b-modal.modal-BrandList class="btn btn-outline-primary">
              <font-awesome-icon icon="filter"/> Brand
            </button>
            <button v-if="brand" v-b-modal.modal-BrandList class="btn btn-outline-primary">
              <font-awesome-icon icon="filter"/> Brand {{ brand.name }}
            </button>
            <router-link class="btn btn-outline-primary" v-if="sale" :to="{ name: 'SaleComposeManager', params: { id: sale.id } }">
              <font-awesome-icon icon="edit"/> Informasi Penjualan
            </router-link>
            <button v-if="sale" class="btn btn-link text-secondary" v-b-modal.modal-SaleDestroy>
              <font-awesome-icon icon="trash"/> Hapus Penjualan
            </button>
          </div>
          <sale-list :sales="sales" @onSelect="onSelectSale" />
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-12">
        <b-pagination
          class="float-right"
          v-model="querySale.page"
          :total-rows="paginationSale.count"
          @change="onPaginateSale"
          :per-page="20"
          aria-controls="my-table"
        >
        </b-pagination>
      </div>
    </div>
    <!-- modal -->
    <b-modal
      hide-footer
      id="modal-SaleDestroy"
      title="Hapus Penjualan"
      size="lg"
      ref="modal-SaleDestroy"
      scrollabe
    >
      <sale-destroy :sale="sale" @onDestroy="onDestroySale" />
    </b-modal>
    <b-modal
      hide-footer
      id="modal-SaleFilter"
      title="Filter Penjualan"
      size="lg"
      ref="modal-SaleFilter"
      scrollabe
    >
      <sale-filter @onFilter="onFilterSale" />
    </b-modal>
    <b-modal
      hide-footer
      id="modal-SaleCreate"
      title="Penjualan Baru"
      size="lg"
      ref="modal-SaleCreate"
      scrollabe
    >
      <sale-create @onCreate="onCreateSale" />
    </b-modal>
    <b-modal
      hide-footer
      id="modal-BrandList"
      title="Pilih Brand"
      size="lg"
      ref="modal-BrandList"
      scrollabe
    >
      <div class="row mb-4">
        <div class="col-md-12">
          <button @click="onResetBrand" class="btn btn-outline-dark">
            Reset
          </button>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Filter</h5>
              <brand-filter @onFilter="onFilterBrand" />
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-md-12">
          <div class="card">
            <brand-list @onSelect="onSelectBrand" :brands="brands" />
          </div>
        </div>
      </div>
    </b-modal>
    <!-- ./modal -->
  </common-layout>
</template>

<script>
import CommonLayout from '@/Commons/CommonLayout'
import CommonHeader from '@/Commons/CommonHeader'
import MixinHttp from '@/mixins/MixinHttp'
import HelperText from '@/Helpers/HelperText'

import SaleService from '@/Sales/SaleService'
import SaleList from '@/Sales/Components/SaleList'
import SaleDestroy from '@/Sales/Components/SaleDestroy'
import SaleFilter from '@/Sales/Components/SaleFilter'
import SaleCreate from '@/Sales/Components/SaleCreate'

import BrandService from '@/Brands/BrandService'
import BrandList from '@/Brands/Components/BrandList'
import BrandFilter from '@/Brands/Components/BrandFilter'

export default {
  name: 'SaleMainManager',
  components: {
    'common-layout': CommonLayout,
    'common-header': CommonHeader,
    'sale-list': SaleList,
    'sale-destroy': SaleDestroy,
    'sale-filter': SaleFilter,
    'sale-create': SaleCreate,
    'brand-list': BrandList,
    'brand-filter': BrandFilter
  },
  mixins: [
    MixinHttp,
    HelperText,
    SaleService,
    BrandService
  ],
  methods: {
    onSelectSale (sale) {
      this.retrieveSale(sale.id)
    },
    onPaginateSale (page) {
      this.querySale.page = page
      this.listSale()
    },
    onDestroySale (sale) {
      this.destroySale(sale.id)
        .then((response) => {
          this.listSale()
          this.$refs['modal-SaleDestroy'].hide()
        })
    },
    onFilterSale (query) {
      this.querySale.sale_number = query.sale_number
      this.listSale()
    },
    onCreateSale (sale) {
      sale.sale_number = this.generateSKU('ORD')
      console.log(sale)
      if (sale.sale_date) {
        const myDate = sale.sale_date
        sale.sale_date = `${myDate.getFullYear()}-${myDate.getMonth()}-${myDate.getDate()}`
      }
      this.sale = sale
      this.createSale()
        .then((response) => {
          this.listSale()
          this.sale = undefined
          this.$refs['modal-SaleCreate'].hide()
        })
    },
    onSelectBrand (brand) {
      this.retrieveBrand(brand.id)
        .then((response) => {
          this.querySale.brand = brand.id
          this.listSale()
          this.$refs['modal-BrandList'].hide()
        })
    },
    onFilterBrand (query) {
      this.queryBrand.name = query.name
      this.listBrand()
    },
    onResetBrand () {
      this.brand = undefined
      this.querySale.brand = undefined
      this.listSale()
    }
  },
  mounted () {
    this.httpInit()
    this.listSale()
    this.listBrand()
  }
}
</script>

<style>

</style>
