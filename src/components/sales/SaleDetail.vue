<template>
  <div>
    <div v-if="sale" class="card mb-4">
      <div class="card-body">
        <h4 class="text-success card-title">Penjualan</h4>
        <div class="form-group">
          <label class="text-secondary">
            {{ sale.sale_number }} <br>
            <small>{{ sale.pic }}</small>
          </label>
        </div>
        <div class="form-group no-print">
          <label>Rp. {{ sale.total }} 10.000</label>
        </div>
        <div class="form-group no-print">
          <label>Status</label>
          <select v-model="sale.status" disabled class="custom-select">
            <option v-for="st in status" :key="st.value" :value="st.value">
              {{ st.text }}
            </option>
          </select>
        </div>
        <div class="form-group no-print">
          <button class="btn btn-success">Simpan Perubahan</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SaleDetail',
  props: {
    propSale: Object
  },
  data () {
    return {
      sale: undefined,
      status: [
        {
          value: 'open',
          text: 'Baru'
        },
        {
          value: 'archived',
          text: 'Arsip'
        },
        {
          value: 'cancel',
          text: 'Cancel'
        }
      ]
    }
  },
  methods: {
    edit () {
      this.sale = Object.assign({}, this.propSale)
    },
    abort () {
      this.sale = undefined
    },
    saleUpdate () {
      const value = Object.assign({}, this.sale)
      this.$emit('saleUpdate', value)
    },
    saleDestroy () {
      const value = Object.assign({}, this.sale)
      this.sale = undefined
      this.$emit('saleDestroy', value)
    }
  },
  created () {
    this.sale = this.propSale
  },
  watch: {
    propSale (n, o) {
      this.sale = n
    }
  }
}
</script>

<style>

</style>
