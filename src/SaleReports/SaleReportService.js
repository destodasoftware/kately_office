export default {
  data () {
    return {
      saleReport: undefined,
      saleReports: [],
      paginationSaleReport: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      querySaleReport: {
        start_date: '',
        end_date: '',
        brand: '',
        is_paid: false,
        page: 1
      }
    }
  },
  methods: {
    listSaleReport () {
      const url = `${process.env.ROOT_API}/office/salereports/`
      return this.axios.get(url, {params: this.querySaleReport})
        .then((response) => {
          this.saleReports = response.data.results
          this.paginationSaleReport.next = response.data.next
          this.paginationSaleReport.previous = response.data.previous
          this.paginationSaleReport.count = response.data.count
        })
        .catch((error) => {
          console.log(error)
        })
    },
    retrieveSaleReport (id) {
      const url = `${process.env.ROOT_API}/office/salereports/${id}/`
      return this.axios.get(url)
        .then((response) => {
          this.saleReport = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
