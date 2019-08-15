export default {
  data () {
    return {
      saleReports: [],
      saleReport: undefined,
      paginationSaleReport: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      querySaleReport: {
        page: '',
        from_date: '',
        to_date: '',
        is_paid: true,
        brand: ''
      },
      configSaleReport: {
        resource: '/office/sales/report/',
        root: `${process.env.ROOT_API}`
      }
    }
  },
  methods: {
    setPaginationSaleReport (data) {
      this.paginationSaleReport.next = data.next
      this.paginationSaleReport.previous = data.previous
      this.paginationSaleReport.count = data.count
    },
    saleReportList () {
      const url = `${this.configSaleReport.root}${this.configSaleReport.resource}`
      return this.axios.get(url, {params: this.querySaleReport})
        .then((response) => {
          this.saleReports = response.data.results
          this.setPaginationSaleReport(response.data)
        })
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    }
  }
}
