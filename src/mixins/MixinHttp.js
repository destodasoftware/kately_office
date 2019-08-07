export default {
  methods: {
    httpInit (loginNotRequired) {
      if (loginNotRequired) {
        this.axios.defaults.headers.common = {
          'Content-Type': 'application/json'
        }
      } else {
        const token = localStorage.getItem('token')
        this.axios.defaults.headers.common = {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      }
    },
    list (app, query) {
      this.httpInit()
      return this.axios.get(`${process.env.ROOT_API}/office/${app}/`, {params: query})
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    create (app, value) {
      this.httpInit()
      return this.axios.post(`${process.env.ROOT_API}/office/${app}/`, value)
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    get (app, id) {
      this.httpInit()
      return this.axios.get(`${process.env.ROOT_API}/office/${app}/${id}/`)
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    update (app, id, value) {
      this.httpInit()
      return this.axios.put(`${process.env.ROOT_API}/office/${app}/${id}/`, value)
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    destroy (app, id) {
      this.httpInit()
      return this.axios.delete(`${process.env.ROOT_API}/office/${app}/${id}/`)
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    }
  }
}
