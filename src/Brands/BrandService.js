export default {
  data () {
    return {
      brands: [],
      brand: undefined,
      paginationBrand: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      queryBrand: {
        page: 1,
        name: ''
      }
    }
  },
  methods: {
    listBrand () {
      const url = `${process.env.ROOT_API}/office/brands/`
      return this.axios.get(url, {params: this.queryBrand})
        .then((response) => {
          this.brands = response.data.results
          this.paginationBrand.next = response.data.next
          this.paginationBrand.previous = response.data.previous
          this.paginationBrand.count = response.data.count
        })
    },
    retrieveBrand (id) {
      const url = `${process.env.ROOT_API}/office/brands/${id}/`
      return this.axios.get(url)
        .then((response) => {
          this.brand = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateBrand (id) {
      const url = `${process.env.ROOT_API}/office/brands/${id}/`
      return this.axios.put(url, this.brand)
        .then((response) => {
          this.brand = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    createBrand () {
      const url = `${process.env.ROOT_API}/office/brands/`
      return this.axios.post(url, this.brand)
        .then((response) => {
          this.brand = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    destroyBrand (id) {
      const url = `${process.env.ROOT_API}/office/brands/${id}/`
      return this.axios.delete(url)
        .then((response) => {
          this.brand = undefined
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
