<template>
  <KatelyBaseLayout>
    <CommonHeader slot="content">
      <span slot="title">Laporan Penjualan</span>
    </CommonHeader>
    <div class="row mb-4" slot="content">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Filter Laporan Penjualan</h5>
            <SaleReportFilter @onFilter="onFilterSaleReport" />
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div v-b-modal.modal-BrandList class="card">
          <div v-if="!brand" class="card-body">
            <h5 class="card-title">Brand</h5>
            <div class="card-text">Brand belum dipilih</div>
          </div>
          <div v-if="brand" class="card-body">
            <h5 class="card-title">Brand</h5>
            <div class="card-text">
              {{ brand.name }} <a @click.prevent="cancelBrand" class="text-danger" href="javascript:void(0)">batalkan</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal slot="content" id="modal-BrandList" hide-footer title="Pilih Brand">
      <BrandList :brands="brands" @onSelect="onSelectBrand" />
    </b-modal>
    <div class="row mb-4" slot="content">
      <div class="col-md-12">
        <button @click="exportCSV" class="btn btn-primary">
          Export
        </button>
      </div>
    </div>
    <div class="row mb-2" slot="content">
      <div class="col-md-12">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">Daftar Penjualan</h5>
            <SaleReportList
              @onSelect="onSelectSaleReport"
              :saleReports="saleReports"
            />
          </div>
        </div>
      </div>
    </div>
  </KatelyBaseLayout>
</template>

<script>
import MixinHttp from '@/mixins/MixinHttp'
import KatelyBaseLayout from '@/commons/KatelyBaseLayout'
import CommonHeader from '@/Commons/CommonHeader'

import BrandService from '@/Brands/BrandService'
import BrandList from '@/Brands/Components/BrandList'

import SaleReportService from '@/SaleReports/SaleReportService'
import SaleReportFilter from '@/SaleReports/Components/SaleReportFilter'
import SaleReportList from '@/SaleReports/Components/SaleReportList'

export default {
  name: 'SaleReportMainManager',
  mixins: [
    MixinHttp,
    SaleReportService,
    BrandService
  ],
  components: {
    KatelyBaseLayout,
    CommonHeader,
    SaleReportFilter,
    SaleReportList,
    BrandList
  },
  methods: {
    onFilterSaleReport (query) {
      this.querySaleReport.start_date = query.start_date
      this.querySaleReport.end_date = query.end_date
      this.querySaleReport.is_paid = query.is_paid
      this.listSaleReport()
    },
    onSelectSaleReport (saleReport) {
      this.retrieveSaleReport(saleReport.id)
    },
    onSelectBrand (brand) {
      this.retrieveBrand(brand.id)
      this.querySaleReport.brand = brand.id
      this.listSaleReport()
    },
    cancelBrand () {
      this.brand = undefined
      this.querySaleReport.brand = undefined
      this.listSaleReport()
    },
    exportCSV () {
      const method = 'GET'
      const url = `${process.env.ROOT_API}/office/salereports/export_csv/`
      this.axios
        .request({
          url,
          method,
          responseType: 'blob',
          params: this.querySaleReport
        })
        .then(({ data }) => {
          const downloadUrl = window.URL.createObjectURL(new Blob([data]))
          const link = document.createElement('a')
          link.href = downloadUrl
          link.setAttribute('download', 'file.csv')
          document.body.appendChild(link)
          link.click()
          link.remove()
        })
    }
  },
  mounted () {
    this.httpInit()
    this.listSaleReport()
    this.listBrand()
  }
}
</script>
