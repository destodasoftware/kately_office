const ROOT_API = `${process.env.ROOT_API}`
const APP = `shippings`
const ENDPOINT = `${ROOT_API}/office/${APP}/`

export default {
  data () {
    return {
      shippings: [],
      shipping: undefined,
      paginationShipping: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      queryShipping: {
        page: 1
      }
    }
  },
  methods: {
    listShipping () {
      return this.axios.get(ENDPOINT, {params: this.queryShipping})
        .then((response) => {
          this.shippings = response.data.results
          this.paginationShipping.next = response.data.next
          this.paginationShipping.previous = response.data.previous
          this.paginationShipping.count = response.data.count
        })
    },
    retrieveShipping (id) {
      return this.axios.get(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.shipping = response.data
        })
    },
    updateShipping (id) {
      return this.axios.put(`${ENDPOINT}${id}/`, this.shipping)
        .then((response) => {
          this.shipping = response.data
        })
    },
    createShipping () {
      return this.axios.post(ENDPOINT, this.shipping)
        .then((response) => {
          this.shipping = response.data
        })
    },
    destroyShipping (id) {
      return this.axios.delete(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.shipping = undefined
        })
    },
    exportShipping () {
      const filename = `${new Date()}_.csv`
      return this.axios({
        url: `${ENDPOINT}export/`,
        method: 'GET',
        responseType: 'blob', // important
        params: this.queryShipping
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
