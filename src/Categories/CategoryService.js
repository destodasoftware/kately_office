const ROOT_API = `${process.env.ROOT_API}`
const APP = `categories`
const ENDPOINT = `${ROOT_API}/office/${APP}/`

export default {
  data () {
    return {
      categories: [],
      category: undefined,
      paginationCategory: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      queryCategory: {
        page: 1,
        name: ''
      }
    }
  },
  methods: {
    listCategory () {
      const url = `${ENDPOINT}`
      return this.axios.get(url, {params: this.queryCategory})
        .then((response) => {
          this.categories = response.data.results
          this.paginationCategory.next = response.data.next
          this.paginationCategory.previous = response.data.previous
          this.paginationCategory.count = response.data.count
        })
    },
    retrieveCategory (id) {
      const url = `${ENDPOINT}${id}/`
      return this.axios.get(url)
        .then((response) => {
          this.category = response.data
        })
    },
    updateCategory (id) {
      const url = `${ENDPOINT}${id}/`
      return this.axios.put(url, this.category)
        .then((response) => {
          this.category = response.data
        })
    },
    createCategory () {
      const url = `${ENDPOINT}`
      return this.axios.post(url, this.category)
        .then((response) => {
          this.category = response.data
        })
    },
    destroyCategory (id) {
      const url = `${ENDPOINT}${id}/`
      return this.axios.delete(url)
        .then((response) => {
          this.category = undefined
        })
    },
    exportCategory () {
      const filename = `${new Date()}_.csv`
      return this.axios({
        url: `${ENDPOINT}export/`,
        method: 'GET',
        responseType: 'blob',
        params: this.queryCategory
      })
        .then((response) => {
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
