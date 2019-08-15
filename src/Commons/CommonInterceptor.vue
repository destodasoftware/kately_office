<template>
  <b-spinner
    class="float-right spin"
    v-if="state"
    variant="primary"
    type="grow"
    label="Loading..."
  >
  </b-spinner>
</template>

<script>
export default {
  name: 'CommonInterceptor',
  data () {
    return {
      state: false
    }
  },
  methods: {
    // TODO: [1] Only one call interceptor object
    // ------------------------------------------
    // This axios interceptor can multiple
    // invoke. please update your code for
    // cleaning interceptors.
    // ------------------------------------------
    intercept () {
      // Add a request interceptor
      this.axios.interceptors.request.use((config) => {
        // Do something before request is sent
        this.state = true
        return config
      }, (error) => {
        // Do something with request error
        setTimeout(() => { this.state = false }, 400)
        return Promise.reject(error)
        // return error
      })

      // Add a response interceptor
      this.axios.interceptors.response.use((response) => {
        setTimeout(() => { this.state = false }, 400)
        return response
      }, (error) => {
        setTimeout(() => { this.state = false }, 400)
        const opt = {
          title: `Ups error code ${error.response.status}!`,
          variant: 'warning',
          toaster: 'b-toaster-top-center',
          solid: true
        }
        error.config.option = opt
        return Promise.reject(error)
      })
    }
  },
  mounted () {
    this.intercept()
  }
}
</script>

<style>
.spin {
  position: absolute;
  left: 4px;
  top: 4px;
}
</style>
