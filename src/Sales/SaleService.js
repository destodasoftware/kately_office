const ROOT_API = `${process.env.ROOT_API}`
const APP = `sales`
const ENDPOINT = `${ROOT_API}/office/${APP}/`

export default {
  data () {
    return {
      sales: [],
      sale: undefined,
      paginationSale: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      querySale: {
        page: 1,
        sale_number: ''
      }
    }
  },
  methods: {
    listSale () {
      return this.axios.get(ENDPOINT, {params: this.querySale})
        .then((response) => {
          this.sales = response.data.results
          this.paginationSale.next = response.data.next
          this.paginationSale.previous = response.data.previous
          this.paginationSale.count = response.data.count
        })
    },
    retrieveSale (id) {
      return this.axios.get(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.sale = response.data
        })
    },
    updateSale (id) {
      return this.axios.put(`${ENDPOINT}${id}/`, this.sale)
        .then((response) => {
          this.sale = response.data
        })
    },
    createSale () {
      return this.axios.post(ENDPOINT, this.sale)
        .then((response) => {
          this.sale = response.data
        })
    },
    destroySale (id) {
      return this.axios.delete(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.sale = undefined
        })
    },
    exportSale () {
      const filename = `${new Date()}_.csv`
      return this.axios({
        url: `${ENDPOINT}export/`,
        method: 'GET',
        responseType: 'blob', // important
        params: this.querySale
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
