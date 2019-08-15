const ROOT_API = `${process.env.ROOT_API}`
const APP = 'customers'
const ENDPOINT = `${ROOT_API}/office/${APP}/`

export default {
  data () {
    return {
      customers: [],
      customer: undefined,
      paginationCustomer: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      queryCustomer: {
        page: 1,
        customer_number: '',
        name: ''
      }
    }
  },
  methods: {
    listCustomer () {
      const url = `${process.env.ROOT_API}/office/customers/`
      return this.axios.get(url, {params: this.queryCustomer})
        .then((response) => {
          this.customers = response.data.results
          this.paginationCustomer.next = response.data.next
          this.paginationCustomer.previous = response.data.previous
          this.paginationCustomer.count = response.data.count
        })
        .catch((error) => {
          console.log(error)
        })
    },
    retrieveCustomer (id) {
      const url = `${process.env.ROOT_API}/office/customers/${id}/`
      return this.axios.get(url)
        .then((response) => {
          this.customer = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateCustomer (id) {
      return this.axios.put(`${ENDPOINT}${id}/`, this.customer)
        .then((response) => {
          this.customer = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    createCustomer () {
      return this.axios.post(ENDPOINT, this.customer)
        .then((response) => {
          this.customer = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    destroyCustomer (id) {
      return this.axios.delete(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.customer = undefined
        })
        .catch((error) => {
          console.log(error)
        })
    },
    exportCustomer () {
      const filename = `${new Date()}_.csv`
      return this.axios({
        url: `${ENDPOINT}export/`,
        method: 'GET',
        responseType: 'blob', // important
        params: this.queryCustomer
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
