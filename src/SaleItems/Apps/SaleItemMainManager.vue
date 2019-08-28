<template>
  <common-layout>
    <common-header>
      <font-awesome-icon icon="folder-open" /> Item Penjualan
    </common-header>
    <div class="row mb-4">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <button class="btn btn-outline-primary" v-b-modal.modal-SaleItemFilter>
              <font-awesome-icon icon="filter"/> Filter
            </button>
            <sale-item-report @onExport="onExportSaleItem" @onExportPakde="onExportPakdeSaleItem" />
          </div>
          <sale-item-list :saleItems="saleItems" @onSelect="onSelectItem" />
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-12">
        <b-pagination
          class="float-right"
          v-model="querySaleItem.page"
          :total-rows="paginationSaleItem.count"
          @change="onPaginateSaleItem"
          :per-page="20"
          aria-controls="my-table"
        >
        </b-pagination>
      </div>
    </div>
    <b-modal
      hide-footer
      id="modal-SaleItemFilter"
      title="Filter Item Penjualan"
      size="lg"
      ref="modal-SaleItemFilter"
      scrollabe
    >
      <sale-item-filter @onFilter="onFilterSaleItem" />
    </b-modal>
  </common-layout>
</template>

<script>
import CommonLayout from '@/Commons/CommonLayout'
import CommonHeader from '@/Commons/CommonHeader'
import MixinHttp from '@/mixins/MixinHttp'

import SaleItemService from '@/SaleItems/SaleItemService'
import SaleItemList from '@/SaleItems/Components/SaleItemList'
import SaleItemReport from '@/SaleItems/Components/SaleItemReport'
import SaleItemFilter from '@/SaleItems/Components/SaleItemFilter'

export default {
  name: 'SaleItemManager',
  components: {
    'common-layout': CommonLayout,
    'common-header': CommonHeader,
    'sale-item-list': SaleItemList,
    'sale-item-report': SaleItemReport,
    'sale-item-filter': SaleItemFilter
  },
  mixins: [
    MixinHttp,
    SaleItemService
  ],
  methods: {
    onSelectItem (saleItem) {
      this.retrieveSaleItem(saleItem.id)
    },
    onPaginateSaleItem (page) {
      this.querySaleItem.page = page
      this.listSaleItem()
    },
    onExportSaleItem () {
      this.exportSaleItem()
    },
    onExportPakdeSaleItem () {
      this.exportPakdeSaleItem()
    },
    onFilterSaleItem (query) {
      this.querySaleItem.sale_number = query.sale_number
      this.listSaleItem()
    }
  },
  mounted () {
    this.httpInit()
    this.listSaleItem()
  }
}
</script>

<style>

</style>
