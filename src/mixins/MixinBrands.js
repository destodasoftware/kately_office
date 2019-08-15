export default {
  data () {
    return {
      brands: [],
      brand: undefined,
      paginationBrand: {
        next: undefined,
        previous: undefined,
        count: undefined
      },
      queryBrand: {
        page: undefined,
        name: ''
      },
      configBrand: {
        resource: '/office/brands/',
        root: `${process.env.ROOT_API}`
      }
    }
  },
  methods: {
    setPaginationBrand (data) {
      this.paginationBrand.next = data.next
      this.paginationBrand.previous = data.previous
      this.paginationBrand.count = data.count
    },
    brandRetrieve () {
      const url = `${this.configBrand.root}${this.configBrand.resource}${this.brand.id}/`
      return this.axios.get(url)
        .then((response) => {
          this.brand = response.data
        })
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    brandList () {
      const url = `${this.configBrand.root}${this.configBrand.resource}`
      return this.axios.get(url, {params: this.query})
        .then((response) => {
          this.brands = response.data.results
          this.setPaginationBrand(response.data)
        })
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    }
  }
}
