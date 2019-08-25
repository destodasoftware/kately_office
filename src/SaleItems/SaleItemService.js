const ROOT_API = `${process.env.ROOT_API}`
const APP = `saleitems`
const ENDPOINT = `${ROOT_API}/office/${APP}/`

export default {
  data () {
    return {
      saleItems: [],
      saleItem: undefined,
      paginationSaleItem: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      querySaleItem: {
        page: 1,
        sale: ''
      }
    }
  },
  methods: {
    listSaleItem () {
      return this.axios.get(ENDPOINT, {params: this.querySaleItem})
        .then((response) => {
          this.saleItems = response.data.results
          this.paginationSaleItem.next = response.data.next
          this.paginationSaleItem.previous = response.data.previous
          this.paginationSaleItem.count = response.data.count
        })
    },
    retrieveSaleItem (id) {
      return this.axios.get(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.saleItem = response.data
        })
    },
    updateSaleItem (id) {
      return this.axios.put(`${ENDPOINT}${id}/`, this.saleItem)
        .then((response) => {
          this.saleItem = response.data
        })
    },
    createSaleItem () {
      return this.axios.post(ENDPOINT, this.saleItem)
        .then((response) => {
          this.saleItem = response.data
        })
    },
    destroySaleItem (id) {
      return this.axios.delete(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.saleItem = undefined
        })
    },
    exportSaleItem () {
      const filename = `${new Date()}_.csv`
      return this.axios({
        url: `${ENDPOINT}export/`,
        method: 'GET',
        responseType: 'blob', // important
        params: this.querySaleItem
      })
        .then((response) => {
          console.log(response.data)
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', filename)
          document.body.appendChild(link)
          link.click()
        })
    }
  }
}
