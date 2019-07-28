export default {
  methods: {
    notifSuccess (message) {
      if (!message) {
        message = 'Anda berhasil!'
      }
      this.$bvToast.toast(`${message}`, {
        title: 'Berhasil!',
        autoHideDelay: 3000,
        variant: 'success',
        solid: true
      })
    },
    notifError (error) {
      this.$bvToast.toast(`${error}`, {
        title: error.response.status,
        autoHideDelay: 3000,
        variant: 'warning',
        solid: true
      })
    }
  }
}
