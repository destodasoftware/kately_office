const ROOT_API = `${process.env.ROOT_API}`
const APP = `products`
const ENDPOINT = `${ROOT_API}/office/${APP}/`

export default {
  data () {
    return {
      productVariants: [],
      productVariant: undefined,
      paginationProductVariant: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      queryProductVariant: {
        page: 1,
        name: '',
        root: ''
      }
    }
  },
  methods: {
    listProductVariant () {
      return this.axios.get(ENDPOINT, {params: this.queryProductVariant})
        .then((response) => {
          this.productVariants = response.data.results
          this.paginationProductVariant.next = response.data.next
          this.paginationProductVariant.previous = response.data.previous
          this.paginationProductVariant.count = response.data.count
        })
    },
    retrieveProductVariant (id) {
      return this.axios.get(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.productVariant = response.data
        })
    },
    updateProductVariant (id) {
      return this.axios.put(`${ENDPOINT}${id}/`, this.productVariant)
        .then((response) => {
          this.productVariant = response.data
        })
    },
    createProductVariant () {
      return this.axios.post(ENDPOINT, this.productVariant)
        .then((response) => {
          this.productVariant = response.data
        })
    },
    destroyProductVariant (id) {
      return this.axios.delete(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.productVariant = undefined
        })
    },
    exportProductVariant () {
      const filename = `${new Date()}_.csv`
      return this.axios({
        url: `${ENDPOINT}export/`,
        method: 'GET',
        responseType: 'blob', // important
        params: this.queryProductVariant
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
