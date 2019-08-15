<template>
  <KatelyBaseLayout>
    <div slot="content" class="row mb-4 no-print">
      <div class="col-md-12">
        <h4>Laporan Penjualan</h4>
      </div>
    </div>
    <div slot="content" class="row mb-4 no-print">
      <div class="col-md-12">
        <SaleReportFilter @saleReportFilter="saleReportFilter" />
      </div>
    </div>
    <div slot="content" class="row mb-4 no-print">
      <div class="col-md-12">
        <SaleReport
          :propSaleReports="saleReports"
          :propPagination="paginationSaleReport"
        />
      </div>
    </div>
  </KatelyBaseLayout>
</template>

<script>
import KatelyBaseLayout from '@/commons/KatelyBaseLayout'
import MixinHttp from '@/mixins/MixinHttp'
import MixinSaleReports from '@/mixins/MixinSaleReports'
import SaleReport from '@/components/sales/SaleReport'
import SaleReportFilter from '@/components/sales/helpers/SaleReportFilter'

export default {
  name: 'ReportSaleManager',
  components: {
    KatelyBaseLayout,
    SaleReport,
    SaleReportFilter
  },
  mixins: [
    MixinHttp,
    MixinSaleReports
  ],
  methods: {
    saleReportFilter (query) {
      this.querySaleReport = query
      this.saleReportList()
    }
  },
  mounted () {
    this.httpInit()
    this.saleReportList()
  }
}
</script>

<style>

</style>
