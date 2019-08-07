<template>
  <KatelyBaseLayout>
    <div slot="content" class="row mb-4 no-print">
      <div class="col-md-12">
        <h4>Laporan Penjualan</h4>
      </div>
    </div>
    <div slot="content" class="row mb-4 no-print">
      <div class="col-md-12">
        <ReportSaleItemList
          :propReportSaleItems="reportSaleItems"
          :propPagination="paginationReportSaleItems"
          @reportSaleItemListSearch="reportSaleItemListSearch"
        />
      </div>
    </div>
  </KatelyBaseLayout>
</template>

<script>
import KatelyBaseLayout from '@/commons/KatelyBaseLayout'
import MixinHttp from '@/mixins/MixinHttp'
import ReportSaleItemList from '@/components/reportsaleitems/ReportSaleItemList'
import ReportSaleItemSummary from '@/components/reportsaleitems/ReportSaleItemSummary'

export default {
  name: 'ReportSaleManager',
  components: {
    KatelyBaseLayout,
    ReportSaleItemList,
    ReportSaleItemSummary
  },
  mixins: [
    MixinHttp
  ],
  data () {
    return {
      reportSaleItems: [],
      paginationReportSaleItems: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      summary: undefined
    }
  },
  methods: {
    reportSaleItemList () {
      this.list('reportsaleitems')
        .then((response) => {
          this.reportSaleItems = response.data.results
          this.paginationReportSaleItems.next = response.data.next
          this.paginationReportSaleItems.previous = response.data.previous
          this.paginationReportSaleItems.count = response.data.count
        })
    },
    reportSaleItemRetrieve (value) {
      this.reportSaleItem = value
    },
    reportSaleItemListSearch (query) {
      this.list('reportsaleitems', query)
        .then((response) => {
          this.reportSaleItems = response.data.results
          this.paginationReportSaleItems.next = response.data.next
          this.paginationReportSaleItems.previous = response.data.previous
          this.paginationReportSaleItems.count = response.data.count
        })
    },
    reportSaleItemSummaryRetrieve () {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/reportsaleitems/summary/`
      this.axios.get(url)
        .then((response) => {
          this.summary = response.data
        })
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    }
  },
  mounted () {
    this.reportSaleItemList()
    this.reportSaleItemSummaryRetrieve()
  }
}
</script>

<style>

</style>
