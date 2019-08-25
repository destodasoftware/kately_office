const ROOT_API = `${process.env.ROOT_API}`
const APP = `purchases`
const ENDPOINT = `${ROOT_API}/office/${APP}/`

export default {
  data () {
    return {
      purchases: [],
      purchase: undefined,
      paginationPurchase: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      queryPurchase: {
        page: 1,
        purchase_number: '',
        brand: ''
      }
    }
  },
  methods: {
    listPurchase () {
      return this.axios.get(ENDPOINT, {params: this.queryPurchase})
        .then((response) => {
          this.purchases = response.data.results
          this.paginationPurchase.next = response.data.next
          this.paginationPurchase.previous = response.data.previous
          this.paginationPurchase.count = response.data.count
        })
    },
    retrievePurchase (id) {
      return this.axios.get(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.purchase = response.data
        })
    },
    updatePurchase (id) {
      return this.axios.put(`${ENDPOINT}${id}/`, this.purchase)
        .then((response) => {
          this.purchase = response.data
        })
    },
    createPurchase () {
      return this.axios.post(ENDPOINT, this.purchase)
        .then((response) => {
          this.purchase = response.data
        })
    },
    destroyPurchase (id) {
      return this.axios.delete(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.purchase = undefined
        })
    },
    exportPurchase () {
      const filename = `${new Date()}_.csv`
      return this.axios({
        url: `${ENDPOINT}export/`,
        method: 'GET',
        responseType: 'blob', // important
        params: this.queryPurchase
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
    },
    adjustmentPurchase (id) {
      return this.axios.put(`${ENDPOINT}${id}/adjustment/`)
        .then((response) => {
          this.purchase = undefined
        })
    }
  }
}
