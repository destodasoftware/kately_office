<template>
  <b-modal
    ref="modal-SaleSendMail"
    header-bg-variant="primary"
    header-text-variant="light"
    id="modal-SaleSendMail"
    title="Kirim Email ke Pelanggan"
  >
    <p>{{ description }}</p>
    <div slot="modal-footer">
      <button @click="saleSendMail" class="btn btn-primary">Kirim</button>
    </div>
  </b-modal>
</template>

<script>
import MixinHttp from '@/mixins/MixinHttp'

export default {
  name: 'SaleSendMail',
  props: {
    propSale: Object
  },
  mixins: [
    MixinHttp
  ],
  data () {
    return {
      description: 'Email ini akan memberi tahu pihak pembeli untuk informasi pembelian mereka.'
    }
  },
  methods: {
    saleSendMail () {
      this.httpInit()
      this.axios.post(`${process.env.ROOT_API}/office/sales/${this.propSale.id}/send_mail/`)
        .then((response) => {
          this.$emit('saleSendMail')
        })
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    }
  }
}
</script>

<style>

</style>
