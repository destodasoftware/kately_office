<template>
  <div class="mb-4">
    <div v-if="!propCustomerId" class="card">
      <div class="card-body">
        <h5 class="card-title">Pelanggan</h5>
        <p class="card-text">Anda belum memilih pelanggan</p>
      </div>
    </div>
    <div v-if="propCustomerId" class="card">
      <div v-if="customer" class="card-body">
        <h5 class="card-title">Pelanggan</h5>
        <p class="card-text">{{ customer.email }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import MixinHttp from '@/mixins/MixinHttp'

export default {
  name: 'CustomerInfo',
  mixins: [
    MixinHttp
  ],
  props: {
    propCustomerId: Number
  },
  data () {
    return {
      customer: undefined
    }
  },
  methods: {
    customerRetrieve () {
      if (this.propCustomerId) {
        this.httpInit()
        const url = `${process.env.ROOT_API}/office/customers/${this.propCustomerId}/`
        this.axios.get(url)
          .then((response) => {
            this.customer = response.data
          })
          .catch((error) => {
            this.$bvToast.toast(error.message, error.config.option)
          })
      }
    }
  },
  mounted () {
    this.customerRetrieve()
  },
  watch: {
    propCustomerId (n, o) {
      this.customerRetrieve()
    }
  }
}
</script>

<style>

</style>
