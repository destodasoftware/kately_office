<template>
  <common-layout>
    <common-header>
      <font-awesome-icon icon="folder-open"/> Pembelian
    </common-header>
    <!-- modal -->
    <b-modal
      hide-footer
      id="modal-PurchaseCreate"
      title="Pembelian Baru"
      size="lg"
      ref="modal-PurchaseCreate"
      scrollabe
    >
      <purchase-create
        @onCreate="onCreatePurchase"
      />
    </b-modal>
    <b-modal
      hide-footer
      id="modal-PurchaseFilter"
      title="Filter"
      size="lg"
      ref="modal-PurchaseFilter"
      scrollabe
    >
      <purchase-filter
        @onFilter="onFilterPurchase"
      >
      </purchase-filter>
    </b-modal>
    <b-modal
      hide-footer
      id="modal-BrandList"
      title="Pilih Brand"
      size="lg"
      ref="modal-BrandList"
      scrollabe
    >
      <brand-list
        @onSelect="onSelectBrand"
        :brands="brands"
      >
      </brand-list>
    </b-modal>
    <b-modal
      hide-footer
      id="modal-PurchaseDestroy"
      title="Hapus Pembelian"
      size="lg"
      ref="modal-PurchaseDestroy"
      scrollabe
    >
      <purchase-destroy :purchase="purchase" @onDestroy="onPurchaseDestroy" />
    </b-modal>
    <div class="row mb-4">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <button class="btn btn-primary" v-b-modal.modal-PurchaseCreate>
              <font-awesome-icon icon="plus-circle"/> Pembelian Baru
            </button>
            <button class="btn btn-outline-primary" v-b-modal.modal-PurchaseFilter>
              <font-awesome-icon icon="filter"/> Filter
            </button>
            <button class="btn btn-outline-primary" v-b-modal.modal-BrandList>
              <font-awesome-icon icon="filter"/>
              <span v-if="!brand">Pilih Brand</span>
              <span v-if="brand">{{ brand.name }}</span>
            </button>
            <router-link :to="{ name: 'PurchaseComposeManager', params: { id: purchase.id } }" v-if="purchase" class="btn btn-outline-primary">
              <font-awesome-icon icon="edit"/> Informasi Pembelian
            </router-link>
            <button v-if="purchase" class="btn btn-link text-secondary" v-b-modal.modal-PurchaseDestroy>
              <font-awesome-icon icon="trash"/> Hapus Pembelian
            </button>
          </div>
          <purchase-list :purchases="purchases" @onSelect="onSelectPurchase" />
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-12">
        <b-pagination
          class="float-right"
          v-model="queryPurchase.page"
          :total-rows="paginationPurchase.count"
          @change="onPaginatePurchase"
          :per-page="20"
          aria-controls="my-table"
        >
        </b-pagination>
      </div>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from '@/Commons/CommonLayout'
import CommonHeader from '@/Commons/CommonHeader'
import MixinHttp from '@/mixins/MixinHttp'
import HelperText from '@/Helpers/HelperText'

import PurchaseService from '@/Purchases/PurchaseService'
import PurchaseList from '@/Purchases/Components/PurchaseList'
import PurchaseCreate from '@/Purchases/Components/PurchaseCreate'
import PurchaseFilter from '@/Purchases/Components/PurchaseFilter'
import PurchaseDestroy from '@/Purchases/Components/PurchaseDestroy'
import BrandService from '@/Brands/BrandService'
import BrandList from '@/Brands/Components/BrandList'

export default {
  name: 'PurchaseMainManager',
  components: {
    'common-layout': CommonLayout,
    'common-header': CommonHeader,
    'purchase-list': PurchaseList,
    'purchase-create': PurchaseCreate,
    'purchase-filter': PurchaseFilter,
    'brand-list': BrandList,
    'purchase-destroy': PurchaseDestroy
  },
  mixins: [
    MixinHttp,
    HelperText,
    PurchaseService,
    BrandService
  ],
  methods: {
    onSelectPurchase (purchase) {
      this.retrievePurchase(purchase.id)
        .then((response) => {
          this.queryPurchase.purchase = purchase.id
          this.listPurchase()
          this.$refs['modal-PurchaseDestroy'].hide()
        })
    },
    onCreatePurchase (purchase) {
      this.purchase = purchase
      this.purchase.purchase_number = this.generateSKU('NPP')
      this.createPurchase()
        .then((response) => {
          this.listPurchase()
          this.$refs['modal-PurchaseCreate'].hide()
        })
    },
    onPurchaseDestroy (purchase) {
      this.destroyPurchase(purchase.id)
        .then((response) => {
          this.listPurchase()
        })
    },
    onPaginatePurchase (page) {
      this.queryPurchase.page = page
      this.listPurchase()
    },
    onFilterPurchase (query) {
      this.queryPurchase.purchase_number = query.purchase_number
      this.listPurchase()
    },
    onSelectBrand (brand) {
      this.queryPurchase.brand = brand.id
      this.retrieveBrand(brand.id)
      this.listPurchase()
    }
  },
  mounted () {
    this.httpInit()
    this.listPurchase()
    this.listBrand()
  }
}
</script>

<style>

</style>
