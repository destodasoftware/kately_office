const ROOT_API = `${process.env.ROOT_API}`
const APP = `products`
const ENDPOINT = `${ROOT_API}/office/${APP}/`

export default {
  data () {
    return {
      products: [],
      product: undefined,
      paginationProduct: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      queryProduct: {
        page: 1,
        name: '',
        brand: undefined
      }
    }
  },
  methods: {
    listProduct () {
      return this.axios.get(ENDPOINT, {params: this.queryProduct})
        .then((response) => {
          this.products = response.data.results
          this.paginationProduct.next = response.data.next
          this.paginationProduct.previous = response.data.previous
          this.paginationProduct.count = response.data.count
        })
    },
    retrieveProduct (id) {
      return this.axios.get(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.product = response.data
        })
    },
    updateProduct (id) {
      return this.axios.put(`${ENDPOINT}${id}/`, this.product)
        .then((response) => {
          this.product = response.data
        })
    },
    createProduct () {
      return this.axios.post(ENDPOINT, this.product)
        .then((response) => {
          this.product = response.data
        })
    },
    destroyProduct (id) {
      return this.axios.delete(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.product = undefined
        })
    },
    exportProduct () {
      const filename = `${new Date()}_.csv`
      return this.axios({
        url: `${ENDPOINT}export/`,
        method: 'GET',
        responseType: 'blob', // important
        params: this.queryProduct
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
