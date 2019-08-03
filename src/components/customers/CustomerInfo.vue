<template>
  <div class="mb-4">
    <div v-if="!propCustomerId" class="card border-light bg-light">
      <div class="card-body">
        <small class="text-muted">Info Pelanggan</small>
        <p>Ups, Tidak ada yang bisa ditampilkan!</p>
      </div>
    </div>
    <div v-if="propCustomerId" class="card border-light bg-light">
      <div v-if="customer" class="card-body">
        <small class="text-muted">Info Pelanggan</small>
        <h4 class="card-title text-primary">
          {{ customer.name }}
        </h4>
        <p class="text-secondary">
          {{ customer.customer_number }} / {{ customer.email }}
        </p>
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
