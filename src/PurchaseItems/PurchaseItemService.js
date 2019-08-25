const ROOT_API = `${process.env.ROOT_API}`
const APP = `purchaseitems`
const ENDPOINT = `${ROOT_API}/office/${APP}/`

export default {
  data () {
    return {
      purchaseItems: [],
      purchaseItem: undefined,
      paginationPurchaseItem: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      queryPurchaseItem: {
        page: 1,
        name: '',
        brand: undefined
      }
    }
  },
  methods: {
    listPurchaseItem () {
      return this.axios.get(ENDPOINT, {params: this.queryPurchaseItem})
        .then((response) => {
          this.purchaseItems = response.data.results
          this.paginationPurchaseItem.next = response.data.next
          this.paginationPurchaseItem.previous = response.data.previous
          this.paginationPurchaseItem.count = response.data.count
        })
    },
    retrievePurchaseItem (id) {
      return this.axios.get(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.purchaseItem = response.data
        })
    },
    updatePurchaseItem (id) {
      return this.axios.put(`${ENDPOINT}${id}/`, this.purchaseItem)
        .then((response) => {
          this.purchaseItem = response.data
        })
    },
    createPurchaseItem () {
      return this.axios.post(ENDPOINT, this.purchaseItem)
        .then((response) => {
          this.purchaseItem = response.data
        })
    },
    destroyPurchaseItem (id) {
      return this.axios.delete(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.purchaseItem = undefined
        })
    },
    exportPurchaseItem () {
      const filename = `${new Date()}_.csv`
      return this.axios({
        url: `${ENDPOINT}export/`,
        method: 'GET',
        responseType: 'blob', // important
        params: this.queryPurchaseItem
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
