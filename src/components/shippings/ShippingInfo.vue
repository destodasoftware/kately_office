<template>
  <div class="mb-4">
    <div
      v-if="!propShippingId"
      class="card border-light bg-light"
    >
      <div class="card-body">
        <small class="text-muted">Info Pengiriman</small>
        <p>Ups, Tidak ada yang bisa ditampilkan!</p>
      </div>
    </div>
    <div
      v-if="propShippingId"
      class="card border-light bg-light"
    >
      <div
        v-if="shipping"
        class="card-body"
      >
        <small class="text-muted">Info Pengiriman</small>
        <h4 class="card-title text-primary">{{ shipping.city }}</h4>
        <p class="text-scondary">{{ shipping.address }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import MixinHttp from '@/mixins/MixinHttp'

export default {
  name: 'ShippingInfo',
  mixins: [
    MixinHttp
  ],
  props: {
    propShippingId: Number
  },
  data () {
    return {
      shipping: undefined
    }
  },
  methods: {
    shippingRetrieve () {
      if (this.propShippingId) {
        this.httpInit()
        const url = `${process.env.ROOT_API}/office/shippings/${this.propShippingId}/`
        this.axios.get(url)
          .then((response) => {
            this.shipping = response.data
          })
          .catch((error) => {
            this.$bvToast.toast(error.message, error.config.option)
          })
      }
    }
  },
  mounted () {
    this.shippingRetrieve()
  },
  watch: {
    propShippingId (n, o) {
      this.shippingRetrieve()
    }
  }
}
</script>

<style>

</style>
