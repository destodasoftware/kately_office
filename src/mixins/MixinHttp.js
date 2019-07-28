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
    }
  }
}
