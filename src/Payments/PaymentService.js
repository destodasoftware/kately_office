const ROOT_API = `${process.env.ROOT_API}`
const APP = `payments`
const ENDPOINT = `${ROOT_API}/office/${APP}/`

export default {
  data () {
    return {
      payments: [],
      payment: undefined,
      paginationPayment: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      queryPayment: {
        page: 1,
        sale: ''
      }
    }
  },
  methods: {
    listPayment () {
      return this.axios.get(ENDPOINT, {params: this.queryPayment})
        .then((response) => {
          this.payments = response.data.results
          this.paginationPayment.next = response.data.next
          this.paginationPayment.previous = response.data.previous
          this.paginationPayment.count = response.data.count
        })
    },
    retrievePayment (id) {
      return this.axios.get(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.payment = response.data
        })
    },
    updatePayment (id) {
      return this.axios.put(`${ENDPOINT}${id}/`, this.payment)
        .then((response) => {
          this.payment = response.data
        })
    },
    createPayment () {
      return this.axios.post(ENDPOINT, this.payment)
        .then((response) => {
          this.payment = response.data
        })
    },
    destroyPayment (id) {
      return this.axios.delete(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.payment = undefined
        })
    },
    exportPayment () {
      const filename = `${new Date()}_.csv`
      return this.axios({
        url: `${ENDPOINT}export/`,
        method: 'GET',
        responseType: 'blob', // important
        params: this.queryPayment
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
